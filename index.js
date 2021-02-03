const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4200;

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());;

//mongodb
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lrix8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const homeCollection = client.db(`${process.env.DB_NAME}`).collection("homes");
    const experiencesCollection = client.db(`${process.env.DB_NAME}`).collection("experiences");
    const hotelsCollection = client.db(`${process.env.DB_NAME}`).collection("hotels");

    app.get("/hotels", (req, res) => {
        hotelsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.get("/experiences", (req, res) => {
        experiencesCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
    app.get("/homes", (req, res) => {
        homeCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.post('/details/:id', (req, res) => {
        const id = req.params.id;
        console.log(id);
        hotelsCollection.find({ _id: ObjectId(id)})
        .toArray((err, documents) => {
            res.send(documents)
        })
    })


});

app.get('/', (req, res) => {
    res.send("I am working")
})

app.listen(port);