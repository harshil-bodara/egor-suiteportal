const mongoose = require("mongoose");
const { Schema } = mongoose;

const MaintenanceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  unitNumber: {
    type: String,
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  status:{
      type:Boolean,
      default:true
  }
},{
  timestamps:true
});

const Maintenance = mongoose.model("Maintenance", MaintenanceSchema);
module.exports = Maintenance;