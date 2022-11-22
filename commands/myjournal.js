const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Schema = require('../models/journalEntries');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('myjournal')
      .setDescription('Retrieve all your journal entries!'),
   async execute(interaction) {
      //const userID = Number(interaction.user.id);

      Schema.find({}, function (err, docs) {
         const messages = [];
         docs.forEach(element => messages.push(element['message']));

         const messagesString = messages.join('\r\n\n');

         if (!messages) {
            interaction.reply({ content: "You have 0 journal entries.", ephemeral: true });
         }
         if (messages) {
            const quoteEmbed = new EmbedBuilder()
               .setColor(0xffd700)
               .setTitle("Your Journal Entries")
               .setDescription(messagesString)
               .setTimestamp()
               .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })
            interaction.reply({ embeds: [quoteEmbed], ephemeral: true });
         }
      });
   },
};