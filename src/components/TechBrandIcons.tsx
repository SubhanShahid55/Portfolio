import React from 'react';

interface TechIconProps {
  size?: number;
  className?: string;
  color?: string;
}

// 1. React (Official Cyan Atomic Structure)
export const ReactIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="-11.5 -10.23174 23 20.46348"
    fill="currentColor"
    className={className}
  >
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

// 2. Next.js (Official N Mark)
export const NextjsIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 180 180"
    fill="none"
    className={className}
  >
    <mask
      id="mask0_next"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="180"
      height="180"
    >
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#mask0_next)">
      <circle cx="90" cy="90" r="90" fill="#000000" stroke="#333333" strokeWidth="6" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="url(#paint0_linear_next)"
      />
      <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_next)" />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_next"
        x1="109"
        y1="116.5"
        x2="144.5"
        y2="160.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_next"
        x1="121"
        y1="54"
        x2="120.799"
        y2="106.875"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// 3. TypeScript (Official Blue TS Badge)
export const TypeScriptIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 128 128"
    fill="none"
    className={className}
  >
    <rect width="128" height="128" rx="16" fill="#3178C6" />
    <path
      d="M48.2 56.4H36.7V94.5H26.3V56.4H14.8V47.5H48.2V56.4ZM75.6 70.3C75.6 63.8 70.8 59.4 63.2 59.4C55.4 59.4 50.8 63.6 50.8 70.4C50.8 79.1 57.6 82.5 65.5 85.5C70.9 87.5 73.4 89.8 73.4 93.3C73.4 97.4 69.8 100.2 64.6 100.2C58.3 100.2 53.8 96.5 53.4 90.7H43.1C43.7 102 52.3 109 64.6 109C76.4 109 83.9 102.5 83.9 93.4C83.9 84.7 78.4 81 69.9 77.8C64.9 75.9 61.3 73.8 61.3 69.9C61.3 66.5 64.4 64.2 68.6 64.2C73.5 64.2 76.7 66.8 77.2 71.3H87.1C86.7 61.5 79.8 55.4 68.6 55.4C57.1 55.4 50.8 61.9 50.8 70.3H75.6Z"
      transform="translate(16, 2) scale(0.9)"
      fill="#FFFFFF"
    />
  </svg>
);

// 4. JavaScript (Official Yellow JS Badge)
export const JavaScriptIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 128 128"
    fill="none"
    className={className}
  >
    <rect width="128" height="128" rx="16" fill="#F7DF1E" />
    <path
      d="M67.312 103.957c11.533 0 19.582-5.719 19.582-18.42V42.062h-13.62v43.475c0 6.643-3.662 9.547-8.293 9.547-3.926 0-7.078-2.072-8.916-5.875l-10.457 6.4c3.926 8.359 11.238 12.348 21.704 12.348zm43.805-.285c13.754 0 22.844-6.863 22.844-18.42 0-11.832-7.234-16.734-19.45-21.848-8.156-3.414-11.66-5.836-11.66-10.637 0-4.484 3.496-7.828 9.387-7.828 5.762 0 9.77 2.457 12.57 7.742l11.082-7.145c-4.992-9.43-13.152-13.566-23.652-13.566-14.07 0-23.012 8.359-23.012 18.664 0 11.832 7.617 16.926 19.785 21.984 8.742 3.707 11.328 6.422 11.328 11.176 0 5.438-4.707 8.68-10.973 8.68-7.867 0-12.793-4.148-15.828-10.512l-11.258 6.551c4.543 9.945 14.152 14.811 25.266 14.811z"
      transform="translate(-14, 2) scale(0.95)"
      fill="#000000"
    />
  </svg>
);

// 5. Tailwind CSS (Official Cyan Wind Wave)
export const TailwindIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
  >
    <path
      d="M24 10C16 10 12 16 18 22C19.5 20.5 21.5 19.5 24 19.5C29 19.5 32 23 30.5 28C29 33 24 35 18 35C14.5 35 12.5 33.5 11 31.5C11 31.5 14 31 15 28C13 28 11 26 11 23C11 16 17 10 24 10Z"
      fill="#38BDF8"
      transform="scale(0.8) translate(3, 4)"
    />
    <path
      d="M37 19C29 19 25 25 31 31C32.5 29.5 34.5 28.5 37 28.5C42 28.5 45 32 43.5 37C42 42 37 44 31 44C27.5 44 25.5 42.5 24 40.5C24 40.5 27 40 28 37C26 37 24 35 24 32C24 25 30 19 37 19Z"
      fill="#06B6D4"
      transform="scale(0.8) translate(3, 4)"
    />
  </svg>
);

