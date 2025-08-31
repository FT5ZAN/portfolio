import { Schema, model, models } from "mongoose";

export interface ISkill {
  name: string;
  level?: "beginner" | "intermediate" | "expert";
  image?: string; 
}

const SkillSchema = new Schema<ISkill>({
  name: { type: String, required: true, trim: true },
  level: { 
    type: String, 
    enum: ["beginner", "intermediate", "expert"], 
    default: "beginner"
  },
  image: { type: String, trim: true }, 
}
,{ timestamps: true } 
);

export default models.Skill || model<ISkill>("Skill", SkillSchema);
