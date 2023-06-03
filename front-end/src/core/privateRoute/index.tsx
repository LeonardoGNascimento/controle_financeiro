import { Navigate } from "react-router-dom";
import { Screen } from "../../componets/menu";
import { createContext } from "react";

interface Props {
  children: any;
}

export const Private = ({ children }: Props) => {
  const token = localStorage.getItem("@token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return <Screen>{children}</Screen>;
};
