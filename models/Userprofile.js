import mongoose, { model } from "mongoose";

const UserprofileSchema = new mongoose.Schema({
    profileImage: { type: String,default:"/profile.png" },
    coverImage: { type: String,default:"/cover.png" },
    title:{type:String},
    about:{type:String},
    fuelCost:{type:Number, default:100, min: [100, 'fuelCost must be at least 100']},
    introLink:{type:String},
    website:{type:String},
    behance:{type:String},
    discord:{type:String},
    github:{type:String},
    facebook:{type:String},
    instagram:{type:String},
    linkedin:{type:String},
    pinterest:{type:String},
    telegram:{type:String},
    youtube:{type:String},
    snapchat:{type:String},
    reddit:{type:String},
    x:{type:String},
    whatsapp:{type:String}
}, {
    timestamps: true
});

export const Userprofile = mongoose.models.Userprofile || mongoose.model("Userprofile", UserprofileSchema);
