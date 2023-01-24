import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: "Route does not exist" });
};
