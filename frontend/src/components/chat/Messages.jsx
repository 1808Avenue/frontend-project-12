import { useSelector } from 'react-redux';
import { selectCurrentChannelMessages } from '../../slices/messagesSlice';

const Messages = () => {
  const messages = useSelector(selectCurrentChannelMessages);

  return (
    messages.map((message) => (
      <div key={message.id} className="text-break mb-2">
        <b>
          {message.username}
        </b>
        {': '}
        {message.body}
      </div>
    ))
  );
};

export default Messages;
