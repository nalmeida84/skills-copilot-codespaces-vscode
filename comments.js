//Create web server
//Create a new express app
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(express.static('public'));

const comments = require('./comments.json');

//GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

//POST /comments
app.post('/comments', (req, res) => {
    const newComment = req.body;
    newComment.id = Date.now();
    comments.push(newComment);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Unable to save comment');
        } else {
            res.status(201).send('Comment added');
        }
    });
});

//Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});