import { useState, useEffect } from "react";
import Movie from "./Movie";
import { Box, Grid2 } from "@mui/material";

const API = import.meta.env.VITE_API_URL;
const genres = [
  "Acción",
  "Comedia",
  "Drama",
  "Fantasía",
  "Terror",
  "Ciencia Ficción",
  "Documental",
];

const getRandomGenres = () => {
  const shuffled = genres.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

const getRandomRating = () => {
  return Math.floor(Math.random() * 11) / 2;
};

export default function MoviesList({ movies, setMovies }) {
  const [movieToDelete, setMovieToDelete] = useState(null);

  // OBTENER LAS PELICULAS Y ACTUALIZAR LOS GENEROS DE LAS PELICULAS

  const getMovies = async () => {
    const res = await fetch(`${API}/movies`);
    const data = await res.json();

    const updatedMovies = await Promise.all(
      data.map(async (movie) => {
        const randomGenres = getRandomGenres();
        const randomRating = getRandomRating();
        await fetch(`${API}/movies/${movie.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ genre: randomGenres, rating: randomRating }),
        });
        return { ...movie, genre: randomGenres, rating: randomRating };
      })
    );

    setMovies(updatedMovies);
  };
  useEffect(() => {
    getMovies();
  }, []);

  // EDITAR UNA PELICULA
  const updateMovie = async (id, updatedMovie) => {
    const res = await fetch(`${API}/movies/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, ...updatedMovie } : movie
      )
    );
  };

  // ELIMINAR UNA PELICULA

  const deleteMovie = async (id) => {
    const userResp = window.confirm("Estas seguro de eliminar esta pelicula?");
    if (userResp) {
      setMovieToDelete(id);
      await fetch(`${API}/movies/${id}`, {
        method: "DELETE",
      });
      await getMovies();
      setMovieToDelete(null);
    }
  };

  return (
    <Grid2
      container
      justifyContent={"center"}
      sx={{
        maxWidth: "calc(4 * 400px)",
        margin: "0 auto",
      }}
    >
      {movies.map((movie) => (
        <Grid2 xs={12} sm={6} md={3} key={movie.id} width={400}>
          <Box
            className={movieToDelete === movie.id ? "fade-out" : ""}
            sx={{ transition: "all 0.5s ease-in-out" }}
          >
            <Movie
              movie={movie}
              deleteMovie={deleteMovie}
              id={movie.id}
              updateMovie={updateMovie}
            />
          </Box>
        </Grid2>
      ))}
    </Grid2>
  );
}
