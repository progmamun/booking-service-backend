import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const UserSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    dob: {
      type: String,
    },
    profileImg: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "service",
      },
    ],

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "super_admin"],
      default: "user",
    },
    preferences: {
      nationality: {
        type: String,
      },

      language: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// Create a unique index for phoneNumber field
// Check if User exists
UserSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, "_id" | "password" | "phoneNumber" | "role"> | null> {
  return await User.findOne(
    { email },
    {
      _id: 1,
      email: 1,
      password: 1,
      role: 1,
      phoneNumber: 1,
    }
  );
};

// Check password match
UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

// Hash the password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

// Statics
const User = model<IUser, UserModel>("User", UserSchema);

export default User;
