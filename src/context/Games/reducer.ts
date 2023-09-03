type Games = {
    id: number;
    name: string;
    location: string;
    sportName: string;
    isRunning: any;

}
export interface GamesState {
    games: Games[];
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }
  export type GamesActions = 
  | { type: 'FETCH_GAMES_REQUEST' }
  | { type: 'FETCH_GAMES_SUCCESS'; payload: Games[] }
  | { type: 'FETCH_GAMES_FAILURE'; payload: string }

  export const initialState: GamesState = {
    games: [],
    isLoading: false,
    isError: false,
    errorMessage: ''
  };

export const reducer = (state: GamesState = initialState, action: GamesActions): GamesState => {
  switch (action.type) {
    case "FETCH_GAMES_REQUEST":
      return {
        ...state,
        isLoading: true
      };   
    case "FETCH_GAMES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        games: action.payload,
      };      
    case "FETCH_GAMES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true, 
        errorMessage: action.payload
      };          
    default:
      return state;
  }
}