const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>} all users in the db
 */
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>} one user information only by finding id
 */
module.exports.getUserInfo =  (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
         UserModel
            .findById({_id: req.params.id}, (err, docs) => {
                if (!err) {
                    res.send(docs);
                    console.log(docs);
                } else
                    console.log('ID unknown : \n' + err);
            })
            .select('-password');
    } catch (err) {
        console.log('Error id:'+req.params.id+'\n' + err);
    }
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>} update full name user by finding id
 */
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await UserModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
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
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>} update user's password only by finding id
 */
module.exports.updateUserPassword = async (req, res) => {
    if (req.params.set === 'passwd') {
        if (!ObjectID.isValid(req.params.id))
            return res.status(400).send('ID unknown');
        try {
            await UserModel.findByIdAndUpdate(
                {_id: req.params.id},
                {
                    $set: {
                        password: req.body.password
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
    } else {
        return res.status(404).send('Unknown request');
    }
};
/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>} delete a user by finding id
 */
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await UserModel
            .remove({_id: req.params.id})
            .exec();
        res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(500).send('Unknown request');

    }
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>} show user permission
 */
module.exports.readPermission = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown !!!');
    UserModel
        .findById(req.params.id, (err, docs) => {
            if (!err)
                res.send(docs);
            else
                console.log('ID unknown : \n' + err);
        })
        .select('permission');
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>} add a permission to a user
 */
module.exports.addPermission = async  (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await UserModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $addToSet: {permission: req.body.permission}
            },
            {
                new: true,
                upsert: true
            },
            (err, docs) => {
                if (!err) return res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

/**
 *
 * @param req
 * @param res
 * @returns {Promise<*>} remove
 */
module.exports.removePermission = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await UserModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $pull: {permission: req.body.permission}
            },
            {
                new: true,
                upsert: true
            },
            (err, docs) => {
                if (!err) return res.status(201).json(docs);
                else return res.status(400).json(err);
            }
        )
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

