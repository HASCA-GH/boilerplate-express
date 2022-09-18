
var bodyParser = require("body-parser");
let express = require('express');
let app = express();
require('dotenv').config();

// console.log("Hello World")
// const absolutePath = __dirname + "/views/index.html"

/** 3) Serve an HTML file */
app.get("/", function (req, res) {
    // res.send("Hello Express is running dude! xxxxx ");
    // res.sendFile(absolutePath);
    res.sendFile(__dirname + "/views/index.html");
});


/** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'));

/** 5) serve JSON on a specific route */
/** 6) Use the .env file to configure the app */
app.get("/json", (req, res)=> {
    let message = "Hello json ... "
    if (process.env.MESSAGE_STYLE ==="uppercase") {
        res.json({"message": message.toUpperCase()});
    }
    else {
        res.json({"message": message});
    }
});

/** 7) Root-level Middleware - A logger */
app.use((req, res, next) => {
    // for each request (get, post, etc) a log in the node console is shown
    console.log(req.method + " " + req.path + " - " + req.ip + " - " + req.hostname);
    next();
});

/** 8) Chaining middleware. A Time server */
app.get('/now',
    (req, res, next)=>{
        req.time = new Date().toString();
        next();
    },
    (req, res)=> {
        res.send({"Time": req.time});
    }
);

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', (req, res)=>{
    const {word} = req.params
    res.json({"echo": word });
});

/** 10) Get input from client - Query parameters */
//   /name?first=<firstname>&last=<lastname>
//   /name?first=Humberto&last=Asca
app.get('/name', (req, res)=> {
    const {first, last} = req.query;
    res.json({"Name" : `${first} ${last}`});
});

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/** 12) Get data form POST  */
app.post('/name', (req, res)=> {
    var name = req.body.first + " "  + req.body.last;
    res.json({"Name" : name});
})

module.exports = app;