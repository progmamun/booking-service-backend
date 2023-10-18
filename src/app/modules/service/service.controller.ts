/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { serviceServices } from './service.service';
import pick from '../../../shared/pick';
import { ServiceFilterableFields } from './service.constant';
import paginationFields from '../../../constants/pagination';
import httpStatus from 'http-status';

const createBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.createBuilding(req.body);
  sendResponse<any>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'service created successfully',
    data: result,
  });
});

const getAllBuildings = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ServiceFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await serviceServices.getAllBuildings(
    filters,
    paginationOptions,
  );
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.getSingleBuilding(req.params.id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service retrieved successfully',
    data: result,
  });
});

const updateBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.updateBuilding(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service updated successfully',
    data: result,
  });
});

const deleteBuilding = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceServices.deleteBuilding(req.params.id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  createBuilding,
  getAllBuildings,
  getSingleBuilding,
  deleteBuilding,
  updateBuilding,
};
