const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name '],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 character'],
  },

  price: {
    type: Number,
    required: [true, 'Please enter price '],
    trim: true,
    maxLength: [20, 'Product price cannot exceed 20 character'],
    default: 0.0,
  },

  description: {
    type: String,
    required: [true, 'Please enter description '],
  },

  ratings: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: false,
      },
      url: {
        type: String,
        required: false,
      },
    },
  ],

  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
      ],
      message: 'Please select correct category for product',
    },
  },
  seller: {
    type: String,
    required: [true, 'Please enter the seller '],
  },

  stock: {
    type: Number,
    required: [true, 'please enter prodcut stock'],
    maxLength: [5, 'stock quantity cannot exceed 5 character'],
    default: 0,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Product', productSchema);
