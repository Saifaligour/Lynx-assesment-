
const UserRoutes = require('../src/v1/User/routes')
module.exports = (app) => {

  app.use('/users', UserRoutes);

}