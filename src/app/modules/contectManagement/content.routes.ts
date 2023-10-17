import express from 'express';
import {
  aboutUsController,
  blogController,
  faqController,
} from './content.controller';

export const blogRoutes = express.Router();
blogRoutes.post('/', blogController.createBlog);
blogRoutes.get('/', blogController.getallblogs);
blogRoutes.get('/:id', blogController.getsingleBlogs);
blogRoutes.patch('/:id', blogController.updateBlogs);
blogRoutes.delete('/:id', blogController.deleteBlog);

export const faqRoutes = express.Router();
faqRoutes.post('/', faqController.createfaq);
faqRoutes.get('/', faqController.getgallfaqs);
faqRoutes.get('/:id', faqController.getsinglefaqs);
faqRoutes.patch('/:id', faqController.updatefaqs);
faqRoutes.delete('/:id', faqController.deletefaq);

export const aboutUsRoutes = express.Router();
aboutUsRoutes.post('/', aboutUsController.createAboutUs);
aboutUsRoutes.get('/', aboutUsController.getAllAboutUs);
aboutUsRoutes.get('/:category', aboutUsController.getSingleAboutUs);
aboutUsRoutes.patch('/:id', aboutUsController.updateAboutUs);
aboutUsRoutes.delete('/:id', aboutUsController.deleteAboutUs);
