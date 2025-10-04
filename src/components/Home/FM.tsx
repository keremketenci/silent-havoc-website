'use client';

import FlowingMenu from "@/components/FlowingMenu";

const demoItems = [
  {
    link: "#",
    text: "SPONSOR1",
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    link: "#",
    text: "SPONSOR2",
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    link: "#",
    text: "SPONSOR3",
    image: "https://picsum.photos/600/400?random=3",
  },
  {
    link: "#",
    text: "SPONSOR4",
    image: "https://picsum.photos/600/400?random=4",
  },
];

export function FM() {
  return (
    <div className="h-[600px]">
      <FlowingMenu items={demoItems} />
    </div>
  );
}
