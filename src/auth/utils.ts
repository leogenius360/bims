import { User } from "firebase/auth";
import { allowedUsers } from "@/config/site-config";

export const isSalesUser = (user?: User) => {
  return user && allowedUsers.sales.includes(user.email!);
};

export const isAdminUser = (user?: User) => {
  return user && allowedUsers.admins.includes(user.email!);
};
