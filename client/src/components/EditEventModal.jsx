import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditEventModal = ({ open, onClose, event, onSave }) => {
  const [updatedEvent, setUpdatedEvent] = useState({
    ...event,
    FechaInicio: new Date(event.FechaInicio),
    FechaFin: new Date(event.FechaFin),
  });

  useEffect(() => {
    setUpdatedEvent({
      ...event,
      FechaInicio: new Date(event.FechaInicio),
      FechaFin: new Date(event.FechaFin),
    });
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date, name) => {
    setUpdatedEvent((prev) => ({ ...prev, [name]: date }));
  };

  const handleSave = () => {
    onSave({
      ...updatedEvent,
      FechaInicio: updatedEvent.FechaInicio.toISOString(),
      FechaFin: updatedEvent.FechaFin.toISOString(),
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="absolute left-1/2 top-1/2 w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
        <Typography variant="h6" gutterBottom>
          Editar Evento
        </Typography>
        <Typography variant="body2" gutterBottom>
          Nombre de Evento
        </Typography>
        <TextField
          fullWidth
          name="Nombre"
          value={updatedEvent.Nombre}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <Typography variant="body2" gutterBottom>
          Descripcción
        </Typography>
        <TextField
          fullWidth
          name="Descripcion"
          value={updatedEvent.Descripcion}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <Typography variant="body2" gutterBottom>
          Fecha de Inicio
        </Typography>
        <DatePicker
          selected={updatedEvent.FechaInicio}
          onChange={(date) => handleDateChange(date, "FechaInicio")}
          showTimeSelect
          dateFormat="Pp"
          className="w-full"
          placeholderText="Seleccione fecha y hora"
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
        <Typography variant="body2" gutterBottom>
          Fecha Fin
        </Typography>
        <DatePicker
          selected={updatedEvent.FechaFin}
          onChange={(date) => handleDateChange(date, "FechaFin")}
          showTimeSelect
          dateFormat="Pp"
          className="w-full"
          placeholderText="Seleccione fecha y hora"
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
        <Typography variant="body2" gutterBottom>
          Imagen URL
        </Typography>
        <TextField
          fullWidth
          name="ImageURL"
          value={updatedEvent.ImageURL}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="secondary"
            className="mr-2"
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditEventModal;
