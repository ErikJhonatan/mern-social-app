import Joi from 'joi';

const username = Joi.string()
  .alphanum()
  .min(3)
  .max(20)
  .required()
  .messages({
    'string.base': 'El nombre de usuario debe ser un texto',
    'string.alphanum': 'El nombre de usuario solo puede contener letras, números, puntos y guiones bajos',
    'string.min': 'El nombre de usuario debe tener al menos 3 caracteres',
    'string.max': 'El nombre de usuario no puede superar los 20 caracteres',
    'any.required': 'El nombre de usuario es obligatorio',
  });

const email = Joi.string()
  .email()
  .max(50)
  .required()
  .messages({
    'string.base': 'El correo electrónico debe ser un texto',
    'string.email': 'El correo electrónico no es válido',
    'string.max': 'El correo electrónico no puede superar los 50 caracteres',
    'any.required': 'El correo electrónico es obligatorio',
  });

const password = Joi.string()
  .min(6)
  .required()
  .messages({
    'string.base': 'La contraseña debe ser un texto',
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es obligatoria',
  });

const profilePicture = Joi.string().default('');
const coverPicture = Joi.string().default('');
const followers = Joi.array().items(Joi.string()).default([]);
const followings = Joi.array().items(Joi.string()).default([]);
const isAdmin = Joi.boolean().default(false);

const desc = Joi.string()
  .max(100)
  .messages({
    'string.base': 'La descripción debe ser un texto',
    'string.max': 'La descripción no puede superar los 100 caracteres',
  });

const city = Joi.string()
  .max(50)
  .messages({
    'string.base': 'La ciudad debe ser un texto',
    'string.max': 'La ciudad no puede superar los 50 caracteres',
  });

const from = Joi.string()
  .max(50)
  .messages({
    'string.base': 'El lugar de origen debe ser un texto',
    'string.max': 'El lugar de origen no puede superar los 50 caracteres',
  });

const website = Joi.string()
  .uri()
  .max(100)
  .allow('')
  .messages({
    'string.base': 'La dirección del sitio web debe ser un texto',
    'string.uri': 'La dirección del sitio web no es válida',
    'string.max': 'La dirección del sitio web no puede superar los 100 caracteres',
  });

const relationship = Joi.number()
  .valid(1, 2, 3)
  .messages({
    'number.base': 'La relación debe ser un número',
    'any.only': 'La relación debe ser 1 (soltero), 2 (en una relación) o 3 (casado)',
  });

// Definición del esquema de usuario para la creación
const createUserSchema = Joi.object({
  username,
  email,
  password,
  profilePicture,
  coverPicture,
  followers,
  followings,
  isAdmin,
  desc,
  city,
  from,
  website,
  relationship
});

// Esquema para actualizar usuario - todos los campos son opcionales
const updateUserSchema = Joi.object({
  username: username.optional(),
  email: email.optional(),
  password: password.optional(),
  profilePicture: profilePicture.optional(),
  coverPicture: coverPicture.optional(),
  desc: desc.optional(),
  city: city.optional(),
  from: from.optional(),
  website: website.optional(),
  relationship: relationship.optional(),
  isAdmin: isAdmin.optional()
});

// Esquema para validar ID de usuario
const userIdSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'El ID de usuario debe ser un texto',
    'any.required': 'El ID de usuario es obligatorio'
  })
});

export { createUserSchema, updateUserSchema, userIdSchema };
