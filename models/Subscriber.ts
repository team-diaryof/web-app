import { Schema, model, models } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
  },
  {
    timestamps: true,
  }
);

const Subscriber = models.Subscriber || model("Subscriber", SubscriberSchema);

export default Subscriber;