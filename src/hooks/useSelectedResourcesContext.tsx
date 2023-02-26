import React, { createContext, FC, useContext, useReducer } from "react";
import { Resource } from "@/API";
import { Team } from "@/components/Resources/team";

export type SelectedResources = Record<Team, Resource>;
export type SelectedResourcesState = SelectedResources | {};
type SelectedResourceAction = {
  team?: Team;
  value?: Resource;
  clear?: boolean;
};

export const SelectedResourcesContext = createContext({
  selectedResources: {},
  setSelectedResources: (el: SelectedResourceAction) => {},
});

const reducer = (
  state: SelectedResourcesState,
  { team, value, clear }: SelectedResourceAction
) => {
  if (clear) {
    return {};
  }

  return {
    ...state,
    [team as Team]: value,
  };
};

export const SelectedResourcesContextProvider: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [selectedResources, setSelectedResources] = useReducer(reducer, {});

  return (
    <SelectedResourcesContext.Provider
      value={{
        selectedResources,
        setSelectedResources,
      }}
    >
      {children}
    </SelectedResourcesContext.Provider>
  );
};

export const useSelectedResourcesContext = () =>
  useContext(SelectedResourcesContext);
