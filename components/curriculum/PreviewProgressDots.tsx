type PreviewProgressDotsProps = {
  completedCount: number;
  currentIndex: number;
  totalCount: number;
};

export function PreviewProgressDots({ completedCount, currentIndex, totalCount }: PreviewProgressDotsProps) {
  return (
    <div aria-label={`Krok ${currentIndex + 1} z ${totalCount}. Hotové ${completedCount} z ${totalCount}.`}>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalCount }, (_, index) => {
          const isCurrent = index === currentIndex;
          const isDone = index < completedCount;

          return (
            <span
              aria-hidden="true"
              className={
                isCurrent
                  ? "size-3 rounded-full bg-slate-950 ring-4 ring-sky-200"
                  : isDone
                    ? "size-3 rounded-full bg-emerald-600"
                    : "size-3 rounded-full bg-white ring-1 ring-slate-300"
              }
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
