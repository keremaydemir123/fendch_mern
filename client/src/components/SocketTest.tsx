import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import Button from './Button';
import { useUser } from '../contexts/UserProvider';

function SocketTest() {
  const { user } = useUser();
  const [notification, setNotification] = useState('');

  const socket = io('127.0.0.1:4000', {
    reconnectionDelay: 1000,
    reconnection: true,
    transports: ['websocket', 'polling', 'flashsocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');
      console.log(socket.id);
    });

    socket.on('receive_notification', (data) => {
      setNotification(data);
      console.log(socket.id);
    });
  }, []);

  const data = {
    clientId: user?._id,
    type: 'likeNotification',
  };

  const handleClick = () => {
    console.log(data);

    socket.emit('notifications', data);
  };
  return (
    <div className="bg-blue text-light w-full h-full p-4">
      <h1>Deneme</h1>
      <Button onClick={handleClick}>Send Notification</Button>
      <p>{notification}</p>
    </div>
  );
}

export default SocketTest;
