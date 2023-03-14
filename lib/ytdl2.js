
const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const path = require('path')
const util = require('util')
const moment = require('moment-timezone')
const time = moment().format('DD/MM HH:mm:ss')
const { color, bgcolor } = require('./color')
const { Readable, Writable } = require('stream')

const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/

function INFOLOG(info) {
    return console.log('\x1b[1;34m~\x1b[1;37m>>', '[\x1b[1;33mINF\x1b[1;37m]', time, color(info))
}

function post(url, formdata) {
    INFOLOG(Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&'))
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: "*/*",
            'accept-language': "en-US,en;q=0.9",
            'content-type': "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: Object.keys(formdata).map(key => `${key}=${encodeURIComponent(formdata[key])}`).join('&')
    })
}

function ytv(url) {
    return new Promise((resolve, reject) => {
        if (ytIdRegex.test(url)) {
            let ytId = ytIdRegex.exec(url)
            url = 'https://youtu.be/' + ytId[1]
            post('https://www.y2mate.com/mates/en60/analyze/ajax', {
                url,
                q_auto: 0,
                ajax: 1
            })
                .then(res => res.json())
                .then(res => {
                    INFOLOG('Scraping...')
                    document = (new JSDOM(res.result)).window.document
                    yaha = document.querySelectorAll('td')
                    filesize = yaha[yaha.length - 23].innerHTML
                    id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                    thumb = document.querySelector('img').src
                    title = document.querySelector('b').innerHTML

                    post('https://www.y2mate.com/mates/en60/convert', {
                        type: 'youtube',
                        _id: id[1],
                        v_id: ytId[1],
                        ajax: '1',
                        token: '',
                        ftype: 'mp4',
                        fquality: 360
                    })
                        .then(res => res.json())
                        .then(res => {
                            let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                            resolve({
                                dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                thumb,
                                title,
                                filesizeF: filesize,
                                filesize: KB
                            })
                        }).catch(reject)
                }).catch(reject)
        } else reject('URL INVALID')
    })
}

function yta(url) {
    return new Promise((resolve, reject) => {
        if (ytIdRegex.test(url)) {
            let ytId = ytIdRegex.exec(url)
            url = 'https://youtu.be/' + ytId[1]
            post('https://www.y2mate.com/mates/en60/analyze/ajax', {
                url,
                q_auto: 0,
                ajax: 1
            })
                .then(res => res.json())
                .then(res => {
                    let document = (new JSDOM(res.result)).window.document
                    let type = document.querySelectorAll('td')
                    let filesize = type[type.length - 10].innerHTML
                    let id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || ['', '']
                    let thumb = document.querySelector('img').src
                    let title = document.querySelector('b').innerHTML

                    post('https://www.y2mate.com/mates/en60/convert', {
                        type: 'youtube',
                        _id: id[1],
                        v_id: ytId[1],
                        ajax: '1',
                        token: '',
                        ftype: 'mp3',
                        fquality: 128
                    })
                        .then(res => res.json())
                        .then(res => {
                            let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize))
                            resolve({
                                dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
                                thumb,
                                title,
                                filesizeF: filesize,
                                filesize: KB
                            })
                        }).catch(reject)
                }).catch(reject)
        } else reject('URL INVALID')
    })
}

