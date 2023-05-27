import { useState } from "react";

export function useMenu() {
  const [colapsed, setColapsed] = useState<boolean>(false);

  return {
    colapsed,
    setColapsed,
  };
}
