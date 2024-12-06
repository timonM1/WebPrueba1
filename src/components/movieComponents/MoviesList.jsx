import Movie from "./Movie";
import { Box, Grid2, Typography } from "@mui/material";

export default function MoviesList({ movies, deleteMovie, updateMovie }) {
  if (!Array.isArray(movies)) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6" color="error">
          Error: No se pudieron cargar las películas.
        </Typography>
      </Box>
    );
  }

  // Si el array está vacío
  if (movies.length === 0) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6">No hay películas disponibles.</Typography>
      </Box>
    );
  }

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
          <Movie
            movie={movie}
            deleteMovie={deleteMovie}
            updateMovie={updateMovie}
          />
        </Grid2>
      ))}
    </Grid2>
  );
}
