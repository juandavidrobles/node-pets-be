import { RequestHandler } from "express";

export const petsGet: RequestHandler = (req, res) => {
  res.json({
    ok: true,
    pets: [],
  });
};

export const petsPost: RequestHandler = (req, res) => {
  const { body } = req;
  console.log("body", body);
  res.json({
    ok: true,
    message: "Record succesfully created",
  });
};
