const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const allJournalEntriesSchema = new mongoose.Schema({
  message: String,
  author: Number,
  date: String,
}, { collection: 'journalMessages' });

const Journal = mongoose.model('journalmessage', allJournalEntriesSchema);

module.exports = Journal;