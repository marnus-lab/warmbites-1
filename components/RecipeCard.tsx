import React from 'react';
import { Clock, Heart } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const getCardHeightByRecipe = (recipe: Recipe) => {
  // 使用recipe.id或其他稳定属性生成高度
  const idNum = parseInt(recipe.id.replace(/\D/g, ''), 10) || 0;
  const heights = [180, 200, 220, 240]; // 预设几个高度
  return heights[idNum % heights.length]; // 根据id选择，确保每次渲染相同
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      className="break-inside-avoid mb-6 cursor-pointer group"
      onClick={() => onClick(recipe)}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ height: `${getCardHeightByRecipe(recipe)}px` }}  // Varied heights for masonry feel
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-warm-textDark text-lg mb-2 line-clamp-1">{recipe.title}</h3>
          
          <div className="flex items-center justify-between text-warm-textLight text-sm">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{recipe.time}</span>
            </div>
            <div className="flex items-center gap-1 text-warm-primary">
              <Heart size={14} fill="currentColor" />
              <span>{recipe.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;