// 将时间戳转换成日期
const getDate = (val = new Date().getTime() / 1000) => {
    const date = new Date(Number(val) * 1000)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return {
        date: `${year}-${addZero(month)}-${addZero(day)}`,
        time: `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`,
    }
}

// 补零
const addZero = (num) => {
    return num < 10 ? `0${num}` : num
}

const getDateStr = (val) => {
    const { date, time } = getDate(val)
    return `${date} ${time}`
}

module.exports = {
    getDate,
    getDateStr,
}
