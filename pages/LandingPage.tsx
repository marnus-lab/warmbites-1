import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageRoute } from '../types';

const Bubble: React.FC<{ size: number; top: string; left: string; delay: string; img: string }> = ({ size, top, left, delay, img }) => (
  <div 
    className="absolute rounded-full overflow-hidden shadow-xl animate-float opacity-80 hover:opacity-100 transition-opacity duration-300 pointer-events-none md:pointer-events-auto"
    style={{
      width: size,
      height: size,
      top,
      left,
      animationDelay: delay,
    }}
  >
    <img src={img} alt="Food" className="w-full h-full object-cover" />
  </div>
);

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const bubbleImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300&q=80',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=80',
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=300&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&q=80'
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-warm-bg flex flex-col items-center justify-center">
      
      {/* Floating Bubbles Background */}
      <div className="absolute inset-0 z-0">
        <Bubble size={120} top="10%" left="15%" delay="0s" img={bubbleImages[0]} />
        <Bubble size={180} top="20%" left="75%" delay="1.5s" img={bubbleImages[1]} />
        <Bubble size={90} top="60%" left="10%" delay="2s" img={bubbleImages[2]} />
        <Bubble size={150} top="70%" left="60%" delay="0.5s" img={bubbleImages[3]} />
        <Bubble size={110} top="15%" left="45%" delay="3s" img={bubbleImages[4]} />
        <Bubble size={130} top="80%" left="30%" delay="1.2s" img={bubbleImages[5]} />
        <Bubble size={100} top="40%" left="85%" delay="2.5s" img={bubbleImages[6]} />
        <Bubble size={160} top="45%" left="5%" delay="4s" img={bubbleImages[7]} />
      </div>

      {/* Central Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-bold text-warm-primary mb-4 tracking-tight drop-shadow-sm">
          暖食记
        </h1>
        <p className="text-xl md:text-2xl text-warm-textLight mb-12 font-medium tracking-wide">
          每一餐，都是对生活的致敬
        </p>
        
        <button 
          onClick={() => navigate(PageRoute.EXPLORE)}
          className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-warm-primary rounded-full hover:bg-red-500 hover:scale-105 shadow-lg hover:shadow-warm-primary/40 focus:outline-none focus:ring-4 focus:ring-warm-primary/30"
        >
          <span>开启美味之旅</span>
          <svg 
            className="w-6 h-6 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;