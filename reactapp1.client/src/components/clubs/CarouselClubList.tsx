
import { Club } from "@/data/clubData";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import FeaturedClubCard from "./FeaturedClubCard";
import { useCarouselState } from "@/hooks/useCarouselState";

interface CarouselClubListProps {
  title: string;
  clubs: Club[];
}

const CarouselClubList = ({ title, clubs }: CarouselClubListProps) => {
  const { currentIndex, api, setApi } = useCarouselState();

  if (clubs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">Featured</span>
      </div>
      
      <div className="w-full relative">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            {clubs.map((club) => (
              <CarouselItem key={club.id}>
                <FeaturedClubCard club={club} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <CarouselNext className="h-12 w-12 rounded-full bg-party text-white border-none shadow-lg hover:bg-party-dark" />
          </div>
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <CarouselPrevious className="h-12 w-12 rounded-full bg-party text-white border-none shadow-lg hover:bg-party-dark" />
          </div>
        </Carousel>
        
        <div className="flex justify-center gap-1 mt-4">
          {clubs.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === index ? "w-8 bg-party" : "w-3 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselClubList;
