
const transfPlayCount = function (playCount = 0) {
    // playCount 点击量
    if (playCount === String) {
        playCount = Number(playCount)
    }
    let playStr = ''
    let num = 10000
    // 播放量单位
    let sizes = ['', '万', '亿', '万亿']
    let i
    // 判断当前歌单播放量是否超过num
    if (playCount <= num) {
        playCount = playCount
    } else {
        i = Math.floor(Math.log(playCount) / Math.log(num))
        playCount = (playCount / Math.pow(num, i)).toFixed(0)
        playStr = sizes[i]
    }
    return playCount + playStr
}

export default transfPlayCount