import { FC } from "react";
import { Resources } from "@/components/Resources/Resources";
import { Battle } from "@/components/Battle/Battle";
import { useResources } from "@/hooks/useResources";
import { CircularProgress } from "@mui/material";
import { ResourcesTypeSelection } from "@/components/ResourcesTypeSelection/ResourcesTypeSelection";

export const BattleContainer: FC = () => {
  const { isFetching } = useResources();

  if (isFetching) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex p-5 h-screen">
      <Resources team="BLUE" />
      <div className="w-1/2 flex flex-col">
        <ResourcesTypeSelection />
        <Battle />
      </div>
      <Resources team="RED" />
    </div>
  );
};
