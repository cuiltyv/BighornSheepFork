import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
  Switch,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Tooltip,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  CalendarToday,
  Edit,
  Star,
  Person,
  Favorite,
  Edit as EditIcon,
} from "@mui/icons-material";
import axios from "../../api/axios";
import TabPanel from "../../components/TabPanel";
import useAuth from "@UserAuth";

const getProgressColor = (progress) => {
  if (progress >= 0.8) return "success";
  if (progress >= 0.4) return "warning";
  return "error";
};

const getTopHardwareStyle = (index) => {
  if (index === 0) return { border: "2px solid gold", borderRadius: "5px" };
  if (index === 1) return { border: "2px solid silver", borderRadius: "5px" };
  if (index === 2) return { border: "2px solid #cd7f32", borderRadius: "5px" }; // Bronze color
  return {};
};

const getHeartColor = (index) => {
  if (index < 3) return "red";
  return "inherit";
};

export default function UserProfile() {
  const { auth } = useAuth();
  const userID = auth?.userID;

  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activities, setActivities] = useState([]);
  const [friends, setFriends] = useState([]);
  const [achievements, setAchievements] = useState({});
  const [favoriteHardware, setFavoriteHardware] = useState([]);
  const [hardwareReservations, setHardwareReservations] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [bioEdit, setBioEdit] = useState(false);
  const [newBio, setNewBio] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userID) return;
      const result = await axios.get(`/usuarios/${userID}`);
      setUser(result.data);
      setLoading(false);
      setNewBio(result.data.biografia);
    };

    const fetchActivities = async () => {
      if (!userID) return;
      const result = await axios.get(`/api/user/activities/${userID}`);
      setActivities(result.data);
    };

    const fetchFriends = async () => {
      if (!userID) return;
      const result = await axios.get(`/api/user/friends/${userID}`);
      setFriends(result.data);
    };

    const fetchAchievements = async () => {
      if (!userID) return;
      const result = await axios.get(
        `/api/achievements/achievements/${userID}`,
      );
      setAchievements(result.data);
    };

    const fetchFavoriteHardware = async () => {
      if (!userID) return;
      const result = await axios.get(`/api/user/favorite-hardware/${userID}`);
      setFavoriteHardware(result.data);
    };

    const fetchHardwareReservations = async () => {
      if (!userID) return;
      const result = await axios.get(
        `/api/user/hardware-reservations/${userID}`,
      );
      setHardwareReservations(result.data);
    };

    const fetchTotalHours = async () => {
      if (!userID) return;
      const result = await axios.get(`/api/achievements/total-hours/${userID}`);
      setTotalHours(result.data.TotalHours);
    };

    fetchUser();
    fetchActivities();
    fetchFriends();
    fetchAchievements();
    fetchFavoriteHardware();
    fetchHardwareReservations();
    fetchTotalHours();
  }, [userID]);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleUpdateClick = () => {
    if (user) {
      try {
        axios.put(`/usuarios/${user.Matricula}`, user);
        setOpenModal(true);
      } catch (error) {
        // error
        console.error(error);
      }
    }
  };

  const handleBioEditClick = () => {
    setBioEdit(true);
  };

  const handleBioSaveClick = async () => {
    if (user) {
      try {
        await axios.put(`/api/user/update-biography`, {
          userID: user.Matricula,
          biografia: newBio,
        });
        setUser((prevUser) => ({
          ...prevUser,
          biografia: newBio,
        }));
        setBioEdit(false);
      } catch (error) {
        // error
        console.error(error);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#ffffff" : "#121212";
    document.body.style.color = darkMode ? "#000000" : "#ffffff";
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box className="flex flex-col items-center px-4 py-10">
      <Paper elevation={3} className="w-full max-w-6xl p-4">
        <Box className="flex flex-col items-center">
          <Avatar
            alt={user?.Nombre}
            src={user?.profilePicture || "/default-avatar.png"}
            sx={{ width: 120, height: 120 }}
          />
          <Typography variant="h4" className="mt-4">
            {user?.Nombre} {user?.Apellidos}
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            {bioEdit ? (
              <Box display="flex" alignItems="center" width="100%">
                <TextField
                  fullWidth
                  multiline
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                />
                <Button
                  onClick={handleBioSaveClick}
                  variant="contained"
                  color="primary"
                  sx={{ ml: 2 }}
                >
                  Save
                </Button>
              </Box>
            ) : (
              <>
                <Typography variant="subtitle1" className="text-gray-600">
                  {user?.biografia ||
                    "Este usuario no tiene una biografía aún."}
                </Typography>
                <IconButton onClick={handleBioEditClick} size="small">
                  <EditIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>

        <Tabs
          value={tab}
          onChange={handleTabChange}
          className="mt-6 w-full"
          centered
        >
          <Tab label="Cuenta" />
          <Tab label="Logros" />
          <Tab label="Configuración" />
          <Tab label="Actividad Reciente" />
          <Tab label="Amigos" />
          <Tab label="Contraseña" />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <Card>
            <CardHeader title="Información de la Cuenta" />
            <CardContent>
              <Typography variant="body2">Nombre(s)</Typography>
              <TextField
                fullWidth
                id="Nombre"
                value={user?.Nombre || ""}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
              <Typography variant="body2">Apellido(s)</Typography>
              <TextField
                fullWidth
                id="Apellidos"
                value={user?.Apellidos || ""}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
              <Typography variant="body2">Matricula</Typography>
              <TextField
                fullWidth
                id="Matricula"
                value={user?.Matricula || ""}
                disabled
                variant="outlined"
                margin="normal"
              />
              <Typography variant="body2">Carrera</Typography>
              <TextField
                fullWidth
                id="Carrera"
                value={user?.Carrera || ""}
                onChange={handleInputChange}
                variant="outlined"
                margin="normal"
              />
            </CardContent>
            <CardActions>
              <Button
                onClick={handleUpdateClick}
                variant="contained"
                color="primary"
              >
                Guardar Cambios
              </Button>
            </CardActions>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <Card>
            <CardHeader title="Logros y Puntos" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {achievements.Achievement_Hours ? (
                      <Grid item>
                        <Chip
                          icon={<Star />}
                          label="10 Horas Reservadas"
                          color="primary"
                        />
                      </Grid>
                    ) : null}
                    {achievements.Achievement_Points ? (
                      <Grid item>
                        <Chip
                          icon={<Star />}
                          label="100 Puntos Ganados"
                          color="secondary"
                        />
                      </Grid>
                    ) : null}
                    {achievements.Achievement_Friends ? (
                      <Grid item>
                        <Chip
                          icon={<Star />}
                          label="5 Amigos"
                          color="primary"
                        />
                      </Grid>
                    ) : null}
                    {achievements.Achievement_AllRooms ? (
                      <Grid item>
                        <Chip
                          icon={<Star />}
                          label="Reservado en Todas las Salas"
                          color="secondary"
                        />
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className="mt-4">
                    Puntos Personales: {user?.PuntosPersonales || 0}
                  </Typography>
                  <Typography variant="h6" className="mt-4">
                    Total Horas Reservadas: {totalHours}
                  </Typography>
                  <Typography variant="h6" className="mt-4">
                    Hardware Favorito:{" "}
                    {favoriteHardware.length > 0
                      ? favoriteHardware[0].Nombre
                      : "N/A"}
                  </Typography>
                  <List>
                    {favoriteHardware.map((hardware, index) => (
                      <ListItem key={index} style={getTopHardwareStyle(index)}>
                        <Tooltip
                          title={
                            index === 0
                              ? "Más Reservado"
                              : index === 1
                                ? "Segundo Reservado"
                                : index === 2
                                  ? "Tercer Reservado"
                                  : ""
                          }
                        >
                          <IconButton>
                            <Favorite
                              style={{
                                color: getHeartColor(index),
                              }}
                            />
                          </IconButton>
                        </Tooltip>
                        <ListItemText
                          primary={hardware.Nombre}
                          secondary={`Total Reservas: ${hardware.TotalQuantity}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className="mb-2">
                    Progresos:
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Progreso de Horas:
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(achievements.Progress_Hours * 100, 100)}
                        color={getProgressColor(achievements.Progress_Hours)}
                      />
                      <Typography variant="body2" align="right">
                        {`${Math.min(
                          achievements.Progress_Hours * 100,
                          100,
                        )}% (${Math.round(achievements.Progress_Hours * 10)}/10)`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Progreso de Puntos:
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(
                          achievements.Progress_Points * 100,
                          100,
                        )}
                        color={getProgressColor(achievements.Progress_Points)}
                      />
                      <Typography variant="body2" align="right">
                        {`${Math.min(
                          achievements.Progress_Points * 100,
                          100,
                        )}% (${Math.round(achievements.Progress_Points * 100)}/100)`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Progreso de Amigos:
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(
                          achievements.Progress_Friends * 100,
                          100,
                        )}
                        color={getProgressColor(achievements.Progress_Friends)}
                      />
                      <Typography variant="body2" align="right">
                        {`${Math.min(
                          achievements.Progress_Friends * 100,
                          100,
                        )}% (${Math.round(achievements.Progress_Friends * 5)}/5)`}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        Progreso de Reservas en Salas:
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(
                          achievements.Progress_AllRooms * 100,
                          100,
                        )}
                        color={getProgressColor(achievements.Progress_AllRooms)}
                      />
                      <Typography variant="body2" align="right">
                        {`${Math.min(
                          parseFloat(
                            (achievements.Progress_AllRooms * 100).toFixed(2),
                          ),
                          100,
                        )}% (${Math.round(achievements.Progress_AllRooms * 8)}/8)`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <Card>
            <CardHeader title="Configuración" />
            <CardContent>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={handleThemeChange}
                    name="darkMode"
                    color="primary"
                  />
                }
                label="Modo Oscuro"
              />
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={3}>
          <Card>
            <CardHeader title="Actividad Reciente" />
            <CardContent>
              <List>
                {activities.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={activity.ActivityType}
                      secondary={`${activity.Details} - ${new Date(
                        activity.ActivityDate,
                      ).toLocaleString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={4}>
          <Card>
            <CardHeader title="Amigos" />
            <CardContent>
              <List>
                {friends.map((friend, index) => (
                  <ListItem key={index}>
                    <Person />
                    <ListItemText
                      primary={`${friend.Nombre} ${friend.Apellidos}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={5}>
          <Card>
            <CardHeader title="Contraseña" />
            <CardContent>
              <Typography variant="body2">Contraseña Actual</Typography>
              <TextField
                fullWidth
                id="current"
                type="password"
                variant="outlined"
                margin="normal"
              />
              <Typography variant="body2">Nueva Contraseña</Typography>
              <TextField
                fullWidth
                id="new"
                type="password"
                variant="outlined"
                margin="normal"
              />
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary">
                Guardar Contraseña
              </Button>
            </CardActions>
          </Card>
        </TabPanel>
      </Paper>

      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Los cambios han sido guardados exitosamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
