/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchasync';
import sendResponse from '../../../shared/sendResponse';
import { feedbackservices } from './feedback.service';
import httpStatus from 'http-status';

const postFeedBack = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackservices.postFeedBack(req.body);

  sendResponse<any>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'feedback posted successfully',
    data: result,
  });
});

const getallfeedBack = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackservices.getallfeedBack();
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'feedback retrieved successfully',
    data: result,
  });
});

const getsingleFeedBack = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackservices.getsingleFeedBack(req.params.id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'feedback retrieved successfully',
    data: result,
  });
});

const updatefeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackservices.updatefeedback(req.body, req.params.id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'feedback update successfully',
    data: result,
  });
});

const deleteFeedback = catchAsync(async (req: Request, res: Response) => {
  const result = await feedbackservices.deleteFeedback(req.params.id);
  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'feedback deleted successfully',
    data: result,
  });
});

export const feedbackController = {
  postFeedBack,
  getallfeedBack,
  getsingleFeedBack,
  updatefeedback,
  deleteFeedback,
};
