import { Route, Routes } from "react-router-dom";

import { Home } from "../pages/Home";
import { Info } from "../pages/Info";
import { RegisterClient } from "../pages/RegisterClient";
import { Selection } from "../pages/Selection";

import { ProtectedRoutes } from "../components/ProtectedRoutes";

import { Login } from "../pages/Login";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/selection" element={<Selection />} />
      <Route path="/registerclient" element={<RegisterClient />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<Home />}></Route>

        <Route path="/info/:id" element={<Info />} />
      </Route>

      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
};
