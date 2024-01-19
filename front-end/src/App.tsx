import { BrowserRouter } from "react-router-dom";
// import { StoreProvider } from "store";
import Router from "./router/Router";
import "./css/main.css";

function App() {
  return (
    // <StoreProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    // </StoreProvider>
  );
}

export default App;
