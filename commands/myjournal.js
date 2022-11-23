const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Schema = require('../models/journalEntries');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('myjournal')
      .setDescription('Retrieve all your journal entries!'),
   async execute(interaction) {
      const userID = interaction.user.id;
      console.log(userID);
      Schema.find({ author: userID }, function (err, docs) {
         const messages = [];
         docs.forEach(element => messages.push(element['message']));

         const messagesString = messages.join('\r\n\n');

         if (messages.length <= 0) {
            const noJournalEmbed = new EmbedBuilder()
               .setColor(0xff0000)
               .setTitle(interaction.user.username + "' Journal")
               .setDescription("Your journal doesn't have any entries yet ❗ \n\nAdd one by using /journal 📖")
               .setTimestamp()
               .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })

            interaction.reply({ embeds: [noJournalEmbed], ephemeral: true });
         }
         else {
            const journalEmbed = new EmbedBuilder()
               .setColor(0xffd700)
               .setTitle(interaction.user.username + "' Journal")
               .setDescription(messagesString)
               .setTimestamp()
               .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })
            interaction.reply({ embeds: [journalEmbed], ephemeral: true });
         }
      });
   },
};