import { useState } from "react";
import Header from "./components/header/Header";
import ProductsPage from "./pages/products/ProductsPage";

import './variables.scss'; // Or './globals.css'
import styles from "./App.module.scss";
import { Provider } from "react-redux";
import { store } from './store/store.ts';
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductsPage />} />
        </Routes>
      </main>
    </Provider>
  );
}

export default App;
