const express = require('express');
const router = new express.Router();
let db = require('../helpers/config');
const User = db.User;
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');

router.post('/add', async (req, res) => {
    const user = new User(req.body)
    
    try {
        await user.save()
        const token =await user.generateAuthToken()
        res.status(201).send({user})
        
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.u_email, req.body.u_password)
        res.send(true)
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send(200)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/get/me', auth ,async (req, res) => {
    res.send(req.user)
})

router.get('/get', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/update/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['u_name', 'u_email', 'u_password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

 router.post('/check', async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.u_email, req.body.u_password)
       
        const token = await user.generateAuthToken()
        
        res.send({success: true, err: null, token})

    } catch (e) {
        res.send({success: false})
    }
})


module.exports = router;

