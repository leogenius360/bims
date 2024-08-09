import { User } from "firebase/auth";
import { admins, delivery, sales } from "@/config/site-config";

export const isDeliveryUser = (user?: User) => {
  return user && delivery.includes(user.email!);
};

export const isSalesUser = (user?: User) => {
  return user && sales.includes(user.email!);
};

export const isAdminUser = (user?: User) => {
  return user && admins.includes(user.email!);
};
