import axios from "axios";

const API_URL = "http://localhost:5000/api/events"; 

export const getEvents = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des événements :", error);
    return [];
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(API_URL, eventData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'événement :", error);
    return null;
  }
};
