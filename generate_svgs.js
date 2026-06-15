const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Generate Logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="50%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#60a5fa" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="200" height="200" rx="40" fill="url(#logoGrad)" />
  <circle cx="100" cy="90" r="50" fill="none" stroke="url(#accentGrad)" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
  <!-- Winged Shoe Icon -->
  <g transform="translate(10, 0)">
    <!-- Wing Back -->
    <path d="M 60,85 C 45,70 50,55 75,55 C 70,68 75,78 90,80" fill="none" stroke="url(#accentGrad)" stroke-width="3" stroke-linecap="round"/>
    <path d="M 50,95 C 35,80 40,65 65,65 C 60,78 65,88 80,90" fill="none" stroke="url(#accentGrad)" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Shoe Silhouette -->
    <path d="M 85,80 C 95,75 105,75 115,85 C 120,90 135,93 145,95 C 150,96 153,99 150,103 C 145,108 130,110 110,110 C 95,110 88,105 85,95 Z" fill="url(#accentGrad)" filter="url(#glow)"/>
    <path d="M 88,113 L 145,113 C 148,113 148,115 145,116 L 90,116 C 87,116 87,113 88,113 Z" fill="#ffffff" opacity="0.9"/>
  </g>
  <!-- Text -->
  <text x="100" y="165" font-family="'Outfit', 'Inter', sans-serif" font-weight="900" font-size="20" fill="#ffffff" letter-spacing="3" text-anchor="middle">SOLE<tspan fill="#38bdf8">VIBE</tspan></text>
