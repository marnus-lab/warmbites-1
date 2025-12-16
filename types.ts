export interface Recipe {
  id: string;
  title: string;
  image: string;
  time: string;
  likes: number;
  tags: string[];
  description: string;
  ingredients: string[];
  steps: string[];
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageRoute {
  LANDING = '/',
  EXPLORE = '/explore',
  AI_CHEF = '/ai-chef',
  HELP = '/help',
  ABOUT = '/about'
}