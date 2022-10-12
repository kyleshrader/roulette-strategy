import { Box, Link, Typography } from "@mui/material";

export default function Credits() {
  return (
    <Box sx={{ position: "absolute", top: 0, right: 0 }}>
      <Typography sx={{ m: 1 }} variant="caption">
        &#169; 2022 | Tomasz Marczak |
        <Link sx={{ ml: 1 }} href="https://github.com/TomaszMarczak">
          GitHub
        </Link>
        <Link
          sx={{ ml: 1 }}
          href="https://www.linkedin.com/in/tomasz-marczak-4a12a811a/"
        >
          LinkedIn
        </Link>
      </Typography>
    </Box>
  );
}
