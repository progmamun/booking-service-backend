import express from 'express';
import { feedbackController } from './feedback.controller';

export const feedbackRoutes = express.Router();
feedbackRoutes.post('/', feedbackController.postFeedBack);
feedbackRoutes.get('/', feedbackController.getallfeedBack);
feedbackRoutes.get('/:id', feedbackController.getsingleFeedBack);
feedbackRoutes.patch('/:id', feedbackController.updatefeedback);
feedbackRoutes.delete('/:id', feedbackController.deleteFeedback);
