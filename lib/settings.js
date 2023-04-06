const fs = require('fs')
const chalk = require('chalk')

//aumto functioner
global.autoTyping = false //auto tying in gc (true to on, false to off)
global.autoRecord = false //auto recording (true to on, false to off)

//documents variants
global.doc1 = 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
global.doc2 = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
global.doc3 = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.doc4 = 'application/zip'
global.doc5 = 'application/pdf'
global.doc6 = 'application/vnd.android.package-archive'

//owmner v card
global.owner = [process.env.OWNER_NUMBER] || [' '] //ur owner number
global.ownername =  process.env.OWNER_NAME || 'NEXUS' 
global.ytname = "YT: NEXUSMODS" //ur yt chanel name
global.socialm = "GitHub: NEXUSAT12" //ur github or insta name
global.location = "India, Ghaziabad, Rajnagar" //ur location

//bot bomdy 
global.ownernomer =  [process.env.OWNER_NUMBER] || [' '] //ur number
global.premium = ['918130784851'] //ur premium number
global.botname = process.env.BOT_NAME || '𓆩⍣⃝🇽‌𝐢𝐚𝐨-𝐁𝐎𝐓⃢𓆪' //ur bot name
global.linkz = process.env.GROUPLINK || 'https://chat.whatsapp.com/KdCiUuENgOFEYJMHV3jZNj' //your theme url which will be displayed on whatsapp
global.websitex = "https://nexus21.carrd.co/" //ur website to be displayed
global.botscript = 'https://github.com/NEXUSAT12/Xiao-MD-2' //script link
global.themeemoji = "🌹" //ur theme emoji
global.packname = process.env.PACKNAME || ' ☤꙰𝙈𝘼𝙎𝙏𝙀𝙍꥟𝙉𝙀𝙓𝙐𝙎☤꙰ '//ur sticker  packname
global.author = process.env.STICKER_AUTHOUR || ' ☤꙰𝙈𝘼𝙎𝙏𝙀𝙍꥟𝙉𝙀𝙓𝙐𝙎☤꙰ ' //ur sticker author
global.wm = process.env.WATERMARK || ' ☤꙰𝙈𝘼𝙎𝙏𝙀𝙍꥟𝙉𝙀𝙓𝙐𝙎☤꙰ '//ur watermark
global.mess = process.env.LANGUAGE || 'EN'
global.BOT_LANGUAGE = "EN"
// Other
global.sessionName = 'session'
global.prefa = ['#']
global.sp = ''

//media target
global.thum = fs.readFileSync("./Xiao-❤-Media/xiao1.jpeg") //ur thumb pic
global.log0 = fs.readFileSync("./Xiao-❤-Media/Xiao.jpeg") //ur logo pic
global.err4r = fs.readFileSync("./Xiao-❤-Media/Xiao2.jpeg") //ur error pic
global.thumb = fs.readFileSync("./Xiao-❤-Media/xiao1.jpeg") //ur thumb pic

//menu image maker
global.flaming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.fluming = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=fluffy-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flarun = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=runner-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='
global.flasmurf = 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=smurfs-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text='

//adventure1
    global.limitawal = {
    premium: "Infinity",
    free: 12,
    monayawal: 1000
}
   global.rpg = {
   darahawal: 100,
   besiawal: 15,
   goldawal: 10,
   emeraldawal: 5,
   umpanawal: 5,
   potionawal: 1
}

global.limitAwal = {
 prem: 'Unlimited',
 free: 70
}

//adventure2
global.emot = {
role: '🏆',
level: '🎚️',
limit: '📊',
health: '❤️',
exp: '💫',
money: '💵',
potion: '🥤',
diamond: '💎',
common: '📦',
uncommon: '🎁',
mythic: '🗳️',
legendary: '🗃️',
pet: '🎁',
trash: '🗑',
armor: '👕',
sword: '⚔️',
wood: '🪵',
batu: '🪨',
string: '🕸️',
horse: '🐎',
cat: '🐈',
dog: '🐕',
fox: '🦊',
petFood: '🍖',
iron: '⛓️',
gold: '👑',
emerald: '💚',
budak: '🏃',
busur: '🏹',
panah: '💘',
kapak: '🪓'
}

global.ntvirtex = []
global.nttoxic = []
global.ntwame = []
global.ntlinkgc = []
global.ntilinkall = []
global.ntilinktwt = []
global.ntilinktt = []
global.ntilinktg = []
global.ntilinkfb = []
global.ntilinkig = []
global.ntilinkytch = []
global.ntilinkytvid = []





let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})  
