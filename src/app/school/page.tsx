import SchoolVideosClient from "./client";

export const metadata = {
  title: "Esy School — Learn Research Workflows & AI Tools",
  description:
    "Step-by-step tutorials and courses on using Esy's workflow templates and the latest AI tools. Learn to research anything without prompt engineering.",
  keywords:
    "Esy School, workflow tutorials, AI tools, research workflows, Claude, ChatGPT, infographics, academic writing, essay writing",
  openGraph: {
    title: "Esy School — Learn Research Workflows & AI Tools",
    description:
      "Tutorials and courses on using Esy's workflow templates and the latest AI tools.",
    type: "website",
  },
};

export default function Page() {
  return <SchoolVideosClient />;
}
