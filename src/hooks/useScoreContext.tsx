import React, { createContext, FC, useContext, useReducer } from "react";
import { Team } from "@/components/Resources/team";

export type ScoreContextState = Record<Team, number>;

const defaultValue = { BLUE: 0, RED: 0 };
export const UseScoreContext = createContext({
  score: defaultValue,
  incrementScore: (team: Team) => {},
});

const reducer = (state: ScoreContextState, team: Team) => {
  return {
    ...state,
    [team]: state[team] + 1,
  };
};

export const ScoreContextProvider: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [score, incrementScore] = useReducer(reducer, defaultValue);

  return (
    <UseScoreContext.Provider
      value={{
        score,
        incrementScore,
      }}
    >
      {children}
    </UseScoreContext.Provider>
  );
};

export const useScoreContext = () => useContext(UseScoreContext);
