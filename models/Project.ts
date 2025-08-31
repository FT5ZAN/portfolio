// import { Schema, model, models } from "mongoose";

// export interface IProject {
//   title: string;
//   description?: string;
//   github?: string;
//   live?: string;
//   image?: string; 
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const ProjectSchema = new Schema<IProject>(
//   {
//     title: { type: String, required: true, trim: true },
//     description: { type: String },
//     github: { type: String },
//     live: { type: String },
//     image: { type: String, trim: true }, 
//   },
//   { timestamps: true }
// );

// export default models.Project || model<IProject>("Project", ProjectSchema);
import { Schema, model, models } from "mongoose";

export interface IProject {
  title: string;
  description?: string;
  github?: string;
  live?: string;
  image?: string;
  type: "realtime" | "hobby"; // 👈 New field
  createdAt?: Date;
  updatedAt?: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    github: { type: String },
    live: { type: String },
    image: { type: String, trim: true },
    type: {
      type: String,
      enum: ["realtime", "hobby"], // 👈 only allow these values
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Project || model<IProject>("Project", ProjectSchema);
