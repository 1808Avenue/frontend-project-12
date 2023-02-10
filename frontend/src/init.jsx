import i18next from 'i18next';
import * as leoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import { SockeIoProvider } from './contexts/SocketContext.jsx';

const init = async () => {
  const socket = io();
  const i18n = i18next.createInstance();
  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    environment: 'production',
  };

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <BrowserRouter>
      <Provider store={store}>
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <SockeIoProvider socket={socket}>
              <I18nextProvider i18n={i18n}>
                <App />
              </I18nextProvider>
            </SockeIoProvider>
          </ErrorBoundary>
        </RollbarProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default init;
