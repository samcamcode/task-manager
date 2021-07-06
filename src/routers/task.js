const express = require('express');
const Task = require('../models/task');
const router = new express.Router();
const auth = require('../middleware/auth');


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save()
    // .then((task) => res.status(201).send(task))
    // .catch((error) => res.status(400).send(error));
})

router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    //  /tasks?completed=true/false
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    // tasks?sortBy=createdAt:desc
    // -1 newest first, 1 oldest first
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        //                               one way to send back all tasks
        // const tasks = await Task.find({owner: req.user._id})
        // res.status(201).send(tasks)

        //                           another way to send back all tasks completed = true/false
        await req.user.populate({
            path: 'tasks',
            match,
            // tasks?limit={number}&skip={number}
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)

    } catch (error) {
        res.status(404).send(error)
    }
    // Task.find({})
    // .then((tasks) => res.send(tasks))
    // .catch((error) => res.status(404).send(error))
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send(error);
    //     }
    //     res.send(task)
    // }).catch((error) => res.status(500).send(error));
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        res.status(400).send('error: invalid updates')
    }

    try {
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id});
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        } 

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save();
        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router;