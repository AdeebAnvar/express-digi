// require('dotenv').config()
import 'dotenv/config'

// const express = require('express')
import express from 'express'
const app = express()

const port =process.env.PORT| 3000

app.use(express.json())

let teaData =[]
let nextId =1
// add tea data
app.post('/teas',(req,res)=>{
    const {name,price}=req.body
    const newTea ={id:nextId++,name,price}
    teaData.push(newTea)
    res.status(200).send(newTea)
    
})
// get tea data
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})
// get single tea data with param
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found!!')
    }
    res.status(200).send(tea)
})
// update single tea data with param

app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found!!')
    }
    const {name,price}=req.body
    tea.name=name
    tea.price=price
    res.status(200).send(tea)
    
})
// delete single tea data with param

app.delete('/teas/:id',(req,res)=>{
    
    const index = teaData.findIndex(t=>t.id===parseInt(req.params.id))
    if(index===-1){
        
        return res.status(404).send('Tea not found!!')
    }
    teaData.splice(index,1)
    res.status(200).send("deleted")
})
app.get("/",(req,res)=>{
    res.send('Hello World')
})
app.get("/ice-tea",(req,res)=>{
    res.send('What ice tea would you prefer')
})

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})