// api/axiosImgur.js
import axios from "axios";

const IMGUR_BASE_URL = "https://api.imgur.com/3/";

const axiosImgur = axios.create({
  baseURL: IMGUR_BASE_URL,
  headers: {
    Authorization: `Client-ID cd1738bae4961a3`,
    "Content-Type": "multipart/form-data",
  },
});

export default axiosImgur;
