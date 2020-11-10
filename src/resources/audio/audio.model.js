import mongoose from 'mongoose';

const audioSchema = new mongoose.Schema(
    {
        exam:{
           type: mongoose.Schema.Types.ObjectId,
           ref:'exam'
        },
        file_path: {
            type: String,
            required: true
        },
        file_mimetype: {
            type: String,
            required:true

        },
        
    },
    { timestamps: true }
)

export const Exam = mongoose.model('audio', examSchema);
