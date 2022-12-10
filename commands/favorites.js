const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Schema = require('../models/favoriteQuotes');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('favorites')
        .setDescription('Retrieve all your favorite quotes!'),
    async execute(interaction) {
        //get users Discord ID
        const userID = interaction.user.id;

        Schema.find({ user: userID }, function (err, docs) {
            const quotes = [];
            docs.forEach(element => quotes.push(element['quote']));

            const quotesString = quotes.join('\r\n\n');

            if (quotes.length <= 0) {
                const noQuotesEmbed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle(interaction.user.username + "'s Favorite Quotes")
                    .setDescription("You don't have any favorites yet ❗ \n\nAdd one now! 📖")
                    .setTimestamp()
                    .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })

                interaction.reply({ embeds: [noQuotesEmbed], ephemeral: false });
            }
            else {
                const quotesEmbed = new EmbedBuilder()
                    .setColor(0xffd700)
                    .setTitle(interaction.user.username + "'s Favorite Quotes")
                    .setDescription(quotesString)
                    .setTimestamp()
                    .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })
                interaction.reply({ embeds: [quotesEmbed], ephemeral: false });
            }
        });
    },
};