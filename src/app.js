require('dotenv').config();
const express = require('express');
const path = require('path');
const JOBS = require('./jobs');
const mustacheExpress = require('mustache-express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'mustache');
app.engine('mustache', mustacheExpress());

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'pages/index.html'));
    res.render('index', { jobs: JOBS });
    // console.log(JOBS);
});

app.get('/jobs/:id', (req, res) => {
    const id = req.params.id;
    console.log('req.params', req.params);

    const matchedJob = JOBS.find(job => job.id.toString() === id);
    res.render('job', { job: matchedJob});
    console.log('matchedJob', matchedJob);
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: 
    {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`);
});