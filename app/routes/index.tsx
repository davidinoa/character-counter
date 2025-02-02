import CharacterCounter from "@/components/CharacterCounter";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <CharacterCounter />;
}
