import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId, // Corrected
            ref: "Product",
        },
    ],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId, // Corrected
        ref: "users",
    },
    status: {
        type: String,
        default: 'Not Process',
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"] // Corrected "Cancel"
    }
},
{ timestamps: true });

export default mongoose.model("Order", orderSchema);
