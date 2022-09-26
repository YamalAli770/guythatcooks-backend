const asyncHandler = require('express-async-handler');
const Blogs = require('../models/Blogs')
const mongoose = require('mongoose');

const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
});

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    Blogs.verifyId(id, req, res);
    const blog = await Blogs.findById(id);
    if (blog) {
        return res.status(200).json(blog);
    }
    res.status(400);
    throw new Error("Cannot Find Blog With The Given Id")

});

const createBlog = asyncHandler(async (req, res) => {
    if(!req.user.isAdmin) {
        res.status(403);
        throw new Error("Not Enough Priviliges To Perform The Specified Operation");
    }
    const { author, title, category, img, desc, markdown } = req.body;
    if (!author || !title || !category || !img || !desc || !markdown) {
        res.status(400);
        throw new Error("All Fields Must Be Filled")
    }
    const blog = await Blogs.create({ author, title, category, img, desc, markdown });
    res.status(201).json(blog);
});

const updateBlog = asyncHandler(async (req, res) => {
    if(!req.user.isAdmin) {
        res.status(403);
        throw new Error("Not Enough Priviliges To Perform The Specified Operation");
    }
    const { id } = req.params;
    if(Object.keys(req.body).length === 0) {
        res.status(400);
        throw new Error("The field to be updated must be provided");
    }
    Blogs.verifyId(id, req, res);
    const blog = await Blogs.findById(id);

    if (!blog) {
        res.status(400);
        throw new Error("Cannot Find Blog With The Given Id")
    }
    blog.$set(req.body);
    const updatedBlog = await blog.save()
    res.status(200).json(updatedBlog)
});

const deleteBlog = asyncHandler(async (req, res) => {
    if(!req.user.isAdmin) {
        res.status(403);
        throw new Error("Not Enough Priviliges To Perform The Specified Operation");
    }
    const { id } = req.params;
    Blogs.verifyId(id, req, res);
    const blog = await Blogs.findById(id);

    if (!blog) {
        res.status(400);
        throw new Error("Cannot Find Blog With The Given Id")
    }
    const updatedBlogs = await Blogs.findByIdAndDelete(id, {new: true});
    res.status(200).json(updatedBlogs);
});

module.exports = {
    getAllBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}