const app = require('./server');
// const config = require('./config');


app.listen(process.env.PORT || 7000, () => {
  console.log('Hauszapi executando em ' + 'http://localhost' + process.env.PORT || 7000)
});
