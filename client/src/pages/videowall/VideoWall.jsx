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
import blueCloud from "../../assets/blueCloud.png";
import axios from "../../api/axios";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import { parse, format } from "date-fns"; // Import date-fns
import mqtt from "mqtt";

const RESERVACIONES_URL = "/reservaciones/full-upcoming";
const EVENTOS_URL = "/api/events/most-recent";
const RFID_API_URL =
  "https://rfidvideowall.azurewebsites.net/login/idCredencial";

const VideoWall = () => {
  const images = [image1, image1, image1, image1, image1];
  const [events, setEvents] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [filterMatricula, setFilterMatricula] = useState("");
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );
  const [showQRCode, setShowQRCode] = useState(false); // Add state for QR code visibility
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [videoSrc, setVideoSrc] = useState("");

  const plugin2 = useRef(AutoScroll({ stopOnInteraction: false, speed: 0.75 }));

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

  const options = {
    username: "admin",
    password: "Admin123",
  };
  const brokerUrl =
    "wss://7b398e4b18b84e3bb15420f4f5fb7d91.s1.eu.hivemq.cloud:8884/mqtt"; // Replace with your MQTT broker URL

  const fetchMatriculaByRFID = async (rfid) => {
    try {
      const response = await axios.post(
        RFID_API_URL,
        { idCredencial: rfid },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data.matricula; // Adjust based on the actual response structure
    } catch (error) {
      console.error("Error fetching matricula:", error);
      return null;
    }
  };

  useEffect(() => {
    const client = mqtt.connect(brokerUrl, options);

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe("Matricula"); // Replace with your MQTT topic
      console.log("Subscribed to Matricula");
    });

    client.on("message", async (topic, payload) => {
      console.log("Received message:", payload.toString());
      const receivedRFID = payload.toString();
      const matricula = await fetchMatriculaByRFID(receivedRFID);
      if (matricula) {
        setFilterMatricula(matricula);
        console.log("Filtering by Matricula:", matricula);
        setTimeout(() => {
          setFilterMatricula("");
        }, 15000);
      } else {
        setTimeout(() => {
          setFilterMatricula("");
        }, 15000);
      }
    });

    // Clean up the MQTT client on unmount
    return () => {
      client.end();
    };
  }, []);

  useEffect(() => {
    if (filterMatricula) {
      const hasMatchingReservations = reservations.some(
        (reservation) => reservation.Matricula === filterMatricula,
      );

      if (!hasMatchingReservations) {
        setTimeout(() => {
          setFilterMatricula("");
        }, 5000);
      }
    }
  }, [reservations, filterMatricula]);

  useEffect(() => {
    console.log("Events:", events);
  }, [events]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
            <h2 className="mb-8 text-2xl font-bold">¡Reserva Ahora!</h2>
            <div className="mb-6 w-full max-w-[240px] rounded-lg bg-white p-4 shadow-md">
              <img src={qrCodeImage} alt="QR Code" className="max-h-48" />
            </div>
            <div className="mb-3 w-full max-w-[240px] rounded-lg bg-white p-4 text-center shadow-md">
              <p className="text-md">Contacto:</p>
              <p className="text-md">Email: dreamlab@gmail.com</p>
              <p className="text-md">Número: (123) 456-7890</p>
            </div>
          </div>
          <div className="mx-10 mb-10 flex flex-col items-center">
            <h2 className="mb-2 text-2xl font-bold">Reservaciones Activas</h2>
            <Carousel
              opts={{ align: "start", loop: true }}
              plugins={[plugin2.current]}
              orientation="vertical"
              className="w-full max-w-[500px]"
            >
              <CarouselContent className="-mt-1 h-[460px]">
                {reservations
                  .filter(
                    (reservation) =>
                      filterMatricula === "" ||
                      reservation.Matricula === filterMatricula,
                  )
                  .map((reservation, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/4 lg:basis-1/4 "
                    >
                      <div className="p-1">
                        <Card className="">
                          <CardContent className="flex flex-row items-start justify-between p-2">
                            <div className="flex flex-col justify-center">
                              <p className="font-large text-xl">
                                {reservation.Matricula}
                              </p>
                              <p className="font-large text-xl">
                                {formatTimeRange(
                                  reservation.HoraInicio,
                                  reservation.HoraFin,
                                )}
                              </p>
                              <p className="font-large text-xl">
                                {reservation.Nombre[0]}
                              </p>
                              <p className="font-large text-xl">
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
                {reservations.filter(
                  (reservation) =>
                    filterMatricula === "" ||
                    reservation.Matricula === filterMatricula,
                ).length === 0 && (
                  <div className="p-1">
                    <Card>
                      <CardContent className="p-2">
                        <p className="font-large text-sm">
                          No hay reservaciones para la matrícula{" "}
                          {filterMatricula}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
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
            className="pointer-events-none h-full w-full"
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
