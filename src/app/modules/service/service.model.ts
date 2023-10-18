import { Schema, model } from 'mongoose';
import { LocationEnum } from './service.constant';

const ServiceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },
    code: {
      type: String,
    },
    forCheck: {
      type: String,
      default: 'building',
    },
    location: {
      type: String,
      enum: LocationEnum,
      required: [true, 'location category is required'],
    },
    locationInDetails: {
      type: String,
      required: [true, 'location in details is required'],
    },
    category: {
      type: String,
      enum: [
        'Standard Room',
        'Deluxe Room',
        'Executive Room',
        'Suite',
        'Presidential or Royal Suite',
      ],
    },
    images: [
      {
        url: String,
        publicLink: String,
      },
    ],
    facilities: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
    },

    reviewAndRatings: [
      {
        rating: Number,
      },
      {
        comments: String,
      },
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      },
    ],
    minPriceRange: {
      type: String,
      default: 0,
    },
    maxPriceRange: {
      type: String,
      default: 0,
    },
    status: {
      type: String,
      enum: ['in progress', 'upcoming'],
      default: 'in progress',
    },
    comments: {
      type: String,
    },

    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'room',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Service = model('service', ServiceSchema);

export default Service;
