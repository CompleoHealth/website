import React from 'react';

export function HeroArcs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg 
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arc Paths - Positioned at edges with 45-degree curves */}
        <defs>
          {/* Top Left Arc - 45 degree curve */}
          <path
            id="topLeftArc"
            d="M 0 100 Q 150 50 200 0"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />
          
          {/* Top Right Arc - 45 degree curve */}
          <path
            id="topRightArc"
            d="M 1000 0 Q 1150 50 1200 100"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />
          
          {/* Bottom Left Arc - 45 degree curve */}
          <path
            id="bottomLeftArc"
            d="M 0 300 Q 150 350 200 400"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
          />
          
          {/* Bottom Right Arc - 45 degree curve */}
          <path
            id="bottomRightArc"
            d="M 1000 400 Q 1150 350 1200 300"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
          />
          
          {/* Additional subtle middle arcs */}
          <path
            id="middleLeftArc"
            d="M 0 200 Q 100 180 150 200"
            fill="none"
            stroke="rgba(0,169,144,0.1)"
            strokeWidth="1"
          />
          
          <path
            id="middleRightArc"
            d="M 1050 200 Q 1150 180 1200 200"
            fill="none"
            stroke="rgba(0,169,144,0.1)"
            strokeWidth="1"
          />
        </defs>
        
        {/* Render the arc paths */}
        <use href="#topLeftArc" />
        <use href="#topRightArc" />
        <use href="#bottomLeftArc" />
        <use href="#bottomRightArc" />
        <use href="#middleLeftArc" />
        <use href="#middleRightArc" />
        
        {/* Animated dots */}
        {/* Dot 1 - Moving along top left arc */}
        <circle r="3" fill="rgba(255,255,255,0.7)">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#topLeftArc" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="6s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Dot 2 - Moving along top right arc */}
        <circle r="2.5" fill="rgba(0,169,144,0.8)">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#topRightArc" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="8s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Dot 3 - Moving along bottom left arc */}
        <circle r="2" fill="rgba(255,255,255,0.6)">
          <animateMotion
            dur="10s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#bottomLeftArc" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Dot 4 - Moving along bottom right arc */}
        <circle r="2.5" fill="rgba(0,169,144,0.7)">
          <animateMotion
            dur="12s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#bottomRightArc" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="12s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Additional dots on middle arcs */}
        <circle r="1.5" fill="rgba(255,255,255,0.5)">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#middleLeftArc" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="7s"
            repeatCount="indefinite"
          />
        </circle>
        
        <circle r="1.5" fill="rgba(0,169,144,0.6)">
          <animateMotion
            dur="9s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#middleRightArc" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="9s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Additional delayed dots for more movement */}
        <circle r="2" fill="rgba(255,255,255,0.4)">
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            rotate="auto"
            begin="3s"
          >
            <mpath href="#topLeftArc" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="6s"
            repeatCount="indefinite"
            begin="3s"
          />
        </circle>
        
        <circle r="2" fill="rgba(0,169,144,0.5)">
          <animateMotion
            dur="8s"
            repeatCount="indefinite"
            rotate="auto"
            begin="4s"
          >
            <mpath href="#topRightArc" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            dur="8s"
            repeatCount="indefinite"
            begin="4s"
          />
        </circle>
      </svg>
    </div>
  );
}