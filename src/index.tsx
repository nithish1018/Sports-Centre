import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/theme.tsx";
import { GamesProvider } from "./context/Games/context.tsx";
import { ArticlesProvider } from "./context/Articles/context.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { PreferencesProvider } from "./context/preferences.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <PreferencesProvider>
      <ArticlesProvider>
        <GamesProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </GamesProvider>
      </ArticlesProvider>
    </PreferencesProvider>
  </ThemeProvider>,
);
