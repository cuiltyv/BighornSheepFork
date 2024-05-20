import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import image1 from "../../assets/fotonoticiareto.png";
import axios from "../../api/axios";
//import Loading from "../../components/Loading";

const RESERVACIONES_URL = "/reservaciones";
//const RESERVACIONES_URL = "/reservaciones/upcoming";

const VideoWall = () => {
  const images = [image1, image1, image1, image1, image1];
  const [reservations, setReservations] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [sortField, setSortField] = useState("ReservacionID");
  const [sortOrder, setSortOrder] = useState("ASC");

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );

  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(RESERVACIONES_URL);
        setReservations(response.data);
        setIsDataLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setIsDataLoading(false);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const sortReservations = (field) => {
    setSortField((prevField) => {
      const newOrder =
        prevField === field && sortOrder === "ASC" ? "DESC" : "ASC";
      setSortOrder(newOrder);

      setReservations((prevReservations) => {
        return [...prevReservations].sort((a, b) => {
          if (a[field] < b[field]) return newOrder === "ASC" ? -1 : 1;
          if (a[field] > b[field]) return newOrder === "ASC" ? 1 : -1;
          return 0;
        });
      });

      return field;
    });
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;
    let isScrollingDown = true;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer) {
          if (isScrollingDown) {
            if (
              scrollContainer.scrollTop + scrollContainer.clientHeight >=
              scrollContainer.scrollHeight
            ) {
              // Reached the bottom, scroll to the top
              scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
              isScrollingDown = false; // Switch the direction
            } else {
              scrollContainer.scrollBy({ top: 1, behavior: "smooth" });
            }
          } else {
            if (scrollContainer.scrollTop === 0) {
              // Reached the top, scroll to the bottom
              scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: "smooth",
              });
              isScrollingDown = true; // Switch the direction
            } else {
              scrollContainer.scrollBy({ top: -1, behavior: "smooth" });
            }
          }
        }
      }, 50); // Adjust the speed by changing the interval
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("mouseover", () =>
        clearInterval(scrollInterval),
      );
      scrollContainer.addEventListener("mouseleave", startAutoScroll);

      startAutoScroll();
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseover", () =>
          clearInterval(scrollInterval),
        );
        scrollContainer.removeEventListener("mouseleave", startAutoScroll);
      }
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <div className="w-3840px flex h-screen bg-darkWhite">
      <div className="border-blue-500 flex h-full w-1/4 flex-col border">
        <div className="flex items-center justify-between border-b border-black px-4 py-2">
          <span>DREAM LAB</span>
          <span>{currentTime}</span>
        </div>
        <div className="flex items-center justify-center border-b border-black">
          <Carousel opts={{ align: "start" }} className="w-4/5">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <img
                          src={image}
                          alt={`Carousel Image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  onClick={() => sortReservations("ReservacionID")}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                >
                  ID
                </th>
                <th
                  onClick={() => sortReservations("Matricula")}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                >
                  Matricula
                </th>
                <th
                  onClick={() => sortReservations("HoraInicio")}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                >
                  Hora Inicio
                </th>
                <th
                  className="cursor-pointer px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                  onClick={() => sortReservations("HoraFin")}
                >
                  Hora Fin
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                  Proposito
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600">
                  Estado
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div
          className="max-h-full overflow-y-scroll"
          ref={scrollRef}
          style={{ scrollBehavior: "smooth" }}
        >
          <table className="min-w-full divide-y divide-gray-200">
            <tbody>
              {reservations.map((res, index) => (
                <tr
                  key={res.ReservacionID}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="font-large whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {res.ReservacionID}
                  </td>
                  <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                    {res.Matricula}
                  </td>
                  <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                    {new Date(res.HoraInicio).toLocaleString()}
                  </td>
                  <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                    {new Date(res.HoraFin).toLocaleString()}
                  </td>
                  <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                    {res.Proposito}
                  </td>
                  <td className="font-large whitespace-nowrap px-6 py-4 text-sm">
                    {res.Estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="relative h-full w-3/4 ">
        <div className="absolute left-0 top-0 h-full w-full">
          <iframe
            src="https://www.youtube.com/embed/0FfhgYz5dUA?autoplay=1&mute=1&loop=1&playlist=0FfhgYz5dUA"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            className="h-full w-full"
          ></iframe>
        </div>
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: "10%",
            background: "linear-gradient(to left, transparent, #F0F0F0)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default VideoWall;
