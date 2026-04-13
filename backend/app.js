import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import { Card } from './models/cardDetails.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(cookieParser())
app.use(cors({ origin: process.env.CORS_ORIGIN }))


app.get('/getpage', (req, res) => {
    res.send('<h1>hello sir </h1>')
})


app.get("/products", async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = 10

    const skip = (page - 1) * limit

    const data = await Card.find()
        .skip(skip)
        .limit(limit)

    console.log('data ======> ', data)
    const total = await Card.countDocuments()

    return res.status(201).json({
        success:true,
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    })
})



app.post('/cardpost', async (req, res) => {
    const { title, description, price, image, category, stock } = req.body

    if ([title, description, image, category].some(field => field?.trim() === "") || price == null || stock == null) {
        return res.status(400).json({
            success: false,
            message: 'fill all details'
        })
    }

    const details = await Card.create({
        title,
        description,
        price,
        image,
        category,
        stock
    })


    if (!details) {
        res.status(401).json({
            success: false,
            message: 'something went wrong'
        })
    }

    return res.status(201).json({
        success: true,
        message: 'fatch successfully',
        data: details
    })

})



export default app