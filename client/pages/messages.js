import React from 'react';
import LeftPane from '@/components/leftPane/leftPane';
import MsgLeftPane from '@/components/messageComponent/msgLeftPane';
import MsgContent from '@/components/messageComponent/msgContent';

const chatterList = [
  { id: 1, name: 'Alice', image: 'https://i.pravatar.cc/40' },
  { id: 2, name: 'Bob', image: 'https://i.pravatar.cc/41' },
  { id: 3, name: 'Charlie', image: 'https://i.pravatar.cc/42' },
];

const messageList = [
  {
    id: 1,
    sender: 'Alice',
    receiver: 'Me',
    text: 'Hi there!',
    sentTime: '2022-04-01 09:00:00',
  },
  {
    id: 2,
    sender: 'Me',
    receiver: 'Alice',
    text: 'Hey Alice, how are you?',
    sentTime: '2022-04-01 09:01:00',
  },
  {
    id: 3,
    sender: 'Alice',
    receiver: 'Me',
    text: 'I\'m good, thanks for asking. How about you?',
    sentTime: '2022-04-01 09:02:00',
  },
  {
    id: 4,
    sender: 'Me',
    receiver: 'Alice',
    text: 'I\'m doing well too, thanks. Just working on this chat app!',
    sentTime: '2022-04-01 09:03:00',
  },
];

const Messages = () => {
    return (
        <div className="container">
        <div className="row">
          <div className="col-md-4">
            <LeftPane />
          </div>
      
            <div className="col-md-4">
            <MsgLeftPane chatters={chatterList} />
          </div>
      
          <div className="col-md-8">
            <MsgContent messages={messageList} />
          </div>
        </div>
      </div>
    );
  };

export default Messages;

