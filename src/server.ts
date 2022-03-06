import app from './app'
import pool from './db/connect'
const address = '0.0.0.0:3000'

// pool.on('connect', () => {
//   console.log('Connected to database')
// })

// pool.query('SELECT * FROM product', (err, res) => {
//   if (!err) {
//     console.log(res.rows)
//   } else {
//     console.log(err.message)
//   }
//   pool.end
// })

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
