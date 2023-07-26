import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: [53, "name should be under 53 Characters"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: Number,
    required: true,
    maxLength: [13, "Phone number should be under 13 Number"],
  },
  brand: {
    type: String,
    maxLength: [30, "Brand name should be under 30 Characters"],
    trim: true
  },
  jobTitle: {
    type: String,
    maxLength: [30, "Job Title name should be under 30 Characters"],
    trim: true,
  },
  superAdmin: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  permissions: {
    type: [Number],
  },
  active: {
    type: Boolean,
    default: true,
  },
  outlet: {
    type: String,
    ref: "Outlet",
  },
});
export const Admin = mongoose.model("Admin", adminSchema);
