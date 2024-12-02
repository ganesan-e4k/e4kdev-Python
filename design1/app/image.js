// pages/api/images.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    // Path to the images directory
    const imagesDir = path.join(process.cwd(), 'public', 'Images', 'Customer');

    // Read the directory and filter image files
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read images directory' });
        }

        // Create a list of image URLs
        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/.test(file)) // Filter for common image formats
            .map(file => `/Images/Customer/${file}`); // Construct image URLs

        res.status(200).json(images); // Return the image URLs as JSON
    });
}
