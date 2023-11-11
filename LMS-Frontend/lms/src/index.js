import React from "react";
import ReactDOM from "react-dom/client";
import "react-datepicker/dist/react-datepicker.css";
import App from "./components/App";
import "./index.css";
import { SnackbarProvider } from "notistack";

import { AppProvider } from "./components/AppContext.js";

import { QueryClient, QueryClientProvider } from "react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AppProvider>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <App />
        </SnackbarProvider>
      </AppProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
