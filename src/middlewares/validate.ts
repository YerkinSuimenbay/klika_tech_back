import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: "fail",
          errors: error.errors,
        });
      }
      next(error);
    }
  };