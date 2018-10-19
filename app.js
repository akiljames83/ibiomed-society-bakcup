var express     = require("express"),
    forceSsl    = require('force-ssl-heroku'),
    bodyParser  = require("body-parser"),
    cmd         = require('node-cmd'),
    fs          = require('fs'),
    app         = express();
    
    

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(require("express-session")({
    secret : "A KDM original design",
    resave: false,
    saveUninitialized: false
    
}));
//app.use(forceSsl);

// fs.readdir("~/workspace/public/Meeting-Minutes", function(err, items) {
//     console.log(items);
 
//     for (var i=0; i<items.length; i++) {
//         console.log(items[i]);
//     }
// });
var files = [];
var newsletters = [];



var arrayOfFiles = fs.readdirSync(process.cwd() + "/public/Meeting-Minutes");
arrayOfFiles.forEach( function (file) {
    files.push(file);
});

var arrayOfFiles2 = fs.readdirSync(process.cwd() + "/public/Newsletters");
arrayOfFiles2.forEach( function (file) {
    newsletters.push(file);
});
//console.log(files);

app.get("/", function(req, res){
    res.render("index");
});
app.get("/student-life", function(req, res){
    res.render("studentlife", {newsletters:newsletters});
});

app.get("/administration", function(req, res){
    console.log(files.length);
    res.render("administration",{files:files,num:files.length});
});
app.get("/meet", function(req, res){
    res.render("meet");
});
app.get("/events", function(req, res){
    res.render("events");
});
app.get("/contact", function(req, res){
    res.render("contact");
});
app.post("/contact", function(req, res){
    // get data from form and add to campgrounds array
    //console.log(req.body);
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    
    var print = name + '\n' + phone + '\n' + email + '\n' + message + '\n' + '\t--- END OF FORM ---\n\n';
    var command = 'echo "'+print+'" >> form.txt' ;
    cmd.run(command);
    
    console.log(print);
    res.redirect('/contact');
    
});
// Still need to make the contact page



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("iBiomed Society Website is being served!");
});