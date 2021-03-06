const express = require('express');
const Books = require('../Models/Books');
const Userbookinfo = require('../Models/UserBookInfo');
const router = express.Router();

router.post('/addBookinfo', async (req, res) => {
    try {

        var get = await Books.findOne({title: {'$regex': `^${req.body.bookname}$`,$options:'i'}})
        if(get){
            return res.json({status:1,get});
        }
        await Userbookinfo.create({
            email: req.body.email,
            name: req.body.name,
            bookname: req.body.bookname,
            bookauthor: req.body.bookauthor
        })
            .then(() => {
                res.json({ status: 0 });
            })
            .catch(() => {
                res.json({ status: -1 });
            })

    } catch (error) {
        res.json({ status: -2 });
    }
})


module.exports = router;