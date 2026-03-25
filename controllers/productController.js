import Product from '../models/product.js';
import { isAdmin } from './userController.js';

export async function createProduct(req, res) {

    if (!isAdmin(req)) {
        res.status(403).json({ message: "Access denied"});
        return;
    }

    try {
        const  exsistingProduct = await Product.findOne({
            productId: req.body.productId
        });
        if (exsistingProduct) {
            return res.status(400).json({ message: "Product already exists" });
        }

        const newProduct = new Product({
            productId: req.body.productId,
            name: req.body.name,
            alternativeName: req.body.alternativeName,
            price: req.body.price,
            labledPrice: req.body.labledPrice,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            brand: req.body.brand,
            model: req.body.model,
            category: req.body.category,
            isAvailable: req.body.isAvailable,
            stock: req.body.stock
        });

        await newProduct.save();
        res.json({ message: "Product created successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error creating product" });
    }
}

export async function getAllProducts(req, res) {
    try {
        if (isAdmin(req, res)) {
            const products = await Product.find();
            res.json(products);
        } else {
            const products = await Product.find({ isAvailable: true });
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
}

export async function deleteProduct(req, res) {
    if (!isAdmin(req, res)) {
        res.status(403).json({ message: "Access denied. Admin only" });
        return;
    }

    try {
        await Product.deleteOne({ productId: req.params.productId });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
}

export async function updateProduct(req, res) {
    if (!isAdmin(req, res)) {
        res.status(403).json({ message: "Access denied. Admin only" });
        return;
    }

    try {
        await Product.updateOne(
            { productId: req.params.productId },
            {
                name: req.body.name,
                alternativeName: req.body.alternativeName,
                price: req.body.price,
                labledPrice: req.body.labledPrice,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                brand: req.body.brand,
                model: req.body.model,
                category: req.body.category,
                isAvailable: req.body.isAvailable,
                stock: req.body.stock
            }
        );
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating product" });
    }
}

export async function getProductById(req, res) {
    try {
        const product = await Product.findOne({ productId: req.params.productId });
        if (product==null) {
            res.status(404).json({ message: "Product not found" });
        } else {
            if(product.isAvailable) {
                res.json(product);
            } else {
                if (isAdmin(req, res)) {
                    res.json(product);
                } else {
                    res.status(403).json({ message: "Access denied. Product is not available" });
                }
            }
        }
            
    } catch (error) {
        res.status(500).json({ message: "Error fetching product" });
    }
}
