import React, {useEffect, useState} from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';


const ENDPOINT = "http://localhost:4000";


function App() {
  const [color,setColor] = useState('yellow');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket =socketIOClient(ENDPOINT);
    setSocket(socket);

    socket.on('color changed', (chosenColor) => {
        console.log(chosenColor);
        setColor(chosenColor);
    })
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color])

  const changeColor = (chosenColor) => {
    socket.emit('change color', chosenColor);
  }

  return (
    <div className="App">
      <h1>On a pris le contrôle de mon titre!</h1>
      <button onClick={() => changeColor('red')}>Red</button>
      <button onClick={() => changeColor('green')}>Green</button>
      <button onClick={() => changeColor('blue')}>Blue</button>
    </div>
  );
}

export default App;
