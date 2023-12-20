// server.js
const express = require('express');
const { connectToDatabase } = require('./db.cjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB Atlas
connectToDatabase();

// Use cors middleware
app.use(cors());

// Define an endpoint to save images
app.post('/api/saveImage', async (req, res) => {
  const { tokenId, image } = req.body;

  try {
    // Check if the model already exists
    const modelName = 'Image';
    const existingModel = mongoose.modelNames().includes(modelName);

    if (!existingModel) {
      // Define the model if it doesn't exist
      const Image = mongoose.model(modelName, {
        _id: mongoose.Schema.Types.ObjectId,
        tokenId: Number,
        image: String,
      });
    }

    const Image = mongoose.model(modelName); // Retrieve the model

    const newImage = new Image({ _id: new mongoose.Types.ObjectId(), tokenId, image });

    await newImage.save();

    console.log('Image saved to MongoDB collection');
    res.status(200).json({ success: true, id: newImage._id, tokenId: newImage.tokenId });
  } catch (error) {
    console.error('Error saving image to MongoDB:', error);
    res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
  }
});

app.get('/api/getImages/:tokenId', async (req, res) => {
  const { tokenId } = req.params;

  try {
    const modelName = 'Image';
    const existingModel = mongoose.modelNames().includes(modelName);

    if (!existingModel) {
      return res.status(404).json({ success: false, error: 'Image not found' });
    }

    const Image = mongoose.model(modelName);
    const imageDocument = await Image.findOne({ tokenId });

    if (!imageDocument) {
      return res.status(404).json({ success: false, error: 'Image not found' });
    }

    res.status(200).json({ success: true, image: imageDocument.image });
  } catch (error) {
    console.error('Error getting image from MongoDB:', error);
    res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
