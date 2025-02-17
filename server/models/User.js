import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    subscribers:{
        type: Number,
        default: 0,
    },
    subscribedUsers:{
        type: [String],
        default: [],
    },
},
{
    timestamps: true
}
);


//Find User by unique prop
UserSchema.statics.findOneUser = async function (prop) {
    return await this.findOne(prop);
  };
  
  //Find User by ID
  UserSchema.statics.findUserById = async function (id) {
    return await this.findById(id);
  };
  
  // Update User
  UserSchema.statics.updateUser = async function (id, updateData) {
    return await this.findByIdAndUpdate(id, updateData, { new: true });
  };
  
  //Delete User
  UserSchema.statics.deleteUser = async function (id) {
    return await this.findByIdAndDelete(id);
  };
  
  // get user with subscriber above count
  UserSchema.statics.getUsersWithSubscribersAbove = async function (count) {
    return await this.aggregate([
      { $match: { subscribers: { $gt: count } } },
      { $project: { name: 1, email: 1, subscribers: 1 } },
    ]);
  };
  
  //Check if Email Exists
  UserSchema.statics.emailExists = async function (email) {
    return (await this.findOne({ email })) ? true : false;
  };

  // Subscribe to a user
UserSchema.methods.subscribeToUser = async function (subscriberId) {
  if (!this.subscribedUsers.includes(subscriberId)) {
      this.subscribedUsers.push(subscriberId);
      return await this.save(); 
  }
  return this;
};

// Unsubscribe from a user
UserSchema.methods.unsubscribeUser = async function (subscriberId) {
  const index = this.subscribedUsers.indexOf(subscriberId);
  if (index > -1) {
    this.subscribedUsers.splice(index, 1);
    return await this.save(); 
  }
  return this;
};

// Change subscriber count by change value
UserSchema.methods.updateSubscriberCount = async function (change) {
  this.subscribers = Math.max(0, this.subscribers + change); 
  return await this.save();
};

// Get subscribed videos
UserSchema.methods.getSubscribedVideos = async function (VideoModel) {
  if (!this.subscribedUsers || this.subscribedUsers.length === 0) {
    return []; 
  }

  const videos = await VideoModel.find({ userId: { $in: this.subscribedUsers } }).sort({ createdAt: -1 });
  return videos;
};
  
  const User = mongoose.model("User", UserSchema);
  
  export default User;