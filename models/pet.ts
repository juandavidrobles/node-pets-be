import { Schema, model } from "mongoose";
import { PetField } from "../enums/PetField";
import { PetType } from "../enums/PetType";

const PetSchema = new Schema({
  [PetField.NAME]: {
    type: String,
    required: [true, "The name is required"],
  },
  [PetField.TYPE]: {
    type: String,
    required: [true, "The type is required"],
    enum: Object.values(PetType),
  },
  [PetField.DESCRIPTION]: {
    type: String,
    required: false,
  },
  [PetField.IMAGE_URL]: {
    type: String,
    required: false,
  },
  [PetField.DELETED]: {
    type: Boolean,
    required: false,
  },
});

PetSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = doc._id;
    delete ret._id;
  },
});

export const Pet = model("Pet", PetSchema);
