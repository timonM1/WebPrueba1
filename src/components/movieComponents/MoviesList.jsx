import Movie from "./Movie";
import { Box, Grid2 } from "@mui/material";

export default function MoviesList({ movies, deleteMovie, updateMovie }) {
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
