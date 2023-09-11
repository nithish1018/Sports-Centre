export type Sport = {
  id: number;
  name: string;
};
type Teams = {
  id: number;
  name: string;
};

export type ArticleInfo = {
  id: number;
  title: string;
  thumbnail: string;
  sport: Sport;
  date: string;
  summary: string;
  teams: Teams[];
};
export interface ArticlesState {
  articles: ArticleInfo[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
export type ArticlesActions =
  | { type: "FETCH_ARTICLES_REQUEST" }
  | { type: "FETCH_ARTICLES_SUCCESS"; payload: ArticleInfo[] }
  | { type: "FETCH_ARTICLES_FAILURE"; payload: string };

export const initialState: ArticlesState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const reducer = (
  state: ArticlesState = initialState,
  action: ArticlesActions,
): ArticlesState => {
  switch (action.type) {
    case "FETCH_ARTICLES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case "FETCH_ARTICLES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