// 6. Node.js (Official Hexagonal JS)
export const NodejsIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 128 128"
    fill="none"
    className={className}
  >
    <path
      d="M64 10.5L110.5 37.3V90.7L64 117.5L17.5 90.7V37.3L64 10.5Z"
      fill="#339933"
    />
    <path
      d="M64 14.5L107 39.3V88.7L64 113.5L21 88.7V39.3L64 14.5Z"
      fill="#026E00"
    />
    <path
      d="M52 46H42V82H52V46ZM76 46H66V68C66 74 70 76 76 76C82 76 86 74 86 68V46H76V66C76 68 75 69 74 69C73 69 72 68 72 66V46Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 7. Express.js (Official Minimal Ex Logo)
export const ExpressIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="12" fill="#18181B" stroke="#3F3F46" strokeWidth="2" />
    <text
      x="50%"
      y="55%"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#FFFFFF"
      fontSize="24"
      fontWeight="900"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      ex
    </text>
  </svg>
);

// 8. Python (Official Interlocking Snakes)
export const PythonIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 110 110"
    fill="none"
    className={className}
  >
    <path
      d="M54.5 5.5C28.2 5.5 29.8 16.9 29.8 16.9L29.9 28.7H55.4V32.3H19.7C19.7 32.3 5.5 30.7 5.5 56.9C5.5 83.1 17.8 81.7 17.8 81.7H25.1V70.2C25.1 70.2 24.6 56.4 38.6 56.4H64.2C64.2 56.4 76.5 56.7 76.5 44.7V17.7C76.5 17.7 78.4 5.5 54.5 5.5ZM41.8 15.3C44.7 15.3 47 17.6 47 20.5C47 23.4 44.7 25.7 41.8 25.7C38.9 25.7 36.6 23.4 36.6 20.5C36.6 17.6 38.9 15.3 41.8 15.3Z"
      fill="#3776AB"
    />
    <path
      d="M55.5 104.5C81.8 104.5 80.2 93.1 80.2 93.1L80.1 81.3H54.6V77.7H90.3C90.3 77.7 104.5 79.3 104.5 53.1C104.5 26.9 92.2 28.3 92.2 28.3H84.9V39.8C84.9 39.8 85.4 53.6 71.4 53.6H45.8C45.8 53.6 33.5 53.3 33.5 65.3V92.3C33.5 92.3 31.6 104.5 55.5 104.5ZM68.2 94.7C65.3 94.7 63 92.4 63 89.5C63 86.6 65.3 84.3 68.2 84.3C71.1 84.3 73.4 86.6 73.4 89.5C73.4 92.4 71.1 94.7 68.2 94.7Z"
      fill="#FFD43B"
    />
  </svg>
);

// 9. REST APIs (Network Cloud Connect)
export const RestApiIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="14" fill="#0E7490" />
    <path
      d="M16 32H48M32 16V48M22 22L42 42M42 22L22 42"
      stroke="#67E8F9"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="32" cy="32" r="7" fill="#083344" stroke="#A5F3FC" strokeWidth="2.5" />
    <circle cx="16" cy="32" r="4" fill="#22D3EE" />
    <circle cx="48" cy="32" r="4" fill="#22D3EE" />
    <circle cx="32" cy="16" r="4" fill="#22D3EE" />
    <circle cx="32" cy="48" r="4" fill="#22D3EE" />
  </svg>
);

// 10. MongoDB (Official Leaf)
export const MongoDbIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <path
      d="M32 4C32 4 16 18 16 35C16 46 23.5 56 32 60C40.5 56 48 46 48 35C48 18 32 4 32 4Z"
      fill="#47A248"
    />
    <path
      d="M32 4C32 4 30 18 30 35C30 46 31 56 32 60C33 56 34 46 34 35C34 18 32 4 32 4Z"
      fill="#3FA037"
    />
    <path
      d="M32 10V54"
      stroke="#135212"
      strokeWidth="1.5"
    />
  </svg>
);

