import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.ts";
import prisma from "../../prisma.service.ts";
import type {
  CreateSpotBody,
  SpotParams,
  UpdateSpotBody,
} from "../schemas/spot.schema.ts";

export const createSpot = async (
  req: AuthenticatedRequest<CreateSpotBody>,
  res: Response,
) => {
  try {
    const { title, latitude, longitude, observation } = req.body;
    const userId = req.user!.id;
    const spot = await prisma.spot.create({
      data: {
        title,
        latitude,
        longitude,
        userId,
        observation,
      },
    });

    return res.status(201).json({ message: "Spot created successfully", spot });
  } catch (e) {
    console.error("Spot create error: ", e);
    return res.status(500).json({ error: "Failed to create spot" });
  }
};

export const getAllSpots = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const spots = await prisma.spot.findMany({
      where: {
        userId: userId,
      },
    });

    return res.status(200).json({ spots });
  } catch (e) {
    console.error("Error while trying to get all spots", e);
    return res.status(500).json({ message: "Failed to fetch all spots" });
  }
};

export const getSpotById = async (
  req: AuthenticatedRequest<unknown, SpotParams>,
  res: Response,
) => {
  try {
    const spotId = req.params.id;
    const userId = req.user!.id;

    //Add some extra validation to param
    //do not run the query if the id is not a number
    //EX: tried with id some random text and request will run and catch the error
    const spot = await prisma.spot.findFirst({
      where: {
        userId: userId,
        id: spotId,
      },
    });

    if (!spot) {
      return res.status(400).json({ message: "Spot not found" });
    }

    return res.status(200).json({
      message: "Spot found",
      spot,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong", e });
  }
};

export const updateSpot = async (
  req: AuthenticatedRequest<UpdateSpotBody, SpotParams>,
  res: Response,
) => {
  try {
    const spotId = req.params.id;
    const userId = req.user!.id;
    const { title, latitude, longitude, observation } = req.body;
    const updatedSpot = await prisma.spot.update({
      where: {
        id: spotId,
        userId: userId,
      },
      data: { title, latitude, longitude, observation },
    });
    return res.status(200).json({ data: updatedSpot });
  } catch (e) {
    console.error(e);
    //handle resource not found error P2025
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteSpot = async (
  req: AuthenticatedRequest<unknown, SpotParams>,
  res: Response,
) => {
  try {
    const spotId = req.params.id;
    const userId = req.user!.id;
    const deletedSpots = await prisma.spot.deleteMany({
      where: {
        id: spotId,
        userId: userId,
      },
    });

    if (deletedSpots.count > 0) {
      return res.status(200).json({ message: "Spot deleted successfully" });
    } else {
      return res.status(400).json({ message: "Unable to delete spot" });
    }
  } catch (e) {
    console.error("Error while deleting spot", e);
    return res.status(500).json({ message: "Error while deleting spot" });
  }
};
