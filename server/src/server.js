const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');

const app = require('./app.js')
app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`))