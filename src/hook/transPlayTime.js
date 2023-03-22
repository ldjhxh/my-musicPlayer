// 处理音乐时长
const transfPlayTime = function (playTime = 100000) {
    // 把音乐时长转换为毫秒数
    const date = new Date(playTime)
    // 分钟
    let mm = date.getMinutes()
    mm = mm < 10 ? '0' + mm : mm
    // 秒
    let ss = date.getSeconds()
    ss = ss < 10 ? '0' + ss : ss
    return `${mm}:${ss}`
}

export default transfPlayTime