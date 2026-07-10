import { AdditionSubtractionTo100Preview } from "@/components/curriculum/AdditionSubtractionTo100Preview";
import { PreviewLessonShell } from "@/components/curriculum/PreviewLessonShell";

export default function AdditionSubtractionTo100PreviewPage() {
  return (
    <PreviewLessonShell
      conceptBadges={["desiatky", "jednotky", "do 100"]}
      lessonNumber="5"
      lessonSubtitle="Skúšame si desiatky, jednotky a jednoduché počítanie s dvojcifernými číslami."
      lessonTitle="Sčítanie a odčítanie do 100"
      parentTip="Pomôžte dieťaťu hovoriť o desiatkach a jednotkách."
      totalLessonsInPath={5}
    >
      <AdditionSubtractionTo100Preview
        nextStep={{
          href: "/child/curriculum?previewCompleted=1",
          label: "Späť na učebnú cestu",
          description: "Dokončil/a si aktuálnu ukážkovú cestu."
        }}
      />
    </PreviewLessonShell>
  );
}
