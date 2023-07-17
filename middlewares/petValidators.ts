import { check } from "express-validator";
import { PetField } from "../enums/PetField";
import { PetType } from "../enums/PetType";
import { validateFields } from "./fieldsValidation";
import { Pet } from "../models/pet";

const nameRequiredValidator = check(PetField.NAME, "The name is required")
  .not()
  .isEmpty();

const optionalNameLengthValidator = check(PetField.NAME)
  .if(check(PetField.NAME).notEmpty())
  .isLength({ min: 2 });

export const typeValidator = check(PetField.TYPE, "The type not valid").isIn(
  Object.values(PetType)
);

export const optionalTypeValidator = check(PetField.TYPE, "The type not valid")
  .if(check(PetField.TYPE).notEmpty())
  .isIn(Object.values(PetType));

export const imageUrlValidator = check(
  PetField.IMAGE_URL,
  "The url doesn't seems right"
)
  .if(check(PetField.IMAGE_URL).notEmpty())
  .isURL();

export const notDeletedValidator = check(PetField.ID).custom(
  async (value, { req }) => {
    const id = value ?? req.params?.id;
    console.log("id", id);
    if (!id) {
      return true;
    }
    const pet = await Pet.findById(id);
    console.log("pet", pet);
    if (pet.deleted) {
      throw new Error("Pet was deleted");
    }
    return true;
  }
);

export const petCreationValidators = [
  nameRequiredValidator,
  typeValidator,
  imageUrlValidator,
  validateFields,
];

export const petUpdateValidators = [
  optionalNameLengthValidator,
  optionalTypeValidator,
  imageUrlValidator,
  notDeletedValidator,
  validateFields,
];

export const petGetValidators = [notDeletedValidator, validateFields];
export const petDeleteValidators = [notDeletedValidator, validateFields];
