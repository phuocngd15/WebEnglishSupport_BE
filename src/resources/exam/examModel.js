import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            default: "No name",
            required: true,
            trim: true // chuan hoa title
        },
        type: {
            type: String,
            required: true
        },
        file_path: {
            type: String,
            required: true
        },
        file_minetype: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

examSchema.index({ name: 1 }, { unique: true });
export const Exam = mongoose.model('exam', examSchema);