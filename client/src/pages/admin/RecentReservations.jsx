import { useState, useEffect } from "react";
import axios from "../../api/axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
  Drawer,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  ListItemText,
  Checkbox,
  OutlinedInput,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  MenuOutlined,
} from "@mui/icons-material";
import EditReservationModal from "../../components/EditReservationModal";
import ViewReservationInfoModal from "@/components/ViewReservationInfoModal";
import Loading from "../../components/Loading";
import Sidebar from "./Sidebar";
import { idToSalasMap } from "../../components/interfaces/constants";

const RESERVACIONES_URL = "/reservaciones";
const DELETE_RESERVACION_URL = (reservacionID) =>
  `/reservaciones/set-deleted/${reservacionID}`;
const UPDATE_RESERVACION_URL = (reservacionID) =>
  `/reservaciones/${reservacionID}`;
const SALAS_URL = "/salas";

const RecentReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [searchMatricula, setSearchMatricula] = useState("");
  const [salas, setSalas] = useState([]);
  const [selectedSalas, setSelectedSalas] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState([]);
  const [isViewing, setIsViewing] = useState(false);
  const [sortField, setSortField] = useState("ReservacionID");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const estadoOptions = ["Pendiente", "Confirmado", "Cancelado", "Completado"];
  const salaOptions = Object.values(idToSalasMap);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await axios.get(SALAS_URL);
        setSalas(response.data);
      } catch (error) {
        console.error("Error fetching salas:", error);
      }
    };

    fetchSalas();
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

  const handleView = (reservacionID) => {
    setCurrentReservation(
      reservations.find((res) => res.ReservacionID === reservacionID),
    );
    setIsViewing(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEdit = (reservacionID) => {
    setCurrentReservation(
      reservations.find((res) => res.ReservacionID === reservacionID),
    );
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentReservation(null);
  };

  const updateReservation = async (updatedData) => {
    try {
      const response = await axios.put(
        UPDATE_RESERVACION_URL(updatedData.ReservacionID),
        updatedData,
      );

      setReservations(
        reservations.map((res) =>
          res.ReservacionID === updatedData.ReservacionID
            ? { ...res, ...updatedData }
            : res,
        ),
      );
      setSnackbarMessage("Reservacion actualizada exitosamente");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating reservation:", error);
      setSnackbarMessage("Error updating reservation");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (reservacionID) => {
    const confirmDelete = window.confirm(
      "¿Seguro que quieres marcar esta reservacion como eliminada?",
    );
    if (confirmDelete) {
      try {
        const response = await axios.put(DELETE_RESERVACION_URL(reservacionID));

        setReservations(
          reservations.filter((res) => res.ReservacionID !== reservacionID),
        );
        setSnackbarMessage("Reservacion marcada como eliminada");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error marcando reservacion como eliminada: ", error);
        setSnackbarMessage(
          "Error al intentar marcar la reservacion como eliminada",
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSelectedSalasChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedSalas(typeof value === "string" ? value.split(",") : value);
  };

  const handleSelectedEstadoChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedEstado(typeof value === "string" ? value.split(",") : value);
  };

  const filteredReservations = reservations.filter(
    (res) =>
      (searchMatricula
        ? res.Matricula?.toLowerCase().includes(searchMatricula.toLowerCase())
        : true) &&
      (selectedSalas.length > 0
        ? selectedSalas.includes(idToSalasMap[res.ZonaID])
        : true) &&
      (selectedEstado.length > 0 ? selectedEstado.includes(res.Estado) : true),
  );

  return (
    <Box className="flex min-h-screen flex-col md:flex-row">
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </Drawer>
      <Box className="flex-grow bg-gray-50 p-4" component={Paper}>
        <IconButton
          className="absolute left-4 top-4 z-50 bg-white p-2 text-gray-700 shadow-md sm:hidden"
          onClick={toggleSidebar}
        >
          <MenuOutlined className="h-6 w-6" />
        </IconButton>
        <Typography variant="h4" gutterBottom className="mb-4 text-center">
          Todas las reservaciones
        </Typography>

        <Box className="mb-4 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <Box className="w-full sm:mr-4">
            <Typography variant="body2" gutterBottom>
              Buscar por matricula
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              value={searchMatricula}
              onChange={(e) => setSearchMatricula(e.target.value)}
              className="w-full"
            />
          </Box>
          <Box className="w-full sm:mr-4">
            <Typography variant="body2" gutterBottom>
              Filtrar por salas
            </Typography>
            <FormControl variant="outlined" size="small" className="w-full">
              <Select
                multiple
                value={selectedSalas}
                onChange={handleSelectedSalasChange}
                input={<OutlinedInput />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
              >
                {salaOptions.map((sala) => (
                  <MenuItem key={sala} value={sala}>
                    <Checkbox checked={selectedSalas.indexOf(sala) > -1} />
                    <ListItemText primary={sala} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="w-full">
            <Typography variant="body2" gutterBottom>
              Filtrar por estado
            </Typography>
            <FormControl variant="outlined" size="small" className="w-full">
              <Select
                multiple
                value={selectedEstado}
                onChange={handleSelectedEstadoChange}
                input={<OutlinedInput />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
              >
                {estadoOptions.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    <Checkbox checked={selectedEstado.indexOf(estado) > -1} />
                    <ListItemText primary={estado} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => sortReservations("ReservacionID")}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                >
                  ID
                </TableCell>
                <TableCell
                  onClick={() => sortReservations("Matricula")}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                >
                  Matricula
                </TableCell>
                <TableCell
                  onClick={() => sortReservations("HoraInicio")}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                >
                  Hora Inicio
                </TableCell>
                <TableCell
                  onClick={() => sortReservations("HoraFin")}
                  className="cursor-pointer px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 hover:shadow"
                >
                  Hora Fin
                </TableCell>
                <TableCell>Proposito</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Cuarto</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReservations.map((res, index) => (
                <TableRow
                  key={res.ReservacionID}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <TableCell>{res.ReservacionID}</TableCell>
                  <TableCell>{res.Matricula}</TableCell>
                  <TableCell>
                    {new Date(res.HoraInicio).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(res.HoraFin).toLocaleString()}
                  </TableCell>
                  <TableCell>{res.Proposito}</TableCell>
                  <TableCell>{res.Estado}</TableCell>
                  <TableCell>{idToSalasMap[res.ZonaID]}</TableCell>
                  <TableCell className="flex items-center space-x-2">
                    <IconButton
                      color="primary"
                      onClick={() => handleView(res.ReservacionID)}
                      title="Ver"
                    >
                      <InfoIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(res.ReservacionID)}
                      title="Editar"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(res.ReservacionID)}
                      title="Eliminar"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {currentReservation && isEditing && (
          <EditReservationModal
            isOpen={isEditing}
            closeModal={closeModal}
            reservation={currentReservation}
            updateReservation={updateReservation}
          />
        )}
        {currentReservation && isViewing && (
          <ViewReservationInfoModal
            isOpen={isViewing}
            closeModal={() => setIsViewing(false)}
            reservation={currentReservation}
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
    </Box>
  );
};

export default RecentReservations;
