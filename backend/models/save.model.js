import mongoose from "mongoose";

const saveSchema=new mongoose.Schema({
//userId:{
   //type:mongoose.Schema.Types.ObjectId,
  // ref:'User',
 //  required:true,
//},
userId:{
    type:String,
    required:true,
},
 items:[
    {
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    quantity:{
        type:Number,
        required:true,
        min:1,
          },
},
 ],
},{timestamps:true});



export const Save = mongoose.model("Save", saveSchema);
