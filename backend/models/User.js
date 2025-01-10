import mongoose from "mongoose";
import bcrypt from "bcrypt";
import httpStatusCodes from "http-status-codes";

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
      ],
      // mostrar error personalizado si el nombre de usuario ya existe
      validate: {
        validator: async function (username) {
          const user = await this.constructor.findOne({ username });
          if (user && user.id !== this.id) return false;
          return true;
        },
        message: "El nombre de usuario ya existe",
      },
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
      validate: {
        validator: async function (email) {
          const user = await this.constructor.findOne({ email });
          if (user && user.id !== this.id) return false;
          return true;
        },
        message: "El correo electrónico ya está en uso",
      },
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
      maxlength: [100, "La descripción no puede superar los 100 caracteres"],
    },
    city: {
      type: String,
      maxlength: [50, "La ciudad no puede superar los 50 caracteres"],
    },
    from: {
      type: String,
      maxlength: [50, "El lugar de origen no puede superar los 50 caracteres"],
    },
    website: {
      type: String,
      maxlength: [100, "La dirección del sitio web no puede superar los 100 caracteres"],
      validate: {
        validator: function (v) {
          if (v === "") return true;
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
        },
        message: "La dirección del sitio web no es válida",
      },
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

UserSchema.statics.getUser = async function (userId) {
  try {
    const user = await this.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  } catch (err) {
    throw new Error(err.message || "Error al obtener el usuario");
  }
};

UserSchema.statics.updateUser = async function (userId, updateData) {
  try {
    if (updateData.password)
      updateData.password = await bcrypt.hash(updateData.password, 12);
    return await this.findByIdAndUpdate(userId, updateData, { new: true });
  } catch (err) {
    next(err);
  }
};

UserSchema.statics.deleteUser = async function (userId) {
  try {
    const user = await this.findByIdAndDelete(userId);
    if (!user) {
      const err = new Error("Usuario no encontrado");
      err.status = httpStatusCodes.NOT_FOUND;
      throw err;
    }
    return user;
  } catch (err) {
    next(err);
  }
};

UserSchema.statics.followUser = async function (userId, followId) {
  if (userId === followId) {
    const err = new Error("No puedes seguirte a ti mismo");
    err.status = httpStatusCodes.BAD_REQUEST;
    throw err;
  }
  const user = await this.findById(userId);
  const followUser = await this.findById(followId);
  
  if (!user || !followUser) {
    const err = new Error("Usuario no encontrado");
    err.status = httpStatusCodes.NOT_FOUND;
    throw err;
  }

  if (!user.followings.includes(followId)) {
    await user.updateOne({ $push: { followings: followId } });
    await followUser.updateOne({ $push: { followers: userId } });
    return true;
  } else {
    const err = new Error("Ya sigues a este usuario");
    err.status = httpStatusCodes.BAD_REQUEST;
    throw err;
  }
};

UserSchema.statics.unfollowUser = async function (userId, unfollowId) {
  const user = await this.findById(userId);
  const unfollowUser = await this.findById(unfollowId);
  if (!user) {
    const err = new Error("Usuario no encontrado");
    err.status = httpStatusCodes.NOT_FOUND;
    throw err;
  }
  if (!unfollowUser) {
    const err = new Error("Usuario a dejar de seguir no encontrado");
    err.status = httpStatusCodes.NOT_FOUND;
    throw err;
  }

  if (user.followings.includes(unfollowId)) {
    await user.updateOne({ $pull: { followings: unfollowId } });
    await unfollowUser.updateOne({ $pull: { followers: userId } });
    return true;
  } else {
    const err = new Error("No sigues a este usuario");
    err.status = httpStatusCodes.BAD_REQUEST;
    throw err;
  }
};

export default mongoose.model("User", UserSchema);
