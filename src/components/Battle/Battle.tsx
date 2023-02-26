import { FC, useState } from "react";
import { Button, Card, CardContent } from "@mui/material";
import {
  SelectedResources,
  useSelectedResourcesContext,
} from "@/hooks/useSelectedResourcesContext";
import { Team } from "@/components/Resources/team";
import { API, graphqlOperation } from "aws-amplify";
import { deleteResource } from "@/graphql/mutations";
import { useScoreContext } from "@/hooks/useScoreContext";
import { RESOURCES_QUERY_KEY } from "@/hooks/useResources";
import { useQueryClient } from "react-query";
import { useLabels } from "@/hooks/useLabels";

export const Battle: FC = () => {
  const { selectedResources, setSelectedResources } =
    useSelectedResourcesContext();
  const [winner, setWinner] = useState<Team>();
  const { incrementScore } = useScoreContext();
  const selectedResourcesKeys = Object.keys(selectedResources);
  const queryClient = useQueryClient();
  const {
    labels: { value: valueLabel, label },
  } = useLabels();

  const onFightClick = async () => {
    const resources = selectedResources as SelectedResources;
    const w =
      resources["BLUE"]?.value > resources["RED"]?.value ? "BLUE" : "RED";

    setWinner(w);
    incrementScore(w);
  };

  const onNewGameClick = async () => {
    await Promise.all(
      selectedResourcesKeys.map((key) =>
        API.graphql(
          graphqlOperation(deleteResource, {
            deleteResourceInput: {
              name: (selectedResources as SelectedResources)[key as Team]?.name,
            },
          })
        )
      )
    );
    await queryClient.invalidateQueries(RESOURCES_QUERY_KEY);
    setWinner(undefined);
    setSelectedResources({ clear: true });
  };

  return (
    <div className="flex-1 flex flex-col justify-center m-5 h-full">
      <div className="flex justify-center mb-5">
        <h1 className="text-2xl">Selected {label}s</h1>
      </div>

      <div className="flex w-full justify-around">
        {selectedResourcesKeys.map((key) => {
          const resource = (selectedResources as SelectedResources)[
            key as Team
          ];
          if (!resource) {
            return null;
          }

          const { name, value } = resource;

          return (
            <Card className="mb-3" key={key}>
              <CardContent
                {...(winner === key && { className: "bg-green-400" })}
              >
                <h1 className="text-2xl">{name}</h1>
                <span className="text-gray-500">
                  {valueLabel}: {value}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!winner && selectedResourcesKeys.length === 2 && (
        <div className="flex justify-center mt-5">
          <Button variant="contained" onClick={onFightClick}>
            Fight
          </Button>
        </div>
      )}

      {winner && (
        <div className="flex justify-center mt-5">
          <Button variant="contained" onClick={onNewGameClick}>
            New game
          </Button>
        </div>
      )}
    </div>
  );
};
