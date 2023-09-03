import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, ArticlesState, ArticlesActions } from "./reducer";
const ArticlesStateContext = createContext<ArticlesState | undefined>(undefined);
export const useArticlesState = () => useContext(ArticlesStateContext);
export const useArticlesDispatch = () => useContext(ArticleDispatchContext);
const ArticleDispatchContext = createContext<ArticlesDispatch | undefined>(undefined);
type ArticlesDispatch = React.Dispatch<ArticlesActions>;
export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ArticlesStateContext.Provider value={state}>
      <ArticleDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};