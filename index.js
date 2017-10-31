// Import node modules
const express = require( 'express' ); //web framework for node
const app = express(); // Initiate Express Application
const router = express.Router();
const mongoose = require( 'mongoose' ); //Node Tool for mongodb
const config = require( './config/database' ); // Mongoose Config
const path = require( 'path' ); // Node JS package for file paths
const authentication = require( './routes/authentication' )( router );
const blogs = require('./routes/blog')( router );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const port = process.env.PORT || 8080;

//Database Connection
mongoose.Promise = global.Promise;
mongoose.connect( config.uri, ( err ) => {
  if( err ) {
    console.log( 'Could not connect to database: ', err );
  } else {
    console.log( 'Connected to database: ' + config.db );
  }
});

// Middleware
app.use( cors({
  origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( express.static(__dirname + '/dist') );
app.use( '/authentication', authentication );
app.use( '/blogs', blogs );

// Connect server to Angular 2 Index.html
// app.get( '/*', ( req, res ) => {
//   res.sendFile( path.join(__dirname + '/dist/index.html' ) );
// });

app.listen( port, () => {
  console.log( 'Listening on port' + port );
});
