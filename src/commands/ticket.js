const Discord = require('discord.js')

/**
 * @param {Discord.Message} message
 */

module.exports = {
    run: async (client, message, member) => {

        const perm = new Discord.MessageEmbed()

            .setDescription('*Você não possui permissão para executar este comando.*')
            .setColor('#B22222')

        if (!message.member.permissions.has('MANAGE_CHANNELS')) {
            return message.reply({ embeds: [perm] })
        }

        const embed = new Discord.MessageEmbed()


            .setTitle('Sistema de Ticket')
            .setDescription('Para abrir um **TICKET** clique no **BOTÃO**')
            .setFooter({ text: 'BY ❤️ Swervin Studios', iconURL: 'https://cdn.discordapp.com/attachments/984149666537029753/991801176754503742/XiolaEdits_Gif_Leitao_V2.gif' })
            .setColor('#3CB371')

        const btn = new Discord.MessageButton()

            .setCustomId('abrir')
            .setEmoji('📩')
            .setStyle('SECONDARY')
            .setLabel('Abrir Ticket')

        const row = new Discord.MessageActionRow().addComponents([btn])

        message.channel.send({
            components: [row],
            embeds: [embed]
        })

    }
}