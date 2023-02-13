import Channels from '../components/channels/Channels.jsx';
import NavBar from '../components/NavBar';
import Chat from '../components/chat/Chat';

const Main = () => {

  return (
    <>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
