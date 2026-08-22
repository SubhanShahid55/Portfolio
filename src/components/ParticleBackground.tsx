/**
 * Lightweight CSS dot-grid background.
 * Replaces the heavy canvas particle system for better performance.
 * Respects prefers-reduced-motion via CSS (opacity reduced).
 */
const ParticleBackground = () => {
  return <div className="dot-grid-bg" aria-hidden="true" />;
};

export default ParticleBackground;
