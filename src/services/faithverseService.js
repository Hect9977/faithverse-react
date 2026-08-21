import axios from "axios";

const API_URL = "http://localhost:5000";

const FaithverseService = {
  getVerses: () => {
    return axios.get(`${API_URL}/verses`);
  },

  getVerseById: (verseId) => {
    return axios.get(`${API_URL}/verses/${verseId}`);
  },

  createVerse: (verse) => {
    return axios.post(`${API_URL}/verses`, verse);
  },

  updateVerse: (verseId, verse) => {
    return axios.put(`${API_URL}/verses/${verseId}`, verse);
  },

  deleteVerse: (verseId) => {
    return axios.delete(`${API_URL}/verses/${verseId}`);
  },

  getCategories: () => {
    return axios.get(`${API_URL}/categories`);
  },
};

export default FaithverseService;
