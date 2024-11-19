import app from './app';
import { config } from './config/env-config';

const { port } = config; 

app.listen(port, () => {
  console.log(`Email service is running on port ${port}`);
});
