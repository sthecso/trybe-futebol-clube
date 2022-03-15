import app from '../server';

app.get('/ping', (_req, res) => {
  res.send('pong');
});
