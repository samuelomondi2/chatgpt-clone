import React, { useState } from 'react'
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';
import axios from 'axios';

export default function ChatWindow() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('')

    const sendMessages = async (input) => {
        const userMessage = {sender: 'user', text: input};
        setMessages([...messages, userMessage]);
        setLoading(true);

        // headers for API call
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env.REACT_APP_CHATGPT_API_KEY
        }

        //Data for API call
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [{role: 'user', content: input}]
        }

        try {
            // send user message to API
            const response = axios.post(
                'https://api.openai.com/v1/chat/completions',
                data,
                {headers}
            )

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
