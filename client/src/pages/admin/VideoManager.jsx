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
  Paper,
  Drawer,
} from "@mui/material";
import { Add, Delete, DragHandle, MenuOutlined } from "@mui/icons-material";
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
import Sidebar from "./Sidebar";
import ConfirmationModal from "../../components/ConfirmationModal";

const SortableItem = ({ id, video, handleDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none", // Prevent default touch actions
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 flex items-center rounded bg-gray-100 p-2 shadow"
    >
      <ListItemIcon>
        <DragHandle className="cursor-grab" />
      </ListItemIcon>
      <ListItemIcon>
        <YouTube
          videoId={video.content.link.split("v=")[1]}
          opts={{ width: "100px", height: "60px" }}
        />
      </ListItemIcon>
      <ListItemText primary={video.content.link} />
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => handleDelete(video)}
      >
        <Delete />
      </IconButton>
    </ListItem>
  );
};

const VideoManager = () => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  useEffect(() => {
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

  const handleDeleteVideo = () => {
    axios
      .delete(`/api/videos/${videoToDelete._id}`)
      .then(() => {
        setVideos(videos.filter((video) => video._id !== videoToDelete._id));
        setModalOpen(false);
        setVideoToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting video:", error);
      });
  };

  const confirmDeleteVideo = (video) => {
    setVideoToDelete(video);
    setModalOpen(true);
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box className="flex min-h-screen flex-col">
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </Drawer>
      <Box
        className="relative flex-grow rounded-lg bg-white p-4 shadow-md"
        component={Paper}
      >
        <IconButton
          className="absolute left-4 top-4 z-50 bg-white p-2 text-gray-700 shadow-md sm:hidden"
          onClick={toggleSidebar}
        >
          <MenuOutlined className="h-6 w-6" />
        </IconButton>
        <Typography variant="h4" gutterBottom className="mb-4 text-center">
          Manejo de Videos
        </Typography>

        {/* Agregar Video */}
        <Box className="mb-4">
          <Typography variant="h6" gutterBottom>
            Agregar Video - Resolución recomendada: 2880 x 1080
          </Typography>
          <TextField
            fullWidth
            label="YouTube Link"
            value={newVideo}
            onChange={(e) => setNewVideo(e.target.value)}
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddVideo}
            className="mt-4"
          >
            Agregar Video
          </Button>
        </Box>

        {/* Video List */}
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
                    handleDelete={confirmDeleteVideo}
                  />
                ))}
              </List>
            </SortableContext>
          </DndContext>
        </Box>
      </Box>
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDeleteVideo}
        title="Confirmar Eliminación"
        description={`Seguro que quieres borrar el video: ${videoToDelete?.content?.link || ""}?`}
      />
    </Box>
  );
};

export default VideoManager;
