export type DragonState =
  | 'idle'
  | 'curious'
  | 'greeting'
  | 'listening'
  | 'thinking'
  | 'answering'
  | 'excited'
  | 'sleeping'
  | 'error'
  | 'reducedMotion';

export interface DragonMascotProps {
  state: DragonState;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  showLabel?: boolean;
  showHalo?: boolean;
  onOpenAssistant?: () => void;
  className?: string;
  altText?: string;
  lookAt?: { x: number; y: number } | null;
}

export type MascotAssetSet = {
  idle: string;
  greeting?: string;
  curious?: string;
  listening?: string;
  thinking?: string;
  answering?: string;
  excited?: string;
  sleeping?: string;
  error?: string;
  avatar: string;
  fallback: string;
};

export const MASCOT_ASSETS = {
  fallback: '/mascot/dragon-fallback.svg',
};


export interface PuppetLayerConfig {
  enableBreathing: boolean;
  enableBlinking: boolean;
  enableGazeTracking: boolean;
  enableWingMovement: boolean;
  enableTailSway: boolean;
  enableJawMovement: boolean;
  enableParticles: boolean;
}

