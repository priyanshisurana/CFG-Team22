import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();


app.use("/api/users",userRoutes);


//add watever routes required ,routes for products,orders,cart etc,aisa kuch !!Like naviagting between pages 


// app.use("/api/users",userRoutes);
// app.use("/api/users",userRoutes);

const PORT= process.env.PORT;
app.listen(PORT,() => {
    console.log('Server is running on port ' + PORT);
    connectDB();
});