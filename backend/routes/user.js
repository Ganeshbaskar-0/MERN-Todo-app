import express from "express"
const router = express.Router()
import todoModel from "../models/list.js"


//create Todo -Post(/todos)

router.post("/",async (req,res)=>{
    try{
        const {title,description} = req.body
        const newTodo =  new todoModel({title,description})
        await newTodo.save()
        console.log(newTodo)
        res.status(201).json(newTodo)        

    }
    catch(error)
    {
        res.status(500)
        console.log(`Message: ${error.message}`)
    }
})

//get all todos - get(/todos)

router.get("/",async (req,res)=>
{
    try{
    const allLists = await todoModel.find()
    console.log(allLists)
    res.status(200).json(allLists)
    }
        catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

//Update an Todo - put(/todos/:id)

router.put("/:id",async (req,res)=>{
    try
    {
    
    const {title,description}=req.body
    const id = req.params.id     
    const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        {title,
        description},
        {new:true}
    )
    if(!updatedTodo)
    {
        return res.status(404).json({Message: "Todo not found"})
    }
    res.status(200).json(updatedTodo)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }    
})

//get a specifi todolist - Get(/todos/:id)

router.get("/:id", async (req,res)=>{

    try{
        const todo = await todoModel.findById(req.params.id)
        console.log(todo)
        res.status(201).json(todo)
    }
    catch(error)
    {
        res.status(500).json({message:error.Message})
        console.log({Message :error.message})
    }
})


//Delete a Todo list - Delete(/todos/:id)
router.delete("/:id",async (req,res)=>{
    try{
    const delList = await todoModel.findById(req.params.id)
    console.log(`The list is ${delList.title} is Deleted`)
    await todoModel.findByIdAndDelete(req.params.id)
    res.status(200).json(delList)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
    
})
export default router;
