
import React from 'react';

const ZenBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep Ink Wash Base */}
      <div className="absolute inset-0 bg-[#0c0a09]" />
      
      {/* Subtle Fog/Ink Reveal */}
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: 'radial-gradient(circle at 70% 20%, #1c1917 0%, transparent 50%), radial-gradient(circle at 20% 80%, #1c1917 0%, transparent 50%)',
             filter: 'blur(60px)'
           }}
      />
      
      {/* Parchment/Silk Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] parchment-texture" />
      
      {/* Decorative Silk Borders (Subtle) */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#92400e]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#92400e]/30 to-transparent" />
    </div>
  );
};

export default ZenBackground;
