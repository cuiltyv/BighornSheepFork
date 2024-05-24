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

const RESERVACIONES_URL = "/reservaciones";

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
  const [showQRCode, setShowQRCode] = useState(false); // Add state for QR code visibility
  const plugin = React.useRef(
    Autoplay({ delay: 7500, stopOnInteraction: true }),
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

  const handleMouseEnter = () => {
    console.log("Mouse entered, stopping autoplay");
    plugin.current.stop();
  };

  const handleMouseLeave = () => {
    console.log("Mouse left, resetting autoplay");
    plugin.current.play();
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
              scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
              isScrollingDown = false;
            } else {
              scrollContainer.scrollBy({ top: 1, behavior: "smooth" });
            }
          } else {
            if (scrollContainer.scrollTop === 0) {
              scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: "smooth",
              });
              isScrollingDown = true;
            } else {
              scrollContainer.scrollBy({ top: -1, behavior: "smooth" });
            }
          }
        }
      }, 50);
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

  const handleButtonClick = () => {
    setShowQRCode(!showQRCode);
  };

  const handleClosePopup = () => {
    setShowQRCode(false);
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
              opts={{ align: "start" }}
              className="w-4/5"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/2"
                  >
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
        </div>
        <div className="flex h-1/2 flex-col ">
          <div className=" px-6 py-3">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50 ">
                <tr>
                  <th
                    onClick={() => sortReservations("Matricula")}
                    className="cursor-pointer rounded-l py-3 pl-6 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
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
                  <th
                    className="cursor-pointer px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                    onClick={() => sortReservations("Proposito")}
                  >
                    Proposito
                  </th>
                  <th
                    className="cursor-pointer rounded-r px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                    onClick={() => sortReservations("Estado")}
                  >
                    Estado
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div
            className="mb-4 flex-grow overflow-y-scroll px-6 py-6"
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
      <button onClick={handleButtonClick} className="qr-button">
        Reserva
      </button>
      {showQRCode && (
        <div className="qr-code-popup">
          <button className="close-button" onClick={handleClosePopup}>
            X
          </button>
          <img src={qrCodeImage} alt="QR Code" />
        </div>
      )}
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
