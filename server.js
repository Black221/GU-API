//Env variable and db config
require('dotenv').config({path: './config/.env'});
require('./config/db');

//Router declaration
const userRoutes = require('./routes/user.routes');
const fileRoutes = require('./routes/file.routes');

//Application initialisation
const express = require('express');
const app = express();


//Useful extension
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const {checkUser, requireAuth} = require("./middleware/auth.middleware");
const morgan = require('morgan');
const _ = require('lodash');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

//Router
app.use('/api/user', userRoutes);
app.use('/api/file', fileRoutes);

//GetPermissions
app.get('/api/permissions', (req, res) => {
    res.send({
        permission: [
            "read",
            "upload",
            "delete"
        ]
    });
});











// Server listening
app.listen(process.env.PORT, () =>{
    console.log(`Listening port: ${process.env.PORT}`);
})