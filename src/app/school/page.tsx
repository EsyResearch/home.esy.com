import SchoolVideosClient from "./client";

export const metadata = {
  title: "Esy School — Video Tutorials for Every Workflow",
  description:
    "Watch step-by-step tutorials on Esy's workflow templates. Learn to create argumentative essays, research papers, infographics, and more — all in minutes.",
  keywords:
    "Esy workflows, video tutorials, argumentative essay, analytical essay, research paper, infographic, college application essay",
  openGraph: {
    title: "Esy School — Video Tutorials",
    description:
      "Step-by-step video guides for every Esy workflow template.",
    type: "website",
  },
};

export default function Page() {
  return <SchoolVideosClient />;
}
