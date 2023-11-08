import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { api } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("@ts-carro_limpo:token");

        if (!token) {
          return;
        }

        //const { id } = jwtDecode(token);

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        const response = await api.get(`usuario`);

        navigate(location.state?.pathname || "/home");

        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (data) => {
    try {
      const response = await api.post("/login", data);

      const { id: userResponse, token: accessToken } = response.data;

      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;

      localStorage.setItem("@ts-carro_limpo:token", accessToken);

      const toNavigate = location.state?.pathname || "/home";

      setUser(userResponse);
      navigate(toNavigate);
    } catch (error) {
      toast.error(error.response.data.mensagem, {
        position: "top-right",
        autoClose: 3000, // Tempo em milissegundos que o toast ficará visível
        hideProgressBar: false, // Exibir barra de progresso
        closeOnClick: true, // Fechar ao clicar no toast
        pauseOnHover: true, // Pausar ao passar o mouse
      });
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
