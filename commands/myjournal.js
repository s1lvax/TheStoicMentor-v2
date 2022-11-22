const { SlashCommandBuilder } = require('discord.js');
const Schema = require('../models/allJournalEntries');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('myjournal')
      .setDescription('Retrieve all your journal entries!'),
   async execute(interaction) {
      const userID = Number(interaction.user.id);

      Schema.find({}, function (err, docs) {
         docs.forEach(element => console.log(element['message'] + '\n'));
      });
      console.log(userData);
      if (!userData) {
         await interaction.reply({ content: "You have 0 journal entries.", ephemeral: true });
      }
      if (userData) {
         await interaction.reply({ content: "I found entries", ephemeral: true });
      }
   },
};