import { useRef, useState, useEffect } from 'react';

const Index = () => {
  const socket = useRef(null);
  const [message, setMessage] = useState();

  useEffect(() => {
    const socketLocal = new WebSocket('ws://localhost:8080');

    // Connection opened
    socketLocal.addEventListener('open', function (event) {
      socketLocal.send('Hello Server!');
      socket.current = socketLocal;
    });

    // Listen for messages
    socketLocal.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
  }, []);

  const onChange = (event) => setMessage(event.target.value);
  const onClick = () => {
    socket.current.send(message);
    setMessage('');
  }
  return (
    <div>
      <input
        onChange={onChange}
        value={message}
      />
      <button onClick={onClick}>Send</button>
    </div>
  );
}

export default Index;
