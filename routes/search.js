var express = require("express");
var router = express.Router();
const fetch = require('node-fetch')
require('dotenv').config()

const { authUser } = require("../middleware/Authenticate");

router.use(express.json());


router.post('/search', async(req, res) => {
    try{

        // Sends search request to Giphy and returns results back to client
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.body.search}`)
        const data = await response.json()
        //  send info back to client
        res.json({message: data})
    }catch(err){
        console.log(err)
    }
})

module.exports = router