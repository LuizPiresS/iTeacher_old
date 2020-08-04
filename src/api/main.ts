import app from './app';

import 'reflect-metadata';

const port = 3333;

app.listen(port, () => {
  console.log(`app listing on port ${port}`);
});
