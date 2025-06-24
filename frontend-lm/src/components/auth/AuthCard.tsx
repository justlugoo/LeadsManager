import React, { useState, useEffect } from 'react';
import { Card } from 'components/ui/Card';
import { LoginForm } from 'components/auth/LoginForm';
import { RegisterForm } from 'components/auth/RegisterForm';

const SLIDE_DURATION = 300; // ms

const getSlideClasses = (isCurrentForm: boolean, isAnimating: boolean, direction: string) => {
  const base = "absolute inset-0 flex items-center justify-center w-full h-full transition-transform duration-300";
  if (isCurrentForm && !isAnimating) return `${base} translate-x-0 z-10`;
  if (isCurrentForm && isAnimating && direction === 'left') return `${base} -translate-x-full z-0`;
  if (isCurrentForm && isAnimating && direction === 'right') return `${base} translate-x-full z-0`;
  if (!isCurrentForm && !isAnimating && direction === 'left') return `${base} translate-x-full z-0`;
  if (!isCurrentForm && !isAnimating && direction === 'right') return `${base} -translate-x-full z-0`;
  return base;
};

export const AuthCard: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setIsAnimating(true);
    setSlideDirection(isLogin ? 'left' : 'right');
    setTimeout(() => {
      setIsLogin((prev) => !prev);
      setIsAnimating(false);
    }, SLIDE_DURATION);
  };

  return (
    <div className={`flex min-h-screen items-center justify-center bg-dark-900 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <Card className={`relative w-full overflow-hidden shadow-2xl transition-all duration-300 ${isAnimating ? 'pointer-events-none' : ''} ${isLogin ? 'max-w-md' : 'max-w-lg'}`}>
        <div className={`relative transition-all duration-300 ${isLogin ? 'h-[420px]' : 'h-[520px]'}`}>
          {/* Overlay de loading durante animación */}
          {isAnimating && <div className="absolute inset-0 bg-dark-800/50 z-20 transition-opacity duration-300" />}
          {/* LoginForm Slide */}
          <div className={getSlideClasses(isLogin, isAnimating, slideDirection)}>
            <LoginForm onToggle={handleToggle} isVisible={isLogin} />
          </div>
          {/* RegisterForm Slide */}
          <div className={getSlideClasses(!isLogin, isAnimating, slideDirection)}>
            <RegisterForm onToggle={handleToggle} isVisible={!isLogin} />
          </div>
        </div>
      </Card>
    </div>
  );
}; 