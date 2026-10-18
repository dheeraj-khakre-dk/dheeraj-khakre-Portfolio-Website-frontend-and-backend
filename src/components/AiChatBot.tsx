import React, { useState, useRef, useEffect } from 'react';
import { apiService } from '../services/apiService.ts';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AiChatBotProps {
  externalIsOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const AiChatBot: React.FC<AiChatBotProps> = ({
  externalIsOpen,
  onClose,
  onOpen,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const setIsOpen = (val: boolean) => {
    setInternalIsOpen(val);
    if (val && onOpen) onOpen();
    if (!val && onClose) onClose();
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        "Hi! I'm Dheeraj Khakre's AI Representative. Ask me anything about my 2+ years of enterprise experience with Java, Spring Boot 3, microservices, Kafka event streaming, my real GitHub repositories, or my work at ITC Infotech and Qualfon!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Tell me about your experience with Kafka & microservices',
    'What are your top GitHub projects?',
    'How did you improve API latency by 40% at Qualfon?',
    'What is your experience with Spring Boot & Java?',
    'Are you available for new opportunities?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const response = await apiService.sendChatMessage(text, history);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'assistant',
        content:
          err.message ||
          "I am currently experiencing high demand. Please feel free to reach out directly via khakredheeraj@gmail.com or explore the Projects section!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#adc6ff] to-[#d0bcff] text-[#002e6a] shadow-[0_4px_24px_rgba(173,198,255,0.4)] hover:shadow-[0_4px_30px_rgba(173,198,255,0.6)] hover:scale-105 transition-all group"
          aria-label="Open AI Assistant"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#002e6a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#002e6a]"></span>
          </div>
          <span className="material-symbols-outlined text-[20px] text-[#002e6a]">
            smart_toy
          </span>
          <span className="text-[13.5px] font-bold tracking-tight">Ask Dheeraj AI</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[440px] h-[590px] max-h-[85vh] bg-[#051424] border border-[#273647] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Window Header */}
          <div className="bg-[#122131] border-b border-[#1c2b3c] p-3.5 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#adc6ff]/15 border border-[#adc6ff]/30 flex items-center justify-center text-[#adc6ff]">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13.5px] font-bold text-[#d4e4fa] flex items-center gap-1.5">
                  Dheeraj AI Persona
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </span>
                <span className="font-mono text-[10.5px] text-[#8c909f]">
                  Gemini Grounded Knowledge Bot
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  setMessages([
                    {
                      id: 'reset-1',
                      role: 'assistant',
                      content: 'Chat refreshed. Ask me anything about Dheeraj!',
                      timestamp: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                    },
                  ])
                }
                title="Clear Chat History"
                className="p-1.5 text-[#8c909f] hover:text-[#d4e4fa] rounded-lg hover:bg-[#1c2b3c] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close AI Assistant"
                className="p-1.5 text-[#8c909f] hover:text-[#d4e4fa] rounded-lg hover:bg-[#1c2b3c] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="bg-[#0d1c2d] border-b border-[#1c2b3c] px-3 py-2 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono scrollbar-none">
            <span className="text-[#8c909f] shrink-0">Prompts:</span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded bg-[#122131] border border-[#1c2b3c] text-[#adc6ff] hover:bg-[#1c2b3c] hover:border-[#adc6ff]/40 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 bg-[#051424] text-[13px] text-left">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col gap-1 max-w-[85%] ${
                  m.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-xl leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#adc6ff] text-[#002e6a] font-medium rounded-br-xs'
                      : 'bg-[#122131] text-[#d4e4fa] border border-[#1c2b3c] rounded-bl-xs'
                  }`}
                >
                  {m.content}
                </div>
                <span className="font-mono text-[9.5px] text-[#8c909f] px-1">
                  {m.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="mr-auto flex items-center gap-2 p-3 rounded-xl bg-[#122131] border border-[#1c2b3c] text-[#adc6ff] text-[12px]">
                <span className="material-symbols-outlined animate-spin text-[16px]">
                  progress_activity
                </span>
                <span>Synthesizing response from verified ground truth...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-[#122131] border-t border-[#1c2b3c] p-3 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Ask about Dheeraj's backend experience..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 rounded-lg bg-[#051424] border border-[#1c2b3c] text-[#d4e4fa] placeholder-[#8c909f] text-[13px] focus:outline-none focus:border-[#adc6ff]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 rounded-lg bg-[#adc6ff] text-[#002e6a] hover:bg-[#4d8eff] hover:text-white transition-all disabled:opacity-40 shrink-0"
              aria-label="Send Message"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
