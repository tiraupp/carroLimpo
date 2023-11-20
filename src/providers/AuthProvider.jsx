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

        api.defaults.headers.common.authorization = `Bearer ${token}`;

        const response = await api.get(`usuario`);

        const toNavigate = () => {
          switch (response.data.tipo_perfil) {
            case 0:
              return location.state?.pathname || "/homeadm";
            case 1:
              return location.state?.pathname || "/homeprofissional/agendamentos";
            case 2:
              return location.state?.pathname || "/homeclient/meusagendamentos";
          }
        };
        navigate(toNavigate());
        setUser(response.data);
      } catch (error) {
        toast.error(error.response.data.mensagem, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const recarregarDadosUsuario = async () => {
    try {
      const token = localStorage.getItem("@ts-carro_limpo:token");
      

      if (!token) {
        return;
      }

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      const response = await api.get(`usuario`);

      const toNavigate = () => {
 

location.state?.pathname 

        }
     
      navigate(toNavigate());
      setUser(response.data);
    } catch (error) {
      toast.error(error.response.data.mensagem, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async (data) => {
    try {
      const responseLogin = await api.post("/login", data);

      const {token: accessToken } = responseLogin.data;

      api.defaults.headers.common.authorization = `Bearer ${accessToken}`;
      
      localStorage.setItem("@ts-carro_limpo:token", accessToken);

      const responseUsuario = await api.get(`usuario`);

      

      const toNavigate = () => {
        switch (responseLogin.data.tipo_perfil) {
          case 0:
            return location.state?.pathname || "/homeadm";
          case 1:
            return location.state?.pathname || "/homeprofissional/agendamentos";
          case 2:
            return location.state?.pathname || "/homeclient/meusagendamentos";
        }
      };

      navigate(toNavigate());
      setUser(responseUsuario.data);
    } catch (error) {
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
    <AuthContext.Provider value={{ signIn, user, loading, recarregarDadosUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};
