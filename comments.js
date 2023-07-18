//Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
// Create app
const app = express();
// Use middleware
app.use(bodyParser.json());
app.use(cors());
// Create comments
const commentsByPostId = {};
// Create route
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});
// Create route
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});
// Listen port
app.listen(4001, () => {
    console.log('Listening on 4001');
});