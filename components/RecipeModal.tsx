import React from 'react';
import { X, Clock, Flame, Utensils } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-warm-textDark/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white text-warm-textDark transition-colors shadow-lg"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:hidden">
            <h2 className="text-2xl font-bold text-white">{recipe.title}</h2>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 md:overflow-y-auto">
          <div className="hidden md:block mb-4">
            <h2 className="text-3xl font-bold text-warm-textDark mb-2">{recipe.title}</h2>
            <p className="text-warm-textLight italic">{recipe.description}</p>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="px-3 py-1 bg-warm-bg rounded-lg text-warm-textDark text-sm flex items-center gap-1 font-medium">
              <Clock size={16} className="text-warm-primary" />
              {recipe.time}
            </div>
            {recipe.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-warm-secondary/20 rounded-lg text-warm-textDark text-sm font-medium">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="flex items-center gap-2 text-lg font-bold text-warm-primary mb-4">
              <Utensils size={20} />
              所需食材
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 text-warm-textDark">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-secondary" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-bold text-warm-primary mb-4">
              <Flame size={20} />
              烹饪步骤
            </h3>
            <div className="space-y-6">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-warm-primary text-white flex items-center justify-center font-bold shadow-md">
                    {i + 1}
                  </div>
                  <p className="text-warm-textDark leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;