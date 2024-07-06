import React, { useState } from 'react'
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';

export default function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('')

    const sendMessages = async (input) => {
        const userMessage = {sender: 'user', text: input};
        setMessages([...messages, userMessage]);
        setLoading(true);
        try {
            
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault() //prevent a page refresh

        if(input.trim() !== ''){
            sendMessages(input);
            setInput('');
        }
    };

    const handleInput = (e) => {
        setInput(e.target.value);
    };

    return (
        <>
            {/* Messages */}
            {messages.map((message, index) => (
                <Message 
                    key = {index}
                    sender = {message.sender}
                    text = {message.text} />
            ))}
            {/* Loading */}
            {loading && <LoadingIndicator/>}

            {/* Input */}
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={input}
                    onChange={handleInput} />
                <button type='submit'>Send</button>
            </form>
        </>
    )
}
