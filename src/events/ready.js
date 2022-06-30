const colors = require('colors')
const Discord = require('discord.js')

/**
 * @param {Discord.Client} client 
 */

module.exports = async (client, message) => {

    console.log(colors.red('=== BOT ==='))
    console.log(colors.green('-> ') + colors.gray(' BOT:') + colors.cyan(' Modulos ligados com sucesso'))

    let activities = [
        `BY ❤️ Swervin Studios`,
        `GERENCIANDO TICKETS`,
        `.help PARA AJUDA!`,
        `EM ${client.guilds.cache.size} SERVIDORES`
    ],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
    }), 10000);

    client.user.setStatus("online");


    const embed = new Discord.MessageEmbed()

        .setDescription('***MODULOS LIGADOS COM SUCESSO*** 👍')
        .setColor('#0000FF')

    client.channels.cache.get('986311602942926949').send({ embeds: [embed] })

}