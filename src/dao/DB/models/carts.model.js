import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [ ]
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
