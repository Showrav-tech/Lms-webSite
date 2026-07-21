import express from 'express'

import cors from 'cors'

import 'dotenv/config'

const app = express()

app.use(cors())

app.get('/',(req,res)=>res.send("API Working"))

const PORT=process.env.PORT||5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})