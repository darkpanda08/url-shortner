if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const shortId = require('shortid')
const createHttpError = require('http-errors')
const mongoose = require('mongoose')
const path = require('path')
const ShortUrl = require('./models/urlModel')
const connectDB = require('./config/db')

const app = express()

// Connect to MongoDB
connectDB()

// Express Config
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// EJS Config
app.set('view engine', 'ejs')

// Routes
app.get('/', async (req, res, next) => {
    res.render('index')
})

app.get('/new', async (req, res, next) => {
    res.render('index2')
})

app.post('/', async (req, res, next) => {
    try {
        const { url } = req.body

        if (!url) {
            throw createHttpError.BadRequest('Provide a valid URL')
        }
        
        const urlExists = await ShortUrl.findOne({ url })
        
        if (urlExists) {
            res.render('index', { short_url: `${process.env.BASE_URL}/${urlExists.shortId}` })
        } else {
            const shortUrl = new ShortUrl({ 
                url,
                shortId: shortId.generate()
            })

            const result = await shortUrl.save()

            res.render('index', { short_url: `${process.env.BASE_URL}/${result.shortId}` })
        }

    } catch (error) {
        next(error)
    }
})

app.get('/:shortId', async (req, res, next) => {
    try {
        const { shortId } = req.params
        const result = await ShortUrl.findOne({ shortId })

        if (!result) {
            throw createHttpError.NotFound('Short Url does not exist')
        }
        
        res.redirect(result.url)
    } catch (error) {
        next(error)
    }
})

// Error Handling
app.use((req, res, next) => {
    next(createHttpError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('index', {error: err.message})
})

const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}...🚀`));