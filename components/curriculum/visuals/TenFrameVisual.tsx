type TenFrameVisualProps = {
  filled: number;
  label?: string;
};

export function TenFrameVisual({ filled, label = "Desiatkový rámik" }: TenFrameVisualProps) {
  return (
    <div aria-label={label} className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mx-auto grid w-fit grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, index) => {
          const isFilled = index < filled;

          return (
            <span
              aria-hidden="true"
              className={`size-9 rounded-lg border-2 ${
                isFilled ? "border-emerald-500 bg-emerald-500" : "border-sky-300 bg-sky-50"
              }`}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
