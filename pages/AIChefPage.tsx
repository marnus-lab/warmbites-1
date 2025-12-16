import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Sparkles, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageRoute, ChatMessage } from '../types';
import { QUICK_PROMPTS } from '../constants';

// Coze 配置信息
const BASE_URL = '/coze-api/v3'; // 基础路径
const COZE_BOT_ID = '7584328646849495074';
const COZE_PAT = 'pat_qxgnk2c1UOVCXsBbkEQLPJzkXL70GWXz0eceJkkn3Lmz8phWmmU20afjVq6vo01i';

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
  const [conversationId, setConversationId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 辅助函数：等待指定毫秒
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // 1. 显示用户消息
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
      // 2. 发起对话请求 (POST /chat)
      console.log("Step 1: 发起对话...");
      const chatPayload: any = {
        bot_id: COZE_BOT_ID,
        user_id: "web_user_" + Date.now(),
        stream: false,
        auto_save_history: true,
        additional_messages: [{ role: "user", content: text, content_type: "text" }]
      };
      if (conversationId) chatPayload.conversation_id = conversationId;

      const chatRes = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${COZE_PAT}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatPayload)
      });

      const chatData = await chatRes.json();

      if (chatData.code !== 0 || !chatData.data) {
        throw new Error(`创建对话失败: ${chatData.msg}`);
      }

      const chatId = chatData.data.id;
      const newConversationId = chatData.data.conversation_id;
      if (newConversationId) setConversationId(newConversationId);

      let status = chatData.data.status;
      console.log(`Step 1 结果: ChatID=${chatId}, Status=${status}`);

      // 3. 轮询检查状态 (如果状态是 in_progress)
      let retryCount = 0;
      while (status === 'in_progress' || status === 'created') {
        if (retryCount > 30) throw new Error("等待 AI 响应超时"); // 最多等30秒

        await sleep(1000); // 等1秒
        retryCount++;

        console.log(`Step 2: 轮询状态中 (${retryCount})...`);
        const retrieveRes = await fetch(`${BASE_URL}/chat/retrieve?chat_id=${chatId}&conversation_id=${newConversationId}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${COZE_PAT}` }
        });

        const retrieveData = await retrieveRes.json();
        if (retrieveData.code === 0 && retrieveData.data) {
          status = retrieveData.data.status;
          console.log(`状态更新: ${status}`);
        }
      }

      if (status !== 'completed') {
        throw new Error(`对话异常结束，最终状态: ${status}`);
      }

      // 4. 状态完成后，获取消息列表 (GET /chat/message/list)
      console.log("Step 3: 获取最终消息列表...");
      const listRes = await fetch(`${BASE_URL}/chat/message/list?chat_id=${chatId}&conversation_id=${newConversationId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${COZE_PAT}` }
      });
      const listData = await listRes.json();

      if (listData.code === 0 && listData.data) {
        // 筛选 AI 的回答
        const aiMessages = listData.data.filter((m: any) =>
            m.role === 'assistant' &&
            m.type === 'answer' && // 通常用 answer，如果没内容可以放宽条件
            m.content &&
            m.content.trim() !== ''
        );

        // 如果找不到 answer 类型的，尝试找 text 类型的
        const validMsgs = aiMessages.length > 0 ? aiMessages : listData.data.filter((m: any) =>
            m.role === 'assistant' && m.type === 'text' && m.content
        );

        const lastMsg = validMsgs[validMsgs.length - 1];
        const replyText = lastMsg ? lastMsg.content : "AI 思考完成，但没有生成文本。";

        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          role: 'model',
          text: replyText,
          timestamp: new Date()
        }]);
      }

    } catch (error: any) {
      console.error("对话过程出错:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: `出错了: ${error.message}\n请检查控制台日志 (F12) 获取更多细节。`,
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
              AI 智能厨房顾问 (Coze V3)
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
