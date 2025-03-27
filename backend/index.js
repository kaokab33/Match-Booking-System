const express = require('express');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const managerRoute = require('./routes/manager');
const fanRoute = require('./routes/fan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
// Routes
app.use('/auth', authRoute)
app.use('/admin', adminRoute);
app.use('/manager', managerRoute);
app.use('/fan', fanRoute);
const port = 3001;
mongoose.connect('mongodb+srv://karimelsayed401:FLoRvtqyZdEmuqf1@cluster0.lm3jt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(port, () => console.log(`Server running on port: ${port}`));
    })
    .catch((error) => console.log(error.message));
