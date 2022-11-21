const { SlashCommandBuilder } = require('discord.js');
const Schema = require('../models/allJournalEntries');
const request = require('request');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Get a random Stoic quote!'),
	async execute(interaction) {
        const apiURL = 'https://stoic-server.herokuapp.com/random';

        request({'url': apiURL, 'json': true }, function ( error, response, body) {
            const quote = body[0]['body'];
            const author = body[0]['author'];
            const quoteSource = body[0]['quotesource'];

            interaction.reply({ content: quote + '\n\n- ' + author + '\n\n(' + quoteSource + ')', ephemeral: false });
        });
	},
};