// 11. PostgreSQL (Official Elephant / PG)
export const PostgresIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="14" fill="#336791" />
    <path
      d="M34 14C23 14 17 22 17 31C17 40 22 45 28 47V53C28 53 23 52 20 48C20 48 18 56 28 56C36 56 39 48 39 45C42 45 47 43 47 36C47 28 42 14 34 14ZM30 25C32 25 33 27 33 29C33 31 32 32 30 32C28 32 27 31 27 29C27 27 28 25 30 25Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 12. MySQL (Official Dolphin / DB)
export const MySqlIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="14" fill="#00758F" />
    <path
      d="M45 22C42 17 35 15 28 17C21 19 16 25 15 33C14 41 18 47 26 48C34 49 42 45 46 38C48 34 49 28 45 22ZM28 41C22 41 19 37 20 32C21 27 25 24 30 24C35 24 38 27 38 32C37 37 33 41 28 41Z"
      fill="#F29111"
    />
    <path
      d="M38 18C44 21 47 27 46 34"
      stroke="#FFFFFF"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// 13. Docker (Official Blue Whale & Containers)
export const DockerIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="14" fill="#1D63ED" />
    {/* Containers */}
    <rect x="18" y="24" width="5" height="5" fill="#FFFFFF" />
    <rect x="25" y="24" width="5" height="5" fill="#FFFFFF" />
    <rect x="32" y="24" width="5" height="5" fill="#FFFFFF" />
    <rect x="25" y="17" width="5" height="5" fill="#FFFFFF" />
    <rect x="32" y="17" width="5" height="5" fill="#FFFFFF" />
    <rect x="39" y="24" width="5" height="5" fill="#FFFFFF" />
    {/* Whale Body */}
    <path
      d="M50 31C48 30 46 31 45 32C41 31 34 31 29 34C24 34 16 35 14 41C16 46 22 49 32 49C44 49 51 43 54 36C54 34 52 32 50 31ZM20 42C19 42 18 41 18 40C18 39 19 38 20 38C21 38 22 39 22 40C22 41 21 42 20 42Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 14. Git (Official Orange Branch Diamond)
export const GitIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="14" fill="#F05032" />
    <path
      d="M48 28.5L35.5 16C34.5 15 33 15 32 16L29 19L33.5 23.5C34.5 23 36 23.5 37 24.5C38 25.5 38 27 37.5 28L42 32.5C43 32 44.5 32.5 45.5 33.5C46.5 34.5 46.5 36.5 45.5 37.5C44.5 38.5 42.5 38.5 41.5 37.5C40.5 36.5 40.5 35 41 34L36.8 29.8L30.5 36.1C31 37 30.8 38.2 30 39C29 40 27.5 40 26.5 39C25.5 38 25.5 36.5 26.5 35.5C27.2 34.8 28.2 34.5 29.2 34.8L35.5 28.5C35.2 27.8 35.3 27 35.8 26.3L31.3 21.8L16 37C15 38 15 39.5 16 40.5L28.5 53C29.5 54 31 54 32 53L48 37C49 36 49 34.5 48 33.5L48 28.5Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 15. GitHub (Official Octocat Mark)
export const GitHubIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

// 16. Postman (Official Astronaut Orange Icon)
export const PostmanIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="14" fill="#FF6C37" />
    <path
      d="M32 14C22 14 14 22 14 32C14 42 22 50 32 50C42 50 50 42 50 32C50 22 42 14 32 14ZM38 26L29 38L24 33L38 26Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 17. Vercel (Official Triangle)
export const VercelIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="14" fill="#000000" stroke="#333333" strokeWidth="2" />
    <path d="M32 18L48 46H16L32 18Z" fill="#FFFFFF" />
  </svg>
);

// 18. Render (Official Cloud R mark)
export const RenderIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="14" fill="#46E3B7" />
    <path
      d="M20 18H36C42 18 46 22 46 28C46 33 42 37 37 38L47 48H38L29 38H28V48H20V18ZM28 25V31H35C38 31 39 30 39 28C39 26 38 25 35 25H28Z"
      fill="#141923"
    />
  </svg>
);

// 19. Figma (Official Multi-Color 5 Shapes)
export const FigmaIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 38 57"
    fill="none"
    className={className}
  >
    <path
      d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
      fill="#1ABCFE"
    />
    <path
      d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
      fill="#0ACF83"
    />
    <path
      d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
      fill="#FF7262"
    />
    <path
      d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
      fill="#F24E1E"
    />
    <path
      d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
      fill="#A259FF"
    />
  </svg>
);

