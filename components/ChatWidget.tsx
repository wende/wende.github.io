import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am Krzysztof\'s AI assistant. Ask me anything about his experience, skills, or projects.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await sendMessage(userMsg);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
            {!isOpen && (
                 <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-black text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-charcoal transition-colors"
                >
                    <MessageSquare size={24} />
                </motion.button>
            )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
            >
                {/* Chat Header */}
                <div className="bg-black text-white p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Bot size={20} />
                        <span className="font-bold text-sm uppercase tracking-wider">Ask AI Assistant</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-gray-800 p-1 rounded">
                        <X size={20} />
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                                    msg.role === 'user'
                                        ? 'bg-black text-white rounded-tr-none'
                                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-200 p-3 rounded-xl rounded-tl-none shadow-sm flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                                <span className="text-xs text-gray-500">Thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about my experience..."
                            disabled={isLoading}
                            className="flex-1 bg-gray-100 text-gray-900 placeholder-gray-500 text-sm rounded-lg border-none focus:ring-1 focus:ring-black px-4 py-3 outline-none"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="p-3 bg-black text-white rounded-lg disabled:opacity-50 hover:bg-charcoal transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="mt-2 text-center">
                        <p className="text-[10px] text-gray-400">AI can make mistakes. Check important info.</p>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
