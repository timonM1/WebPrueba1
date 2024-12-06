import { useEffect, useState } from "react";
import MoviesList from "../components/movieComponents/MoviesList";
import { Button, Typography } from "@mui/material";
import AddMovieForm from "../components/movieComponents/AddMovieForm";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  getMovies,
  deleteMovie as deleteMovieApi,
  updateMovie as updateMovieApi,
} from "../services/movieServices";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const genres = [
    "Acción",
    "Comedia",
    "Drama",
    "Fantasía",
    "Terror",
    "Ciencia Ficción",
    "Documental",
  ];

  const fetchMovies = async () => {
    const data = await getMovies();
    console.log(data);
    setMovies(data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ACTUALIZAR UNA PELICULA
  const updateMovie = async (id, updatedMovie) => {
    await updateMovieApi(id, updatedMovie);

    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, ...updatedMovie } : movie
      )
    );
  };

  // ELIMINAR UNA PELICULA
  const deleteMovie = async (id) => {
    const userResp = window.confirm("Estas seguro de eliminar esta pelicula?");
    if (!userResp) return;

    try {
      await deleteMovieApi(id);

      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.log("Error al eliminar la película", error);
    }
  };

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: "50px  5px",
          fontWeight: 700,
          textTransform: "uppercase",
          fontFamily: "'Oswald', sans-serif",
          letterSpacing: 5,

          fontSize: {
            xs: "2.5rem",
            sm: "3rem",
            md: "5rem",
          },
          background: "linear-gradient(135deg, #6db4d9, #136e9e)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 3px 8px #254a5e",
        }}
      >
        Peliculas
        <Button onClick={handleOpen} sx={{ ml: 1 }}>
          {open ? (
            <RemoveIcon sx={{ fontSize: 30 }} />
          ) : (
            <AddIcon
              sx={{
                fontSize: 45,
                color: "#15cfa8",
              }}
            />
          )}
        </Button>
      </Typography>
      {open && (
        <AddMovieForm
          open={open}
          handleClose={handleClose}
          setMovies={setMovies}
          genres={genres}
        />
      )}
      <MoviesList
        movies={movies}
        setMovies={setMovies}
        deleteMovie={deleteMovie}
        updateMovie={updateMovie}
      />
    </>
  );
}
