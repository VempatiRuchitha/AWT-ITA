var express=require('express')
var http=require('http')
const users=[{"id":1,"name":"ab"},{"id":2,"name":"cde"}];

const { getEventListeners } = require('events');
var app=express()
app.use(express.json())
app.get('/getusers',(req,res)=>
{
    res.send(JSON.stringify(users))
})
app.get('/getusers/:id',(req,res)=>
{
    console.log(req.params.id)
    users.find((ele)=> {
     if(ele.id==parseInt(req.params.id))
    {
        res.json(ele)
    }
    
    else
    res.send("user with id is not present")
})
})
app.post('/post',(req,res)=>
{
    console.log(req.body)
    const user={
        id:req.body.id,
        name:req.body.name
    }
    users.push(user)
    res.json(users)
    res.end()
})
app.put('/putusers/:id',(req,res)=>
{
    const user=users.find(ele.id==parseInt(req.params.id))
    if(user)
    {
        user.name=req.body.name
        users.json(user)
    }
    else
    res.send("user with id is not present")
})
app.del('/delusers/:id',(req,res)=>
{
    const user=users.find(ele.id==parseInt(req.params.id))
    if(user)
    {
        user.splice(req.params.id,1)
        res.send("deleted")
    }
    else
    res.send("not deleted")
})

