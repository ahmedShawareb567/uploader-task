export const PreviewShimmer = ({className = ""}) => {
  return (
    <div className="flex flex-col gap-y-4">
      <div
        className={`rounded-xl bg-gray-200 w-3/4 h-20 md:h-24 animate-pulse ${className}`}
      ></div>
      <div className="flex gap-x-4">
        <div className="rounded-xl bg-gray-200 w-1/3 h-20 md:h-24 animate-pulse"></div>
        <div className="rounded-xl bg-gray-200 w-2/3 h-20 md:h-24 animate-pulse"></div>
      </div>

      <div className="flex gap-x-4">
        <div className="rounded-xl bg-gray-200 w-2/3 h-20 md:h-24 animate-pulse"></div>
        <div className="rounded-xl bg-gray-200 w-1/3 h-20 md:h-24 animate-pulse"></div>
      </div>

      <div className="rounded-xl bg-gray-200 h-20 md:h-24 animate-pulse"></div>

      <div className="flex gap-x-4">
        <div className="rounded-xl bg-gray-200 w-1/2 h-20 md:h-24 animate-pulse"></div>
        <div className="rounded-xl bg-gray-200 w-1/2 h-20 md:h-24 animate-pulse"></div>
      </div>

      <div className="rounded-xl bg-gray-200 w-1/2 h-20 md:h-24 animate-pulse"></div>
      <div className="rounded-xl bg-gray-200 w-3/4 h-20 md:h-24 animate-pulse"></div>
    </div>
  );
};
