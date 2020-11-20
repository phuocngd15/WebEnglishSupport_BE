import mongoose, { Mongoose } from 'mongoose';

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        gender:{
            type:String,
            default:"Bạn chưa cập nhật.",
        },
        phone:{
            type:String,
            default:"Bạn chưa cập nhật.",
        },
        level:{
            type:String,
            default:"Cấp độ 1"
        }
     
    },
    { timestamps: true }
);

export const Profile = mongoose.model('profile', profileSchema);
