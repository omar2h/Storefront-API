import app from './app'
const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`App running on port: ${port}`)
})
