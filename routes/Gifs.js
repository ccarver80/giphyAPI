var express = require("express");
var router = express.Router();
const fetch = require('node-fetch')
require('dotenv').config()

const { authUser } = require("../middleware/Authenticate");

const gif = require('../models').Gifs
const users = require('../models').Users

router.use(express.json());

router.get('/favorites/:id', async(req, res) => {
    try{
        const gifs = await gif.findAll({
            where: {
                userId: req.params.id
            }
        })

       res.status(200).json(gifs)
    }catch(err) {
        console.log(err)
    }
})

router.post('/addToFav', async(req, res) => {
    try{
        const user = await users.findOne({
            where: {
                id: req.body.id
            }
        })
        const createGif = await gif.create({url: req.body.url, userId: user.id})

        res.status(200).send()
    }catch(err){
        console.log(err)
    }
})

router.put('/favGifRating/:id', async(req, res) => {

    try{
        const findGif = await gif.update({rating: req.body.rating, comment: req.body.comment},{
        where: {
            id: req.params.id
        }
    })
    res.status(200).send() 

    }catch(err){
        console.log(err)
    }
    
})

router.delete('/deleteGif/:id', async(req, res) => {
    try{
        const deleteGif = await gif.destroy({
            where: {
                id: req.params.id
            }
        })

        res.status(200).send()
    }catch(err){
        console.log(err)
    }
})


module.exports = router