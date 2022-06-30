const Discord = require('discord.js')

module.exports = {

    run: async (client, message, args) => {
        message.delete()

        const embed = new Discord.MessageEmbed()

            .setAuthor({ name: 'Fall Ticket', iconURL: 'https://media.discordapp.net/attachments/938563616330903563/950476588049383464/fall.gif', url: 'https://discord.gg/falldevs' })
            .setDescription(`<a:call:941839746966122526> Esta precisando de ajuda com o **Fall Ticket**? Você está no lugar certo!
            
            <a:seta:896862545128861746> Para enviar a mensagem do **TICKET** use o comando: **.ticket**
            
            \`\`ALGUMAS DÚVIDAS FREQUENTES:\`\`
            
            **O bot é seguro?**
            *Sim! Totalmente seguro, o token é protegido por verificação de 2 etapas.*
            
            **Caso eu queira um bot personalizado como eu faço?**
            *Para adquirir o seu bot personalizdo entre e abra um ticket para realizar o seu orçamento: https://discord.gg/falldevs*
            
            **O bot tem alguma log?**
            *Por se tratar de um bot **FREE** não existe nenhuma log de mensagens ao publico!*

            **Como dou permissão para meus staffs?**
            *O bot criou um cargo no seu discord chamado **Perm Ticket**, basta dar este cargo ao staff e pronto!*
            
            *Bip Bop Bup, Mais um ticket foi criado*`)
            .setFooter({ text: 'BY ❤️ Swervin Studios', iconURL: 'https://media.discordapp.net/attachments/938563616330903563/950476588049383464/fall.gif' })
            .setColor('RANDOM')


        message.channel.send({ embeds: [embed] })
    }
}