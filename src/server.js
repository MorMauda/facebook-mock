require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer')

const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;

const app = express();
const port = process.env.PORT || 4000;
let userDate;


// static user details
// const userData = {
//     userId: "789789",
//     password: "123456",
//     name: "jojo",
//     username: "abcd",
//     isAdmin: true
// };
// app.use(express.static('./public'))

// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json({limit: "50mb"}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user; //set the user to req so other routes can use it
            next();
        }
    });
});

// request handlers
app.get('/', (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
    res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});

//compare date with data in db :

// validate the user credentials
app.post('/users/signin', function (req, res) {

    getUserFromDB(req).then(userData =>{

        if (userData == undefined || userData.length == 0){
            return res.status(401).json({
                error: true,
                message: "Username or Password is Not registered to AfekaBook."
            });
        }else {


            const user = userData[0].user_name;
            const pwd = userData[0].password;
            if (!user || !pwd) {
                return res.status(400).json({
                    error: true,
                    message: "Username or Password required."
                });
            }

            // return 401 status if the credential is not match.
            if (user !== userData[0].user_name || pwd !== userData[0].password) {
                return res.status(401).json({
                    error: true,
                    message: "Username or Password is Wrong."
                });
            }

            // generate token
            const token = utils.generateToken(userData[0]);

            // get basic user details
            const userObj = utils.getCleanUser(userData[0]);

            // return the token along with user details
            return res.json({user: userObj, token});
        }
    });


});

// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
    // check header or url parameters or post parameters for token
    getUserFromDB(req).then(userData=>{
        var token = req.body.token || req.query.token;
        if (!token) {
            return res.status(400).json({
                error: true,
                message: "Token is required."
            });
        }
        // check token that was passed by decoding token using secret
        jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
            if (err) return res.status(401).json({
                error: true,
                message: "Invalid token."
            });

            // return 401 status if the userId does not match.
            if (user.userId !== userData.userId) {
                return res.status(401).json({
                    error: true,
                    message: "Invalid user."
                });
            }
            // get basic user details
            var userObj = utils.getCleanUser(userData);
            return res.json({ user: userObj, token });
        });
    });
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Component/pics')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
});
var upload = multer({ storage: storage }).single('file')

// var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});
require("./routes/routes.js")(app);

app.listen(port, () => {
    console.log('Server started on: ' + port);
});



function getUserFromDB(req){
    const response = fetch('http://localhost:4000/users/fetchUserFromDB', {
        method: 'post',
        body:    JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res =>res.json())
    return response;
}