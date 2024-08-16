import { User } from "firebase/auth";
import { admins, delivery, sales } from "@/config/site-config";

export const isDeliveryUser = (user: User | null) => {
  return user && delivery.includes(user.email!);
};

export const isSalesUser = (user: User | null) => {
  return user && sales.includes(user.email!);
};

export const isAdminUser = (user: User | null) => {
  return user && admins.includes(user.email!);
};
