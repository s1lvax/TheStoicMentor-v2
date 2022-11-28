const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Schema = require('../models/journalEntries');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('journal')
        .setDescription('Add an entry to your journal!')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The entry to your journal.')
                .setRequired(true)),
    async execute(interaction) {
        const journalEntry = interaction.options.getString('message');
        const userID = Number(interaction.user.id);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        todayString = String(today);

        //insert into db
        Schema.create({
            message: journalEntry,
            author: userID,
            date: todayString
        });

        //respond with an embed to the user
        const quoteEmbed = new EmbedBuilder()
            .setColor(0xffd700)
            .setTitle("Journal")
            .setDescription("Your entry has been journaled 📖")
            .setTimestamp()
            .setFooter({ text: 'The Stoic Mentor', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG/240px-0_S%C3%A9n%C3%A8que_-_Mus%C3%A9e_du_Prado_-_Cat._144_-_%282%29.JPG' })

        interaction.reply({ embeds: [quoteEmbed], ephemeral: true });

    },
};