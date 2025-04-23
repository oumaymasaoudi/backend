import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/users";

export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs :", error);
    return [];
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    return null;
  }
};
