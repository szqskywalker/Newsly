import { useState } from "react";
import Login from "./components/login/Login";
import MainPage from "./components/MainPage/mainpage";
import "./App.css";

function App() {
  const [proceedMainPage, setProceedMainPage] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white flex justify-center px-4 py-6">
      <div className="w-full max-w-screen-xl">
        {!proceedMainPage ? (
          <Login proceed={setProceedMainPage} />
        ) : (
          <MainPage />
        )}
      </div>
    </div>
  );
}
export default App;
