const FileModel = require('../models/file.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

/**
 *
 * @param req
 * @param res
 * @returns {*} User Files
 */
module.exports.getFiles = (req, res) => {
    if (!ObjectID.isValid(req.params.userId))
        return res.status(400).send('ID unknown');
    UserModel.findById({_id: req.params.userId}, (err, docs) => {
        if (err)
            return res.status(400).send('User id unknown');
    });
    FileModel.find({userId: req.params.userId },(err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data');
    });
}

/**
 *
 * @param req
 * @param res
 * @returns {*} describe on file
 */
module.exports.getFile = (req, res) => {
    if (!ObjectID.isValid(req.params.userId) && !ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    UserModel.findById({_id: req.params.userId}, (err, docs) => {
        if (!err)
            return res.status(400).send('User id unknown');
    });
    FileModel.findOne({_id: req.params.id, userId: req.params.userId},(err, docs) => {
        if (err) res.send(docs);
        else console.log('Error to get data');
    });
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.deleteFile = async (req, res) => {
    if (!ObjectID.isValid(req.params.userId) && !ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await FileModel
            .remove({_id: req.params.id})
            .exec();
        res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(500).send('Unknown request\n'+err);
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
module.exports.updateFile = async (req, res) => {
    if (!ObjectID.isValid(req.params.userId) && !ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await FileModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    description: req.body.description
                }
            },
            { new: true, upset: true, setDefaultsOnInsert: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(500).send({ message: err});
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}