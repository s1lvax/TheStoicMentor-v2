const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Schema = require('../models/journalEntries');

module.exports = {
   data: new SlashCommandBuilder()
      .setName('myjournal')
      .setDescription('Retrieve all your journal entries!')
      .addStringOption(option =>
         option.setName('date')
            .setDescription('Read your journal entries for a specific day! (dd-mm-yyyy)')
            .setRequired(false)),
   async execute(interaction) {

      //get users Discord ID
      const userID = interaction.user.id;
      //get date
      const dateOption = interaction.options.getString('date');

      //check if date was specified
      if (!dateOption) {
         //search in the db for entries
         Schema.find({ author: userID }, function (err, docs) {
            const messages = [];
            docs.forEach(element => messages.push(element['message']));

            const messagesString = messages.join('\r\n\n');

            if (messages.length <= 0) {
               const noJournalEmbed = new EmbedBuilder()
                  .setColor(0xff0000)
                  .setTitle(interaction.user.username + "'s Journal")
                  .setDescription("Your journal doesn't have any entries yet ❗ \n\nAdd one by using /journal 📖")
                  .setTimestamp()
                  .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })

               interaction.reply({ embeds: [noJournalEmbed], ephemeral: true });
            }
            else {
               const journalEmbed = new EmbedBuilder()
                  .setColor(0xffd700)
                  .setTitle(interaction.user.username + "'s Journal")
                  .setDescription(messagesString)
                  .setTimestamp()
                  .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })
               interaction.reply({ embeds: [journalEmbed], ephemeral: true });
            }
         });
      }
      else {
         //search in the db for entries

         const userKeyRegExp = /\d\d-\d\d-\d\d\d\d/;

         const valid = userKeyRegExp.test(dateOption);

         if (valid == true) {
            Schema.find({ author: userID, date: dateOption }, function (err, docs) {
               const messages = [];
               docs.forEach(element => messages.push(element['message']));

               const messagesString = messages.join('\r\n\n');

               if (messages.length <= 0) {
                  const noJournalEmbed = new EmbedBuilder()
                     .setColor(0xff0000)
                     .setTitle(interaction.user.username + "'s Journal | " + dateOption)
                     .setDescription("Your journal doesn't have any entries for that date ❗ 📖")
                     .setTimestamp()
                     .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })

                  interaction.reply({ embeds: [noJournalEmbed], ephemeral: true });
               }
               else {
                  const journalEmbed = new EmbedBuilder()
                     .setColor(0xffd700)
                     .setTitle(interaction.user.username + "'s Journal | " + dateOption)
                     .setDescription(messagesString)
                     .setTimestamp()
                     .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })
                  interaction.reply({ embeds: [journalEmbed], ephemeral: true });
               }
            });
         }
         else {
            const errorEmbed = new EmbedBuilder()
               .setColor(0xff0000)
               .setTitle(interaction.user.username + "'s Journal")
               .setDescription("Your date format is wrong ❗ \n\nIt must be specified as dd-mm-yyyy 📖")
               .setTimestamp()
               .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })

            interaction.reply({ embeds: [errorEmbed], ephemeral: true });
         }
      }
   },
};