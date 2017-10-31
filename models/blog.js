const mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

//Email validation length
let titleLength = ( title ) => {
  if( !title ){
    return false;
  } else {
    if( title.length < 5 || title.length > 30 ){
      return false;
    } else {
      return true;
    }
  }
};

//email validation RegExp
let alphaNumericTitle = ( title ) => {
  if( !title ){
    return false;
  } else {
    const regExp = new RegExp( /^[-\w\s]+$/ );
    return regExp.test( title );
  }
};

const titleValidators = [
  {
    validator: titleLength,
    message: 'Title must be at least 5 characters but no more than 30'
  },
  {
    validator: alphaNumericTitle,
    message: 'Title must be alphanumeric'
  }
];

let bodyLength = ( body ) => {
  if( !body ){
    return false;
  } else {
    if( body.length < 5 || body.length > 500 ){
      return false;
    } else {
      return true;
    }
  }
};

const bodyValidators = [
  {
    validator: bodyLength,
    message: 'Body length must be at least 5 characters but no more than 500'
  }
];

let commentLength = ( comment ) => {
  if( !comment[0] ){
    return false;
  } else {
    if( comment[0].length < 1 || comment[0].length > 200 ){
      return false;
    } else {
      return true;
    }
  }
};

const commentValidators = [
  {
    validator: commentLength,
    message: 'Comment must be at least 1 characters and no more than 200'
  }
]

const blogSchema = new Schema({
  title: { type: String, required: true, validate: titleValidators },
  body: { type: String, required: true, validate: bodyValidators },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  likes: { type: Number, default: 0 },
  likedBy: { type: Array },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: Array },
  comments: [
    {
      comment: { type: String, validate: commentValidators },
      createdBy: { type: String }
    }
  ]
});


module.exports = mongoose.model( 'Blog', blogSchema );
