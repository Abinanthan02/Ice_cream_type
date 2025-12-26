import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import CategoryCard from './CategoryCard';
import { cn } from '@/lib/utils';

const categories = [
  {
    id: 1,
    name: 'Ice Cream',
    description: 'Premium frozen dessert with rich, creamy texture and high milk content.',
    milkSolids: '≥15%',
    milkFat: '≥8%',
  },
  {
    id: 2,
    name: 'Ice Milk',
    description: 'Light frozen treat with moderate milk content, lower in fat than ice cream.',
    milkSolids: '≥10%',
    milkFat: '≥3%',
  },
  {
    id: 3,
    name: 'Lacto Ice',
    description: 'Refreshing frozen product with minimal milk solids for a lighter option.',
    milkSolids: '≥3%',
    milkFat: 'Any',
  },
  {
    id: 4,
    name: 'Flavored Ice',
    description: 'Fruity frozen delight with little to no dairy content.',
    milkSolids: '<3%',
    milkFat: 'Any',
  },
];

const sampleTests = [
  { a: 10, b: 8, expected: 1, description: '18% solids, 8% fat → Ice Cream' },
  { a: 1, b: 2, expected: 3, description: '3% solids, 2% fat → Lacto Ice' },
  { a: 0, b: 0, expected: 4, description: '0% solids, 0% fat → Flavored Ice' },
  { a: 7, b: 5, expected: 2, description: '12% solids, 5% fat → Ice Milk' },
];

const classifyIceCream = (a: number, b: number): number => {
  const milkSolids = a + b; // milk solids = milk solids-not-fat + milk fat
  const milkFat = b;

  if (milkSolids >= 15 && milkFat >= 8) return 1; // Ice Cream
  if (milkSolids >= 10 && milkFat >= 3) return 2; // Ice Milk
  if (milkSolids >= 3) return 3; // Lacto Ice
  return 4; // Flavored Ice
};

export const IceCreamClassifier: React.FC = () => {
  const [inputA, setInputA] = useState<string>('');
  const [inputB, setInputB] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);

  const validateAndClassify = useCallback(() => {
    setError('');
    
    const a = parseInt(inputA, 10);
    const b = parseInt(inputB, 10);

    if (isNaN(a) || isNaN(b)) {
      setError('Please enter valid numbers for both values');
      return;
    }

    if (a < 0 || a > 100 || b < 0 || b > 100) {
      setError('Values must be between 0 and 100');
      return;
    }

    if (a + b > 100) {
      setError('Total of A + B cannot exceed 100%');
      return;
    }

    setIsCalculating(true);
    setResult(null);

    // Add a small delay for animation effect
    setTimeout(() => {
      setResult(classifyIceCream(a, b));
      setIsCalculating(false);
    }, 600);
  }, [inputA, inputB]);

  const handleSampleTest = (a: number, b: number) => {
    setInputA(a.toString());
    setInputB(b.toString());
    setError('');
    setResult(null);
  };

  const handleReset = () => {
    setInputA('');
    setInputB('');
    setResult(null);
    setError('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Header */}
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="text-5xl float-animation">🍦</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Snuke Ice Classifier
          </h1>
          <span className="text-5xl float-animation-delayed">🍨</span>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Classify Japanese ice cream products based on milk solids and milk fat content
        </p>
      </header>

      {/* Input Section */}
      <section className="glass-card rounded-3xl p-6 md:p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-display font-semibold text-foreground mb-2">
              A: Milk Solids-Not-Fat (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={inputA}
              onChange={(e) => setInputA(e.target.value)}
              placeholder="Enter value (0-100)"
              className={cn(
                "w-full h-14 px-5 rounded-xl text-lg font-medium",
                "bg-background border-2 border-input",
                "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
                "transition-all duration-300 placeholder:text-muted-foreground/50"
              )}
            />
          </div>
          
          <div>
            <label className="block font-display font-semibold text-foreground mb-2">
              B: Milk Fat (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={inputB}
              onChange={(e) => setInputB(e.target.value)}
              placeholder="Enter value (0-100)"
              className={cn(
                "w-full h-14 px-5 rounded-xl text-lg font-medium",
                "bg-background border-2 border-input",
                "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
                "transition-all duration-300 placeholder:text-muted-foreground/50"
              )}
            />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-slide-up">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button 
            variant="primary" 
            size="lg"
            onClick={validateAndClassify}
            disabled={isCalculating}
            className="flex-1 min-w-[180px]"
          >
            {isCalculating ? (
              <>
                <span className="animate-spin">⏳</span>
                Analyzing...
              </>
            ) : (
              <>
                <span>🔍</span>
                Classify Product
              </>
            )}
          </Button>
          
          <Button 
            variant="frost" 
            size="lg"
            onClick={handleReset}
            className="min-w-[120px]"
          >
            Reset
          </Button>
        </div>

        {/* Sample Tests */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm font-medium text-muted-foreground mb-3">
            Try sample inputs:
          </p>
          <div className="flex flex-wrap gap-2">
            {sampleTests.map((test, idx) => (
              <button
                key={idx}
                onClick={() => handleSampleTest(test.a, test.b)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium",
                  "bg-muted hover:bg-muted/80 text-muted-foreground",
                  "transition-all duration-200 hover:scale-105"
                )}
              >
                A={test.a}, B={test.b}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Result Display */}
      {result !== null && (
        <div className="mb-8 animate-slide-up">
          <div className="glass-card rounded-3xl p-6 text-center">
            <p className="text-muted-foreground mb-2">Classification Result</p>
            <div className="flex items-center justify-center gap-4">
              <span className="text-6xl font-display font-bold text-primary">
                {result}
              </span>
              <div className="text-left">
                <p className="font-display font-bold text-2xl text-foreground">
                  {categories[result - 1].name}
                </p>
                <p className="text-muted-foreground text-sm">
                  Milk Solids: {parseInt(inputA) + parseInt(inputB)}% | Milk Fat: {inputB}%
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <section>
        <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">
          Japanese Ice Cream Categories
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat.id}
              name={cat.name}
              description={cat.description}
              milkSolids={cat.milkSolids}
              milkFat={cat.milkFat}
              isActive={result === cat.id}
              isResult={result === cat.id}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>Based on Japanese ice cream classification standards</p>
      </footer>
    </div>
  );
};

export default IceCreamClassifier;
