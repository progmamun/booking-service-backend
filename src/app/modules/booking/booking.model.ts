import { Schema, model } from 'mongoose';

const BookingSchema = new Schema(
  {
    user: {
      name: {
        type: String,
        required: [true, 'email is required'],
      },
      email: {
        type: String,
        required: [true, 'email is required'],
      },
      phone: {
        type: String,
        required: [true, 'phone is required'],
      },
      nidOrBirth: {
        type: String,
        required: [true, 'nidOrBirth is required'],
      },
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'room',
      required: true,
    },
    totalFee: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    checkInDate: {
      type: String,
      required: true,
    },
    checkOutDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'closed'],
      default: 'pending',
    },
    payType: {
      type: String,
      enum: ['bkash', 'nagad', 'card', 'cash'],
    },
    payStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
    bookingNo: {
      type: String,
      unique: true,
    },
    forCheck: {
      type: String,
      default: 'booking',
    },
  },
  {
    timestamps: true,
  },
);

const Booking = model('booking', BookingSchema);
export default Booking;
