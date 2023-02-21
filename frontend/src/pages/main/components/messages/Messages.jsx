import { useSelector } from 'react-redux';
import { selectCurrentChannelMessages } from '../../../../slices/messagesSlice';

const Messages = () => {
  const messages = useSelector(selectCurrentChannelMessages);

  return (
    messages.map((message) => (
      <div className="text-break mb-2" key={message.id}>
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