// 20. Photoshop (Official Ps Badge)
export const PhotoshopIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <rect width="64" height="64" rx="14" fill="#001E36" stroke="#31A8FF" strokeWidth="2" />
    <text
      x="38%"
      y="55%"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#31A8FF"
      fontSize="22"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      P
    </text>
    <text
      x="62%"
      y="55%"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#31A8FF"
      fontSize="22"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      s
    </text>
  </svg>
);

// 21. HTML5 (Official Orange Shield 5)
export const Html5Icon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <path d="M12 8L16 52L32 57L48 52L52 8H12Z" fill="#E34F26" />
    <path d="M32 12V53.5L44.5 49.5L48 12H32Z" fill="#EF652A" />
    <path
      d="M20 20H44L43 27H28L28.5 34H42.5L41.5 44.5L32 47.5L22.5 44.5L22 39H27.5L27.8 41.5L32 42.5L36.2 41.5L36.6 37H21L20 20Z"
      fill="#FFFFFF"
    />
  </svg>
);

// 22. CSS3 (Official Blue Shield 3)
export const Css3Icon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    className={className}
  >
    <path d="M12 8L16 52L32 57L48 52L52 8H12Z" fill="#1572B6" />
    <path d="M32 12V53.5L44.5 49.5L48 12H32Z" fill="#33A9DC" />
    <path
      d="M20 20H44L43.5 25H28L28.5 31H43L41.5 44.5L32 47.5L22.5 44.5L22 39H27.5L27.8 41.5L32 42.5L36.2 41.5L36.8 35H21L20 20Z"
      fill="#FFFFFF"
    />
  </svg>
);

// Canva (Accurate brand mark — thick rounded-cap 'C' arc with official purple→teal gradient)
export const CanvaIcon: React.FC<TechIconProps> = ({ size = 20, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="canva-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7D2AE8" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#00C4CC" />
      </linearGradient>
    </defs>
    {/* Outer thick arc: the real Canva 'C' — arc from ~35° to ~325° (leaving a small gap on the right) */}
    {/*
      Centre: 50,50  Outer r=46  Inner r=28
      Gap angle: ±32° from 0° (right side)
      Arc start (outer, top-gap): cos(32°)=0.848, sin(32°)=-0.530 → 50+46*0.848, 50-46*0.530 = 89.0, 25.6
      Arc end   (outer, bot-gap): 89.0, 74.4
      Arc start (inner, bot-gap): 50+28*0.848, 50+28*0.530 = 73.7, 64.8
      Arc end   (inner, top-gap): 73.7, 35.2
    */}
    <path
      d="
        M 89.0 25.6
        A 46 46 0 1 0 89.0 74.4
        L 73.7 64.8
        A 28 28 0 1 1 73.7 35.2
        Z
      "
      fill="url(#canva-grad)"
    />
    {/* Rounded end-caps on the gap tips */}
    <circle cx="89.0" cy="25.6" r="9" fill="url(#canva-grad)" />
    <circle cx="89.0" cy="74.4" r="9" fill="url(#canva-grad)" />
  </svg>
);

// Master Map of Tech Names to Authentic Brand SVG Icons
export const BRAND_ICON_MAP: Record<string, React.FC<TechIconProps>> = {
  'React': ReactIcon,
  'Next.js': NextjsIcon,
  'TypeScript': TypeScriptIcon,
  'JavaScript': JavaScriptIcon,
  'Tailwind CSS': TailwindIcon,
  'Tailwind': TailwindIcon,
  'HTML5': Html5Icon,
  'CSS3': Css3Icon,
  'Node.js': NodejsIcon,
  'Express.js': ExpressIcon,
  'Express': ExpressIcon,
  'Python': PythonIcon,
  'REST APIs': RestApiIcon,
  'RESTful APIs': RestApiIcon,
  'MongoDB': MongoDbIcon,
  'PostgreSQL': PostgresIcon,
  'MySQL': MySqlIcon,
  'Docker': DockerIcon,
  'Git': GitIcon,
  'GitHub': GitHubIcon,
  'Git & GitHub': GitIcon,
  'Postman': PostmanIcon,
  'Vercel': VercelIcon,
  'Render': RenderIcon,
  'Vercel & Render': VercelIcon,
  'Figma': FigmaIcon,
  'Canva': CanvaIcon,
  'Photoshop': PhotoshopIcon,
};

export const getTechBrandIcon = (name: string): React.FC<TechIconProps> => {
  return BRAND_ICON_MAP[name] || ReactIcon;
};

export default BRAND_ICON_MAP;
