import { FC, SyntheticEvent } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { API, graphqlOperation } from "aws-amplify";
import { NameFormElement } from "@/components/BattleContainer/formTypes";
import { addResource } from "@/graphql/mutations";
import { RESOURCES_QUERY_KEY, useResources } from "@/hooks/useResources";
import { useSelectedResourcesContext } from "@/hooks/useSelectedResourcesContext";
import { Team } from "@/components/Resources/team";
import { useQueryClient } from "react-query";
import { useScoreContext } from "@/hooks/useScoreContext";
import { useLabels } from "@/hooks/useLabels";

export const Resources: FC<{
  team: Team;
}> = ({ team }) => {
  const { data, isFetching } = useResources();
  const { setSelectedResources } = useSelectedResourcesContext();
  const queryClient = useQueryClient();
  const { score } = useScoreContext();
  const {
    labels: { value: valueLabel, label },
  } = useLabels();

  const onSubmit = async (event: SyntheticEvent<NameFormElement>) => {
    event.preventDefault();
    await API.graphql(
      graphqlOperation(addResource, {
        addResourceInput: {
          name: event.currentTarget.elements.name.value,
          value: event.currentTarget.elements.value.value,
          team,
        },
      })
    );
    await queryClient.invalidateQueries(RESOURCES_QUERY_KEY);
  };

  return (
    <div className="h-full w-1/4 flex flex-col justify-between">
      <div className="flex flex-col overflow-auto">
        <div className={`text-center bg-${team.toLowerCase()}-300`}>
          <h1 className="text-2xl">Score: {score[team]}</h1>
        </div>
        <div className="overflow-auto">
          {data
            ?.filter((el) => el?.team === team)
            .map((el) => {
              if (!el) {
                return null;
              }

              const { name, value } = el;

              return (
                <Card className="mb-3" key={name}>
                  <CardContent>
                    <h1 className="text-2xl">{name}</h1>
                    <span className="text-gray-500">
                      {valueLabel}: {value}
                    </span>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => setSelectedResources({ team, value: el })}
                    >
                      Select
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col">
        <TextField id="name" placeholder="Name" />
        <TextField id="value" type="number" placeholder={valueLabel} />
        <Button variant="contained" type="submit" disabled={isFetching}>
          Add {label}
        </Button>
      </form>
    </div>
  );
};
