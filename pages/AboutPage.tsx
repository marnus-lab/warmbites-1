import React from 'react';
import { ArrowLeft, Info, Heart, Users, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '../types';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

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
          <Info className="text-warm-primary" />
          关于我们
        </h1>
      </header>

      {/* Hero Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop" 
          alt="Cooking together" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-warm-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">暖食记 WarmBites</h2>
          <p className="text-xl opacity-90 tracking-wide">每一餐，都是对生活的致敬</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-12 -mt-8 relative z-0">
        
        {/* Philosophy Card */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-warm-bg rounded-xl text-warm-primary">
              <Heart size={28} />
            </div>
            <h3 className="text-2xl font-bold text-warm-textDark">设计理念</h3>
          </div>
          <div className="space-y-4 text-warm-textDark/80 leading-loose text-lg">
            <p>
              在快节奏的现代生活中，做饭往往被视为一种负担。但在暖食记，我们相信烹饪是治愈心灵的过程。
            </p>
            <p>
              我们的设计核心围绕着<span className="font-bold text-warm-primary mx-1">“温暖”</span>与<span className="font-bold text-warm-primary mx-1">“直观”</span>。
              摒弃了复杂的参数和冰冷的数据，我们用令人食指大动的高清图片、柔和的暖色调色彩系统，以及贴心的 AI 帮厨助手，为您打造一个沉浸式的美食探索空间。
            </p>
            <p>
              无论是厨房小白，还是烹饪达人，都能在这里找到灵感，感受食物带来的美好。
            </p>
          </div>
        </section>

        {/* Team Card */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-warm-bg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-warm-bg rounded-xl text-warm-secondary">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-bold text-warm-textDark">我们的团队</h3>
          </div>
          <p className="text-warm-textDark/80 mb-6">
            我们是一群热爱美食、设计与技术的前端开发者。致力于通过技术手段，改善人们的饮食体验。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="flex items-center gap-4 p-4 bg-warm-bg/50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                </div>
                <div>
                   <h4 className="font-bold text-warm-textDark">LiuZhexi</h4>
                   <p className="text-sm text-warm-textLight">设计师 & 前端开发</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-warm-bg/50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="avatar" />
                </div>
                <div>
                   <h4 className="font-bold text-warm-textDark">MaZhiyuan</h4>
                   <p className="text-sm text-warm-textLight">设计师 & 前端开发</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-warm-bg/50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=David" alt="avatar" />
                </div>
                <div>
                   <h4 className="font-bold text-warm-textDark">ZhangWenzhe</h4>
                   <p className="text-sm text-warm-textLight">设计师 & 前端开发</p>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-warm-bg/50 rounded-2xl hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" alt="avatar" />
                </div>
                <div>
                   <h4 className="font-bold text-warm-textDark">ChenHaoxiang</h4>
                   <p className="text-sm text-warm-textLight">设计师 & 前端开发</p>
                </div>
             </div>
          </div>
        </section>

        {/* Contact Card */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-warm-bg">
           <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-warm-bg rounded-xl text-warm-textDark">
              <Mail size={28} />
            </div>
            <h3 className="text-2xl font-bold text-warm-textDark">联系我们</h3>
          </div>
          <p className="text-warm-textDark/80 mb-4">
            有任何建议、合作意向，或者发现了 Bug？欢迎随时联系我们！
          </p>
          <div className="flex flex-col gap-2">
            <a href="mailto:contact@warmbites.com" className="flex items-center gap-2 text-warm-primary hover:underline font-medium">
              m19893539969@163.com
            </a>
            <span className="text-warm-textLight">
              地址：江苏省南京市南京大学鼓楼校区
            </span>
          </div>
        </section>

      </main>

      
    </div>
  );
};

export default AboutPage;