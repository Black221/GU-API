const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        fileDescription: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "Add description!!!"
        },
        filePath: {
            type: String,
            required: true,
            unique: true
        },
        visibility: {
            type: String,
            enum: {
                values:['public', 'private'],
                message: '{VALUE} is not supported'
            },
            default: "private"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('file', FileSchema);