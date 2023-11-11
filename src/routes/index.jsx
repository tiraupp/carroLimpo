import { Route, Routes } from "react-router-dom";

import { HomeAdm } from "../pages/HomeAdm";
import { HomeClient } from "../pages/HomeClient";
import { HomeProfessional } from "../pages/HomeProfessional";

import { Info } from "../pages/Info";
import { RegisterClient } from "../pages/RegisterClient";
import { RegisterProfessional } from "../pages/RegisterProfessional";
import { Selection } from "../pages/Selection";

import { ProtectedRoutes } from "../components/ProtectedRoutes";

import { Login } from "../pages/Login";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/selection" element={<Selection />} />

      <Route path="/registerclient" element={<RegisterClient />} />
      <Route path="/registerprofessional" element={<RegisterProfessional />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/homeadm" element={<HomeAdm />}></Route>
        <Route path="/homeprofessional" element={<HomeProfessional />}></Route>
        <Route path="/homeclient" element={<HomeClient />}></Route>

        <Route path="/info/:id" element={<Info />} />
      </Route>

      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
};
