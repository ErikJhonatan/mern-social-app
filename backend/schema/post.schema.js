import Joi from 'joi';

// Esquema para validación de ID de post
const id = Joi.number().integer().positive().messages({
    'number.base': 'El ID debe ser un número',
    'number.integer': 'El ID debe ser un número entero',
    'number.positive': 'El ID debe ser un número positivo',
    'any.required': 'El ID del post es obligatorio'
});

// Esquema para validación de ID de usuario
const userId = Joi.string().alphanum().min(3).max(30).messages({
    'string.alphanum': 'El ID de usuario solo puede contener caracteres alfanuméricos',
    'string.min': 'El ID de usuario debe tener al menos 3 caracteres',
    'string.max': 'El ID de usuario no puede exceder los 30 caracteres',
    'any.required': 'El ID de usuario es obligatorio'
});

// Esquema para validación de descripción
const desc = Joi.string().max(500).messages({
    'string.max': 'La descripción no puede exceder los 500 caracteres',
    'string.empty': 'La descripción no puede estar vacía',
    'any.required': 'La descripción del post es obligatoria'
});

// Esquema para validación de imagen
const img = Joi.string().uri()
    .pattern(/\.(jpg|jpeg|png|gif|bmp|webp)$/i)
    .messages({
        'string.uri': 'La imagen debe ser una URL válida',
        'string.pattern.base': 'La URL debe apuntar a una imagen con formato válido (jpg, jpeg, png, gif, bmp, webp)'
    });

// Esquema para validación de likes
const likes = Joi.array().items(Joi.string())
    .default([]);

// Esquema completo para crear un post
const createPostSchema = Joi.object({
    userId: userId.required(),
    desc: desc.required(),
    img: img
}).messages({
    'object.unknown': 'No se permiten propiedades adicionales'
});

const getPostSchema = Joi.object({
    id: id.required()
});

// Esquema completo para actualizar un post
const updatePostSchema = Joi.object({
    desc: desc,
    img: img
}).messages({
    'object.unknown': 'No se permiten propiedades adicionales'
});

// Esquema completo para eliminar un post
const deletePostSchema = Joi.object({
    id: id.required()
});

// Exportar los esquemas
export {
    createPostSchema,
    getPostSchema,
    updatePostSchema,
    deletePostSchema
};