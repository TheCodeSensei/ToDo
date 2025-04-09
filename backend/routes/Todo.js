const express = require('express');
const router = express.Router();
const DBModel = require('../models/Todo')

router.get('/',async (request, response)=>{
    const Todos = await DBModel.find();
    response.json(Todos)
});

router.post('/',async (request, response)=>{
        const newTodo = new DBModel({
        Title: request.body.Title,
        Description : request.body.Description
        });
        await newTodo.save()
        response.json(newTodo)
});

router.put('/:id', async (request, response)=>{
    const id = request.params.id;
    const newTodo = await DBModel.findByIdAndUpdate(id, {
    completed : request.body.completed},
    {new:true},
    );
    response.json(newTodo)

});

router.delete('/:id', async (request, response)=>{
    const id = request.params.id;
    await DBModel.findByIdAndDelete(id)
    response.json('Record Deleted')
})

module.exports = router;