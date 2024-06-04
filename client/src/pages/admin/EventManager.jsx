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
  Checkbox,
  Drawer,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  Add,
  Delete,
  Edit,
  DragHandle,
  MenuOutlined,
  CalendarToday,
} from "@mui/icons-material";
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
import EditEventModal from "../../components/EditEventModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

const SortableItem = ({
  id,
  event,
  handleDelete,
  handleEdit,
  handleToggleVisibility,
}) => {
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
        <Avatar src={event.ImageURL} alt={event.Nombre} />
      </ListItemIcon>
      <ListItemText
        primary={event.Nombre}
        secondary={`${event.Descripcion} - ${new Date(event.FechaInicio).toLocaleString()} a ${new Date(event.FechaFin).toLocaleString()}`}
      />
      <Box display="flex" alignItems="center">
        <Checkbox
          checked={event.IsOnVW}
          onChange={() => handleToggleVisibility(event)}
          color="primary"
        />
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => handleEdit(event)}
        >
          <Edit />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDelete(event)}
        >
          <Delete />
        </IconButton>
      </Box>
    </ListItem>
  );
};

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    imageUrl: "",
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    axios
      .get("/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleAddEvent = () => {
    const { name, description, startDate, endDate, imageUrl } = newEvent;
    if (!name || !startDate || !endDate || !imageUrl) {
      setSnackbarMessage("Por favor complete todos los campos requeridos");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setSnackbarMessage(
        "La fecha de finalización debe ser posterior a la fecha de inicio",
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (new Date(startDate) < new Date() || new Date(endDate) < new Date()) {
      setSnackbarMessage("Las fechas no pueden estar en el pasado");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    axios
      .post("/api/events", {
        name,
        description,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        imageUrl,
      })
      .then((response) => {
        const addedEvent = response.data;
        setEvents([
          ...events,
          {
            EventoID: addedEvent.EventoID,
            Nombre: addedEvent.name,
            Descripcion: addedEvent.description,
            FechaInicio: addedEvent.startDate,
            FechaFin: addedEvent.endDate,
            ImageURL: addedEvent.imageUrl,
            order: addedEvent.order,
            IsOnVW: addedEvent.IsOnVW,
          },
        ]);
        setNewEvent({
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          imageUrl: "",
        });
        setSnackbarMessage("Evento agregado con éxito");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        setSnackbarMessage("Error al agregar el evento");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleDeleteEvent = () => {
    axios
      .delete(`/api/events/${eventToDelete.EventoID}`)
      .then(() => {
        setEvents(
          events.filter((event) => event.EventoID !== eventToDelete.EventoID),
        );
        setModalOpen(false);
        setEventToDelete(null);
        setSnackbarMessage("Evento eliminado con éxito");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        setSnackbarMessage("Error al eliminar el evento");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleEditEvent = (updatedEvent) => {
    axios
      .put(`/api/events/${updatedEvent.EventoID}`, updatedEvent)
      .then((response) => {
        setEvents(
          events.map((event) =>
            event.EventoID === updatedEvent.EventoID ? updatedEvent : event,
          ),
        );
        setEditModalOpen(false);
        setEventToEdit(null);
        setSnackbarMessage("Evento actualizado con éxito");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        setSnackbarMessage("Error al actualizar el evento");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const confirmDeleteEvent = (event) => {
    setEventToDelete(event);
    setModalOpen(true);
  };

  const handleToggleVisibility = (event) => {
    const updatedEvent = { ...event, IsOnVW: !event.IsOnVW };
    axios
      .put("/api/events/visibility", {
        EventoID: event.EventoID,
        IsOnVW: updatedEvent.IsOnVW,
      })
      .then(() => {
        setEvents(
          events.map((ev) =>
            ev.EventoID === event.EventoID ? updatedEvent : ev,
          ),
        );
      })
      .catch((error) => {
        console.error("Error updating event visibility:", error);
      });
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
      setEvents((events) => {
        const oldIndex = events.findIndex(
          (event) => event.EventoID === active.id,
        );
        const newIndex = events.findIndex(
          (event) => event.EventoID === over.id,
        );

        const reorderedEvents = arrayMove(events, oldIndex, newIndex);

        reorderedEvents.forEach((event, index) => {
          event.order = index;
        });

        axios
          .put("/api/events/order", { reorderedEvents })
          .then((response) => {
            console.log("Order updated:", response.data);
          })
          .catch((error) => {
            console.error("Error updating event order:", error);
          });

        return reorderedEvents;
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditButtonClick = (event) => {
    setEventToEdit(event);
    setEditModalOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    try {
      const imageUrl = await uploadImageToImgur(file);
      setNewEvent({ ...newEvent, imageUrl });
    } catch (error) {
      console.error("Error uploading image: ", error);
      setSnackbarMessage("Error al subir la imagen");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const uploadImageToImgur = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("image", file);

      fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID cd1738bae4961a3`,
        },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            resolve(data.data.link);
          } else {
            reject(data.data.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return (
    <Box className="flex min-h-screen flex-col">
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </Drawer>
      <Box
        className="relative flex-grow rounded-lg bg-white p-6 shadow-md"
        component={Paper}
        mx={{ xs: 2, sm: 4, md: 6 }} // Adjust margins
        my={4}
      >
        <IconButton
          className="absolute left-4 top-4 z-50 bg-white p-2 text-gray-700 shadow-md sm:hidden"
          onClick={toggleSidebar}
        >
          <MenuOutlined className="h-6 w-6" />
        </IconButton>
        <Typography variant="h4" gutterBottom className="mb-4 text-center">
          Manejo de Eventos
        </Typography>

        {/* Agregar Evento */}
        <Box className="mb-6 rounded-lg bg-gray-50 p-4 shadow-sm">
          <Typography variant="h6" gutterBottom>
            Agregar Evento
          </Typography>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Box>
              <Typography variant="body2" gutterBottom>
                Nombre de Evento <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                margin="normal"
                variant="outlined"
                required
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Descripción
              </Typography>
              <TextField
                fullWidth
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                margin="normal"
                variant="outlined"
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Fecha de Inicio <span style={{ color: "red" }}>*</span>
              </Typography>
              <DatePicker
                selected={
                  newEvent.startDate ? new Date(newEvent.startDate) : null
                }
                onChange={(date) =>
                  setNewEvent({ ...newEvent, startDate: date })
                }
                showTimeSelect
                dateFormat="Pp"
                className="w-full"
                placeholderText="Seleccione fecha y hora"
                minDate={new Date()}
                required
                customInput={
                  <TextField
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarToday />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Fecha Fin <span style={{ color: "red" }}>*</span>
              </Typography>
              <DatePicker
                selected={newEvent.endDate ? new Date(newEvent.endDate) : null}
                onChange={(date) => setNewEvent({ ...newEvent, endDate: date })}
                showTimeSelect
                dateFormat="Pp"
                className="w-full"
                placeholderText="Seleccione fecha y hora"
                minDate={
                  newEvent.startDate ? new Date(newEvent.startDate) : new Date()
                }
                required
                customInput={
                  <TextField
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarToday />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Imagen URL <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                fullWidth
                value={newEvent.imageUrl}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, imageUrl: e.target.value })
                }
                margin="normal"
                variant="outlined"
                required
              />
            </Box>
            <Button
              variant="contained"
              component="label"
              className="mt-2 h-12"
              style={{
                height: "52px",
                marginTop: "auto",
              }}
            >
              Subir Imagen
              <input type="file" hidden onChange={handleImageUpload} />
            </Button>
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleAddEvent}
            className="mt-4"
          >
            Agregar Evento
          </Button>
        </Box>

        {/* Lista de Eventos */}
        <Box className="mb-6 rounded-lg bg-gray-50 p-4 shadow-sm">
          <Typography variant="h6" gutterBottom>
            Eventos
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            px={2}
          >
            <Box flex="1">
              <Typography variant="body1">Detalles de evento</Typography>
            </Box>
            <Box width="150px" textAlign="center">
              <Typography variant="body1">Mostrar en videowall?</Typography>
            </Box>
            <Box width="50px" textAlign="center">
              <Typography variant="body1">Editar</Typography>
            </Box>
            <Box width="50px" textAlign="center">
              <Typography variant="body1">Eliminar</Typography>
            </Box>
          </Box>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={events.map((event) => event.EventoID)}
              strategy={verticalListSortingStrategy}
            >
              <List>
                {events.map((event) => (
                  <SortableItem
                    key={event.EventoID}
                    id={event.EventoID}
                    event={event}
                    handleDelete={confirmDeleteEvent}
                    handleToggleVisibility={handleToggleVisibility}
                    handleEdit={handleEditButtonClick}
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
        onConfirm={handleDeleteEvent}
        title="Confirmar Eliminación"
        description={`Seguro que quiere borrar el evento: ${eventToDelete?.Nombre}?`}
      />
      {eventToEdit && (
        <EditEventModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          event={eventToEdit}
          onSave={handleEditEvent}
        />
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventManager;
