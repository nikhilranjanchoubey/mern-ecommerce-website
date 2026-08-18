import dns from "dns";

// Use public DNS because the current network DNS
// is refusing MongoDB SRV queries.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

import productModel from "../models/productModel.js";


// --------------------------------------------------
// File paths
// --------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "../..");

const assetsFile = path.join(
    projectRoot,
    "frontend",
    "src",
    "assets",
    "frontend_assets",
    "assets.js"
);

const imageFolder = path.dirname(assetsFile);


// --------------------------------------------------
// Cloudinary configuration
// --------------------------------------------------

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});


// --------------------------------------------------
// Load products from frontend assets.js
// --------------------------------------------------

const loadProducts = () => {

    let source = fs.readFileSync(assetsFile, "utf8");

    // Find products array
    const start = source.indexOf("export const products = [");

    if (start === -1) {
        throw new Error(
            "Could not find 'export const products' in assets.js"
        );
    }

    source = source.substring(start);

    // Remove export statement
    source = source.replace(
        /^export const products\s*=\s*/,
        ""
    );

    // Convert image variables into filenames
    //
    // Example:
    // p_img1
    // becomes:
    // "p_img1.png"
    //
    // p_img2_1
    // becomes:
    // "p_img2_1.png"

    source = source.replace(
        /\bp_img\d+(?:_\d+)?\b/g,
        (match) => `"${match}.png"`
    );

    // Find the end of products array
    const end = source.lastIndexOf("]");

    if (end === -1) {
        throw new Error(
            "Could not find end of products array"
        );
    }

    source = source.substring(0, end + 1);

    // Convert JavaScript array text into actual array
    return Function(
        `"use strict"; return (${source})`
    )();
};


// --------------------------------------------------
// Upload image to Cloudinary
// --------------------------------------------------

const uploadImage = async (imageName) => {

    const imagePath = path.join(
        imageFolder,
        imageName
    );

    if (!fs.existsSync(imagePath)) {
        throw new Error(
            `Image not found: ${imagePath}`
        );
    }

    const result =
        await cloudinary.uploader.upload(
            imagePath,
            {
                folder: "mern-ecommerce/products",
                resource_type: "image"
            }
        );

    return result.secure_url;
};


// --------------------------------------------------
// Seed products
// --------------------------------------------------

const seedProducts = async () => {

    try {

        console.log("Connecting to MongoDB...");

        await mongoose.connect(
            `${process.env.MONGODB_URI}/e-commerce`
        );

        console.log("MongoDB connected.");


        // Load all products
        const products = loadProducts();

        console.log(
            `Found ${products.length} products.`
        );


        let added = 0;
        let skipped = 0;


        // Process every product
        for (let i = 0; i < products.length; i++) {

            const product = products[i];

            console.log(
                `\nProcessing ${i + 1}/${products.length}: ${product.name}`
            );


            // --------------------------------------------------
            // Check duplicate using ORIGINAL frontend _id
            // --------------------------------------------------

            const existingProduct =
                await productModel.findOne({
                    seedId: product._id
                });


            if (existingProduct) {

                console.log(
                    "Already exists - skipped."
                );

                skipped++;

                continue;
            }


            // --------------------------------------------------
            // Upload product images
            // --------------------------------------------------

            const imageUrls = [];


            for (const imageName of product.image) {

                console.log(
                    `Uploading ${imageName}...`
                );

                const imageUrl =
                    await uploadImage(imageName);

                imageUrls.push(imageUrl);
            }


            // --------------------------------------------------
            // Create MongoDB product
            // --------------------------------------------------

            const productData = {

                // Important:
                // Keep the original frontend product ID
                seedId: product._id,

                name: product.name,

                description: product.description,

                price: Number(product.price),

                image: imageUrls,

                category: product.category,

                subcategory: product.subCategory,

                sizes: product.sizes,

                bestseller:
                    Boolean(product.bestseller),

                date:
                    product.date || Date.now()
            };


            await productModel.create(
                productData
            );


            added++;

            console.log(
                "Product added successfully."
            );
        }


        // --------------------------------------------------
        // Final result
        // --------------------------------------------------

        console.log("\n================================");
        console.log("SEEDING COMPLETED");
        console.log("================================");

        console.log(
            `Products added : ${added}`
        );

        console.log(
            `Products skipped: ${skipped}`
        );

        console.log(
            `Total products : ${products.length}`
        );

        console.log("================================");


    } catch (error) {

        console.error("\nSEEDING ERROR:");
        console.error(error);

    } finally {

        await mongoose.connection.close();

        console.log(
            "\nMongoDB connection closed."
        );
    }
};


// Start seeding
seedProducts();