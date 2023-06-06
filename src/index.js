const express = require('express');
const mongoose = require ('mongoose');
require("dotenv").config();
const userRoutes = require("../routes/user")

const app = express ()
//hacemos lo de abajo para que capte el puerto del hosting, si no es este el caso, se conecte al puerto 9000
const port = process.env.PORT || 8000


// middleware
app.use(express.json());
app.use('/api', userRoutes);

// el api es opcional /api/users

// routes

app.get('/', (req, res) => {
    res.send('welcome')
})

//mongo db conecction

// una promesa con el then, si es
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('connected to mongo'))
.catch((error) => console.error(error))

app.listen(port, () => console.log('server listen', port));

