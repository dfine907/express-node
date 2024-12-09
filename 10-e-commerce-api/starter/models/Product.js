const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const user = require('./User')

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a product name'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },

    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      default: 0,
    },

    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },

    image: {
      type: String,
      default: '/uploads/example.jpeg',
      required: true,
    },

    category: {
      type: String,
      required: [true, 'Please provide a product category'],
      enum: ['office', 'kitchen', 'bedroom'],
    },

    company: {
      type: String,
      required: [true, 'Please provide company'],
      enum: {
        values: ['ikea', 'liddy', 'marcos'],
        message: '{VALUE} is not supported',
      },
    },
    colors: {
      type: [String],
      default: ['#222'],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema)