import { redirect } from "next/navigation";

// Redirect /essays/visual to /essays
export default function VisualEssaysPage() {
  redirect("/essays");
}

