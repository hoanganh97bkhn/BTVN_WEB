const express = require('express');
const postRouter = express();
const PostModel = require('./models')

postRouter.post('/',async(req,res)=>{
    try {
        if(!req.session.user) {
            res.status(403).json({
                message : 'Unauthenticated'
            });
        }
        if(req.session.user && req.session.user.permissions.indexOf('POST.CREATE') > -1){
            const postInfo = req.body;
            const newPost = await PostModel.create(postInfo);

            res.status(201).json(newPost);
        }
        else {
            res.status(403).json({
                message : 'ko dc'
            });
        }
       

        
    }
    catch (error){
        res.status(500).end (error.message);
    }
});

postRouter.get('/:postId', async(req,res)=>{
    try{
        const {postId} =req.params;
        const postInfo = await PostModel.findById(postId).populate({
            path : 'author',
            select : 'email firstName createAt'}).exec();

        res.status(200).json(postInfo);
    }
    catch (err) {
        res.status(500).end(err.message);
    }
});
postRouter.get('/',async (req,res) => {
    try {
        const {pageNumber, pageSize} = req.query;
        const totalRecord = await PostModel.find().countDocuments();
        const data = await PostModel.find()
        .skip(pageSize*(pageNumber-1))
        .limit(pageSize)
        .exec();

        res.status(200).json(data);
    }
    catch (error){
        res.status(500).end(error.message);
    }
})

module.exports = postRouter;