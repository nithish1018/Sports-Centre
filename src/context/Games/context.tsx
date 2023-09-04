import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, GamesState, GamesActions } from "./reducer";
const GamesStateContext = createContext<GamesState | undefined>(undefined);
export const useGamesState = () => useContext(GamesStateContext);
export const useGamesDispatch = () => useContext(GamesDispatchContext);
const GamesDispatchContext = createContext<GamesDispatch | undefined>(
  undefined,
);
type GamesDispatch = React.Dispatch<GamesActions>;
export const GamesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GamesStateContext.Provider value={state}>
      <GamesDispatchContext.Provider value={dispatch}>
        {children}
      </GamesDispatchContext.Provider>
    </GamesStateContext.Provider>
  );
};
