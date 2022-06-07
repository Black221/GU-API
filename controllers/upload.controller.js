const UserModel = require('../models/user.model');
const FileModel = require("../models/file.model");

module.exports.uploadFile = async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let file = req.files.file;
            const newFile = new FileModel({
                userId: req.params.userId,
                fileName: req.body.fileName,
                filePath: file.name,
                fileDescription: req.body.fileDescription
            });
            const newfile = await newFile.save();
            //Use the name of the input field (i.e. "file") to retrieve the uploaded file
            let fs = require('fs');
            let dir = `${__dirname}/../client/public/files/${req.body.login}`;

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, { recursive: true });
            }
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            await file.mv( `${dir}/${file.name}`);

            //send response
            res.send(newfile);
        }
    } catch (err) {
        const error = require('../utils/errors.utils');
        res.status(500).send(err);
    }
};