async function ytsr(query) {
    let link = /youtube\.com\/results\?search_query=/.test(query) ? query : ('https://youtube.com/results?search_query=' + encodeURIComponent(query))
    let res = await fetch(link)
    let html = await res.text()
    let data = new Function('return ' + /var ytInitialData = (.+)/.exec(html)[1])()
    let lists = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
    let formatList = {
        query,
        link,
        items: []
    }
    for (let list of lists) {
        let type = {
            videoRenderer: 'video',
            shelfRenderer: 'playlist',
            radioRenderer: 'live',
            channelRenderer: 'channel',
            showingResultsForRenderer: 'typo',
            horizontalCardListRenderer: 'suggestionCard',
        }[Object.keys(list)[0]] || ''
        let content = list[Object.keys(list)[0]] || {}
        if (content) {
            switch (type) {
                case 'typo':
                    formatList.correctQuery = content.correctedQuery.runs[0].text
                    break
                case 'video':
                    formatList.items.push({
                        type,
                        title: content.title.runs[0].text.replace('â€’', '‒'),
                        views: content.viewCountText.simpleText,
                        description: content.descriptionSnippet ? content.descriptionSnippet.runs[0].text.replace('Â ...', ' ...') : '',
                        duration: content.lengthText ? [content.lengthText.simpleText, content.lengthText.accessibility.accessibilityData.label] : ['', ''],
                        thumbnail: content.thumbnail.thumbnails,
                        link: 'https://youtu.be/' + content.videoId,
                        videoId: content.videoId,
                        author: {
                            name: content.ownerText.runs[0].text,
                            link: content.ownerText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url,
                            thumbnail: content.channelThumbnailWithLinkRenderer ? content.channelThumbnailWithLinkRenderer.thumbnail.thumbnails : [],
                            verified: content.ownerBadges && /BADGE_STYLE_TYPE_VERIFIED/.test(content.ownerBadges[0].metadataBadgeRenderer.style) ? /BADGE_STYLE_TYPE_VERIFIED_ARTIST/.test(content.ownerBadges[0].metadataBadgeRenderer.style) ? 'artist' : true : false
                        }
                    })
                    break
                case 'channel':
                    formatList.items.push({
                        type,
                        title: content.title ? content.title.simpleText.replace('â€’', '‒') : '',
                        description: content.descriptionSnippet ? content.descriptionSnippet.runs[0].text.replace('Â ...', ' ...') : '',
                        videoCount: content.videoCountText ? content.videoCountText.runs[0].text : '',
                        thumbnail: content.thumbnail.thumbnails,
                        subscriberCount: content.subscriberCountText ? content.subscriberCountText.simpleText.replace('Â ', ' ') : '',
                        link: 'https://youtube.com' + content.navigationEndpoint.commandMetadata.webCommandMetadata.url,
                        verified: content.ownerBadges && /BADGE_STYLE_TYPE_VERIFIED/.test(content.ownerBadges[0].metadataBadgeRenderer.style) ? /BADGE_STYLE_TYPE_VERIFIED_ARTIST/.test(content.ownerBadges[0].metadataBadgeRenderer.style) ? 'artist' : true : false
                    })
                    break
                case 'playlist':
                    formatList.items.push({
                        type,
                        title: content.title.simpleText.replace('â€’', '‒'),
                    })
                    break
            }
        }
    }
    return formatList
}

function baseURI(buffer = Buffer.from([]), metatype = 'text/plain') {
    return `data:${metatype};base64,${buffer.toString('base64')}`
}

/**
 * Writable Stream Callback
 * @callback WritableStreamCallback
 * @param {WritableStream} stream 
 */

/**
 * Convert Writable Stream to Buffer
 * @param {WritableStreamCallback} cb Callback with stream
 * @returns {Promise<Buffer>}
 */
function stream2Buffer(cb = noop) {
    return new Promise(resolve => {
        let write = new Writable()
        write.data = []
        write.write = function (chunk) {
            this.data.push(chunk)
        }
        write.on('finish', function () {
            resolve(Buffer.concat(this.data))
        })

        cb(write)
    })
}

/**
 * Convert Buffer to Readable Stream
 * @param {Buffer} buffer
 * @returns {ReadableStream}
 */
function buffer2Stream(buffer) {
    return new Readable({
        read() {
            this.push(buffer)
            this.push(null)
        }
    })
}

/**
 * No Operation
 *  */
function noop() { }

