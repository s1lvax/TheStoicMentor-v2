const { SlashCommandBuilder } = require('discord.js');
const Schema = require('../models/allJournalEntries');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('myjournal')
      .setDescription('Retrieve all your journal entries!'),
   async execute(interaction) {
      //const userID = Number(interaction.user.id);

      Schema.find({ author: 225633052645261313 }, function (err, docs) {
         const messages = [];
         docs.forEach(element => messages.push(element['message']));

         const messagesString = messages.join('\r\n\n');

         if (!messages) {
            interaction.reply({ content: "You have 0 journal entries.", ephemeral: true });
         }
         if (messages) {
            interaction.reply({ content: messagesString, ephemeral: true });
         }
      });
   },
};