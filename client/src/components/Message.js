import React from 'react';
import './Message.css';

const Message = ({pseudo, text}) => {
    return ( 
        <div className="Message">
            <span className="Message__pseudo">{pseudo}</span>
            <p className="Message__text">
                {text}
            </p>    
        </div>
     );
}
 
export default Message;