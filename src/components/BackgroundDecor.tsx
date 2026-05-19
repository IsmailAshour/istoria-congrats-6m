export const BackgroundDecor = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -left-24 w-[340px] h-[340px] rounded-full bg-celebration-blue/30 blur-[70px] animate-blob-drift" />
      <div className="absolute -bottom-28 -right-20 w-[300px] h-[300px] rounded-full bg-celebration-purple/30 blur-[70px] animate-blob-drift [animation-direction:reverse]" />
    </div>
  );
};
