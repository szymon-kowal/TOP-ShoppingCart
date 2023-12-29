import type { ContextType } from "../pages/Root";
import { useOutletContext } from "react-router-dom";

function useMyContext(): ContextType {
  return useOutletContext<ContextType>();
}

export default useMyContext;
