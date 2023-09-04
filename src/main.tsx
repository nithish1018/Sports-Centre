import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./context/theme";
import { GamesProvider } from "./context/Games/context.tsx";
import { ArticlesProvider } from "./context/Articles/context.tsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ArticlesProvider>
      <GamesProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </GamesProvider>
    </ArticlesProvider>
  </ThemeProvider>,
);
