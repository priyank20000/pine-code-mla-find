import mongoose from 'mongoose';

const representativeSchema = new mongoose.Schema({
  pincode: { 
    type: String, 
    required: true,
    index: true 
  },
  areaDetails: {
    Name: String,
    District: String,
    State: String,
    Region: String,
    Circle: String,
    Division: String,
    Block: String,
    BranchType: String,
    DeliveryStatus: String,
    Country: String,
    Pincode: String
  },
  representatives: {
    mla: {
      name: String,
      party: String,
      phone: String,
      email: String,
      constituency: String
    },
    mp: {
      name: String,
      party: String,
      phone: String,
      email: String,
      constituency: String
    },
    corporators: [{
      name: String,
      party: String,
      phone: String,
      email: String,
      ward: String
    }]
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
});

export const Representative = mongoose.models.Representative || 
  mongoose.model('Representative', representativeSchema);