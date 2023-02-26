/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AddResourceInput = {
  name: string,
  team: string,
  value: number,
};

export type Resource = {
  __typename: "Resource",
  name: string,
  team: string,
  value: number,
};

export type DeleteResourceInput = {
  name: string,
};

export type AddResourceMutationVariables = {
  addResourceInput: AddResourceInput,
};

export type AddResourceMutation = {
  addResource?:  {
    __typename: "Resource",
    name: string,
    team: string,
    value: number,
  } | null,
};

export type DeleteResourceMutationVariables = {
  deleteResourceInput: DeleteResourceInput,
};

export type DeleteResourceMutation = {
  deleteResource?: string | null,
};

export type GetResourcesQuery = {
  getResources?:  Array< {
    __typename: "Resource",
    name: string,
    team: string,
    value: number,
  } | null > | null,
};
