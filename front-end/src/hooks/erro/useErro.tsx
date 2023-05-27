import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function useErro() {

  const [erro, setErro] = useState<string|boolean>(false);
  useEffect(() => {
    if(erro) {
      toast.error(erro)
      setErro(false)
    }
  }, [erro])

  return {
    setErro
  }
}