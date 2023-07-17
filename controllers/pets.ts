import { RequestHandler } from "express";
import { Pet } from "../models/pet";

export const petByIdGet: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const pet = await Pet.findById(id);
  res.send({ ok: true, pet });
};

export const petsGet: RequestHandler = async (req, res) => {
  const { page = 1, limit = 1 } = req.query;
  if (Number(page) < 1) {
    return res.status(400).json({
      message: "Page not valid",
    });
  }
  if (Number(limit) < 1) {
    return res.status(400).json({
      message: "Limit not valid",
    });
  }
  const skip = (Number(page) - 1) * Number(limit);
  const pets = await Pet.find({
    deleted: { $ne: true },
  })
    .skip(skip)
    .limit(Number(limit));
  res.json({
    ok: true,
    pets,
  });
};

export const petsPost: RequestHandler = async (req, res) => {
  console.log(req);
  const { deleted, ...body } = req.body;

  const pet = new Pet(body);
  await pet.save();

  res.json({
    ok: true,
    message: "Record succesfully created",
    pet,
  });
};

export const petsPut: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { deleted, ...body } = req.body;
  const result = await Pet.findByIdAndUpdate(id, body);
  console.log("result", result);
  return res.json({
    ok: true,
  });
};

export const petsDelete: RequestHandler = async (req, res) => {
  const { id } = req.params;
  await Pet.findByIdAndUpdate(id, { deleted: true });
  return res.json({
    ok: true,
  });
};
