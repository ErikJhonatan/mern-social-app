import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'El ID del usuario es obligatorio'],
    },
    desc: {
      type: String,
      maxlength: [500, 'La descripción no puede superar los 500 caracteres'],
    },
    img: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(v);
        },
        message: 'La URL de la imagen debe ser válida y apuntar a una imagen',
      },
    },
    likes: {
      type: Array,
      default: [],
      validate: {
        validator: function (v) {
          return Array.isArray(v);
        },
        message: 'Los likes deben ser un arreglo',
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);