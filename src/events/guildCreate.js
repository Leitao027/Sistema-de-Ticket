const Discord = require('discord.js')

/**
 * @param {Discord.Guild} guild
 */


module.exports = async (client, guild) => {

    guild.roles.create({
        name: 'Perm Ticket',
        color: 'BLUE'
    })


    const channels = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT')
    const invite = await channels.createInvite({
        temporary: false,
        maxAge: 0,
        maxUses: 0
    })

    const embed = new Discord.MessageEmbed()

        .setAuthor({ name: `Servidor・${guild.name}`, iconURL: guild.iconURL(), url: `https://discord.gg/${invite.code}` })
        .setDescription(`***Owner:*** <@${guild.ownerId}>\n***Convite:*** https://discord.gg/${invite.code}\n***Servidor:*** ${guild.name}\`\`${guild.id}\`\``)
        .setTimestamp()
        .setColor('RANDOM')
     
    client.channels.cache.get('986311571812802570').send({ embeds: [embed] })
}