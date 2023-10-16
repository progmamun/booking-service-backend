/* eslint-disable no-unused-expressions */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/paginations';
import Booking from './booking.model';
// import { generateBookingId } from "./booking.utiles";
import schedule from 'node-schedule';
import Room from '../rooms/rooms.model';

// import { bookingSearchableFields } from "./booking.constant";
// import { bookingSearchableFields } from "./booking.constant";

/* eslint-disable @typescript-eslint/no-explicit-any */
const createBooking = async (payload: any, id: string) => {
  const bookingNo = `BOOKING-${payload?.user?.phone}`;
  const { checkInDate, checkOutDate } = payload;
  const inDate = new Date(checkInDate).toISOString().split('T')[0];
  const outDate = new Date(checkOutDate).toISOString().split('T')[0];
  (payload.checkInDate = inDate), (payload.checkOutDate = outDate);
  payload.room = id;
  payload.bookingNo = bookingNo;
  const result = await Booking.create(payload);
  return result;
};

const getallBooking = async (
  payload: any,
  paginationOptions: IPaginationOptions,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  const query: any = {};
  if (payload.phone) {
    query['user.phone'] = { $regex: new RegExp(payload.phone), $options: 'i' };
  }
  if (payload.email) {
    query['user.email'] = { $regex: new RegExp(payload.email), $options: 'i' };
  }
  if (payload.bookingNo) {
    query.bookingNo = { $regex: new RegExp(payload.bookingNo), $options: 'i' };
  }

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Booking.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  return {
    meta: {
      page,
      limit,
      total: result.length,
    },
    data: result,
  };
};

const getSingleBooking = async (id: string) => {
  const result = await Booking.findById(id);

  return result;
};
const updateBooking = async (payload: any, id: string) => {
  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteBooking = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};
const cancelBooking = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(id, {
    $set: {
      status: 'cancelled',
    },
  });
  return result;
};
const updatebookingStatusByAdmin = async (payload: any, id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      $set: {
        status:
          (payload.status === 'confirmed' && 'confirmed') ||
          (payload.status === 'cancelled' && 'cancelled'),
        payStatus: payload.status === 'confirmed' && 'paid',
      },
    },

    {
      new: true,
    },
  );
  // eslint-disable-next-line no-cond-assign
  if (payload.status === 'confirmed' && result) {
    const findRoom = await Booking.findOne({
      $and: [{ _id: id }, { status: 'confirmed' }],
    });

    if (findRoom) {
      const updateHere = await Room.findByIdAndUpdate(
        findRoom?.room,
        {
          $set: {
            isBooked: true,
          },
        },
        {
          new: true,
        },
      );
      console.log(updateHere);
    }
  }

  return result;
};

// scheduling handler

const updateRoomBookingStatusScheduling = async (query?: any) => {
  const { id } = query;
  console.log(id);

  const now = new Date().toISOString().split('T')[0];

  const session = await mongoose.startSession();
  let result;
  try {
    session.startTransaction();
    if (!id) {
      const pastBookings = await Booking.find({
        checkOutDate: { $lt: now },
      });

      const roomIds = pastBookings.map(booking => booking.room);
      result = await Room.updateMany(
        {
          _id: {
            $in: roomIds,
          },
        },
        {
          $set: {
            isBooked: false,
          },
        },
      );

      if (result) {
        await Booking.updateMany(
          {
            _id: {
              $in: pastBookings?.map(booking => booking?._id),
            },
          },
          {
            $set: {
              status: 'closed',
            },
          },
        );
      }
    } else {
      const findOneBooking = await Booking.findById(id);
      if (findOneBooking) {
        result = await Room.findOneAndUpdate(
          { _id: findOneBooking?.room },
          {
            $set: {
              isBooked: false,
            },
          },
          {
            new: true,
          },
        );
      }
    }
    if (result) {
      await Booking.findByIdAndUpdate(
        id,
        {
          $set: {
            status: 'closed',
          },
        },
        {
          new: true,
        },
      );
    }
    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }

  return result;
};

const roomResetJobCallback = async () => {
  await updateRoomBookingStatusScheduling();
};

const roomResetSchedular = async () => {
  return schedule.scheduleJob('0 0 * * *', roomResetJobCallback);
};

roomResetSchedular();
export const bookingServices = {
  createBooking,
  getallBooking,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
  updatebookingStatusByAdmin,
  updateRoomBookingStatusScheduling,
};
