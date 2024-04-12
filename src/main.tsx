import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/theme.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
    {/* </PersistGate> */}
  </Provider>
  // </React.StrictMode>
);
