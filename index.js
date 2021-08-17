const express = require('express');

const cors = require('cors');

const app = express();


const post = require('./post.js');

//const config = require('./config.js');

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "192.168.2.176:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}

app.use(express.json());

app.use(cors(
    config.application.cors.server
));


app.post('/api/posts', post.add); //Add post

app.get('/api/posts', post.list); //Get posts

app.get('/api/posts/:id', post.listID);  //Get post where ID


app.delete('/api/posts/:id', post.deleteID); //Delete post for id


app.put('/api/posts/:id', post.modID); //Moddify post for id

app.put('/api', post.test); //Moddify post for id

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Test listen ${port} `))