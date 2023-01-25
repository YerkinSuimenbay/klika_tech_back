import { check } from "express-validator";
import { Order } from "../../enums";

export const orderSanitizer = check("order").customSanitizer(
  (order: string) => {
    if (!order) return "";

    order = order.toUpperCase();
    if (order !== Order.ASC && order !== Order.DESC) return "";
    return order;
  }
);
