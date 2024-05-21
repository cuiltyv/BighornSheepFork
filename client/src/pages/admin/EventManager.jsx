import React, { useState } from "react";
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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent }]);
    setNewEvent({ name: "", date: "", place: "", image: "" });
  };

  const handleAddVideo = () => {
    const videoId = new URL(newVideo).searchParams.get("v");
    setVideos([...videos, { link: newVideo, id: videoId }]);
    setNewVideo("");
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  const handleDeleteVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedVideos = Array.from(videos);
    const [movedVideo] = reorderedVideos.splice(result.source.index, 1);
    reorderedVideos.splice(result.destination.index, 0, movedVideo);
    setVideos(reorderedVideos);
  };

  return (
    <Box p={4} component={Paper} className="rounded-lg bg-white shadow-md">
      <Typography variant="h4" gutterBottom className="mb-4 text-center">
        Event Manager
      </Typography>

      {/* Agregar eventos */}
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

      {/* Lista de eventos */}
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

      {/* Agregar videos */}
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="videos">
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {videos.map((video, index) => (
                  <Draggable
                    key={video.id}
                    draggableId={video.id}
                    index={index}
                  >
                    {(provided) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        secondaryAction={
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteVideo(index)}
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
                            videoId={video.id}
                            opts={{ width: "100px", height: "60px" }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={video.link} />
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default EventManager;
