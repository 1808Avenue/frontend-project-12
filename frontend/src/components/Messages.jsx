import { useEffect } from 'react';
import { animateScroll } from 'react-scroll';

const Messages = ({ messages, currentChannelId }) => {
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
