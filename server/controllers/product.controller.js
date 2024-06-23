import Product from '../models/product.model.js';
import mongoose from 'mongoose';

// Retrieve all Products or search by product name
export const list = async (req, res) => {
    const { name } = req.query;
    
    try {
        let products;
        if (name) {
            // If a name query parameter is provided, search by name
            products = await Product.find({ name: { $regex: new RegExp(name, 'i') } });
            if (products.length === 0) {
                return res.status(404).send({ message: "No products found" });
            }
        } else {
            // If no name query parameter is provided, retrieve all products
            products = await Product.find();
        }
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Create and Save a new Product
export const create = async (req, res) => {
    const product = new Product(req.body);
    try {
        const data = await product.save();
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Find a single Product with an id
export const findOne = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Product ID" });
    }
    try {
        const data = await Product.findById(id);
        if (!data) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update a Product by the id in the request
export const update = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Product ID" });
    }
    try {
        const data = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Delete a Product with the specified id in the request
export const remove = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid Product ID" });
    }
    try {
        const data = await Product.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Delete all Products from the database.
export const deleteAll = async (req, res) => {
    try {
        const data = await Product.deleteMany();
        res.status(200).send({ message: `${data.deletedCount} Products deleted successfully` });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};