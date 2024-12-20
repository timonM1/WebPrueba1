import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, CardMedia, Divider, Rating, TextField } from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 500,
  minWidth: 300,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function MovieModal({ open, handleClose, movie, updateMovie }) {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
  });
  const [editableMovie, setEditableMovie] = useState({
    title: movie.title,
    description: movie.description,
    rating: parseFloat(movie.rating) || 0,
    filmProducer: movie.filmProducer || "",
    genre: movie.genre || [],
  });

  const handleEdit = () => {
    setIsEditing(true);
    setErrors({ title: false, description: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      (name === "title" && value.length > 25) ||
      (name === "description" && value.length > 250)
    ) {
      return;
    }
    setEditableMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleRatingChange = (e, newValue) => {
    setEditableMovie((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleSave = () => {
    const newErrors = {
      title: !editableMovie.title.trim(),
      description: !editableMovie.description.trim(),
    };

    if (newErrors.title || newErrors.description) {
      setErrors(newErrors);
      return;
    }

    updateMovie(movie.id, editableMovie);
    setIsEditing(false);
    setErrors({ title: false, description: false });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box>
          <CardMedia component={"img"} image={movie.image} height={200} />

          {isEditing ? (
            <TextField
              fullWidth
              label="Titulo"
              name="title"
              value={editableMovie.title}
              onChange={handleChange}
              sx={{
                mt: 3,
              }}
              required
              error={errors.title}
              helperText={errors.title ? "El título es obligatorio" : ""}
            />
          ) : (
            <Typography
              variant="h6"
              component="h2"
              sx={{ justifyContent: "center", display: "flex", mt: 3 }}
            >
              {editableMovie.title}
            </Typography>
          )}

          {isEditing ? (
            <TextField
              fullWidth
              label="Descripción"
              name="description"
              multiline
              rows={3}
              value={editableMovie.description}
              onChange={handleChange}
              sx={{ mt: 2, mb: 2 }}
              required
              error={errors.description}
              helperText={
                errors.description ? "La descripción es obligatoria" : ""
              }
            />
          ) : (
            <Typography
              sx={{
                mt: 2,
                textAlign: "justify",
                mb: 3,
                wordWrap: "break-word",
              }}
            >
              {editableMovie.description}
            </Typography>
          )}
          <Divider />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              mt: 1,
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Rating
                precision={0.5}
                readOnly={!isEditing}
                value={editableMovie.rating}
                onChange={handleRatingChange}
              />
              <Typography sx={{ m: "0 10px" }}>
                {editableMovie.rating}
              </Typography>
            </Box>
            {isEditing ? (
              <TextField
                fullWidth
                label="Productor"
                name="filmProducer"
                value={editableMovie.filmProducer}
                onChange={handleChange}
              />
            ) : (
              <Typography>Productor: {editableMovie.filmProducer}</Typography>
            )}
          </Box>
          <Typography>{movie.genre.join(" ")}</Typography>
        </Box>
        <Box
          sx={{
            mt: 3,
            justifyContent: "center",
            display: "flex",
            gap: 4,
          }}
        >
          {isEditing ? (
            <Button
              variant={"contained"}
              color="success"
              sx={{
                letterSpacing: 3,
              }}
              onClick={handleSave}
            >
              Aceptar
            </Button>
          ) : (
            <Button
              variant={"contained"}
              sx={{ letterSpacing: 3, bgcolor: "orangered" }}
              onClick={handleEdit}
            >
              Editar
            </Button>
          )}
          <Button onClick={handleClose}>Salir</Button>
        </Box>
      </Box>
    </Modal>
  );
}
