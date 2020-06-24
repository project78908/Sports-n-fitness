const http=require('http');  /*server create*/
var app=require('./app.js');
/*import app with require*/
const hostname="localhost";
const port=8000;

const server = http.createServer(app);/*pass app to create server*/


server.listen(port,hostname,()=>{  /*how to start server*/
    console.log(`server running at http://${hostname}:${port}`);

});

