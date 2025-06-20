const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = 3001;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Use the filename from the request or generate one
    const fileName = req.body.fileName || `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Path to content.json file
const CONTENT_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

// GET: Load current content
app.get('/api/content', async (req, res) => {
  try {
    const content = await fs.readFile(CONTENT_FILE_PATH, 'utf-8');
    res.json(JSON.parse(content));
  } catch (error) {
    console.error('Error reading content file:', error);
    res.status(500).json({ error: 'Failed to load content' });
  }
});

// POST: Save content to file
app.post('/api/content', async (req, res) => {
  try {
    const content = req.body;
    
    // Validate content structure
    if (!content.hero || !content.partners || !content.projects) {
      return res.status(400).json({ error: 'Invalid content structure' });
    }

    // Write to content.json file
    await fs.writeFile(CONTENT_FILE_PATH, JSON.stringify(content, null, 2), 'utf-8');
    
    console.log('Content saved successfully at:', new Date().toISOString());
    res.json({ 
      success: true, 
      message: 'Content saved successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error saving content file:', error);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// POST: Upload image files
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const fileName = req.file.filename;
    const filePath = `/uploads/${fileName}`;
    
    console.log('✅ Image uploaded successfully:', fileName);
    res.json({ 
      success: true, 
      path: filePath,
      fileName: fileName,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// POST: Save images to public/uploads directory (legacy base64 endpoint)
app.post('/api/upload-base64', async (req, res) => {
  try {
    const { filename, data } = req.body;
    
    if (!filename || !data) {
      return res.status(400).json({ error: 'Filename and data are required' });
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    // Remove data URL prefix if present
    const base64Data = data.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // Save file
    const filePath = path.join(uploadsDir, filename);
    await fs.writeFile(filePath, base64Data, 'base64');
    
    console.log('Image saved:', filename);
    res.json({ 
      success: true, 
      path: `/uploads/${filename}`,
      message: 'Image uploaded successfully' 
    });
  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Content API server running on http://localhost:${PORT}`);
  console.log(`📝 Content file: ${CONTENT_FILE_PATH}`);
});
