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
global.owner = ['918130784851'] //ur owner number
global.ownername = "ππΌππππβ€βα­πππππ" //ur owner name
global.ytname = "YT: NEXUSMODS" //ur yt chanel name
global.socialm = "GitHub: NEXUSAT12" //ur github or insta name
global.location = "India, Ghaziabad, Rajnagar" //ur location

//bot bomdy 
global.ownernomer = "918130784851" //ur number
global.premium = ['918130784851'] //ur premium number
global.botname = 'π©β£βπ½βπ’ππ¨-πππβ’πͺ' //ur bot name
global.linkz = "https://chat.whatsapp.com/KdCiUuENgOFEYJMHV3jZNj" //your theme url which will be displayed on whatsapp
global.websitex = "https://linktr.ee/Nexus_21" //ur website to be displayed
global.botscript = 'https://github.com/NEXUSAT12/Xiao-MD-2' //script link
global.themeemoji = "πΉ" //ur theme emoji
global.packname = "Sticker By" //ur sticker watermark packname
global.author = "XBOT\n\n\nA whatsapp bot developed by\nβ€π£ππ­πͺπ¨β€\n\n\n\n\n\n\n\n       --------______-------\n\n\n\n\n\n\n\nContact No. : +91918130784851" //ur sticker watermark author
global.wm = "β€κ°ππΌππππκ₯πππππβ€κ°." //ur watermark
// Other
global.sessionName = 'session'
global.prefa = ['#']
global.sp = ''

//messages
global.mess = {
    success: 'Here you go!',
    admin: 'This feature could be used by admins only!',
    botAdmin: 'Bot Must Be Admin First!',
    premime: 'Premium Special Features If You Want to Register Type Rent',
    owner: 'This feature could be used by owner only',
    group: 'Features Used Only For Groups!',
    private: 'Features Used Only For Private Chat!',
    bot: 'This feature could be used by bot only',
    wait: 'In process...',
    linkm: 'Where is the link?',
    endLimit: 'Your Daily Limit Has Expired, The Limit Will Be Reset Every 12 Hours',
    nsfw: 'The nsfw feature has not been activated, please contact the admin to activate',
}

//media target
global.thum = fs.readFileSync("./Xiao-β€-Media/xiao1.jpeg") //ur thumb pic
global.log0 = fs.readFileSync("./Xiao-β€-Media/Xiao.jpeg") //ur logo pic
global.err4r = fs.readFileSync("./Xiao-β€-Media/Xiao2.jpeg") //ur error pic
global.thumb = fs.readFileSync("./Xiao-β€-Media/xiao1.jpeg") //ur thumb pic

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
role: 'π',
level: 'ποΈ',
limit: 'π',
health: 'β€οΈ',
exp: 'π«',
money: 'π΅',
potion: 'π₯€',
diamond: 'π',
common: 'π¦',
uncommon: 'π',
mythic: 'π³οΈ',
legendary: 'ποΈ',
pet: 'π',
trash: 'π',
armor: 'π',
sword: 'βοΈ',
wood: 'πͺ΅',
batu: 'πͺ¨',
string: 'πΈοΈ',
horse: 'π',
cat: 'π',
dog: 'π',
fox: 'π¦',
petFood: 'π',
iron: 'βοΈ',
gold: 'π',
emerald: 'π',
budak: 'π',
busur: 'πΉ',
panah: 'π',
kapak: 'πͺ'
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
