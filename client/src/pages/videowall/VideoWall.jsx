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
import qrCodeImage from "../../assets/qrDreamlab.png"; // Import your QR code image here
import axios from "../../api/axios";
import Autoplay from "embla-carousel-autoplay";
import { parse, format } from "date-fns"; // Import date-fns

const RESERVACIONES_URL = "/reservaciones/full-upcoming";
const EVENTOS_URL = "/api/events/most-recent";

const VideoWall = () => {
  const images = [image1, image1, image1, image1, image1];
  const [events, setEvents] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [sortField, setSortField] = useState("ReservacionID");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );
  const scrollRef = useRef(null);
  const [showQRCode, setShowQRCode] = useState(false); // Add state for QR code visibility
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get("/api/videos/most-recent");
        const vid = response.data.content.link;
        const videoId = vid.split("v=")[1]; // Extract the video ID from the URL
        setVideoSrc(
          `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`,
        );
      } catch (error) {
        console.error("Error fetching video:", error);
        setVideoSrc(
          "https://www.youtube.com/embed/xXiSN8Tftjg?autoplay=1&mute=1&loop=1&playlist=xXiSN8Tftjg",
        );
      }
    };
    fetchVideo();
  }, []);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(EVENTOS_URL);
        setEvents(response.data);
        console.log("Events:", events);
        setIsDataLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setIsDataLoading(false);
      }
    };

    fetchEventos();
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(RESERVACIONES_URL);
        setReservations(response.data);
        console.log("Reservations:", reservations);
        setIsDataLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setIsDataLoading(false);
      }
    };

    fetchReservations();
  }, []);

  //console log events every time it is updated
  useEffect(() => {
    console.log("Events:", events);
  }, [events]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    console.log("Mouse entered, stopping autoplay");
    plugin.current.stop();
  };

  const handleMouseLeave = () => {
    console.log("Mouse left, resetting autoplay");
    plugin.current.play();
  };

  const formatTimeRange = (start, end) => {
    const startTime = parse(start, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date());
    const endTime = parse(end, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date());
    const formattedStartTime = format(startTime, "h:mm");
    const formattedEndTime = format(endTime, "h:mm");
    return `${formattedStartTime} - ${formattedEndTime}`;
  };

  return (
    <div className="w-3840px relative flex h-screen bg-darkWhite">
      <div className="border-blue-500 flex h-full w-1/4 flex-col border">
        <div className="h-1/2 flex-col">
          <div className="flex items-center justify-between  px-4 py-2">
            <span className="text-2xl font-bold text-violet">DREAM LAB</span>
            <span className="text-2xl font-bold text-violet">
              {currentTime}
            </span>
          </div>
          <div className="flex items-center justify-center  py-14">
            <Carousel
              plugins={[plugin.current]}
              opts={{ align: "start", loop: true }}
              className="w-4/5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CarouselContent>
                {events.map((event, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/2"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img
                            src={event.ImageURL}
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
        </div>
        <div className="flex h-1/2 flex-row items-center justify-center space-x-16">
          <div className="mx-10 flex flex-col items-center">
            <h2 className="mb-8 text-lg font-bold">¡Reserva Ahora!</h2>
            <div className="mb-6 w-full max-w-[240px] rounded-lg bg-white p-4 shadow-md">
              <img src={qrCodeImage} alt="QR Code" className="max-h-48" />
            </div>
            <div className="mb-3 w-full max-w-[240px] rounded-lg bg-white p-4 text-center shadow-md">
              <p className="text-sm">Contacto:</p>
              <p className="text-sm">Email: dreamlab@gmail.com</p>
              <p className="text-sm">Número: (123) 456-7890</p>
            </div>
          </div>
          <div className="mx-10 flex flex-col items-center">
            <h2 className="mb-2 text-lg font-bold">Reservaciones Activas</h2>
            <Carousel
              opts={{ align: "start", loop: true }}
              orientation="vertical"
              className="w-full max-w-[380px]"
            >
              <CarouselContent className="-mt-1 h-[380px]">
                {reservations.map((reservation, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/4 lg:basis-1/4"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex flex-row items-start justify-between p-2">
                          <div className="flex flex-col justify-center">
                            <p className="font-large text-sm">
                              {reservation.Matricula}
                            </p>
                            <p className="font-large text-sm">
                              {formatTimeRange(
                                reservation.HoraInicio,
                                reservation.HoraFin,
                              )}
                            </p>
                            <p className="font-large text-sm">
                              {reservation.Nombre[0]}
                            </p>
                            <p className="font-large text-sm">
                              {reservation.Nombre[1]}
                            </p>
                          </div>
                          <img
                            src={`${reservation.Link}.png`}
                            className="ml-4 max-h-28 w-48 object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="relative h-full w-3/4">
        <div className="absolute left-0 top-0 h-full w-full">
          <iframe
            src={videoSrc}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            className="h-full w-full"
          ></iframe>
        </div>
      </div>

      <style jsx>{`
        .qr-button {
          position: absolute;
          bottom: 20px;
          left: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          z-index: 1000;
          transition: all 0.3s ease-in-out;
        }

        .qr-button:hover {
          background-color: #0056b3;
        }

        .qr-code-popup {
          position: absolute;
          bottom: 80px; /* Adjusted position for smoother animation */
          left: 20px; /* Adjusted position for smoother animation */
          background-color: white;
          padding: 20px;
          border: 1px solid #ccc;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transition: all 0.3s ease-in-out;
          opacity: ${showQRCode ? 1 : 0};
          visibility: ${showQRCode ? "visible" : "hidden"};
        }

        .qr-code-popup img {
          max-width: 100%;
          height: auto;
        }

        .close-button {
          position: absolute;
          top: 5px;
          right: 5px;
          background: transparent;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default VideoWall;
