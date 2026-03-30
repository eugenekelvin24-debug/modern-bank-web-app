const Skeleton = ({ className }) => {
  return (
    <div
      className={`relative overflow-hidden bg-slate-800/60 ${className}`}>
      <div className="absolute inset-0 shimmer" />
    </div>
  );
};

export default Skeleton;