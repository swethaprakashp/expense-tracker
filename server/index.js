const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('../server/routes/authRoutes')
const expenseRoutes = require('../server/routes/expenseRouter')


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(cors());
app.use(express.json());

//mongodb connection
mongoose.connect(process.env.MONGODB_URL).then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('Error in connecting MongoDB :', err));

//routes
app.use('/api/users', authRoutes)
app.use('/api/expenses', expenseRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`) )

