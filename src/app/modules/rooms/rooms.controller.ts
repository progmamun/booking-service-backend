/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { roomservices } from './rooms.service';
import pick from '../../../shared/pick';
import { roomFilterableFields } from './rooms.constant';
import paginationFields from '../../../constants/pagination';
import httpStatus from 'http-status';

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomservices.createRoom(req.body);
  sendResponse<any>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Room created successfully',
    data: result,
  });
});
const getallRooms = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, roomFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await roomservices.getallRooms(filters, paginationOptions);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all room successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getsingleRooms = catchAsync(async (req: Request, res: Response) => {
  const result = await roomservices.getsingleRooms(req.params.id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get single room successfully',
    data: result,
  });
});

const updateRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomservices.updateRoom(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'room updated  successfully',
    data: result,
  });
});

const deleteRoom = catchAsync(async (req: Request, res: Response) => {
  const result = await roomservices.deleteRoom(req.params.id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'room deleted  successfully',
    data: result,
  });
});

export const roomController = {
  createRoom,
  getallRooms,
  getsingleRooms,
  deleteRoom,
  updateRoom,
};
