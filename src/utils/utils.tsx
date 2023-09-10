import { API_ENDPOINT } from "../config/constants"

export type Preferences = {
    userPreferences: {
        games: string[],
        teams: number[]
    }
}

export const fetchPreferences = async () => {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
    });
    const data: { preferences: Preferences } = await res.json();
    return data.preferences;
}

export const updatePreferences = async (preferences: Preferences) => {
    const token = localStorage.getItem("authToken");
    await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            preferences: preferences
        })
    });
}