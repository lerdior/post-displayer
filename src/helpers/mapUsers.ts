import { UserType } from "../types/User";

export const mapUser = ({ id, name, email, username, ...rest }: UserType) => ({
  id,
  name,
  email,
  username,
});
