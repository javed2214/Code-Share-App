const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const { redisClient } = require('../redis')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    redisClient.get(id, (err, data) => {
        if(data == null) res.render('error')
        else res.render('editor', { id })
    })
})

router.post('/', (req, res) => {
    const id = uuid.v4()
    redisClient.set(id, true)
    // redisClient.incr(id)
    redisClient.expire(id, 3600)
    res.json({ id })
})

module.exports = router