</svg>`;

fs.writeFileSync(path.join(outputDir, 'logo.svg'), logoSvg);

// 2. Shoe SVG Generator Helper
function generateShoeSVG(type, colors) {
  const { primary, secondary, accent, sole, bgStart, bgEnd } = colors;

  // Render different silhouettes based on type
  if (type === 'casual') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgStart}" />
          <stop offset="100%" stop-color="${bgEnd}" />
        </linearGradient>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${adjustColor(primary, -30)}" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="8" flood-opacity="0.3" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#bgGrad)" />
      
      <!-- Ground Shadow -->
      <ellipse cx="200" cy="235" rx="130" ry="12" fill="#000000" opacity="0.25" filter="blur(4px)" />

      <!-- Shoe Group -->
      <g filter="url(#shadow)" transform="translate(10, 15)">
        <!-- Back collar / heel pull tab -->
        <path d="M 100,105 Q 92,90 98,85 Q 102,82 106,92 Z" fill="${accent}" />
        
        <!-- Inner shoe / tongue -->
        <path d="M 125,100 Q 155,95 185,130 L 195,130 Q 155,80 120,95 Z" fill="#222222" opacity="0.8" />
        
        <!-- Main Upper -->
        <path d="M 100,105 
                 C 90,130 95,190 120,200 
                 C 150,200 240,200 300,200 
                 C 320,200 330,190 325,175 
                 C 320,160 305,145 280,140 
                 C 250,135 220,120 185,115
                 C 165,110 145,102 125,100
                 C 112,100 105,102 100,105 Z" fill="url(#primaryGrad)" />
                 
        <!-- Suede/Leather Overlays -->
        <path d="M 100,105 C 92,125 96,160 115,170 C 130,150 140,110 125,100 Z" fill="${secondary}" opacity="0.9" />
        <!-- Toe cap -->
        <path d="M 285,142 C 305,148 322,162 325,175 C 322,185 310,195 290,195 Q 280,170 285,142 Z" fill="${secondary}" />
        
        <!-- Side design accent / swoosh-like sweep -->
        <path d="M 130,165 Q 190,160 250,145 Q 190,180 135,178 Z" fill="${accent}" />

        <!-- Laces -->
        <path d="M 155,122 L 175,135 M 165,112 L 188,125 M 175,105 L 198,116" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.9" />
        
        <!-- Midsole -->
        <path d="M 105,195 
                 C 120,195 280,195 305,195 
                 Q 318,195 322,190
                 L 325,197
                 Q 322,207 305,207 
                 L 108,207 
                 Q 100,202 105,195 Z" fill="${sole}" />
                 
        <!-- Outsole (Bottom rubber) -->
        <path d="M 110,207 L 305,207 Q 312,207 312,212 L 115,212 Z" fill="#111111" opacity="0.4" />
      </g>
    </svg>`;
  } else if (type === 'running') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgStart}" />
          <stop offset="100%" stop-color="${bgEnd}" />
        </linearGradient>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${adjustColor(primary, -30)}" />
        </linearGradient>
        <linearGradient id="soleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${sole}" />
          <stop offset="100%" stop-color="${adjustColor(sole, 20)}" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="8" flood-opacity="0.35" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#bgGrad)" />
      
      <!-- Ground Shadow -->
      <ellipse cx="200" cy="242" rx="140" ry="10" fill="#000000" opacity="0.3" filter="blur(5px)" />

      <!-- Shoe Group -->
      <g filter="url(#shadow)" transform="translate(10, 15)">
        <!-- Heel loop -->
        <path d="M 85,95 Q 75,80 82,75 Q 88,72 90,85 Z" fill="${accent}" />
        
        <!-- Upper Mesh body -->
        <path d="M 90,95 
                 C 80,120 82,185 110,195 
                 C 140,195 250,190 310,185 
                 C 335,183 345,172 340,158 
                 C 330,140 310,125 280,120 
                 C 240,115 200,90 170,88
                 C 145,86 125,88 110,90
                 C 98,92 92,92 90,95 Z" fill="url(#primaryGrad)" />
                 
        <!-- Overlay Panel (Dynamic lines) -->
        <path d="M 115,102 Q 150,105 180,135 T 270,140 Q 200,165 130,170 Z" fill="${secondary}" opacity="0.85" />
        
        <!-- Accent swoosh / wing design -->
        <path d="M 145,130 Q 210,120 270,140 Q 185,150 150,145 Z" fill="${accent}" />

        <!-- Ventilation pattern dots -->
        <circle cx="280" cy="155" r="2" fill="#ffffff" opacity="0.5" />
        <circle cx="290" cy="160" r="2" fill="#ffffff" opacity="0.5" />
        <circle cx="300" cy="163" r="2" fill="#ffffff" opacity="0.5" />
        <circle cx="270" cy="158" r="2" fill="#ffffff" opacity="0.5" />
        <circle cx="280" cy="167" r="2" fill="#ffffff" opacity="0.5" />
        
        <!-- Laces -->
        <path d="M 145,108 L 165,120 M 158,98 L 180,110 M 172,90 L 195,100" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.9" />

        <!-- Aerodynamic thick foam midsole -->
        <path d="M 98,192 
                 C 120,192 270,185 315,182 
                 Q 335,180 342,175
                 L 340,185
                 Q 330,195 315,200 
                 L 260,205 
                 Q 200,212 140,212
                 L 100,206
                 Q 90,202 98,192 Z" fill="url(#soleGrad)" />
                 
        <!-- Midsole tech plug / detail -->
        <path d="M 130,200 Q 170,198 210,203 L 205,208 Q 165,203 132,205 Z" fill="${accent}" />
        <path d="M 240,199 Q 260,198 280,200 L 278,204 Q 258,202 240,203 Z" fill="#111111" opacity="0.3" />

        <!-- High-grip outsole -->
        <path d="M 103,205 L 315,198 Q 325,198 322,204 L 260,211 Q 200,218 140,217 Z" fill="#111111" />
      </g>
    </svg>`;
  } else if (type === 'basketball') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgStart}" />
          <stop offset="100%" stop-color="${bgEnd}" />
        </linearGradient>
        <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${adjustColor(primary, -30)}" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="15" stdDeviation="10" flood-opacity="0.4" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#bgGrad)" />
      
      <!-- Ground Shadow -->
      <ellipse cx="200" cy="245" rx="145" ry="12" fill="#000000" opacity="0.35" filter="blur(6px)" />

      <!-- Shoe Group -->
      <g filter="url(#shadow)" transform="translate(10, 10)">
        <!-- High-top Ankle collar cushion -->
        <path d="M 95,115 C 80,80 110,60 135,65 C 150,68 145,95 130,115 Z" fill="${secondary}" />
        
        <!-- Main High-Top Upper Body -->
        <path d="M 100,115 
                 C 85,130 90,195 115,200 
                 C 145,200 250,200 305,200 
                 C 325,200 338,190 335,170 
                 C 330,150 310,130 280,120 
                 C 255,110 215,95 175,90
                 C 150,86 132,100 120,112 
                 Z" fill="url(#primaryGrad)" />
                 
        <!-- Solid supportive overlays -->
        <path d="M 100,115 C 90,135 95,180 118,188 C 135,188 150,140 130,115 Z" fill="#111111" opacity="0.4" />
        <!-- Toe Guard -->
        <path d="M 280,125 C 300,135 328,155 330,172 C 325,185 305,195 285,195 C 275,175 270,145 280,125 Z" fill="${secondary}" opacity="0.9" />

        <!-- Ankle strap / detail -->
        <path d="M 118,80 Q 140,82 155,100 L 145,108 Q 130,92 115,92 Z" fill="${accent}" />
        
        <!-- Dynamic Side Wing Logo/Design -->
        <path d="M 145,155 Q 210,150 260,135 Q 200,175 150,170 Z" fill="${accent}" />
        
        <!-- Air bubble container -->
        <path d="M 125,202 H 165 V 212 H 125 Z" fill="#ffffff" opacity="0.1" />

        <!-- Laces -->
        <path d="M 160,110 L 185,122 M 172,98 L 198,110 M 185,88 L 210,100" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />

        <!-- Solid heavy-duty midsole -->
        <path d="M 105,195 
                 C 120,195 280,196 308,196 
                 Q 322,196 328,190
                 L 332,198
                 Q 325,210 308,212 
                 L 110,212 
                 Q 98,205 105,195 Z" fill="${sole}" />
                 
        <!-- Outsole pattern -->
        <path d="M 112,212 L 308,212 Q 315,212 315,217 L 115,217 Z" fill="#222222" />
      </g>
    </svg>`;
  }
}

