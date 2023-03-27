/**
* @project_name Xiao-MD-2 [WA Multi-device]
* @author BlackAmda <https://github.com/NEXUSAT12>
* @description A WhatsApp based 3ʳᵈ party application that provide many services with a real-time automated conversational experience
* @link <https://github.com/NEXUSAT12/Xiao-MD-2>
* @version 4.0.7
* @file  Lang_settings.js - Nexus config var exports
© 2023 Nexus . All rights reserved.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.*/

const { Sequelize } = require('sequelize');
const fs = require('fs');
if (fs.existsSync('Xiao-setting.env')) require('dotenv').config({ path: './Xiao-setting.env' });

module.exports = {
    LANGUAGE: process.env.LANGUAGE || 'EN',
    TZ: process.env.TZ || 'Asia/Colombo'
}
