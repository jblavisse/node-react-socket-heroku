import React, {useState, useEffect} from 'react';
import Message from './Message';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";


const Chat = () => {

    const [pseudo, setPseudo] = useState('');
    const [connected,setConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setSocket(socketIOClient(ENDPOINT));

        socket.on('authenticated', {

        })

        socket.on('get_messages', (messages) => {
            setMessages(messages)
        })
    }, []);

    const connectUser = (e) => {
        e.preventDefault();
        if(pseudo && socket) {
            setConnected(true)
            socket.emit('incoming data', pseudo);
        }
    }

    if(!connected) {
        return ( 
            <div className="Chat">
                <form className="chat__form" onSubmit={connectUser}>
                    <input type="text" 
                        value={pseudo} 
                        onChange={e => setPseudo(e.target.value)} />
                    <input type="submit" value="Envoyer" />
                </form>
            </div>
         );
    }
    else {
        return ( 
            <div className="Chat">
                <div className="Chat__messages">
                    <Message pseudo="jb" text="Coucou les enfants" />
                    <Message pseudo="jb" text="Coucou les enfants" />
                    <Message pseudo="jb" text="Coucou les enfants" />
                </div>
            </div>
         );
    }
}
 
export default Chat;