import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function AppHeader({
  colorToggle,
}: {
  colorToggle: {
    mode: "light" | "dark";
    setter: (newMode: "light" | "dark") => void;
  };
}) {
  return (
    <AppBar>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography variant="h4" sx={{ display: "flex" }}>
            MortgagePV
          </Typography>

          <Box sx={{ flexGrow: 1 }} display="flex" justifyContent="flex-end">
            <IconButton
              color="inherit"
              sx={{ p: 0, mr: 2 }}
              onClick={() => {
                if (colorToggle.mode === "light") {
                  colorToggle.setter("dark");
                } else {
                  colorToggle.setter("light");
                }
              }}
            >
              {colorToggle.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ p: 0 }}
              href="https://github.com/duketide/mortgage-compare"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