// 3. Accessories SVG Generator Helper
function generateAccessorySVG(item, colors) {
  const { primary, secondary, accent, bgStart, bgEnd } = colors;
  
  if (item === 'socks') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgStart}" />
          <stop offset="100%" stop-color="${bgEnd}" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="6" flood-opacity="0.3" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#bgGrad)" />
      
      <g filter="url(#shadow)" transform="translate(40, 20)">
        <!-- Sock 1 (Behind) -->
        <path d="M 140,60 L 180,60 L 180,160 L 230,200 L 210,225 L 140,170 Z" fill="#dddddd" opacity="0.6"/>
        <path d="M 140,75 H 180" stroke="${accent}" stroke-width="4"/>
        <path d="M 140,85 H 180" stroke="${primary}" stroke-width="4"/>

        <!-- Sock 2 (Main Front) -->
        <g transform="translate(30, 20)">
          <!-- Main Body -->
          <path d="M 140,60 
                   L 180,60 
                   C 185,120 185,150 180,165 
                   L 235,210 
                   C 245,218 240,230 225,230 
                   L 205,230 
                   L 145,180 
                   C 138,160 138,120 140,60 Z" fill="#ffffff" />
          <!-- Heel cushion overlay -->
          <path d="M 142,165 C 145,178 155,182 155,182 L 145,180 Z" fill="${secondary}" opacity="0.3"/>
          <!-- Toe cushion overlay -->
          <path d="M 235,210 C 240,215 238,225 225,230 L 220,220 Z" fill="${secondary}" opacity="0.3"/>
          <!-- Stripes -->
          <path d="M 140,75 H 180" stroke="${accent}" stroke-width="5"/>
          <path d="M 140,87 H 180" stroke="${primary}" stroke-width="5"/>
          <!-- Logo symbol -->
          <circle cx="160" cy="120" r="8" fill="none" stroke="${accent}" stroke-width="2"/>
          <path d="M 156,120 Q 160,118 164,120" stroke="${accent}" stroke-width="2"/>
        </g>
      </g>
    </svg>`;
  } else if (item === 'cleaner') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgStart}" />
          <stop offset="100%" stop-color="${bgEnd}" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="6" flood-opacity="0.3" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#bgGrad)" />
      
      <g filter="url(#shadow)" transform="translate(20, 20)">
        <!-- Wooden Brush -->
        <g transform="translate(60, 140) rotate(-10)">
          <!-- Bristles -->
          <rect x="10" y="35" width="130" height="25" fill="#cda275" rx="2" />
          <line x1="20" y1="35" x2="20" y2="60" stroke="#78350f" stroke-width="2"/>
          <line x1="40" y1="35" x2="40" y2="60" stroke="#78350f" stroke-width="2"/>
          <line x1="60" y1="35" x2="60" y2="60" stroke="#78350f" stroke-width="2"/>
          <line x1="80" y1="35" x2="80" y2="60" stroke="#78350f" stroke-width="2"/>
          <line x1="100" y1="35" x2="100" y2="60" stroke="#78350f" stroke-width="2"/>
          <line x1="120" y1="35" x2="120" y2="60" stroke="#78350f" stroke-width="2"/>
          <!-- Wood base -->
          <rect x="0" y="10" width="150" height="25" fill="#f59e0b" rx="5" stroke="#d97706" stroke-width="2"/>
          <path d="M 20,20 Q 75,15 130,20" stroke="#ffffff" stroke-width="1" opacity="0.3" fill="none"/>
        </g>
        
        <!-- Cleaner Spray Bottle -->
        <g transform="translate(200, 30)">
          <!-- Bottle Body -->
          <rect x="25" y="60" width="70" height="130" rx="15" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
          <!-- Liquid Level Indicator (Translucent blue) -->
          <path d="M 26,110 Q 60,105 94,110 V 175 C 94,183 88,189 80,189 H 40 C 32,189 26,183 26,175 Z" fill="${accent}" opacity="0.25"/>
          <!-- Label -->
          <rect x="30" y="80" width="60" height="60" rx="5" fill="${primary}"/>
          <text x="60" y="115" font-family="sans-serif" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle">SHOE</text>
          <text x="60" y="130" font-family="sans-serif" font-weight="normal" font-size="9" fill="${accent}" text-anchor="middle">CLEANER</text>
          <!-- Spray nozzle neck -->
          <rect x="45" y="40" width="30" height="20" fill="#cbd5e1"/>
          <path d="M 40,25 C 40,15 50,10 60,10 C 70,10 90,15 90,25 C 90,30 85,40 40,40 Z" fill="#94a3b8"/>
          <!-- Spray nozzle tip -->
          <rect x="85" y="20" width="10" height="8" rx="2" fill="#475569"/>
        </g>
      </g>
    </svg>`;
  } else if (item === 'laces') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgStart}" />
          <stop offset="100%" stop-color="${bgEnd}" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="6" flood-opacity="0.3" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#bgGrad)" />
      
      <g filter="url(#shadow)" transform="translate(50, 40)">
        <!-- Coiled Lace -->
        <path d="M 50,150 
                 C 50,50 180,50 180,110 
                 C 180,170 80,180 80,130
                 C 80,90 150,90 150,120
                 C 150,150 110,150 110,135" 
              fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-dasharray="8 4"/>
              
        <path d="M 120,160 
                 C 120,60 250,60 250,120 
                 C 250,180 150,190 150,140
                 C 150,100 220,100 220,130
                 C 220,160 180,160 180,145" 
              fill="none" stroke="${primary}" stroke-width="8" stroke-linecap="round"/>

        <!-- Metal lock capsules -->
        <g transform="translate(130, 160) rotate(45)">
          <rect x="0" y="0" width="16" height="32" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
          <line x1="0" y1="16" x2="16" y2="16" stroke="#94a3b8" stroke-width="2"/>
        </g>
        
        <g transform="translate(200, 130) rotate(-30)">
          <rect x="0" y="0" width="16" height="32" rx="8" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
          <line x1="0" y1="16" x2="16" y2="16" stroke="#94a3b8" stroke-width="2"/>
        </g>
      </g>
    </svg>`;
  }
}

// 4. Others SVG Generator Helper
function generateOtherSVG(item, colors) {
  const { primary, secondary, accent, bgStart, bgEnd } = colors;

  if (item === 'sandal') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgStart}" />
          <stop offset="100%" stop-color="${bgEnd}" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="6" flood-opacity="0.3" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#bgGrad)" />
      
      <g filter="url(#shadow)" transform="translate(20, 20)">
        <!-- Ground Shadow -->
        <ellipse cx="180" cy="225" rx="120" ry="10" fill="#000000" opacity="0.3" filter="blur(4px)" />

        <!-- Sandal Footbed (Base) -->
        <path d="M 80,185 
                 C 70,140 90,110 120,105 
                 C 150,100 240,95 285,115
                 C 305,125 310,145 300,165
                 C 290,180 260,195 220,195
                 C 170,195 100,200 80,185 Z" fill="${primary}"/>
                 
        <!-- Textures on footbed (Ergonomic ridges) -->
        <path d="M 110,125 Q 115,145 110,165" stroke="#ffffff" stroke-width="2" opacity="0.1" fill="none"/>
        <path d="M 130,120 Q 135,145 130,170" stroke="#ffffff" stroke-width="2" opacity="0.1" fill="none"/>
        <path d="M 150,118 Q 155,145 150,172" stroke="#ffffff" stroke-width="2" opacity="0.1" fill="none"/>
        <path d="M 170,118 Q 175,145 170,172" stroke="#ffffff" stroke-width="2" opacity="0.1" fill="none"/>

        <!-- Sandal Strap -->
        <path d="M 180,105 
                 C 185,85 240,85 255,115 
                 C 260,125 260,165 245,182
                 C 235,160 230,125 180,105 Z" fill="${secondary}"/>
                 
        <!-- Branding on Strap -->
        <circle cx="220" cy="115" r="12" fill="${accent}"/>
        <path d="M 215,115 H 225 M 220,110 V 120" stroke="#ffffff" stroke-width="2"/>
      </g>
    </svg>`;
  } else if (item === 'rainshield') {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgStart}" />
          <stop offset="100%" stop-color="${bgEnd}" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="10" stdDeviation="6" flood-opacity="0.25" />
        </filter>
      </defs>
      <rect width="400" height="300" rx="24" fill="url(#bgGrad)" />
      
      <!-- Raindrops in background -->
      <path d="M 100,50 L 95,65 M 200,40 L 195,55 M 300,60 L 295,75 M 150,100 L 145,115" stroke="${accent}" stroke-width="2" stroke-linecap="round" opacity="0.4"/>

      <g filter="url(#shadow)" transform="translate(20, 20)">
        <!-- Ground Shadow -->
        <ellipse cx="180" cy="225" rx="125" ry="8" fill="#000000" opacity="0.2" filter="blur(4px)" />

        <!-- Translucent bootie shape -->
        <path d="M 90,140 
                 C 80,100 110,80 130,80 
                 L 160,82
                 C 200,95 240,110 280,135
                 C 305,150 310,180 290,195
                 C 270,205 240,205 180,205
                 C 120,205 100,190 90,140 Z" fill="#ffffff" fill-opacity="0.4" stroke="#ffffff" stroke-width="3"/>
                 
        <!-- Elastic zipper/opening border -->
        <path d="M 130,80 L 160,82" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
        
        <!-- Grip tread lines at the bottom -->
        <path d="M 120,200 H 260" stroke="${accent}" stroke-width="4" stroke-dasharray="10 6"/>
        
        <!-- Water droplets rolling off -->
        <path d="M 230,120 Q 235,135 235,140" fill="none" stroke="${accent}" stroke-width="2" stroke-linecap="round"/>
        <circle cx="235" cy="143" r="2" fill="${accent}"/>
      </g>
    </svg>`;
  }
}

// Helper: Adjust color brightness
function adjustColor(col, amt) {
  let usePound = false;
  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }
  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound ? "#" : "") + ((g | (b << 8) | (r << 16)).toString(16)).padStart(6, '0');
}

// 5. Product definitions with themes matching data.js
const products = [
  // Casual
  { file: 'casual_1.svg', type: 'casual', colors: { primary: '#94a3b8', secondary: '#cbd5e1', accent: '#3b82f6', sole: '#f8fafc', bgStart: '#0f172a', bgEnd: '#1e293b' } },
  { file: 'casual_2.svg', type: 'casual', colors: { primary: '#1e3a8a', secondary: '#3b82f6', accent: '#f59e0b', sole: '#ffffff', bgStart: '#111827', bgEnd: '#374151' } },
  { file: 'casual_3.svg', type: 'casual', colors: { primary: '#f8fafc', secondary: '#e2e8f0', accent: '#fbbf24', sole: '#ffffff', bgStart: '#1e1b4b', bgEnd: '#312e81' } },
  { file: 'casual_4.svg', type: 'casual', colors: { primary: '#78350f', secondary: '#b45309', accent: '#10b981', sole: '#d97706', bgStart: '#180828', bgEnd: '#2e1065' } },
  
  // Running
  { file: 'running_1.svg', type: 'running', colors: { primary: '#334155', secondary: '#475569', accent: '#22c55e', sole: '#4ade80', bgStart: '#020617', bgEnd: '#0f172a' } },
  { file: 'running_2.svg', type: 'running', colors: { primary: '#0284c7', secondary: '#38bdf8', accent: '#ffffff', sole: '#e2e8f0', bgStart: '#064e3b', bgEnd: '#047857' } },
  { file: 'running_3.svg', type: 'running', colors: { primary: '#1c1917', secondary: '#44403c', accent: '#f97316', sole: '#ea580c', bgStart: '#3b0764', bgEnd: '#581c87' } },
  { file: 'running_4.svg', type: 'running', colors: { primary: '#dc2626', secondary: '#ef4444', accent: '#000000', sole: '#ffffff', bgStart: '#030712', bgEnd: '#111827' } },
  
  // Basketball
  { file: 'basketball_1.svg', type: 'basketball', colors: { primary: '#991b1b', secondary: '#111111', accent: '#ffffff', sole: '#ffffff', bgStart: '#1e1b4b', bgEnd: '#111827' } },
  { file: 'basketball_2.svg', type: 'basketball', colors: { primary: '#581c87', secondary: '#701a75', accent: '#eab308', sole: '#f8fafc', bgStart: '#022c22', bgEnd: '#065f46' } },
  { file: 'basketball_3.svg', type: 'basketball', colors: { primary: '#111827', secondary: '#1f2937', accent: '#06b6d4', sole: '#0891b2', bgStart: '#0c0a09', bgEnd: '#1c1917' } },
  { file: 'basketball_4.svg', type: 'basketball', colors: { primary: '#e2e8f0', secondary: '#94a3b8', accent: '#3b82f6', sole: '#64748b', bgStart: '#311005', bgEnd: '#431407' } },

  // Accessories
  { file: 'accessory_1.svg', type: 'socks', colors: { primary: '#3b82f6', secondary: '#64748b', accent: '#ef4444', bgStart: '#090d16', bgEnd: '#1e293b' } },
  { file: 'accessory_2.svg', type: 'cleaner', colors: { primary: '#0f172a', secondary: '#d97706', accent: '#06b6d4', bgStart: '#06201a', bgEnd: '#0f172a' } },
  { file: 'accessory_3.svg', type: 'laces', colors: { primary: '#10b981', secondary: '#047857', accent: '#6366f1', bgStart: '#1e1b4b', bgEnd: '#090514' } },

  // Others
  { file: 'other_1.svg', type: 'sandal', colors: { primary: '#18181b', secondary: '#27272a', accent: '#a855f7', bgStart: '#0f051d', bgEnd: '#18181b' } },
  { file: 'other_2.svg', type: 'rainshield', colors: { primary: '#ffffff', secondary: '#38bdf8', accent: '#0284c7', bgStart: '#0b1329', bgEnd: '#111827' } }
];

// Generate all product SVGs
products.forEach(p => {
  let svgContent = '';
  if (['casual', 'running', 'basketball'].includes(p.type)) {
    svgContent = generateShoeSVG(p.type, p.colors);
  } else if (['socks', 'cleaner', 'laces'].includes(p.type)) {
    svgContent = generateAccessorySVG(p.type, p.colors);
  } else if (['sandal', 'rainshield'].includes(p.type)) {
    svgContent = generateOtherSVG(p.type, p.colors);
  }
  
  if (svgContent) {
    fs.writeFileSync(path.join(outputDir, p.file), svgContent);
    console.log(`Generated: ${p.file}`);
  }
});

console.log('All SVGs generated successfully!');
