CREATE TABLE dbo.[Administrativa] (      [AdministracionID] int NOT NULL     , [Matricula] varchar(10) NULL     , [ZonaID] int NULL     , [HardwareID] int NULL     , [ConfiguracionRestriccionesTiempo] nvarchar(255) NULL     , [ConfiguracionDisponibilidadEspacios] nvarchar(255) NULL );
CREATE TABLE dbo.[Eventos] (      [EventoID] int NOT NULL     , [Nombre] nvarchar(100) NOT NULL     , [Descripcion] nvarchar(255) NOT NULL     , [FechaInicio] date NOT NULL     , [FechaFin] date NOT NULL     , [CreadorID] varchar(10) NULL );
CREATE TABLE dbo.[Gamificacion] (      [GamificacionID] int NOT NULL     , [Matricula] varchar(10) NULL     , [Puntos] int NOT NULL     , [Nivel] int NOT NULL     , [Recompensas] nvarchar(255) NULL );
CREATE TABLE dbo.[Hardware] (      [HardwareID] int NOT NULL     , [Nombre] nvarchar(100) NOT NULL     , [Descripcion] nvarchar(255) NULL     , [Ubicacion] nvarchar(100) NULL     , [EstadoDisponibilidad] bit NOT NULL );
CREATE TABLE dbo.[Participacion] (      [ParticipacionID] int NOT NULL     , [Matricula] varchar(10) NULL     , [ReservacionID] int NULL     , [Rol] nvarchar(50) NOT NULL );
CREATE TABLE dbo.[ParticipacionEventos] (      [ParticipacionEventoID] int NOT NULL     , [Matricula] varchar(10) NULL     , [EventoID] int NULL     , [EstadoParticipacion] nvarchar(50) NOT NULL );
CREATE TABLE dbo.[Proyectos] (      [ProyectoID] int NOT NULL     , [NombreProyecto] nvarchar(100) NOT NULL     , [Descripcion] nvarchar(255) NULL     , [Matricula] varchar(10) NULL     , [FechaInicio] date NOT NULL     , [FechaFin] date NULL     , [Estado] nvarchar(50) NULL );
CREATE TABLE dbo.[Reportes] (      [ReporteID] int NOT NULL     , [Matricula] varchar(10) NULL     , [ReservacionID] int NULL     , [HardwareUtilizado] int NULL     , [TiempoUsado] int NOT NULL     , [Proposito] nvarchar(255) NOT NULL );
CREATE TABLE dbo.[Reservaciones] (      [ReservacionID] int NOT NULL     , [Matricula] varchar(10) NULL     , [ZonaID] int NULL     , [HoraInicio] datetime NOT NULL     , [HoraFin] datetime NOT NULL     , [Proposito] nvarchar(255) NULL     , [Estado] nvarchar(50) NULL );
CREATE TABLE dbo.[ReservacionHardware] (      [ReservacionHardwareID] int NOT NULL     , [ReservacionID] int NULL     , [HardwareID] int NULL     , [Cantidad] int NOT NULL );
CREATE TABLE dbo.[Usuarios] (      [Matricula] varchar(10) NOT NULL     , [Nombre] nvarchar(50) NOT NULL     , [Apellidos] nvarchar(50) NOT NULL     , [Contrasena] nvarchar(256) NOT NULL     , [Carrera] nvarchar(50) NOT NULL     , [Semestre] int NOT NULL );
CREATE TABLE dbo.[ZonasInstalaciones] (      [ZonaID] int NOT NULL     , [Nombre] nvarchar(100) NOT NULL     , [Descripcion] nvarchar(255) NOT NULL );

CREATE TABLE Salas(
	ZonaId INT IDENTITY(1,1) PRIMARY KEY,
	Descripcion VARCHAR(100),
	Cupo INT,
	Nombre varchar(50),
	Lugar varchar(50),
	Link varchar(100)
);
