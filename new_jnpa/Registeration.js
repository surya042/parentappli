
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var ejs =require("ejs")

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))



app.post("/sign_up",(req,res)=>{
    var firstName = req.body.firstNameName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var orgCategory = req.body.orgCategory;
    var companyName = req.body.companyName;
    var otherOrgCategory = req.body.otherOrgCategory;

    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "email" : email,
        "orgCategory": orgCategory,
        "otherOrgCategory":otherOrgCategory,
        "companyName" : companyName,
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('index.html')

})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('C:\Users\RS SURYA\Desktop\new jnpa\Registration.html');
}).listen(3000);
// const mydbSchema={
//     firstName: String,
//     lastName: String,
//     email: String,
//     orgCategory: String,
//     companyName: String,
//     otherOrgCategory: String
// }
// const users= mongoose.model('users',mydbSchema);
// app.use(express.static(__dirname + '/public'));
// app.get('/', async (req, res) => {
//     try {
//         const users = await user.find({});
//         res.render('index', {
//             usersList: users
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

        
