import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import payaso from "../../img/payaso.jpeg";

import { createMovie } from "../../services/movieServices";

export default function AddMovieForm({ open, handleClose, setMovies, genres }) {
  const defaultImage = "https://via.placeholder.com/300x300.png?text=Sin+Image";

  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    rating: 0,
    genre: [],
    duration: "",
    filmProducer: "",
    image: defaultImage,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: `url(${payaso})`,
    backgroundPosition: "center",
    borderTop: "5px #60b09f solid",
    borderRadius: "25px",
    padding: 3,
    maxWidth: 600,
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "1px 3px 8px 1px #d3e6f3",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "title" && value.length > 25) ||
      (name === "description" && value.length > 300)
    ) {
      return;
    }
    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;

    const selected = typeof value === "string" ? value.split(",") : value;

    setNewMovie({
      ...newMovie,
      genre: selected,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdMovie = await createMovie(newMovie);

    setMovies((prevMovies) => [...prevMovies, createdMovie]);

    setNewMovie({
      title: "",
      description: "",
      rating: 0,
      genre: [],
      filmProducer: "",
      image: defaultImage,
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: "10px 0",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              letterSpacing: 4,
              fontWeight: 600,
              textAlign: "center",
              flexGrow: 1,
              ml: 5,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: {
                xs: "1.5rem",
                sm: "2rem",
                md: "3rem",
              },
              background: "linear-gradient(135deg, #FF4500, #FF6347)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "1px 2px 2px #7c0707",
            }}
          >
            Crea tu película
          </Typography>
          <Button onClick={handleClose}>
            <ClearIcon sx={{ fontSize: 35, color: "#f00e0e" }} />
          </Button>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid2 container mb={4} justifyContent={"center"}>
            <Grid2 xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                name="title"
                label="Título"
                value={newMovie.title}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                name="description"
                label="Descripción"
                value={newMovie.description}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                name="rating"
                label="Rating"
                value={newMovie.rating}
                onChange={handleChange}
                margin="normal"
                type="number"
                inputProps={{ step: 0.5, min: 0, max: 5 }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="genre-label">Géneros</InputLabel>
                <Select
                  labelId="genre-label"
                  id="genre"
                  multiple
                  value={newMovie.genre}
                  onChange={handleGenreChange}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Géneros" />
                  }
                  renderValue={(selected) => (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                name="filmProducer"
                label="Productor"
                value={newMovie.filmProducer}
                onChange={handleChange}
                margin="normal"
              />
            </Grid2>
          </Grid2>

          <Button
            sx={{
              display: "block",
              margin: "auto",
              bgcolor: "#135c9d",
            }}
            type="submit"
            variant="contained"
          >
            Agregar
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
