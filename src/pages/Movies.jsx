import { useState } from "react";
import MoviesList from "../components/movieComponents/MoviesList";
import { Button, Typography } from "@mui/material";
import AddMovieForm from "../components/movieComponents/AddMovieForm";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          m: "50px  5px",
          fontWeight: 800,
          textTransform: "uppercase",
          fontFamily: "'Oswald', sans-serif",
          letterSpacing: 5,

          fontSize: {
            xs: "2.5rem",
            sm: "3rem",
            md: "5rem",
          },
          background: "linear-gradient(135deg, #1e3c72, #2a1e72)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 5px #1d1d1d",
        }}
      >
        Peliculas
        <Button onClick={handleOpen} sx={{ ml: 1 }}>
          {open ? (
            <RemoveIcon sx={{ fontSize: 30 }} />
          ) : (
            <AddIcon
              sx={{
                fontSize: 35,
                color: "#60b09f",
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
        />
      )}
      <MoviesList movies={movies} setMovies={setMovies} />
    </>
  );
}
