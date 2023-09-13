import { toast } from "react-toastify";
import { API_ENDPOINT } from "../config/constants";

export type Preferences = {
  userPreferences: {
    games: string[];
    teams: number[];
  };
};

export const fetchPreferences = async () => {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data: { preferences: Preferences } = await res.json();
  if (!data.preferences.userPreferences) {
    updatePreferences({
      userPreferences: {
        games: [],
        teams: [],
      },
    });

    return {
      userPreferences: {
        games: [],
        teams: [],
      },
    };
  } else {
    return data.preferences;
  }
};

export const updatePreferences = async (preferences: Preferences) => {
  const token = localStorage.getItem("authToken");
  const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      preferences: preferences,
    }),
  });
  if (res.ok) {
    toast.success("Preferences Updated!!", { theme: "dark", autoClose: 1000 });
  } else {
    toast.error("Preferences Update Failed, Try Again", { theme: "dark", autoClose: 1000 });
  }
};
