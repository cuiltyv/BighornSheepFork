import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import image1 from "../../assets/fotonoticiareto.png";

const VideoWall = () => {
  //Video links: 0FfhgYz5dUA // zkLHT3KIApA
  const plugin = React.useRef(
    Autoplay({
      delay: 10000,
      stopAfterInteraction: true,
      resetTimerOnStop: true,
    }),
  );

  const images = [image1, image1, image1, image1, image1];

  return (
    <div className="w-3840px flex h-screen bg-darkWhite">
      <div className="border-blue-500 flex h-full w-1/4 flex-col border">
        <div className="flex h-1/2 items-center justify-center border-b border-black">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="max-h-full max-w-full"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="h-1/2"></div>
      </div>
      <div
        className="relative h-full w-3/4 border "
        style={{ pointerEvents: "none" }}
      >
        <iframe
          src="https://www.youtube.com/embed/0FfhgYz5dUA?autoplay=1&mute=1&loop=1&playlist=0FfhgYz5dUA"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          className="absolute left-0 top-0 h-full w-full"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoWall;
