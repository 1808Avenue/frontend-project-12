import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import { selectCurrentChannelId } from '../../slices/channelsSlice';
import { selectMessages } from '../../slices/messagesSlice';

const Messages = () => {
  const messages = useSelector(selectMessages);
  const currentChannelId = useSelector(selectCurrentChannelId);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages-box',
      duration: 0,
      delay: 0,
      smooth: 'true',
    });
  }, [messages]);

  return (
    messages.map((message) => {
      if (currentChannelId === message.channelId) {
        return (
          <div key={message.id} className="text-break mb-2">
            <b>
              {message.username}
            </b>
            {': '}
            {message.body}
          </div>
        );
      }
      return null;
    })
  );
};

export default Messages;
