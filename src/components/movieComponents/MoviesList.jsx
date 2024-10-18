import Movie from "./Movie";
import { Box, Grid2 } from "@mui/material";

export default function MoviesList({
  movies,
  deleteMovie,
  updateMovie,
  movieToDelete,
}) {
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
