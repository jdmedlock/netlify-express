const Discord = require('discord.js');

async function sherpabot() {
  const client = new Discord.Client();

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('message', async msg => {
    const commandPrefix = process.env.COMMAND_PREFIX;
    if(msg.author.bot) {
      return;
    }
    // Ignore messages that don't start with our prefix
    if(msg.content.indexOf(commandPrefix) !== 0) {
      return;
    }
    // Separate command from its arguments
    const args = msg.content.slice(commandPrefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Validate and process commands
    switch(command) {
      // Display list of commands
      case '':
      case 'cmds':
      case 'help':
        msg.reply(` __**Sherpa Commands:**__ \
          \n\`${commandPrefix}    \` - List Sherpa commands \
          \n\`${commandPrefix}help\` - List Sherpa commands \
          \n\`${commandPrefix}cmds\` - List Sherpa commands \
          \n\`${commandPrefix}doc\`        - Display URL for documentation site \
          \n\`${commandPrefix}doc chingu\` - Display URL for Chingu documentation \
          \n\`${commandPrefix}doc voyage\` - Display URL for Voyage documentation \
          \n\`${commandPrefix}doc pair\`   - Display URL for Pair Projgramming documentation \
          \n\`${commandPrefix}doc tech\`   - Display URL for technical resources \
          \n\`${commandPrefix}doc proj\`   - Display URL for project resources \
        `);
        break;
      // Display documentation URL's
      case 'doc':
        if (args.length === 0) {
          msg.reply('https://docs.chingu.io');
        }
        else if (args[0] === 'chingu') {
          msg.reply('https://chingu.docs.chingu.io');
        }
        else if (args[0] === 'voyage') {
          msg.reply('https://voyage.docs.chingu.io');
        }
        else if (args[0] === 'pair') {
          msg.reply('https://pairprog.docs.chingu.io');
        }
        else if (args[0] === 'tech') {
          msg.reply('https://techres.docs.chingu.io');
        }
        else if (args[0] === 'proj') {
          msg.reply('https://projres.docs.chingu.io');
        }
        break;
      // If command was unrecognized...
      default:
        msg.reply('You have entered and invalid command. Try `sherpa!` if you \
want to see a list of available commands.');
    }
  });

  await client.login(process.env.DISCORD_TOKEN);
};

module.exports = sherpabot;