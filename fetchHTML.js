import axios from "axios";

export const fetchHTML = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching URL: ${url}`, error);
    return null;
  }
};
