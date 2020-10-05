//keys
require('dotenv').config();

const config = require('../config/config');
var bookshelf = require('bookshelf')(config);
bookshelf.plugin('registry');


const product = bookshelf.Model.extend({
    tableName: 'product',
    //constructor
    constructor: function(){
        bookshelf.Model.apply(this,arguments);
    }
});

module.exports = bookshelf.model('product',product);