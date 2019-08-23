const express = require('express');
const router = new express.Router();
let db = require('../helpers/config');
const Event = db.Event;
const auth = require('../middleware/auth')
const User = db.User;

router.post('/reg', auth, async (req, res) => {
    const event = new Event({
        ...req.body,
        owner: req.user._id
    
    })
  
    try {
        await event.save()
        res.status(201).send(event)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/geti',auth,function(req, res) {
    
    uid = req.user._id
    Event.find({owner:uid},function(err, events) {
        if (err) {
            console.log(err);
        } else {
            res.json(events);
        }
    });
});

router.get('/get',function(req, res) {
    Event.find(function(err, events) {
        if (err) {
            console.log(err);
        } else {
            res.json(events);
        }
    });
});

router.post('/register',function(req, res) {
    let event = new Event(req.body);
    event.save()
        .then(event => {
            res.status(200).json({'Event': 'Event added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new Event failed');
        });
});

router.route('/edit/:id').get(function(req, res) {console.log(req);
    let id = req.params.id;
    Event.findById(id, function(err, event) {
        res.json(event);
    });
});

router.route('/update/:id').post(function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        if (!event)
            res.status(404).send('data is not found');
        else
            event.name = req.body.name;
            event.address = req.body.address;
            event.capacity = req.body.capacity;
            event.cost=req.body.cost;
            event.website=req.body.website;
            event.category=req.body.category;
            event.descript=req.body.descript;
            event.start_date=req.body.start_date;
            event.end_date=req.body.end_date;
            event.event_status=req.body.event_status;

            console.log(event);
            event.save().then(event => {
                res.json('event updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

router.delete('/del/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)

        if (!event) {
            res.status(404).send()
        }

        res.send(event)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router;
