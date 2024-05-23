const videosRouter = require("express").Router();
const Video = require("../models/video");

// Ruta para obtener todos los videos
videosRouter.get("/", (request, response) => {
  Video.find({}).then((videoList) => {
    response.json(videoList);
  });
});

// Ruta para obtener un video por ID
videosRouter.get("/:id", (request, response) => {
  Video.findById(request.params.id)
    .then((video) => {
      if (video) {
        response.json(video);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

// Ruta para eliminar un video por ID
videosRouter.delete("/:id", (request, response) => {
  Video.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

// Ruta para crear un nuevo video
videosRouter.post("/", (request, response) => {
  const body = request.body;

  if (!body.content || !body.content.link) {
    return response.status(400).json({ error: "content missing" });
  }

  const video = new Video({
    content: {
      link: body.content.link
    },
  });

  video.save()
    .then((savedVideo) => {
      response.json(savedVideo);
    })
    .catch((error) => {
      response.status(400).json({ error: error.message });
    });
});

// Ruta para actualizar un video por ID
videosRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const video = {
    content: {
      link: body.content.link
    },
  };

  Video.findByIdAndUpdate(request.params.id, video, { new: true })
    .then((updatedVideo) => {
      response.json(updatedVideo);
    })
    .catch((error) => next(error));
});

module.exports = videosRouter;
