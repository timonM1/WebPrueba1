const API = import.meta.env.VITE_API_URL;
import axios from "axios";

export const getMovies = async () => {
  try {
    const res = await axios.get(`${API}/movies`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("ERROR AL OBETNER PELICULAS");
    return [];
  }
};

export const createMovie = async (newMovie) => {
  try {
    const res = await axios.post(`${API}/movies`, newMovie);
    return res.data;
  } catch (error) {
    console.log("ERROR AL CREAR LA PELICULA: ", error);
  }
};

export const updateMovie = async (id, updatedMovie) => {
  try {
    const response = await axios.put(`${API}/movies/${id}`, updatedMovie);

    return response.data;
  } catch (error) {
    console.error("Error al actualizar la película:", error);
  }
};

export const deleteMovie = async (id) => {
  try {
    await axios.delete(`${API}/movies/${id}`);
  } catch (error) {
    console.log("ERROR AL ELIMINAR LA PELICULA: ", error);
  }
};
