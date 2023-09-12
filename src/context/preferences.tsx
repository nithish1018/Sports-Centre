import React, { createContext, useState } from "react";
import { Preferences } from "../utils/utils";

interface PreferencesContextProps {
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
}

const PreferencesContext = createContext<PreferencesContextProps>({
  preferences: {
    userPreferences: {
      games: [],
      teams: [],
    },
  },
  setPreferences: () => {},
});

const PreferencesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [preferences, setPreferences] = useState({
    userPreferences: {
      games: [],
      teams: [],
    },
  });
  const valueToShare = {
    preferences,
    setPreferences,
  };
  return (
    <PreferencesContext.Provider value={valueToShare}>
      {children}
    </PreferencesContext.Provider>
  );
};
export { PreferencesContext, PreferencesProvider };
