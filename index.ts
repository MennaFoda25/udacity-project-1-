import express from 'express';
import morgan from 'morgan';
 import * as dotenv from 'dotenv';
 dotenv.config()
const PORT = 3000;
// create an instance server
const app= express();
// HTTP request logger middleware
app.use(morgan('dev'))
// add routing for / path
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World 🌍'
  })
})
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app