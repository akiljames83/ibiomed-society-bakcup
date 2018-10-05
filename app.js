var express     = require("express"),
    forceSsl    = require('force-ssl-heroku'),
    bodyParser  = require("body-parser"),
    cmd         = require('node-cmd'),
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




app.get("/", function(req, res){
    res.render("index");
});
app.get("/student-life", function(req, res){
    res.render("studentlife");
});

app.get("/administration", function(req, res){
    res.render("administration");
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