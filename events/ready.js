const { Events } = require('discord.js');
const mongoose = require("mongoose");
const { mongodb_connection } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
		//mongodb settings
		const url = mongodb_connection;
		const connectionParams={
			useNewUrlParser: true,
			useUnifiedTopology: true 
		}
		
		mongoose.connect(url,connectionParams)
		.then( () => {
			console.log('Connected to database ')
		})
		.catch( (err) => {
			console.error(`Error connecting to the database. \n${err}`);
		})
	},
};