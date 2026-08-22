const items = [
  'ANALYZE',
  'DESIGN',
  'BUILD',
  'TEST',
  'DEPLOY',
  'IMPROVE',
];

const ProcessMarquee = () => {
  const separator = (
    <span className="mx-4 md:mx-6 text-primary/40 select-none font-mono" aria-hidden="true">
      /
    </span>
  );

  const renderItems = () =>
    items.map((item, i) => (
      <span key={i} className="inline-flex items-center">
        <span className="text-xs md:text-sm font-mono font-semibold tracking-[0.2em] text-muted-foreground/75 hover:text-primary transition-colors select-none">
          {item}
        </span>
        {separator}
      </span>
    ));

  return (
    <div
      className="relative overflow-hidden py-4 border-b border-border/30 bg-background/50 backdrop-blur-sm"
      aria-hidden="true"
      role="presentation"
    >
      <div className="marquee-track" tabIndex={-1}>
        {/* Repeating sequence for smooth infinite marquee */}
        <div className="flex items-center whitespace-nowrap">{renderItems()}</div>
        <div className="flex items-center whitespace-nowrap">{renderItems()}</div>
        <div className="flex items-center whitespace-nowrap">{renderItems()}</div>
        <div className="flex items-center whitespace-nowrap">{renderItems()}</div>
      </div>
    </div>
  );
};

export default ProcessMarquee;
