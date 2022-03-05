import app from './app'
import client from './db/connect'
const address = '0.0.0.0:3000'

client.connect()

client.query('SELECT * FROM product', (err, res) => {
  if (!err) {
    console.log(res.rows)
  } else {
    console.log(err.message)
  }
  client.end
})

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
