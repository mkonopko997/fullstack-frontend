import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BattleContainer } from "@/components/BattleContainer/BattleContainer";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { SelectedResourcesContextProvider } from "@/hooks/useSelectedResourcesContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ScoreContextProvider } from "@/hooks/useScoreContext";
import { LabelsProvider } from "@/hooks/useLabels";

Amplify.configure(awsExports);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnMount: false, refetchOnWindowFocus: false },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LabelsProvider>
        <ScoreContextProvider>
          <SelectedResourcesContextProvider>
            <BattleContainer />
          </SelectedResourcesContextProvider>
        </ScoreContextProvider>
      </LabelsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
