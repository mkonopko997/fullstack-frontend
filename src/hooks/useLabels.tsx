import React, { createContext, FC, useContext, useState } from "react";

export const labels = {
  person: {
    label: "Person",
    value: "Mass",
  },
  starship: {
    label: "Starship",
    value: "Crew",
  },
};

export type LabelKeys = keyof typeof labels;

export const LabelsContext = createContext({
  labels: labels["person"],
  labelsType: "person",
  setLabelsType: (type: LabelKeys) => {},
});

export const LabelsProvider: FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const [labelsType, setLabelsType] = useState<LabelKeys>("person");
  const currentLabels = labels[labelsType];

  return (
    <LabelsContext.Provider
      value={{
        labels: currentLabels,
        labelsType,
        setLabelsType,
      }}
    >
      {children}
    </LabelsContext.Provider>
  );
};

export const useLabels = () => useContext(LabelsContext);
