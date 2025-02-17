import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    imgUrl:{
        type: String,
        required: true,
    },
    videoUrl:{
        type: String,
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    },
    tags: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    dislikes: {
        type: [String],
        default: [],
    }
},
{
    timestamps: true
}
);

//find video by video ID
VideoSchema.statics.findVideoById = async function (id) {
    return await this.findById(id);
  };
  
  // Find Videos by User ID
  VideoSchema.statics.findVideosByUser = async function (userId) {
    return await this.find({ userId });
  };

  // Update Video
  VideoSchema.statics.updateVideo = async function (id, updateData) {
    return await this.findByIdAndUpdate(id, updateData, { new: true });
  };
  
  // Search Videos by Title or Tags
  VideoSchema.statics.searchVideos = async function (searchQuery) {
    let query = {};
  
    if (Array.isArray(searchQuery)) {
      query = { tags: { $in: searchQuery } }; // Search by multiple tags
    } else {
      query = {
        $or: [
          { title: { $regex: searchQuery, $options: "i" } }, // Search by title (case insensitive)
          { tags: { $in: [searchQuery] } },                  // Search by a single tag
        ],
      };
    }
  
    return await this.find(query).sort({ createdAt: -1 });
  };
  
  // Increment Views
  VideoSchema.methods.incrementViews = async function () {
    this.views += 1;  
    return await this.save();  
  };
  
  // Like a Video
  VideoSchema.statics.likeVideo = async function (videoId, userId) {
    return await this.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { likes: userId }, 
        $pull: { dislikes: userId }, 
      },
      { new: true }
    );
  };
  
  // Dislike a Video
  VideoSchema.statics.dislikeVideo = async function (videoId, userId) {
    return await this.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { dislikes: userId }, 
        $pull: { likes: userId }, 
      },
      { new: true }
    );
  };
  
  //Delete Video
  VideoSchema.statics.deleteVideo = async function (id) {
    return await this.findByIdAndDelete(id);
  };
  
  //  Get Trending Videos
  VideoSchema.statics.getTrendingVideos = async function () {
    // return await this.find().sort({ views: -1 }).limit(10);
    return await this.find().sort({ views: -1 });
  };
  
  // Get Videos with Specific Tags
  VideoSchema.statics.getVideosByTags = async function (tagsArray) {
    return await this.find({ tags: { $in: tagsArray } });
  };
  
  // Get Videos with Pagination
  VideoSchema.statics.getVideosWithPagination = async function (page, limit) {
    return await this.find()
      .skip((page - 1) * limit)
      .limit(limit);
  };

// Get random videos
VideoSchema.statics.getRandomVideos = async function (num = 1) {
  const count = await this.countDocuments(); 
  if (count === 0) return []; 

  num = Math.min(num, count); 

  const randomVideos = await this.aggregate([
    { $sample: { size: num } },
  ]);

  return randomVideos;
};
  
  const Video = mongoose.model("Video", VideoSchema);
  
  export default Video;