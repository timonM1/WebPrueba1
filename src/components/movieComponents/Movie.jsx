import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";

import MovieModal from "./MovieModal";
import { useState } from "react";

export default function Movie({ movie, deleteMovie, id, updateMovie }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card
        sx={{
          m: "40px 12px",
          pb: 3,
          transition: ".3s",
          willChange: "transform",
          "&:hover": {
            transform: "scale(1.01)",
          },
          minWidth: 300,
          minHeight: 400,
          bgcolor: "#f0f4f8",
          boxShadow: "1px 1px 10px 0px",
        }}
      >
        <CardMedia component={"img"} image={movie.image} height={200} />
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              p: "0 10px",
            }}
          >
            {movie.title}
          </Typography>
          <Typography
            variant="body2"
            component={"p"}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {movie.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button variant="contained" color="secondary" onClick={handleOpen}>
              Detalles
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => deleteMovie(id)}
            >
              Eliminar
            </Button>
          </Box>
        </CardActions>
      </Card>
      {open && (
        <MovieModal
          open={open}
          handleClose={handleClose}
          movie={movie}
          updateMovie={updateMovie}
        />
      )}
    </>
  );
}
