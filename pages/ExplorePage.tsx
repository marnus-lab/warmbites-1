import React, { useState, useEffect } from 'react';
import { Search, Sparkles, ChevronRight, HelpCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageRoute, Recipe } from '../types';
import { MOCK_RECIPES, CATEGORIES } from '../constants';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import Masonry from 'react-masonry-css';

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const heroRecipes = MOCK_RECIPES.slice(0, 3);

  // Auto carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroRecipes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroRecipes.length]);

  // Filter logic
  const filteredRecipes = MOCK_RECIPES.filter(recipe => {
    const matchesCategory = selectedCategory === "全部" || recipe.category === selectedCategory || recipe.tags.includes(selectedCategory);
    const matchesSearch = recipe.title.includes(searchQuery) || recipe.tags.some(t => t.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-warm-bg pb-20">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-warm-bg/95 backdrop-blur-md shadow-sm py-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div 
              onClick={() => navigate(PageRoute.LANDING)}
              className="text-2xl font-bold text-warm-textDark cursor-pointer whitespace-nowrap"
          >
            暖食记
          </div>
          
          {/* Mobile Buttons (Help/About/AI) */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => navigate(PageRoute.HELP)}
              className="p-2 text-warm-textLight hover:text-warm-primary transition-colors"
              aria-label="帮助"
            >
              <HelpCircle size={22} />
            </button>
            <button 
              onClick={() => navigate(PageRoute.ABOUT)}
              className="p-2 text-warm-textLight hover:text-warm-primary transition-colors"
              aria-label="关于"
            >
              <Info size={22} />
            </button>
             <button 
              onClick={() => navigate(PageRoute.AI_CHEF)}
              className="bg-warm-secondary p-2 rounded-full text-warm-textDark"
            >
              <Sparkles size={20} />
            </button>
          </div>
        </div>
        
        <div className="flex-1 w-full max-w-lg relative group">
          <input 
            type="text"
            placeholder="搜索你喜欢的口味..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-2 border-transparent focus:border-warm-primary/50 text-warm-textDark rounded-full py-2.5 pl-4 pr-10 outline-none transition-all shadow-sm group-hover:shadow-md"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-textLight" size={20} />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={() => navigate(PageRoute.HELP)}
            className="flex items-center gap-1.5 px-3 py-2 text-warm-textDark font-medium hover:bg-white rounded-lg transition-colors"
          >
            <HelpCircle size={18} />
            <span>帮助</span>
          </button>
          
          <button 
            onClick={() => navigate(PageRoute.ABOUT)}
            className="flex items-center gap-1.5 px-3 py-2 text-warm-textDark font-medium hover:bg-white rounded-lg transition-colors"
          >
            <Info size={18} />
            <span>关于我们</span>
          </button>

          <button 
            onClick={() => navigate(PageRoute.AI_CHEF)}
            className="flex items-center gap-2 bg-gradient-to-r from-warm-secondary to-orange-300 text-warm-textDark px-5 py-2.5 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all ml-2"
          >
            <Sparkles size={18} />
            <span>试试AI帮厨</span>
          </button>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden mt-4 md:mt-6 px-0 md:px-6">
        <div className="relative w-full h-full md:rounded-3xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => setModalRecipe(heroRecipes[currentHeroIndex])}>
          {heroRecipes.map((recipe, index) => (
             <div 
               key={recipe.id}
               className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
             >
               <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-10">
                 <span className="inline-block px-3 py-1 bg-warm-primary text-white text-xs font-bold rounded-lg mb-2 w-fit animate-fade-in-up">
                    今日特推
                 </span>
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">{recipe.title}</h2>
                 <p className="text-white/90 text-sm md:text-lg flex items-center gap-2">
                    {recipe.description.substring(0, 20)}... <ChevronRight size={16} />
                 </p>
               </div>
             </div>
          ))}
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {heroRecipes.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentHeroIndex ? 'bg-white w-6' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="px-4 md:px-8 py-6">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-bold transition-all duration-200 ${
                selectedCategory === cat 
                  ? 'bg-warm-secondary text-warm-textDark shadow-md scale-105' 
                  : 'bg-white text-warm-textLight hover:bg-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Waterfall Grid with Masonry */}
      <section className="px-4 md:px-8">
        <Masonry
            breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
            className="flex -ml-6 w-auto"
            columnClassName="pl-6 bg-clip-padding"
        >
          {filteredRecipes.map(recipe => (
              <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={setModalRecipe}
              />
          ))}
          {filteredRecipes.length === 0 && (
              <div className="text-center py-20 text-warm-textLight col-span-full">
                <p>没有找到相关菜谱，试着换个口味？😋</p>
              </div>
          )}
        </Masonry>
      </section>


      {/* Modal */}
      {modalRecipe && (
        <RecipeModal recipe={modalRecipe} onClose={() => setModalRecipe(null)} />
      )}
    </div>
  );
};

export default ExplorePage;