const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {

  const task = new Task({
    ...req.body,
    owner: req.user._id
  })

  try{
    const data = await task.save()
    res.send(data)
  }catch(err){
    res.status(400).send(err)
  }

} )

// GET /tasks?complted=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc  _desc
router.get('/tasks' , auth,  async (req, res) => {

  const match = { }
  const sort = { } 

  if( req.query.completed ){
    match.completed = req.query.completed === "true"
  }

  if(req.query.sortBy){
    const parts = req.query.sortBy.split(":")
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try{
    // const tasks = await Task.find({ owner: req.user._id })
    // res.send(tasks)
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt( req.query.limit ),
        skip: parseInt( req.query.skip ),
        sort
      }
    }).execPopulate()
    res.send(req.user.tasks)
  }catch(err){
    res.status(500).send()
  }
  
} )

router.get( '/tasks/:id', auth, async (req, res) => {

  const _id = req.params.id

  try{
    const task = await Task.findOne({ _id, owner: req.user._id })    


    if(!task) return res.status(404).send()
    res.send(task)
  }catch(err){
    res.status(500).send()
  }

} )

router.patch( '/tasks/:id', auth, async (req,res) => {
  const updates = Object.keys(req.body)
  const updateableItem = [ 'description', 'completed' ]
  const isValidUpdate = updates.every( update => updateableItem.includes(update) )

  if(!isValidUpdate) return res.status(400).send({ error: "Invalid Updates!!" })

  try{
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id  })
    // const task = await Task.findById(req.params.id)
    if(!task) return res.status(404).send()
    updates.forEach( update => task[update] = req.body[update]  )
    await task.save()
    // const task = await Task.findByIdAndUpdate( req.params.id, req.body, { new: true, runValidators: true } )
    
    res.send(task)
    
  }catch(err){
    res.status(400).send()
  }
} )

router.delete( '/tasks/:id', auth, async (req,res) => {
  try{
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if(!task) return res.status(404).send()
    res.send(task)
  }catch(err){
    res.status(500).send()
  }
} )







module.exports = router



