const mongoose = require('mongoose');
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window) // ALlows dompurifier to create html and purify it using jsdom window object

const blogsSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    markdown: {
        type: String,
        required: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }

}, {timestamps: true})

blogsSchema.pre('validate', function(next) {
    console.log('I validate');
    if(this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
    }
    next();
});

blogsSchema.statics.verifyId = function (id, req, res) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("The Id Provided Is Not Valid");
    }
};

module.exports = mongoose.model('Blogs', blogsSchema);