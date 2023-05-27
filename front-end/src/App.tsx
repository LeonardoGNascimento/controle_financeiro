import { ThemeProvider } from "styled-components";
import { AppRouter } from "./AppRouter";
import { theme } from "./theme/custom.theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}
