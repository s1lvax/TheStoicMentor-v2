const { SlashCommandBuilder } = require('discord.js');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Schema = require('../models/journalEntries');
const request = require('request');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get a random Stoic quote!'),
    async execute(interaction) {
        const apiURL = 'https://stoic-server.herokuapp.com/random';

        request({ 'url': apiURL, 'json': true }, function (error, response, body) {
            const quote = body[0]['body'];
            const author = body[0]['author'];
            const quoteSource = body[0]['quotesource'];
            let authorImage = "";

            //author image
            if (author == "Marcus Aurelius") {
                authorImage = "http://thereformedbroker.com/wp-content/uploads/2013/05/Marcus-Aurelius.jpg"
            }
            else if (author == "Seneca") {
                authorImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG"
            }
            else if (author == "Epictetus") {
                authorImage = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/hostedimages/1507496989i/24121395._SY540_.jpg"
            }

            const quoteEmbed = new EmbedBuilder()
                .setColor(0xffd700)
                .setAuthor({ name: author, iconURL: authorImage, url: 'https://en.wikipedia.org/wiki/Stoicism' })
                .setDescription(quote)
                .addFields(
                    { name: 'Source', value: quoteSource },
                )
                .setTimestamp()
                .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })
            interaction.reply({ embeds: [quoteEmbed] });
        });
    },
};