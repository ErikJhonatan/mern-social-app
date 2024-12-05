import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
      maxlength: [
        20,
        "El nombre de usuario no puede superar los 20 caracteres",
      ],
      unique: true,
      match: [
        /^[a-zA-Z0-9_.]+$/,
        "El nombre de usuario solo puede contener letras, números, puntos y guiones bajos",
      ]
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      maxlength: [
        50,
        "El correo electrónico no puede superar los 50 caracteres",
      ],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "El correo electrónico no es válido"], // Validación de formato
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      maxlength: [50, "La descripción no puede superar los 50 caracteres"],
    },
    city: {
      type: String,
      maxlength: [50, "La ciudad no puede superar los 50 caracteres"],
    },
    from: {
      type: String,
      maxlength: [50, "El lugar de origen no puede superar los 50 caracteres"],
    },
    relationship: {
      type: Number,
      enum: {
        values: [1, 2, 3],
        message:
          "La relación debe ser 1 (soltero), 2 (en una relación) o 3 (casado)",
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);
