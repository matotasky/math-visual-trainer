type DotGroupVisualProps = {
  count: number;
  label?: string;
};

export function DotGroupVisual({ count, label }: DotGroupVisualProps) {
  return (
    <div aria-label={label ?? `${count} bodiek`} className="mx-auto grid w-fit grid-cols-3 gap-3">
      {Array.from({ length: count }, (_, index) => (
        <span aria-hidden="true" className="size-9 rounded-full bg-emerald-500 shadow-sm" key={index} />
      ))}
    </div>
  );
}
