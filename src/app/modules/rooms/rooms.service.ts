/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/Apierror';
import Service from '../service/service.model';
import Room from './rooms.model';
import { IPaginationOptions } from '../../../interfaces/paginations';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

const createRoom = async (payload: any): Promise<any> => {
  const { building }: any = payload;
  const room = await Room.create(payload);
  if (!room) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'something went wrong, Room not created!',
    );
  }

  // Push the room's _id into the building's rooms array
  const updatedBuilding = await Service.findByIdAndUpdate(
    building,
    {
      $push: { rooms: room._id },
    },
    { new: true },
  );
  if (!updatedBuilding) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Rooms not insert in building.');
  }

  return room;
};
const getallRooms = async (
  filters: any,
  paginationOptions: IPaginationOptions,
): Promise<any> => {
  const { category, minPriceRange, maxPriceRange } = filters;
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const query: any = {};
  if (category) query.category = category;
  if (minPriceRange || maxPriceRange) {
    query.pricing = {};
    minPriceRange ? (query.pricing.$gte = Number(minPriceRange)) : null;
    maxPriceRange ? (query.pricing.$lte = Number(maxPriceRange)) : null;
  }
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Room.find(query)
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
const getsingleRooms = async (id: string): Promise<any> => {
  const result = await Room.findOne({ _id: id });
  return result;
};
const updateRoom = async (payload: any, id: string): Promise<any> => {
  const result = await Room.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteRoom = async (id: string): Promise<any> => {
  const result = await Room.findOneAndDelete({ _id: id });
  return result;
};

export const roomservices = {
  createRoom,
  getallRooms,
  getsingleRooms,
  updateRoom,
  deleteRoom,
};