module.exports.baseURI = baseURI
module.exports.ytsr = ytsr
module.exports.yta = yta
module.exports.ytv = ytv
module.exports.buffer2Stream = buffer2Stream
module.exports.stream2Buffer = stream2Buffer
module.exports.noop = noop
=======
 const ytdl = require('youtubedl-core');
 const yts = require('youtube-yts');
 const readline = require('readline');
 const ffmpeg = require('fluent-ffmpeg')
 const NodeID3 = require('node-id3')
 const fs = require('fs');
 const { fetchBuffer } = require("./myfunc2")
 const ytM = require('node-youtube-music')
 const { randomBytes } = require('crypto')
 const ytIdRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/
 
 class YT {
     constructor() { }
 
     /**
      * Checks if it is yt link
      * @param {string|URL} url youtube url
      * @returns Returns true if the given YouTube URL.
      */
     static isYTUrl = (url) => {
         return ytIdRegex.test(url)
     }
 
     /**
      * VideoID from url
      * @param {string|URL} url to get videoID
      * @returns 
      */
     static getVideoID = (url) => {
         if (!this.isYTUrl(url)) throw new Error('is not YouTube URL')
         return ytIdRegex.exec(url)[1]
     }
 
     /**
      * @typedef {Object} IMetadata
      * @property {string} Title track title
      * @property {string} Artist track Artist
      * @property {string} Image track thumbnail url
      * @property {string} Album track album
      * @property {string} Year track release date
      */
 
     /**
      * Write Track Tag Metadata
      * @param {string} filePath 
      * @param {IMetadata} Metadata 
      */
     static WriteTags = async (filePath, Metadata) => {
         NodeID3.write(
             {
                 title: Metadata.Title,
                 artist: Metadata.Artist,
                 originalArtist: Metadata.Artist,
                 image: {
                     mime: 'jpeg',
                     type: {
                         id: 3,
                         name: 'front cover',
                     },
                     imageBuffer: (await fetchBuffer(Metadata.Image)).buffer,
                     description: `Cover of ${Metadata.Title}`,
                 },
                 album: Metadata.Album,
                 year: Metadata.Year || ''
             },
             filePath
         );
     }
 
     /**
      * 
      * @param {string} query 
      * @returns 
      */
     static search = async (query, options = {}) => {
         const search = await yts.search({ query, hl: 'id', gl: 'ID', ...options })
         return search.videos
     }
 
     /**
      * @typedef {Object} TrackSearchResult
      * @property {boolean} isYtMusic is from YT Music search?
      * @property {string} title music title
      * @property {string} artist music artist
      * @property {string} id YouTube ID
      * @property {string} url YouTube URL
      * @property {string} album music album
      * @property {Object} duration music duration {seconds, label}
      * @property {string} image Cover Art
      */
 
     /**
      * search track with details
      * @param {string} query 
      * @returns {Promise<TrackSearchResult[]>}
      */
     static searchTrack = (query) => {
         return new Promise(async (resolve, reject) => {
             try {
                 let ytMusic = await ytM.searchMusics(query);
                 let result = []
                 for (let i = 0; i < ytMusic.length; i++) {
                     result.push({
                         isYtMusic: true,
                         title: `${ytMusic[i].title} - ${ytMusic[i].artists.map(x => x.name).join(' ')}`,
                         artist: ytMusic[i].artists.map(x => x.name).join(' '),
                         id: ytMusic[i].youtubeId,
                         url: 'https://youtu.be/' + ytMusic[i].youtubeId,
                         album: ytMusic[i].album,
                         duration: {
                             seconds: ytMusic[i].duration.totalSeconds,
                             label: ytMusic[i].duration.label
                         },
                         image: ytMusic[i].thumbnailUrl.replace('w120-h120', 'w600-h600')
                     })
                  
                 }
                 resolve(result)
             } catch (error) {
                 reject(error)
             }
         })
     }
 
     /**
      * @typedef {Object} MusicResult
      * @property {TrackSearchResult} meta music meta
      * @property {string} path file path
      */
 
     /**
      * Download music with full tag metadata
      * @param {string|TrackSearchResult[]} query title of track want to download
      * @returns {Promise<MusicResult>} filepath of the result
      */
     static downloadMusic = async (query) => {
         try {
             const getTrack = Array.isArray(query) ? query : await this.searchTrack(query);
             const search = getTrack[0]//await this.searchTrack(query)
             const videoInfo = await ytdl.getInfo('https://www.youtube.com/watch?v=' + search.id, { lang: 'id' });
             let stream = ytdl(search.id, { filter: 'audioonly', quality: 140 });
             let songPath = `./Xiao-♥️-Media/audio/${randomBytes(3).toString('hex')}.mp3`
             stream.on('error', (err) => console.log(err))
 
             const file = await new Promise((resolve) => {
                 ffmpeg(stream)
                     .audioFrequency(44100)
                     .audioChannels(2)
                     .audioBitrate(128)
                     .audioCodec('libmp3lame')
                     .audioQuality(5)
                     .toFormat('mp3')
                     .save(songPath)
                     .on('end', () => resolve(songPath))
             });
             await this.WriteTags(file, { Title: search.title, Artist: search.artist, Image: search.image, Album: search.album, Year: videoInfo.videoDetails.publishDate.split('-')[0] });
             return {
                 meta: search,
                 path: file,
                 size: fs.statSync(songPath).size
             }
         } catch (error) {
             throw new Error(error)
         }
     }
 
     /**
      * get downloadable video urls
      * @param {string|URL} query videoID or YouTube URL
      * @param {string} quality 
      * @returns
      */
     static mp4 = async (query, quality = 134) => {
         try {
             if (!query) throw new Error('Video ID or YouTube Url is required')
             const videoId = this.isYTUrl(query) ? this.getVideoID(query) : query
             const videoInfo = await ytdl.getInfo('https://www.youtube.com/watch?v=' + videoId, { lang: 'id' });
             const format = ytdl.chooseFormat(videoInfo.formats, { format: quality, filter: 'videoandaudio' })
             return {
                 title: videoInfo.videoDetails.title,
                 thumb: videoInfo.videoDetails.thumbnails.slice(-1)[0],
                 date: videoInfo.videoDetails.publishDate,
                 duration: videoInfo.videoDetails.lengthSeconds,
                 channel: videoInfo.videoDetails.ownerChannelName,
                 quality: format.qualityLabel,
                 contentLength: format.contentLength,
                 description:videoInfo.videoDetails.description,
                 videoUrl: format.url
             }
         } catch (error) {
             throw error
         }
     }
 
     /**
      * Download YouTube to mp3
      * @param {string|URL} url YouTube link want to download to mp3
      * @param {IMetadata} metadata track metadata
      * @param {boolean} autoWriteTags if set true, it will auto write tags meta following the YouTube info
      * @returns 
      */
     static mp3 = async (url, metadata = {}, autoWriteTags = false) => {
         try {
             if (!url) throw new Error('Video ID or YouTube Url is required')
             url = this.isYTUrl(url) ? 'https://www.youtube.com/watch?v=' + this.getVideoID(url) : url
             const { videoDetails } = await ytdl.getInfo(url, { lang: 'id' });
             let stream = ytdl(url, { filter: 'audioonly', quality: 140 });
             let songPath = `./Xiao-♥️-Media/audio/${randomBytes(3).toString('hex')}.mp3`
 
             let starttime;
             stream.once('response', () => {
                 starttime = Date.now();
             });
             stream.on('progress', (chunkLength, downloaded, total) => {
                 const percent = downloaded / total;
                 const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
                 const estimatedDownloadTime = (downloadedMinutes / percent) - downloadedMinutes;
                 readline.cursorTo(process.stdout, 0);
                 process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
                 process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
                 process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
                 process.stdout.write(`, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `);
                 readline.moveCursor(process.stdout, 0, -1);
                 //let txt = `${bgColor(color('[FFMPEG]]', 'black'), '#38ef7d')} ${color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE')} ${gradient.summer('[Converting..]')} ${gradient.cristal(p.targetSize)} kb`
             });
             stream.on('end', () => process.stdout.write('\n\n'));
             stream.on('error', (err) => console.log(err))
 
             const file = await new Promise((resolve) => {
                 ffmpeg(stream)
                     .audioFrequency(44100)
                     .audioChannels(2)
                     .audioBitrate(128)
                     .audioCodec('libmp3lame')
                     .audioQuality(5)
                     .toFormat('mp3')
                     .save(songPath)
                     .on('end', () => {
                         resolve(songPath)
                     })
             });
             if (Object.keys(metadata).length !== 0) {
                 await this.WriteTags(file, metadata)
             }
             if (autoWriteTags) {
                 await this.WriteTags(file, { Title: videoDetails.title, Album: videoDetails.author.name, Year: videoDetails.publishDate.split('-')[0], Image: videoDetails.thumbnails.slice(-1)[0].url })
             }
             return {
                 meta: {
                     title: videoDetails.title,
                     channel: videoDetails.author.name,
                     seconds: videoDetails.lengthSeconds,
                     image: videoDetails.thumbnails.slice(-1)[0].url
                 },
                 path: file,
                 size: fs.statSync(songPath).size
             }
         } catch (error) {
             throw error
         }
     }
 }
 
module.exports = YT;

