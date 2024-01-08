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

const modelName = 'Image';
let Image;

try {
  // Check if the model already exists
  Image = mongoose.model(modelName);
} catch (error) {
  // If the model doesn't exist, define it
  Image = mongoose.model(modelName, {
    _id: mongoose.Schema.Types.ObjectId,
    tokenId: Number,
    image: String,
  });
}

// Declaring the User Schema
const modelUser = 'User'
let User;

try {
  User = mongoose.model(modelUser)
} catch (error) {
  User = mongoose.model(modelUser, {
    _id: mongoose.Schema.Types.ObjectId,
    accountId: String,
    displayName: String,
    image: String,
  })
}

// New endpoint to get the highest ID
app.get('/api/getHighestId', async (req, res) => {
  try {
    const highestIdDocument = await Image.findOne().sort({ tokenId: -1 }).limit(1);

    if (highestIdDocument) {
      res.status(200).json({ success: true, highestId: highestIdDocument.tokenId });
    } else {
      res.status(404).json({ success: false, error: 'No images found' });
    }
  } catch (error) {
    console.error('Error getting highest ID from MongoDB:', error);
    res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
  }
});

// Define an endpoint to save images
app.post('/api/saveImage', async (req, res) => {
  const { tokenId, image } = req.body;

  try {

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

// Grab all images or the image with the tokenId
app.get('/api/getImages/:tokenId?', async (req, res) => {
  try {
    const Image = mongoose.model(modelName);

    if (req.params.tokenId) {
      // If tokenId is specified, retrieve a specific image
      const imageDocument = await Image.findOne({ tokenId: req.params.tokenId });

      if (!imageDocument) {
        return res.status(404).json({ success: false, error: 'Image not found' });
      }

      res.status(200).json({ success: true, image: imageDocument.image });
    } else {
      // If tokenId is not specified, retrieve all images
      const allImages = await Image.find();

      res.status(200).json({ success: true, images: allImages });
    }
  } catch (error) {
    console.error('Error getting image from MongoDB:', error);
    res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
  }
});

// Add new user API
app.post('/api/addNewUser', async (req, res) => {
  const { accountId, displayName, image } = req.body;

  try {
    const User = mongoose.model(modelUser);

    const newUser = new User({ _id: new mongoose.Types.ObjectId(), accountId, displayName, image });
    await newUser.save();

    console.log('User added successfully');
    res.status(200).json({ success: true, id: newUser._id, accountId: newUser.accountId, displayName: newUser.displayName });
  } catch (error) {
    console.error('Error adding new user:', error);
    res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
  }
});

// Check if the user exists on the database
app.get('/api/checkAccount/:accountId', async (req, res) => {
  const { accountId } = req.params;

  try {
    const User = mongoose.model(modelUser);
    const user = await User.findOne({ accountId });

    if (user) {
      console.log('Account exists in the database');
      res.status(200).json({ success: true });
    } else {
      console.log('Account does not exist in the database');
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.error('Error checking account:', error);
    res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
  }
});

// Update user avatar API
app.put('/api/updateUser/:accountId', async (req, res) => {
  const { accountId } = req.params;
  const { displayName, image } = req.body;

  try {
    const User = mongoose.model(modelUser);

    const updatedUser = await User.findOneAndUpdate({ accountId }, { displayName, image }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    console.log('User updated successfully');
    res.status(200).json({ success: true, id: updatedUser._id });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
  }
});

// Grab all the info of the user on the database
app.get('/api/getUser/:accountId', async (req, res) => {
  const { accountId } = req.params;

  try {
    const User = mongoose.model(modelUser);
    const user = await User.findOne({ accountId });

    if (user) {
      const { displayName, image } = user;
      console.log('User found in the database');
      res.status(200).json({ success: true, accountId, displayName, image });
    } else {
      console.log('User not found in the database');
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ success: false, error: `Internal Server Error: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
