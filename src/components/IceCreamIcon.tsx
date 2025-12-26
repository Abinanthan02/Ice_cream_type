import React from 'react';

interface IceCreamIconProps {
  className?: string;
  variant?: 1 | 2 | 3 | 4;
}

const colorVariants = {
  1: { cone: '#F5E6D3', scoop1: '#FFF9E6', scoop2: '#FFFBF0', drip: '#FFF4D9' },
  2: { cone: '#F5E6D3', scoop1: '#E8F4F8', scoop2: '#D4EDF5', drip: '#C5E6F0' },
  3: { cone: '#F5E6D3', scoop1: '#F0E6F5', scoop2: '#E6D9F0', drip: '#DBC9EB' },
  4: { cone: '#F5E6D3', scoop1: '#FFE4E8', scoop2: '#FFD4DC', drip: '#FFC4D0' },
};

export const IceCreamIcon: React.FC<IceCreamIconProps> = ({ className = '', variant = 1 }) => {
  const colors = colorVariants[variant];
  
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cone */}
      <path
        d="M22 32 L32 58 L42 32 Z"
        fill={colors.cone}
        stroke="#D4C4B0"
        strokeWidth="1.5"
      />
      {/* Cone pattern */}
      <path
        d="M25 35 L32 52 M39 35 L32 52 M28 38 L36 38"
        stroke="#D4C4B0"
        strokeWidth="1"
        opacity="0.5"
      />
      
      {/* Bottom scoop */}
      <ellipse
        cx="32"
        cy="28"
        rx="14"
        ry="10"
        fill={colors.scoop1}
        stroke="#E8D4C0"
        strokeWidth="1"
      />
      
      {/* Top scoop */}
      <ellipse
        cx="32"
        cy="16"
        rx="12"
        ry="10"
        fill={colors.scoop2}
        stroke="#E8D4C0"
        strokeWidth="1"
      />
      
      {/* Drips */}
      <path
        d="M24 30 Q23 35 24 37 Q25 39 26 37 Q27 34 26 30"
        fill={colors.drip}
      />
      <path
        d="M38 29 Q37 33 38 35 Q39 37 40 35 Q41 32 40 29"
        fill={colors.drip}
      />
      
      {/* Highlight */}
      <ellipse
        cx="28"
        cy="13"
        rx="3"
        ry="2"
        fill="white"
        opacity="0.6"
      />
    </svg>
  );
};

export default IceCreamIcon;
