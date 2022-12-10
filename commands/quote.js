const { SlashCommandBuilder } = require('discord.js');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { ComponentType } = require('discord.js');
const request = require('request');
const Schema = require('../models/favoriteQuotes');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Get a random Stoic quote!'),
    async execute(interaction) {

        const apiURL = 'https://stoicquotesapi.com/v1/api/quotes/random';

        request({ 'url': apiURL, 'json': true }, function (error, response, body) {

            const quote = body['body'];
            const author = body['author'];
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
            else if (author == "Cato") {
                authorImage = "https://www.frag-machiavelli.de/wp-content/uploads/2020/05/cato-der-%C3%A4ltere.jpg"
            }
            else if (author == "Zeno") {
                authorImage = "https://cdn.shortpixel.ai/spai/w_867+q_lossy+ret_img+to_webp/https://i0.wp.com/platosacademy.org/wp-content/uploads/2022/01/PhotoFunia-1642603639.jpg?resize=867%2C1200&ssl=1"
            }


            //embed builder (response)
            const quoteEmbed = new EmbedBuilder()
                .setColor(0xffd700)
                .setAuthor({ name: author, iconURL: authorImage, url: 'https://en.wikipedia.org/wiki/Stoicism' })
                .setTitle(quote)
                .setTimestamp()
                .setFooter({
                    text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG'
                });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('buttonFav')
                        .setLabel('Add to favorites')
                        .setStyle(ButtonStyle.Secondary),
                );
            interaction.reply({ embeds: [quoteEmbed], components: [row] });

            //collect button clicks
            const filter = i => i.customId === 'buttonFav';
            const collector = interaction.channel.createMessageComponentCollector({ filter });

            collector.on('collect', async i => {
                let userTag = i.user.toString();
                let userClickedID = i.user.id;
                let messageClickedID = i.message.id;

                // Fetch the message containing the embeds
                let messageWithEmbed = await i.channel.messages.fetch(messageClickedID);

                // Get the array of embeds from the message
                let embeds = messageWithEmbed.embeds;

                // Get the first embed in the array
                let firstEmbed = embeds[0];

                // Get the title of the first embed
                let embedTitle = firstEmbed.title;

                //insert in db
                await Schema.create({
                    quote: embedTitle,
                    user: userClickedID
                });

                i.reply(userTag + " The quote has been added to your favorites.");
            });
        });
    },
};
