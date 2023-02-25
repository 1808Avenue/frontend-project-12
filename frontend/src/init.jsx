import i18next from 'i18next';
import * as leoProfanity from 'leo-profanity';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import { SockeIoProvider } from './contexts/SocketContext.jsx';

const init = async (socketInstance) => {
  const i18n = i18next.createInstance();
  const ruDictionary = leoProfanity.getDictionary('ru');
  leoProfanity.add(ruDictionary);

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NODE_ENV,
  };

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: localStorage.language ? localStorage.language : 'ru',
    });

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <SockeIoProvider socket={socketInstance}>
            <I18nextProvider i18n={i18n}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </I18nextProvider>
          </SockeIoProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>

  );
};

export default init;
