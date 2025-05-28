import mongoose from "mongoose";

const RecieptSeriesCounterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
});

export const RecieptSeriesCounter = mongoose.models.RecieptSeriesCounter || mongoose.model("RecieptSeriesCounter", RecieptSeriesCounterSchema);