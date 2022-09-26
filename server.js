const express = require('express');
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 4000;
const colors = require('colors');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const refreshRoutes = require('./routes/refreshRoutes');

// DB Connection
connectDB();

const app = express();

// Middleware
app.use("/images", express.static(path.join(__dirname, "..", "frontend", "public", "images")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(fileUpload());

// Routes
app.use('/api/auth', authRoutes);   
app.use('/api/refresh', refreshRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/user', userRoutes)

// Upload File
app.post('/api/upload', (req, res) => {
    if(req.files.image === null) {
        res.status(400);
        throw new Error('No File Uploaded');
    }
    const file = req.files.image;
    const ext = file.name.split('.').slice(-1)[0];
    if(ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
        res.status(415);
        throw new Error("File Type Not Supported, Only Supports 'png', 'jpg' and 'jpeg'");
    }
    const uploadPath = path.join(__dirname, "..", "frontend", "public", "images");
    file.mv(`${uploadPath}/${file.name}`, (err) => {
        if(err) {
            res.status(500);
            throw new Error(err);
        }
        res.status(200).json({ filename: file.name, filePath: `/images/${file.name}` })
    })
})

// Error Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log('The app is listening on port: ' + port);
});