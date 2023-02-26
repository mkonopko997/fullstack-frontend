import { FC } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { LabelKeys, labels, useLabels } from "@/hooks/useLabels";

export const ResourcesTypeSelection: FC = () => {
  const { labelsType, setLabelsType } = useLabels();
  const handleChange = (event: SelectChangeEvent) => {
    setLabelsType(event.target.value as LabelKeys);
  };

  return (
    <div className="flex flex-col text-center m-5">
      Resource type
      <div>
        <FormControl variant="filled">
          <Select value={labelsType} label="Resource" onChange={handleChange}>
            {Object.keys(labels).map((el) => (
              <MenuItem value={el} key={el}>
                {el.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
