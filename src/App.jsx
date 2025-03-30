import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import Suggestions from './components/Suggestions';
import InputBar from './components/InputBar';
import { sendMessageToOpenAI } from './components/services/api';
import { extractTaxData } from './components/utils/dataExtractor';
import { calculateProgress } from './components/utils/progressTracker';
import './components/styles/variables.css';
import './components/styles/chat.css';  
import './components/styles/index.css';

function App() {
    const [messages, setMessages] = useState([
        { 
            role: 'assistant', 
            content: "Welcome to Tax Assistant! I can help you prepare your tax filing. What country are you filing taxes in?" 
        }
    ]);

    const [userInput, setUserInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([
        'I need help with income tax',
        'What deductions am I eligible for?',
        'How do I report freelance income?'
    ]);
    const [country, setCountry] = useState('');
    const [progress, setProgress] = useState(0);
    const [userInfo, setUserInfo] = useState({
        personalDetails: {},
        income: {},
        deductions: {},
        taxCredits: {}
    });

    useEffect(() => {
        if (country) {
            updateContextualSuggestions();
        }
    }, [country, userInfo, messages]);

    const updateContextualSuggestions = () => {
        const lastMessage = messages[messages.length - 1];

        if (lastMessage?.role === 'assistant' && lastMessage.content.includes('income')) {
            setSuggestions([
                "I earn 13LPA in India",
                "I have rental income",
                "I am a freelancer",
                "I have capital gains",
                "I have foreign income"
            ]);
        } 
        else if (lastMessage?.role === 'assistant' && lastMessage.content.includes('deductions')) {
            setSuggestions([
                "I have medical expenses",
                "I have education expenses",
                "I have home mortgage interest",
                "I have charitable donations"
            ]);
        } 
        else if (lastMessage?.role === 'assistant' && !userInfo.personalDetails.name) {
            setSuggestions([
                "Let's start my tax filing",
                "What documents do I need?",
                "What's new for tax year 2024?"
            ]);
        }
    };

    const handleUserInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const extractCountry = (messageText) => {
        if (!country && messageText.toLowerCase().includes('in')) {
            const possibleCountry = messageText.match(/in\s+([a-zA-Z\s]+)/i);
            if (possibleCountry && possibleCountry[1]) {
                setCountry(possibleCountry[1].trim());
            }
        }
    };

    const sendMessage = async (messageText = userInput) => {
        if (!messageText.trim()) return;

        const userMessage = { role: 'user', content: messageText };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setUserInput('');
        setLoading(true);
        extractCountry(messageText);

        try {
            const context = {
                country: country || 'Not specified',
                progress,
                userInfo,
                messages: newMessages
            };

            const AIResponse = await sendMessageToOpenAI(messageText, context);
            const { processedResponse, extractedData } = extractTaxData(AIResponse);

            if (extractedData) {
                setUserInfo(prevInfo => {
                    const updatedInfo = { ...prevInfo, ...extractedData };
                    setProgress(calculateProgress(updatedInfo));
                    return updatedInfo;
                });
            }

            setMessages(prev => [...prev, { role: 'assistant', content: processedResponse }]);
        } catch (error) {
            console.error('Error communicating with OpenAI:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Sorry, I encountered an error processing your request. Please try again.' 
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setUserInput(suggestion);
        sendMessage(suggestion);
    };

    return (
        <div className='tax-assistant-container'>
            <Header country={country} progress={progress} />
            
            <div className='chat-container'>
                <MessageList messages={messages} isLoading={loading} />
                <Suggestions suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
                <InputBar 
                    input={userInput} 
                    onChange={handleUserInputChange} 
                    onSend={sendMessage} 
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage(userInput);
                        }
                    }} 
                />
            </div>
        </div>
    );
}

export default App;
