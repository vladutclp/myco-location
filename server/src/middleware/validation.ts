import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodType } from "zod";

export const validateBody = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = schema.parse(req.body);
      req.body = validatedBody;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Body validation failed",
          details: err.issues.map((error) => ({
            field: error.path.join("."),
            message: error.message,
          })),
        });
      }

      next(err);
    }
  };
};

export const validateParams = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Params validation failed",
          details: err.issues.map((error) => ({
            field: error.path.join("."),
            message: error.message,
          })),
        });
      }

      next(err);
    }
  };
};

export const validateQueryParams = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Query params validation failed",
          details: err.issues.map((error) => ({
            field: error.path.join("."),
            message: error.message,
          })),
        });
      }

      next(err);
    }
  };
};
