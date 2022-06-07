const router = require('express').Router();
const fileController = require('../controllers/file.controller');
const fileUpload = require('express-fileupload');
router.use(fileUpload({
    createParentPath: true
}));

//Get all files
router.get('/:userId', fileController.getFiles);
//Get one file
router.get('/specificFile/:userId/:id', fileController.getFile);
//update file
router.put('/:id', fileController.updateFile);
//delete file
router.delete('/:id', fileController.deleteFile);

//Upload
const uploadController = require('../controllers/upload.controller');
router.post('/:userId',  uploadController.uploadFile);

module.exports = router;
