import axios from "axios";

const API_URL = "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json";

export const fetchVideos  = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
