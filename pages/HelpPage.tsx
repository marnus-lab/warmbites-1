import React, { useState } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '../types';

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-warm-bg overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="font-bold text-warm-textDark text-lg">{question}</span>
        {isOpen ? <ChevronUp className="text-warm-primary" /> : <ChevronDown className="text-warm-textLight" />}
      </button>
      <div 
        className={`px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
      >
        <p className="text-warm-textDark/80 leading-relaxed border-t border-gray-100 pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
};

const HelpPage: React.FC = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "如何快速找到我想要的菜谱？",
      answer: "您可以使用页面顶部的搜索框输入菜名或食材关键字。此外，我们提供了“家常菜”、“快手菜”、“减脂餐”等分类标签，点击即可快速筛选出您感兴趣的类别。"
    },
    {
      question: "AI 帮厨能做什么？",
      answer: "AI 帮厨是您的智能烹饪助手。您可以问它关于食材处理、替代方案、烹饪技巧甚至是根据您现有的食材推荐菜谱。只需点击顶部的“试试AI帮厨”按钮即可开始对话。"
    },
    {
      question: "这些菜谱适合新手吗？",
      answer: "非常适合！我们的菜谱专为家庭烹饪设计，步骤清晰，用料常见。特别是“快手菜”和“家常菜”分类，非常适合烹饪新手尝试。"
    },
    {
      question: "如何查看制作步骤？",
      answer: "在“菜谱推荐”页面，点击任意一张菜品卡片，就会弹出一个详细的悬浮窗，里面包含了所需的完整食材清单和详细的分步烹饪说明。"
    },
    {
      question: "网站的图片加载不出来怎么办？",
      answer: "我们使用的是高清网络图源，请检查您的网络连接。如果持续无法加载，可能是图源服务器暂时拥堵，请稍后刷新页面重试。"
    }
  ];

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <button 
          onClick={() => navigate(PageRoute.EXPLORE)}
          className="p-2 hover:bg-warm-bg rounded-full transition-colors text-warm-textDark"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-warm-textDark flex items-center gap-2">
          <HelpCircle className="text-warm-primary" />
          帮助中心
        </h1>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-6 space-y-8">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-warm-textDark mb-4">你好，有什么可以帮您？</h2>
          <p className="text-warm-textLight text-lg">这里汇总了暖食记使用过程中的常见问题。</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Function Guide Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-warm-bg rounded-full flex items-center justify-center text-warm-primary mb-4">
              <Search size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">智能搜索</h3>
            <p className="text-sm text-warm-textLight">
              支持食材、菜名模糊搜索，让美味触手可及。
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-warm-bg rounded-full flex items-center justify-center text-warm-secondary mb-4">
              <Sparkles size={24} />
            </div>
            <h3 className="font-bold text-lg mb-2">AI 交互</h3>
            <p className="text-sm text-warm-textLight">
              基于 Gemini 模型的智能问答，解决厨房里的十万个为什么。
            </p>
          </div>
        </div>
      </main>
      
      
    </div>
  );
};

export default HelpPage;