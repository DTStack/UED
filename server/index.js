const schedule = require('node-schedule')
const envJson = require('../.env.json')

const env = process.env.NODE_ENV || 'development'
const { cron } = envJson[env]

schedule.scheduleJob(cron, () => {
    console.log('每四秒打印一次', cron);
});

