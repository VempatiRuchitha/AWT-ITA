const { verify } = require('crypto')
var express=require('express')
var jwt=require('jsonwebtoken')
var app=express()
app.get('/getussers',(req,res)=>
{
    res.json({message:"post created"})
})
app.post('/post',verifyToken,(req,res)=>
{
    jwt.verify(req.token,'secretToken',(err,authData)=>
    {
        if(err)
        {
        res.sendStatus("404 not found")
        }
        else
        {
        res.json({message:"post created",authData})
        }
    })
})
app.post('/login',(req,res)=>
{
    const user={
        "id":1,
        "name":"abc"
    }
    jwt.sign({user},"secretToken",(err,token)=>
    {
        res.json({token})
    })
})
function verifyToken(req,res,next)
{
    const bearerHeader=req.headers['authorization']
    if(typeof bearerHeader!=='undefined' )
    {
    const header=bearerHeader.split(' ')
    const bearer=header[1]
    req.token=bearer
    next()
    }
    else
    res.sendStatus("not found")
}
app.listen(3000,()=>
{
    console.log("server started")
})