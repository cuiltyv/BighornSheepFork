import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Avatar,
  Paper,
} from "@mui/material";
import { Add, Delete, DragHandle } from "@mui/icons-material";
import YouTube from "react-youtube";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "../../api/axios";

const SortableItem = ({ id, video, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDelete(id)}
        >
          <Delete />
        </IconButton>
      }
    >
      <ListItemIcon>
        <DragHandle />
      </ListItemIcon>
      <ListItemIcon>
        <YouTube
          videoId={video.content.link.split("v=")[1]}
          opts={{ width: "100px", height: "60px" }}
        />
      </ListItemIcon>
      <ListItemText primary={video.content.link} />
    </ListItem>
  );
};

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [videos, setVideos] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    place: "",
    image: "",
  });
  const [newVideo, setNewVideo] = useState("");

  useEffect(() => {
    // Sacar kis vudeis
    axios
      .get("/api/videos")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const videosWithId = response.data.map((video) => ({
            ...video,
            _id: video.id,
          }));
          setVideos(videosWithId);
        } else {
          console.error("No es un arreglo", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent }]);
    setNewEvent({ name: "", date: "", place: "", image: "" });
  };

  const handleAddVideo = () => {
    const videoId = new URL(newVideo).searchParams.get("v");
    const videoData = { link: newVideo };

    axios
      .post("/api/videos", { content: videoData })
      .then((response) => {
        const newVideoData = {
          ...response.data,
          _id: response.data.id,
        };
        setVideos([...videos, newVideoData]);
        setNewVideo("");
      })
      .catch((error) => {
        console.error("Error adding video:", error);
      });
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleDeleteVideo = (id) => {
    const videoToDelete = videos.find((video) => video._id === id);
    //console.log("Video to delete:", videoToDelete);

    if (videoToDelete && videoToDelete._id) {
      axios
        .delete(`/api/videos/${videoToDelete._id}`)
        .then(() => {
          const updatedVideos = videos.filter((video) => video._id !== id);
          setVideos(updatedVideos);
        })
        .catch((error) => {
          console.error("Error eliminando video:", error);
        });
    } else {
      console.error("Invalid video data", videoToDelete);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setVideos((videos) => {
        const oldIndex = videos.findIndex((video) => video._id === active.id);
        const newIndex = videos.findIndex((video) => video._id === over.id);

        const reorderedVideos = arrayMove(videos, oldIndex, newIndex);

        reorderedVideos.forEach((video, index) => {
          video.order = index;
        });

        axios
          .put("/api/videos/order", { reorderedVideos })
          .then((response) => {
            console.log("Order updated:", response.data);
          })
          .catch((error) => {
            console.error("Error updating video order:", error);
          });

        return reorderedVideos;
      });
    }
  };

  return (
    <Box p={4} component={Paper} className="rounded-lg bg-white shadow-md">
      <Typography variant="h4" gutterBottom className="mb-4 text-center">
        Event Manager
      </Typography>

      {/* Agregar evento */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Add Event
        </Typography>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            fullWidth
            label="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            type="date"
            label="Event Date"
            InputLabelProps={{ shrink: true }}
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Event Place"
            value={newEvent.place}
            onChange={(e) =>
              setNewEvent({ ...newEvent, place: e.target.value })
            }
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Event Image URL"
            value={newEvent.image}
            onChange={(e) =>
              setNewEvent({ ...newEvent, image: e.target.value })
            }
            margin="normal"
            variant="outlined"
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddEvent}
          className="mt-4"
        >
          Add Event
        </Button>
      </Box>

      {/* Eventos */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Events
        </Typography>
        <List>
          {events.map((event, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteEvent(index)}
                >
                  <Delete />
                </IconButton>
              }
            >
              <ListItemIcon>
                <Avatar src={event.image} alt={event.name} />
              </ListItemIcon>
              <ListItemText
                primary={event.name}
                secondary={`${event.date} at ${event.place}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Agregar video */}
      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Add Video
        </Typography>
        <TextField
          fullWidth
          label="YouTube Link"
          value={newVideo}
          onChange={(e) => setNewVideo(e.target.value)}
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAddVideo}
          className="mt-4"
        >
          Add Video
        </Button>
      </Box>

      {/* Lista de videos */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Videos
        </Typography>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={videos.map((video) => video._id)}
            strategy={verticalListSortingStrategy}
          >
            <List>
              {videos.map((video) => (
                <SortableItem
                  key={video._id}
                  id={video._id}
                  video={video}
                  handleDelete={handleDeleteVideo}
                />
              ))}
            </List>
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
};

export default EventManager;
