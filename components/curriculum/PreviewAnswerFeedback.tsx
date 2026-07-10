type PreviewAnswerFeedbackProps = {
  message: string;
  tone: "success" | "gentle" | "neutral";
};

const toneClasses = {
  gentle: "border-sky-200 bg-sky-50 text-sky-950",
  neutral: "border-slate-200 bg-slate-50 text-slate-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-950"
} as const;

export function PreviewAnswerFeedback({ message, tone }: PreviewAnswerFeedbackProps) {
  return <p className={`mt-4 rounded-xl border p-4 text-base font-bold leading-7 ${toneClasses[tone]}`}>{message}</p>;
}
