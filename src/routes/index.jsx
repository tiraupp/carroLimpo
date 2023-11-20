import { Route, Routes } from "react-router-dom";

import { HomeAdm } from "../pages/HomeAdm";
import { HomeClient } from "../pages/HomeClient";

import { HomeProfessional } from "../pages/HomeProfessional";

import { Info } from "../pages/Info";
import { RegisterClient } from "../pages/RegisterClient";
import { RegisterProfessional } from "../pages/RegisterProfessional";
import { Selection } from "../pages/Selection";

import { ProtectedRoutes } from "../components/ProtectedRoutes";

import { AgendarServico } from "../pages/HomeClient/AgendarServico";
import { LocalizarProfissional } from "../pages/HomeClient/LocalizarProfissional";
import { MeuCadastro } from "../pages/HomeClient/MeuCadastro";
import { CadastroEndereco } from "../pages/HomeClient/MeuCadastro/CadastroEndereco";
import { CadastroPessoal } from "../pages/HomeClient/MeuCadastro/CadastroPessoal";
import { CadastroSeguranca } from "../pages/HomeClient/MeuCadastro/CadastroSeguranca";
import { CadastroVeiculo } from "../pages/HomeClient/MeuCadastro/CadastroVeiculo";
import { AtualizarVeiculo } from "../pages/HomeClient/MeuCadastro/CadastroVeiculo/AtualizarVeiculo";
import { CadastrarVeiculo } from "../pages/HomeClient/MeuCadastro/CadastroVeiculo/CadastrarVeiculo";
import { MeusVeiculos } from "../pages/HomeClient/MeuCadastro/CadastroVeiculo/MeusVeiculos";
import { VeiculoNaoCadastrado } from "../pages/HomeClient/MeuCadastro/CadastroVeiculo/VeiculoNaoCadastrado";
import { MeusAgendamentos } from "../pages/HomeClient/MeusAgendamentos";
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
        <Route path="/homeclient/*" element={<HomeClient />}>
          <Route
            path="localizarprofissional"
            element={<LocalizarProfissional />}
          />
          <Route path="agendarservico" element={<AgendarServico />} />
          <Route path="meusagendamentos" element={<MeusAgendamentos />} />
          <Route path="meucadastro/*" element={<MeuCadastro />}>
            <Route path="dadosPessoais" element={<CadastroPessoal />} />
            <Route path="endereco" element={<CadastroEndereco />} />
            <Route path="veiculos" element={<CadastroVeiculo />}>
              <Route
                path="veiculonaocadastrado"
                element={<VeiculoNaoCadastrado />}
              />
              <Route path="meusveiculos" element={<MeusVeiculos />} />
              <Route path="cadastrarveiculo" element={<CadastrarVeiculo />} />
              <Route path="atualizarveiculo" element={<AtualizarVeiculo />} />
            </Route>
            <Route path="seguranca" element={<CadastroSeguranca />} />
          </Route>
        </Route>

        <Route path="/info/:id" element={<Info />} />
      </Route>

      <Route path="*" element={<h1>Página não encontrada</h1>} />
    </Routes>
  );
};
