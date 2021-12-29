const proxy = require('http-proxy-middleware');
module.exports = function(app: any){
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};