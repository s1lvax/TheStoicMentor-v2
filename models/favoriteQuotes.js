const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const favoriteQuoteSchema = new mongoose.Schema({
    quote: String,
    user: Number,
}, { collection: 'favoriteQuotes' });

const favQuote = mongoose.model('favoriteQuotes', favoriteQuoteSchema);

module.exports = favQuote;