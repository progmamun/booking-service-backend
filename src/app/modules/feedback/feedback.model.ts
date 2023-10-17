import { Schema, model } from "mongoose";

const feedBackSchema = new Schema(
  {
    rating: {
      type: String,
    },
    comments: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
export const Feedback = model("feedback", feedBackSchema);
