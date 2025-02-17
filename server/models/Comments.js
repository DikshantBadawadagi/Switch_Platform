import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    videoId:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
},
{
    timestamps: true
}
);


// Find Comment by ID
CommentSchema.statics.findCommentById = async function (id) {
    return await this.findById(id);
  };
  
  // Get All Comments for a Video
  CommentSchema.statics.findCommentsByVideo = async function (videoId) {
    return await this.find({ videoId }).sort({ createdAt: -1 });
  };
  
  // Get All Comments by a User
  CommentSchema.statics.findCommentsByUser = async function (userId) {
    return await this.find({ userId }).sort({ createdAt: -1 });
  };
  
  //Create a New Comment
  CommentSchema.statics.createComment = async function (commentData) {
    return await this.create(commentData);
  };
  
  // Delete a Comment
  CommentSchema.statics.deleteComment = async function (id) {
    return await this.findByIdAndDelete(id);
  };
  
  // Update a Comment
  CommentSchema.statics.updateComment = async function (id, newDesc) {
    return await this.findByIdAndUpdate(id, { desc: newDesc }, { new: true });
  };
  
  // Get Comments with Pagination
  CommentSchema.statics.getCommentsWithPagination = async function (videoId, page, limit) {
    return await this.find({ videoId })
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit)
      .limit(limit);
  };
  
  const Comment = mongoose.model("Comment", CommentSchema);
  
  export default Comment;