const mongo = require('mongoose');

const allJournalEntriesSchema = new mongo.Schema({
  author: Number,
});

module.exports = mongo.model('journalMessages', allJournalEntriesSchema);