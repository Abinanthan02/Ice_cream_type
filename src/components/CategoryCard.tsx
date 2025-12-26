import React from 'react';
import { cn } from '@/lib/utils';
import IceCreamIcon from './IceCreamIcon';

interface CategoryCardProps {
  category: number;
  name: string;
  description: string;
  milkSolids: string;
  milkFat: string;
  isActive?: boolean;
  isResult?: boolean;
}

const categoryStyles = {
  1: {
    bg: 'bg-ice-cream',
    border: 'border-amber-200',
    icon: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-800',
  },
  2: {
    bg: 'bg-ice-milk',
    border: 'border-sky-200',
    icon: 'text-sky-600',
    badge: 'bg-sky-100 text-sky-800',
  },
  3: {
    bg: 'bg-lacto-ice',
    border: 'border-purple-200',
    icon: 'text-purple-600',
    badge: 'bg-purple-100 text-purple-800',
  },
  4: {
    bg: 'bg-flavored-ice',
    border: 'border-pink-200',
    icon: 'text-pink-600',
    badge: 'bg-pink-100 text-pink-800',
  },
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  name,
  description,
  milkSolids,
  milkFat,
  isActive = false,
  isResult = false,
}) => {
  const styles = categoryStyles[category as keyof typeof categoryStyles];

  return (
    <div
      className={cn(
        'relative rounded-2xl p-5 transition-all duration-500 category-glow',
        styles.bg,
        styles.border,
        'border-2',
        isActive && 'ring-4 ring-primary/30 scale-[1.02] shadow-glow',
        isResult && 'animate-pulse-glow',
        !isActive && 'opacity-70 hover:opacity-100'
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('flex-shrink-0', isActive && 'float-animation')}>
          <IceCreamIcon 
            className="w-16 h-16" 
            variant={category as 1 | 2 | 3 | 4} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              'px-2 py-0.5 rounded-full text-xs font-semibold',
              styles.badge
            )}>
              {category}
            </span>
            <h3 className="font-display font-bold text-lg text-foreground truncate">
              {name}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 rounded-lg bg-card/60 text-foreground/80">
              Milk Solids: {milkSolids}
            </span>
            <span className="px-2 py-1 rounded-lg bg-card/60 text-foreground/80">
              Milk Fat: {milkFat}
            </span>
          </div>
        </div>
      </div>
      
      {isResult && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <span className="text-primary-foreground text-sm font-bold">✓</span>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
