// translations
import { useTranslations } from "next-intl";

// embla carousel
import Autoplay from "embla-carousel-autoplay";

// components ui
import { CardHighlighted } from "@/components/ui/card/CardHighlighted";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";

interface Job {
  title: string;
  description: React.ReactNode;
  content: string;
  footer: React.ReactNode;
}

interface JoinUsCarouselProps {
  jobs: Job[];
}

export function JoinUsCarousel({ jobs }: JoinUsCarouselProps) {
  const t = useTranslations("JoinUs");

  // const plugin = React.useRef(
  //     Autoplay({ delay: 5000, stopOnInteraction: true })
  // )

  return (
    <Carousel
      opts={{
        align: "center",
        loop: false,
      }}
      // plugins={[plugin.current]}
      // onMouseEnter={() => plugin.current.stop()}
      // onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent>
        {jobs.map((job, index) => (
          <CarouselItem key={index}>
            <div className="p-4">
              <CardHighlighted
                cardType="JoinUs"
                cardClass={`bg-card text-white border border-slate-800 p-4`}
                title={job.title}
                titleClass="text-center text-2xl pt-2 px-2"
                description={job.description}
                descriptionClass="flex flex-col items-center px-2"
                content={job.content}
                contentClass="text-center"
                footer={job.footer}
                footerClass="flex justify-center w-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center">
        <CarouselPrevious className="border-slate-800 bg-slate-950 text-white hover:bg-accent hover:text-white mx-1" />
        <CarouselNext className="border-slate-800 bg-slate-950 text-white hover:bg-accent hover:text-white mx-1" />
      </div>
    </Carousel>
  );
}
