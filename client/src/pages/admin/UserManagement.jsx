import React, { useState, useEffect } from "react";
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
  Modal,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add,
  Delete,
  Edit,
  Search,
  SaveAlt,
  MenuOutlined,
} from "@mui/icons-material";
import axios from "../../api/axios";
import Papa from "papaparse";
import Sidebar from "./Sidebar";
import { roleToNameMap } from "@/components/interfaces/constants";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    Matricula: "",
    Nombre: "",
    Apellidos: "",
    Contrasena: "",
    Carrera: "",
    Semestre: "",
    Role: 1,
    PuntosPersonales: 0,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  useEffect(() => {
    axios
      .get("/usuarios")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleAddUser = () => {
    axios
      .post("/usuarios", newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setSnackbarMessage("User added successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setNewUser({
          Matricula: "",
          Nombre: "",
          Apellidos: "",
          Contrasena: "",
          Carrera: "",
          Semestre: "",
          Role: 1,
          PuntosPersonales: 0,
        });
        setModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        setSnackbarMessage("Error adding user");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleEditUser = (updatedUser) => {
    axios
      .put(`/usuarios/${updatedUser.Matricula}`, updatedUser)
      .then((response) => {
        setUsers(
          users.map((user) =>
            user.Matricula === updatedUser.Matricula ? updatedUser : user,
          ),
        );
        setSnackbarMessage("User updated successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setEditUser(null);
        setModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setSnackbarMessage("Error updating user");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const handleDeleteUser = (matricula) => {
    axios
      .delete(`/usuarios/${matricula}`)
      .then(() => {
        setUsers(users.filter((user) => user.Matricula !== matricula));
        setSnackbarMessage("User deleted successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setSnackbarMessage("Error deleting user");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleModalOpen = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setEditUser(null);
    setModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleSemesterFilterChange = (event) => {
    setSemesterFilter(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (user.Matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.Apellidos.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (roleFilter ? user.Role === parseInt(roleFilter) : true) &&
      (semesterFilter ? user.Semestre === parseInt(semesterFilter) : true)
    );
  });

  const exportToCSV = () => {
    const csvData = filteredUsers.map((user) => ({
      Matricula: user.Matricula,
      Nombre: user.Nombre,
      Apellidos: user.Apellidos,
      Carrera: user.Carrera,
      Semestre: user.Semestre,
      Role: roleToNameMap[user.Role],
      PuntosPersonales: user.PuntosPersonales,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.Role === 2).length;
  const totalStudents = users.filter((user) => user.Role === 1).length;
  const totalProfessors = users.filter((user) => user.Role === 3).length;

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
          Manejo de Usuarios
        </Typography>

        <Box className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Paper className="p-4">
            <Typography variant="h6">Usuarios totales</Typography>
            <Typography variant="h4">{totalUsers}</Typography>
          </Paper>
          <Paper className="p-4">
            <Typography variant="h6">Administradores</Typography>
            <Typography variant="h4">{totalAdmins}</Typography>
          </Paper>
          <Paper className="p-4">
            <Typography variant="h6">Estudiantes</Typography>
            <Typography variant="h4">{totalStudents}</Typography>
          </Paper>
          <Paper className="p-4">
            <Typography variant="h6">Profesores</Typography>
            <Typography variant="h4">{totalProfessors}</Typography>
          </Paper>
        </Box>

        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: <Search />,
            }}
            InputLabelProps={{ shrink: true }}
            className="mb-4 sm:mb-0 sm:mr-4"
          />
          <Select
            value={roleFilter}
            onChange={handleRoleFilterChange}
            displayEmpty
            variant="outlined"
            size="small"
            className="mb-4 sm:mb-0 sm:mr-4"
          >
            <MenuItem value="">Todos los roles</MenuItem>
            <MenuItem value={1}>Estudiante</MenuItem>
            <MenuItem value={2}>Admin</MenuItem>
            <MenuItem value={3}>Profesor</MenuItem>
          </Select>
          <TextField
            label="Filtrar por Semestre"
            type="number"
            variant="outlined"
            size="small"
            value={semesterFilter}
            onChange={handleSemesterFilterChange}
            InputLabelProps={{ shrink: true }}
            className="mb-4 sm:mb-0 sm:mr-4"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setModalOpen(true)}
            className="mb-4 sm:mb-0"
          >
            Agregar Usuario
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveAlt />}
            onClick={exportToCSV}
            className="mb-4 sm:mb-0"
          >
            Exportar a CSV
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Matricula</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Carrera</TableCell>
                <TableCell>Semestre</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Puntos Personales</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.Matricula}>
                  <TableCell>{user.Matricula}</TableCell>
                  <TableCell>{user.Nombre}</TableCell>
                  <TableCell>{user.Apellidos}</TableCell>
                  <TableCell>{user.Carrera}</TableCell>
                  <TableCell>{user.Semestre}</TableCell>
                  <TableCell>{roleToNameMap[user.Role]}</TableCell>
                  <TableCell>{user.PuntosPersonales}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleModalOpen(user)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteUser(user.Matricula)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={modalOpen} onClose={handleModalClose}>
          <Box className="absolute inset-0 flex items-center justify-center p-4">
            <Paper className="w-full max-w-lg p-4">
              <Typography variant="h6" gutterBottom>
                {editUser ? "Edit User" : "Agregar Usuario"}
              </Typography>
              <Box className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Matricula
                  </Typography>
                  <TextField
                    fullWidth
                    value={editUser ? editUser.Matricula : newUser.Matricula}
                    onChange={(e) =>
                      editUser
                        ? setEditUser({
                            ...editUser,
                            Matricula: e.target.value,
                          })
                        : setNewUser({ ...newUser, Matricula: e.target.value })
                    }
                    variant="outlined"
                    disabled={!!editUser}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Nombre
                  </Typography>
                  <TextField
                    fullWidth
                    value={editUser ? editUser.Nombre : newUser.Nombre}
                    onChange={(e) =>
                      editUser
                        ? setEditUser({ ...editUser, Nombre: e.target.value })
                        : setNewUser({ ...newUser, Nombre: e.target.value })
                    }
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Apellidos
                  </Typography>
                  <TextField
                    fullWidth
                    value={editUser ? editUser.Apellidos : newUser.Apellidos}
                    onChange={(e) =>
                      editUser
                        ? setEditUser({
                            ...editUser,
                            Apellidos: e.target.value,
                          })
                        : setNewUser({ ...newUser, Apellidos: e.target.value })
                    }
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Carrera
                  </Typography>
                  <TextField
                    fullWidth
                    value={editUser ? editUser.Carrera : newUser.Carrera}
                    onChange={(e) =>
                      editUser
                        ? setEditUser({ ...editUser, Carrera: e.target.value })
                        : setNewUser({ ...newUser, Carrera: e.target.value })
                    }
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Semestre
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={editUser ? editUser.Semestre : newUser.Semestre}
                    onChange={(e) =>
                      editUser
                        ? setEditUser({
                            ...editUser,
                            Semestre: parseInt(e.target.value),
                          })
                        : setNewUser({
                            ...newUser,
                            Semestre: parseInt(e.target.value),
                          })
                    }
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Puntos Personales
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={
                      editUser
                        ? editUser.PuntosPersonales
                        : newUser.PuntosPersonales
                    }
                    onChange={(e) =>
                      editUser
                        ? setEditUser({
                            ...editUser,
                            PuntosPersonales: parseInt(e.target.value),
                          })
                        : setNewUser({
                            ...newUser,
                            PuntosPersonales: parseInt(e.target.value),
                          })
                    }
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Role
                  </Typography>
                  <Select
                    fullWidth
                    value={editUser ? editUser.Role : newUser.Role}
                    onChange={(e) =>
                      editUser
                        ? setEditUser({ ...editUser, Role: e.target.value })
                        : setNewUser({ ...newUser, Role: e.target.value })
                    }
                    variant="outlined"
                  >
                    <MenuItem value={1}>Estudiante</MenuItem>
                    <MenuItem value={2}>Admin</MenuItem>
                    <MenuItem value={3}>Profesor</MenuItem>
                  </Select>
                </Box>
              </Box>
              <Box className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleModalClose}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={editUser ? <Edit /> : <Add />}
                  onClick={
                    editUser ? () => handleEditUser(editUser) : handleAddUser
                  }
                >
                  {editUser ? "Actualizar Usuario" : "Agregar Usuario"}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Modal>

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

export default UserManagement;
