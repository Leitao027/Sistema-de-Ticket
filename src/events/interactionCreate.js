const Discord = require('discord.js')
const sleep = require('../utils/sleep')
const map = new Map()

/**
 * @param {Discord.Interaction} interaction 
 * @param {Discord.Client} client
 */

module.exports = async (client, interaction, guild) => {

    if (interaction.isButton()) {

        if (interaction.customId == 'abrir') {

            const retorno = new Discord.MessageEmbed()

                .setDescription(`<@${interaction.user.id}> Você ja possui uma ticket em andamento.`)
                .setColor("#B0C4DE")

            const channels = (await interaction.guild.channels.cache.find((c) => c.topic === `${interaction.user.id}`))
            if (channels) return interaction.reply({ embeds: [retorno], ephemeral: true })

            await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                topic: interaction.user.id,
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                    },
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },

                ],
            }).then(async fall => {
                fall.permissionOverwrites.create(interaction.guild.roles.cache.find(role => role.name === 'Perm Ticket'), {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                }).catch(() => true)

                const embed = new Discord.MessageEmbed()

                    .setDescription(`O seu ticket foi criado em: ${fall}`)
                    .setColor('#0000CD')

                interaction.reply({ embeds: [embed], ephemeral: true })


                const ticket = new Discord.MessageEmbed()

                    .setDescription('Seja Bem-Vindo ao seu **TICKET**\n\n *__Adiante o assunto para melhor atendimento!__*')
                    .setColor('#B0E0E6')

                const btn1 = new Discord.MessageButton()

                    .setLabel('Fechar Ticket')
                    .setCustomId('fechar')
                    .setEmoji('🔐')
                    .setStyle('SECONDARY')

                const row = new Discord.MessageActionRow().addComponents([btn1])


                fall.send({
                    embeds: [ticket],
                    components: [row]
                })
            })
        }
        if (interaction.customId == 'fechar') {

            await interaction.deferUpdate()

            let channel = interaction.message.channel.topic
            const user = client.users.cache.get(channel)

            const no = new Discord.MessageEmbed()

                .setDescription('‼️ *Ticket não renomeado, timeout de 10 minutos.*')
                .setColor('#87CEEB')

            if (!map.has(interaction.channel.id)) {

                await interaction.channel.setName(`closed-${user.username}`)
                map.set(interaction.channel.id)
                setTimeout(async () => {
                    try {
                        await map.delete(interaction.channel.id)
                    } catch (err) {

                    }
                }, 10 * 60000)
            } else {
                interaction.channel.send({ embeds: [no] }).then(async message => {
                    await sleep(10000)
                    await message.delete()
                }).catch(() => true)
            }

            const embed = new Discord.MessageEmbed()

                .setDescription(`*Ticket fechado por: ${interaction.user}*`)
                .setColor('#ADFF2F')

            const op = new Discord.MessageEmbed()

                .setDescription(`\`\`\`Escolha a opção para ser feita com o ticket:\`\`\``)
                .setColor('#3CB371')

            const btn1 = new Discord.MessageButton()

                .setCustomId('delete')
                .setEmoji('❌')
                .setLabel('Deletar Ticket')
                .setStyle('SECONDARY')

            const btn2 = new Discord.MessageButton()

                .setCustomId('open')
                .setEmoji('🔓')
                .setLabel('Reabrir Ticket')
                .setStyle('SECONDARY')

            const row = new Discord.MessageActionRow().addComponents([btn1, btn2])

            interaction.channel.send({ embeds: [embed] })

            interaction.channel.send({
                embeds: [op],
                components: [row]
            })
        }

        if (interaction.customId == 'delete') {

            await interaction.deferUpdate()

            const embed = new Discord.MessageEmbed()

                .setDescription('*Ticket fechando em alguns segundos*')
                .setColor('#5F9EA0')

            interaction.channel.send({ embeds: [embed] })

            await sleep(5000)
            try {
                await interaction.channel.delete()
            } catch (err) {

            }
        }

        if (interaction.customId == 'open') {

            await interaction.deferUpdate()

            let channel = interaction.message.channel.topic
            const user = client.users.cache.get(channel)

            await interaction.channel.setName(`ticket-${user.username}`)

            await interaction.message.delete()

            const embed = new Discord.MessageEmbed()

                .setDescription(`*Ticket reaberto por: ${interaction.user}*`)
                .setColor('#00BFFF')

            interaction.channel.send({ embeds: [embed] })
        }
    }
}