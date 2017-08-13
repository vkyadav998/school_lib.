/**
 * Created by vk on 5/21/2017.
 */

var mongoose = require('mongoose');
var autoIncrement = require('mongoose-autoincrement');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    name: String,
    auther:String,
    availability:Boolean
}, {collection:'books', timestamps:true });

bookSchema.plugin(autoIncrement, { model: 'BOOK_MODEL', field: 'id' });
mongoose.model('BOOK_MODEL', bookSchema);

var userSchema = new Schema({
    name: String,
    email:String,
    contact:String
}, {collection:'users', timestamps:true });

userSchema.plugin(autoIncrement, { model: 'USER_MODEL', field: 'id' });
mongoose.model('USER_MODEL', userSchema);

var adminSchema = new Schema({
    userName: String,
    name: String,
    password: String,
    email:String,
    contact:String
}, {collection:'admin', timestamps:true });

adminSchema.plugin(autoIncrement, { model: 'ADMIN_MODEL', field: 'id' });
mongoose.model('ADMIN_MODEL', adminSchema);

var transactionSchema = new Schema({
    userID: Number,
    bookID: Number,
    issueDate: { type: Date, 'default': new Date() },
    returnDate:{ type: Date, 'default': new Date() },
    borrow:Boolean
}, {collection:'transaction', timestamps:true });

transactionSchema.plugin(autoIncrement, { model: 'TRANSACTION_MODEL', field: 'id' });
mongoose.model('TRANSACTION_MODEL', transactionSchema);
