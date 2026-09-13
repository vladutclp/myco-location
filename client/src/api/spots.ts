import { authorizedFetch } from "./authorizedFetch";
import { BASE_API } from "./config";

export type AddNewSpotPayload = {
  title: string;
  latitude: number;
  longitude: number;
  observation?: string;
};

export const deleteSpot = async (spotId: number) => {
  const response = await authorizedFetch(`${BASE_API}/spots/${spotId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Cannot delete spot");
  }

  return;
};

export const getAllSpots = async () => {
  const response = await authorizedFetch(`${BASE_API}/spots`);
  if (!response.ok) {
    throw new Error("Something went wrong when trying to ge the spots");
  }

  return response.json();
};

export const addNewSpot = async (payload: AddNewSpotPayload) => {
  const response = await authorizedFetch(`${BASE_API}/spots`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};
