import { API_ENDPOINT } from "../../config/constants";
export const fetchGames = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_GAMES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_GAMES_SUCCESS", payload: data.matches });
  } catch (error) {
    console.log("Error fetching members:", error);
    dispatch({ type: "FETCH_GAMES_FAILURE", payload: "Unable to load games" });
  }
};
