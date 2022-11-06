const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    phoneNo: {
      type: String,
      required: false,
    },
    postalCode: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User',
  },
  orderItems: [
    {
      name: {
        type: String,
        required: false,
      },
      quantity: {
        type: Number,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
      price: {
        type: Number,
        required: false,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Product',
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Date,
  },

  itemsPrice: {
    type: Number,
    required: false,
    default: 0.0,
  },
  taxPrice: {
    type: Number,
    required: false,
    default: 0.0,
  },
  shippingPrice: {
    type: Number,
    required: false,
    default: 0.0,
  },
  totalPrice: {
    type: Number,
    required: false,
    default: 0.0,
  },
  orderStatus: {
    type: String,
    required: false,
    default: 'Processing',
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
