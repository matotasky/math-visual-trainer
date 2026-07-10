import { Make10BridgeThrough10Preview } from "@/components/curriculum/Make10BridgeThrough10Preview";
import { PreviewLessonShell } from "@/components/curriculum/PreviewLessonShell";

export default function Make10AndBridgeThrough10PreviewPage() {
  return (
    <PreviewLessonShell
      conceptBadges={["make 10", "rozklad", "prechod cez 10"]}
      lessonNumber="4"
      lessonSubtitle="Učíme sa rozkladať čísla, dopĺňať do 10 a počítať cez desiatku pokojne krok za krokom."
      lessonTitle="Doplnenie do 10 a prechod cez 10"
      parentTip="Dôležité je vidieť rozklad čísla a doplnenie do 10."
      totalLessonsInPath={5}
    >
      <Make10BridgeThrough10Preview
        nextStep={{
          href: "/child/curriculum/addition-subtraction-to-100",
          label: "Pokračovať na ďalšiu lekciu",
          description: "Ďalej si vyskúšaš sčítanie a odčítanie do 100."
        }}
      />
    </PreviewLessonShell>
  );
}
