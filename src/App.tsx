import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-gray-100 flex flex-col h-screen dark:bg-gray-800">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
