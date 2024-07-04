import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
	title: String;
	description: String;
	status: String;
	createdAt: Date;
	updatedAt: Date;
}

const productSchema: Schema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		status: { type: String, required: true },
	},
	{ timestamps: true }
);

const Product =
	mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;
