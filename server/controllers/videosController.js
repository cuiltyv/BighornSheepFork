const videosRouter = require("express").Router();
const Video = require("../models/video");

videosRouter.get("/", async (request, response) => {
  try {
    const videoList = await Video.find({}).sort({ order: 1 });
    response.json(videoList);
  } catch (error) {
    console.error(error);
    response.status(500).send({ error: "Error fetching videos" });
  }
});

// Ruta para obtener el video más reciente
videosRouter.get("/most-recent", async (request, response) => {
  try {
    const mostRecentVideo = await Video.findOne({}).sort({ order: 1 });
    if (mostRecentVideo) {
      //console.log("Most recent video:", mostRecentVideo);
      response.json(mostRecentVideo);
    } else {
      response.status(404).send({ error: "No videos found" });
    }
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .send({ error: "Error fetching the most recent video" });
  }
});

// Ruta para actualizar el orden de los videos
videosRouter.put("/order", async (req, res) => {
  try {
    const { reorderedVideos } = req.body;

    if (!reorderedVideos || !Array.isArray(reorderedVideos)) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    for (let i = 0; i < reorderedVideos.length; i++) {
      const video = reorderedVideos[i];
      await Video.findByIdAndUpdate(video._id, { order: i });
    }

    res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Ruta para obtener un video por ID
videosRouter.get("/:id", async (request, response) => {
  try {
    const video = await Video.findById(request.params.id);
    if (video) {
      response.json(video);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.error(error);
    response.status(400).send({ error: "malformatted id" });
  }
});

// Ruta para eliminar un video por ID
videosRouter.delete("/:id", async (request, response) => {
  try {
    await Video.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(400).send({ error: "malformatted id" });
  }
});

// Ruta para crear un nuevo video
videosRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.content || !body.content.link) {
    return response.status(400).json({ error: "content missing" });
  }

  try {
    const videoCount = await Video.countDocuments({});
    const video = new Video({
      content: {
        link: body.content.link,
      },
      order: videoCount,
    });

    const savedVideo = await video.save();
    response.json(savedVideo);
  } catch (error) {
    console.error(error);
    response.status(400).json({ error: error.message });
  }
});

// Ruta para actualizar un video por ID
videosRouter.put("/:id", async (request, response, next) => {
  const body = request.body.content;
  //console.log("Body:", body);
  const video = {
    content: {
      link: body.content.link,
    },
    order: body.order,
  };

  try {
    const updatedVideo = await Video.findByIdAndUpdate(
      request.params.id,
      video,
      { new: true }
    );
    response.json(updatedVideo);
  } catch (error) {
    next(error);
  }
});

module.exports = videosRouter;
