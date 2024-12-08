import app from './app';
import { port } from './config/index';

app.listen(port, () => {
  console.log(`Email service is running on port ${port}`);
});
