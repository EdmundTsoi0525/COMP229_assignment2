// server/routes/product.routes.js
import express from 'express';
import * as productController from '../controllers/product.controller.js';

const router = express.Router();

router.post('/products', productController.create);
router.get('/products', productController.list);
router.get('/products/:id', productController.findOne);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.remove);
router.delete('/products', productController.deleteAll);

export default router;
