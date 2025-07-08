    const express = require('express');
    const cors = require('cors');
    const path = require('path');
    const bodyParser = require('body-parser');
    require('dotenv').config();

    const app = express();
    app.use(cors());
    app.use(express.json());

    //payment
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended:false}));

    app.set('view engine','ejs');
    app.set('views', path.join(__dirname,'views'));


    //WelcomeyScreen
    // app.use('/',(req,res)=>{
    //     res.send('Welcome to backend of Form-sMaster')
    // })

    // Location Routes
    const locationRoutes = require('./routes/locationRoutes');
    app.use('/api/location', locationRoutes);

    const userRoutes = require('./routes/userRoutes');
    app.use('/api', userRoutes);

    const authRoutes = require('./routes/authRoutes');
    app.use('/api/auth', authRoutes);

    const paymentRoutes = require('./routes/paymentroutes');
    app.use('/api/payment', paymentRoutes);


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
