import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { PaymentProvider } from "./contexts/PaymentContext";

function App() {
  return (
    <div className="bg-gray-100 flex flex-col h-screen dark:bg-gray-800">
      <PaymentProvider>
        <Header />
        <Home />
        <Footer />
      </PaymentProvider>
    </div>
  );
}

export default App;
