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
} from "@mui/material";
import { Edit as EditIcon, Star, Favorite } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "../../api/axios";
import TabPanel from "../../components/TabPanel";
import useAuth from "@UserAuth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartJSTooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartJSTooltip,
  Legend,
);

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

const calculatePercentile = (points, allPoints) => {
  const sortedPoints = [...allPoints].sort((a, b) => a - b);
  const rank = sortedPoints.indexOf(points) + 1;
  const percentile = ((sortedPoints.length - rank) / sortedPoints.length) * 100;
  return percentile.toFixed(2);
};

export default function UserProfile() {
  const { auth } = useAuth();
  const userID = auth?.userID;

  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem("darkMode");
    return savedPreference ? JSON.parse(savedPreference) : false;
  });
  const [activities, setActivities] = useState([]);
  const [friends, setFriends] = useState([]);
  const [achievements, setAchievements] = useState({});
  const [favoriteHardware, setFavoriteHardware] = useState([]);
  const [hardwareReservations, setHardwareReservations] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [bioEdit, setBioEdit] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [personalPointsData, setPersonalPointsData] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!userID) return;
      const result = await axios.get(`/usuarios/${userID}`);
      setUser(result.data);
      setLoading(false);
      setNewBio(result.data.biografia);
      setPhoneNumber(result.data.Telefono || "");
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

    const fetchPersonalPointsData = async () => {
      try {
        const result = await axios.get(
          "/api/achievements/personal-points-distribution",
        );
        const pointsData = result.data.map((item) => item.PuntosPersonales);
        setPersonalPointsData(pointsData);
        if (user) {
          setUserPoints(user.PuntosPersonales);
        }
      } catch (error) {
        console.error("Error fetching personal points distribution:", error);
      }
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
    fetchPersonalPointsData();
  }, [userID]);

  useEffect(() => {
    if (user) {
      setUserPoints(user.PuntosPersonales);
    }
  }, [user]);

  const saveDarkModePreference = (isDarkMode) => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handlePhoneNumberChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
  };

  const handleUpdateClick = () => {
    if (user) {
      try {
        const formattedPhoneNumber = phoneNumber.replace(
          /(\d{2})(\d{4})(\d{4})/,
          "$1-$2-$3",
        );
        const updatedUser = { ...user, Telefono: formattedPhoneNumber };
        axios.put(`/usuarios/${user.Matricula}`, updatedUser);
        setUser(updatedUser);
        setOpenModal(true);
      } catch (error) {
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
        console.error(error);
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleThemeChange = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      saveDarkModePreference(newDarkMode);
      return newDarkMode;
    });
  };

  if (loading) {
    return <CircularProgress />;
  }

  const userIndex = personalPointsData.indexOf(userPoints);

  const data = {
    labels: personalPointsData.map((_, index) => index + 1),
    datasets: [
      {
        label: "Personal Points Distribution",
        data: personalPointsData,
        backgroundColor: personalPointsData.map((_, index) =>
          index === userIndex ? "orange" : "rgba(75, 192, 192, 0.6)",
        ),
      },
    ],
  };

  const userPercentile = calculatePercentile(userPoints, personalPointsData);

  const options = {
    scales: {
      x: { display: false },
      y: { display: true },
    },
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
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
                <Typography variant="body2">Teléfono</Typography>
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body2" mr={1}>
                    +52
                  </Typography>
                  <TextField
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="1234567890"
                    variant="outlined"
                    margin="normal"
                  />
                </Box>
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
                        <ListItem
                          key={index}
                          style={getTopHardwareStyle(index)}
                        >
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
                          value={Math.min(
                            achievements.Progress_Hours * 100,
                            100,
                          )}
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
                          color={getProgressColor(
                            achievements.Progress_Friends,
                          )}
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
                          color={getProgressColor(
                            achievements.Progress_AllRooms,
                          )}
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
                    <Box className="mt-6 w-full max-w-6xl p-4">
                      <Typography variant="h6" className="mb-2">
                        Distribución de Puntos Personales
                      </Typography>
                      <Bar data={data} options={options} />
                      <Typography variant="body2" align="center">
                        Tus puntos: {user?.PuntosPersonales || 0} (Top{" "}
                        {userPercentile}%)
                      </Typography>
                    </Box>
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
                <Grid container spacing={2}>
                  {activities.map((activity, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        border={1}
                        borderColor="grey.300"
                        borderRadius="4px"
                        padding="8px"
                        marginBottom="8px"
                      >
                        <ListItem>
                          <ListItemText
                            primary={activity.ActivityType}
                            secondary={`${activity.Details} - ${new Date(
                              activity.ActivityDate,
                            ).toLocaleString()}`}
                          />
                        </ListItem>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </TabPanel>

          <TabPanel value={tab} index={4}>
            <Card>
              <CardHeader title="Amigos" />
              <CardContent>
                <Grid container spacing={2}>
                  {friends.map((friend, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Box
                        border={1}
                        borderColor="grey.300"
                        borderRadius="4px"
                        padding="8px"
                        display="flex"
                        alignItems="center"
                        marginBottom="8px"
                      >
                        <ListItemText
                          primary={`${friend.Nombre} ${friend.Apellidos}`}
                          style={{ marginLeft: "8px" }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
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
            <Button
              onClick={() => setOpenModal(false)}
              color="primary"
              autoFocus
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
