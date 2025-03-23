import { useState } from "react";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";

import "./App.css";

function App() {
  const [proceedMainPage, setProceedMainPage] = useState(false);
  if (!proceedMainPage) {
    return <Login proceed={setProceedMainPage} />;
  } else {
    return <MainPage />;
  }
}

export default App;
