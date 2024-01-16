const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/mydb');

const usersSchema = {
    firstName: String,
    lastName: String,
    email: String,
    orgCategory: String,
    companyName: String,
    otherOrgCategory: String
};

const user = mongoose.model('user', usersSchema);

app.get('/', async (req, res) => {
    try {
        const users = await user.find({});
        res.render('index', {
            usersList: users
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(5000, function () {
    console.log('server is running');
});
