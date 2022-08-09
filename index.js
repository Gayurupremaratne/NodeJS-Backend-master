require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressip = require('express-ip');
var multer = require('multer')
var cors = require('cors');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressip().getIpInfoMiddleware);
app.use(cors())
// app.use(express.static('public'));

app.use(cookieParser())
app.use(fileUpload())
app.use('/public', express.static(__dirname + '/public'))

const routes = require('./routes');
const response = require('./helpers/response');

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization');

    if (req.method == 'OPTIONS') { res.status(200).end(); } else { next(); }
});

// app.post('/upload', (req, res, next) => {
//     let uploadFile = req.files.file
//     const fileName = req.files.file.name;
//     console.log(fileName);
//     uploadFile.mv(
//         `${__dirname}/public/${fileName}`,
//         function (err) {
//             if (err) {
//                 return res.status(500).send(err)
//             }
//             res.json({
//                 file: `public/${req.files.file.name}`,
//             })
//         },
//     )
// });

app.use(routes);

app.use(function (req, res, next) {
    response.fail(req, res, response.message.invalid_url);
    return;
});

app.listen(process.env.PR_APP_PORT, () => {
    console.log('studio Web app listening on port', process.env.PR_APP_PORT)
});
