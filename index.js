const Discord = require("discord.js");
const fs = require('fs');
const path = require('path');
const colors = require('colors')
const config = require('./config.json');

const client = new Discord.Client({ intents: 32767 });

fs.readdir('./src/commands', (err, files) => {
  if (err) return console.error(err)
  console.log(colors.red("=== COMANDOS ==="))
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let eventName = file.substring(0, file.indexOf('.js'))
    console.log(`${colors.green("-> ")} ${colors.gray("Comando ") + colors.cyan(eventName) + colors.gray(" Carregado com sucesso")}`)
  })
})

fs.readdir('./src/events', (err, files) => {
  if (err) return console.error(err)
  console.log(colors.red("=== EVENTOS ==="))
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    let eventName = file.substring(0, file.indexOf('.js'))
    let eventModule = require(path.join(__dirname, './src/events', eventName))
    client.on(eventName, eventModule.bind(null, client))
    console.log(`${colors.green("-> ")} ${colors.gray("Evento ") + colors.cyan(eventName) + colors.gray(" Carregado com sucesso")}`)
  })
})

client.login(config.token)