import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Sparkles, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageRoute, ChatMessage } from '../types';
import { QUICK_PROMPTS } from '../constants';
import { GoogleGenAI } from "@google/genai";

// Initialize AI safely
let ai: GoogleGenAI | null = null;
try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (e) {
  console.error("Failed to initialize Gemini AI", e);
}

const AIChefPage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '你好！我是你的AI帮厨。无论是冰箱里剩菜怎么处理，还是牛排几分熟，都可以问我哦！👨‍🍳',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      if (!ai) {
        // Fallback simulation if no API key
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "我似乎没有连接到大脑（API Key缺失）。不过如果我在线的话，我会告诉你这是一道美味的菜！(请检查 API_KEY 配置)",
            timestamp: new Date()
          }]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      // Prepare context for the chat
      // We take the last few messages to maintain context without overloading tokens
      const historyContext = messages.slice(-5).map(m => 
        `${m.role === 'user' ? 'User' : 'Model'}: ${m.text}`
      ).join('\n');

      const systemPrompt = `You are a warm, helpful, and professional AI cooking assistant named "暖食记帮厨". 
      Your tone should be encouraging and appetizing. 
      Answer questions about recipes, cooking techniques, and food safety. 
      Keep answers concise but helpful. Use emojis like 🍳, 🧂, 🥗 occasionally.
      Current conversation context:\n${historyContext}\n\nUser Question: ${text}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: systemPrompt,
      });

      const replyText = response.text || "哎呀，我刚才走神了，请再说一遍？";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: replyText,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "抱歉，厨房有点忙（连接超时），请稍后再试！😵",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-warm-bg">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 flex items-center gap-4 z-10">
        <button 
          onClick={() => navigate(PageRoute.EXPLORE)}
          className="p-2 hover:bg-warm-bg rounded-full transition-colors text-warm-textDark"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-warm-textDark flex items-center gap-2">
            <ChefHat className="text-warm-primary" />
            AI 智能厨房顾问
          </h1>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[70%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm
                ${msg.role === 'user' ? 'bg-warm-primary text-white' : 'bg-white text-warm-secondary border border-warm-secondary'}`}>
                {msg.role === 'user' ? '我' : <ChefHat size={20} />}
              </div>

              {/* Bubble */}
              <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap
                ${msg.role === 'user' 
                  ? 'bg-warm-primary text-white rounded-tr-none' 
                  : 'bg-white text-warm-textDark rounded-tl-none'
                }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start w-full">
             <div className="flex max-w-[80%] gap-3">
               <div className="w-10 h-10 rounded-full bg-white text-warm-secondary border border-warm-secondary flex items-center justify-center flex-shrink-0">
                  <ChefHat size={20} />
               </div>
               <div className="bg-white p-4 rounded-2xl rounded-tl-none text-warm-textLight shadow-sm flex items-center gap-2">
                 正在思考... 🍳
                 <span className="flex gap-1">
                   <span className="w-1.5 h-1.5 bg-warm-textLight rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-warm-textLight rounded-full animate-bounce delay-100"></span>
                   <span className="w-1.5 h-1.5 bg-warm-textLight rounded-full animate-bounce delay-200"></span>
                 </span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-warm-bg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        
        {/* Quick Prompts */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3 pb-1">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="flex-shrink-0 px-3 py-1.5 bg-warm-bg border border-warm-secondary/30 rounded-full text-warm-textDark text-xs hover:bg-warm-secondary/20 transition-colors whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex gap-2 items-end">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(inputText);
              }
            }}
            placeholder="问问我，比如：只有鸡蛋怎么做才好吃？"
            disabled={isLoading}
            className="flex-1 bg-warm-bg rounded-2xl px-4 py-3 text-warm-textDark outline-none focus:ring-2 focus:ring-warm-secondary/50 resize-none h-[52px]"
          />
          <button
            onClick={() => handleSend(inputText)}
            disabled={isLoading || !inputText.trim()}
            className="w-[52px] h-[52px] flex items-center justify-center bg-warm-primary text-white rounded-full hover:bg-red-500 disabled:opacity-50 disabled:hover:bg-warm-primary transition-all shadow-md"
          >
            {isLoading ? <Sparkles size={20} className="animate-spin" /> : <Send size={20} className="ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChefPage;