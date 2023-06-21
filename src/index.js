const { config } = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const fetch = require('node-fetch');

config();

const app = express();
const port = process.env.PORT || 4500;

// global middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (_, res) => {
  res.send('Hola, este es un servicio para mantener vivo otro xd');
});

cron.schedule('*/40 * * * * *', async () => {
  const url_alive = process.env.URL_SERVICE
  try {
    url_alive && await fetch(url_alive)
    const urls = process.env.URLS_FETCH?.split(';') || []
    for (const url of urls) {
      await fetch(url)
    }
  } catch (error) {
    console.log('ocurrio un error', error)
  }
})

app.listen(port, async () => {
  console.log(`Server's runnig in ${port}!`);
});
