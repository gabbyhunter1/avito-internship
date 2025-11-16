import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';

const ImageCarousel = ({ images }: { images: string[] | undefined }) => {
  return (
    <Carousel className="md:m-15 w-full max-w-[260px] sm:max-w-[300px] max-h-[200px]">
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index + ' image'}>
            <Card>
              <CardContent className="flex items-center justify-center">
                <img src={image} width={300} height={200} className="w-full rounded-2xl" />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant="secondary" />
      <CarouselNext variant="secondary" />
    </Carousel>
  );
};

export default ImageCarousel;
