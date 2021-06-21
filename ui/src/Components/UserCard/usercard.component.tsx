import React from "react";
import { UserPropTypes } from "../../Pages/Home/home.types";

export interface ICardProps {
  data: UserPropTypes[];
}

export default function UserCard(props: ICardProps) {
  return <div>{JSON.stringify(props.data)}</div>;
}
