import express from 'express';
import routes from './routes/indexSpec';
import File from './file';

const app: express.Application = express();
const port = 3000; 


app.use(routes);


app.listen(port, async (): Promise<void> => {

  await File.createThumbPath();

  
  console.log(`Please open http://localhost:${port} to review the project ...`);
});

export default app;