import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Products nane must be provided'],

    },
    price: {
      type: Number,
      required: [true, 'Products price must be provided'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    company: {
      type: String,
      enum: {
        values: ['ikea', 'liddy', 'caressa', 'marcos'],
        message: '{VALUE} is not supported',
      },
      // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
    },
  }
);

export default mongoose.model('Products', ProductsSchema);
