const asyncHandler = require('express-async-handler');
const User = require('../models/Users')
const Blogs = require('../models/Blogs')

const favouriteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { blog } = req.query;
    
    if(!id) {
        res.status(400);
        throw new Error("Credentials Not Provided");
    }
    if(!blog) {
        res.status(400);
        throw new Error("No Valid Resource Provided To Update");
    }

    User.verifyId(id, req, res);
    Blogs.verifyId(blog, req, res);

    const user = await User.findById(id);
    if(user) {
        const prevFav = user.favourites;
        const favExists = prevFav.filter((pre) => pre === blog);
        if(favExists.length > 0) {
            res.status(400);
            throw new Error('Blog Already Added To Favourites');
        }
        user.favourites = [...prevFav, blog];
        await user.save();
        res.status(200).json(user)
    }
    else {
        res.status(404);
        throw new Error("User Does Not Exist");
    }
});

module.exports = {
    favouriteBlog,
}