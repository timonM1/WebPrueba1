import { useEffect, useState } from "react";
import MoviesList from "../components/movieComponents/MoviesList";
import { Button, Typography } from "@mui/material";
import AddMovieForm from "../components/movieComponents/AddMovieForm";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const API = import.meta.env.VITE_API_URL;

const getRandomGenres = (genres) => {
  const shuffled = genres.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2);
};

const getRandomRating = () => {
  return Math.floor(Math.random() * 11) / 2;
};

export default function Movies() {
  const [movies, setMovies] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [movieToDelete, setMovieToDelete] = useState(null);

  const genres = [
    "Acción",
    "Comedia",
    "Drama",
    "Fantasía",
    "Terror",
    "Ciencia Ficción",
    "Documental",
  ];

  // Obtener todas las peliculas
  const getMovies = async () => {
    const res = await fetch(`${API}/movies`);
    const data = await res.json();

    // Actualizar el genero y el rating
    const updatedMovies = await Promise.all(
      data.map(async (movie) => {
        if (!movie.genre.length || !movie.rating) {
          const randomGenres = getRandomGenres(genres);
          const randomRating = getRandomRating();
          await fetch(`${API}/movies/${movie.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ genre: randomGenres, rating: randomRating }),
          });
          return { ...movie, genre: randomGenres, rating: randomRating };
        }
        return movie;
      })
    );
    //Actualizo mis peliculas en local con el genero y rating
    setMovies(updatedMovies);
  };

  // Crear pelicula
  const createMovie = async (newMovie) => {
    const res = await fetch(`${API}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });
    const createdMovie = await res.json();
    setMovies((prevMovies) => [...prevMovies, createdMovie]);
  };

  // EDITAR UNA PELICULA
  const updateMovie = async (id, updatedMovie) => {
    await fetch(`${API}/movies/${id}`, {
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
      // Actualizo en local filtrando todas las peliculas que no coinciden con el id.
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      setMovieToDelete(null);
    }
  };

  // Llamo a las peliculas luego de renderizar el componente
  useEffect(() => {
    getMovies();
  }, []);

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
        movieToDelete={movieToDelete}
      />
    </>
  );
}
