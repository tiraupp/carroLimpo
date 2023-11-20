import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { api } from "../services/api";

export const RegisterContext = createContext({});

export const RegisterProvider = ({ children }) => {
  const navigate = useNavigate();

  const usuarioRegister = async (data) => {
    try {
      const response =
        data.tipo_perfil === 2
          ? await api.post("/usuario", data)
          : await api.post("/profissional/cadastro", data);
      toast.success(
        `${response.data.nome}, seu cadastro foi efetuado com sucesso!`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    <RegisterContext.Provider value={{ usuarioRegister }}>
      {children}
    </RegisterContext.Provider>
  );
};
