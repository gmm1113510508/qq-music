/*派生属性*/
export default{
    currentSong(state){
        console.log(state.songList)
        console.log(state.nowIndex)//next
        if(state.songList.length==0){ return {}}
        let albid=state.songList[state.nowIndex].albid
        console.log(albid);
        let songmid=state.songList[state.nowIndex].songmid
        let imgUrl=`https://y.gtimg.cn/music/photo_new/T002R300x300M000${albid}.jpg?max_age=2592000`
        let song=state.songList[state.nowIndex]
        song.imgUrl=imgUrl
        song.songUrl=`http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=9588463978&vkey=E55F473BC7D9C323AC2F55DE975014F56512C84D46CA6EA8645AD21CCCE5DF543BA8125CA6CA869E1A7C11FA5B9B3FB459EE15AB557F9281&uin=0&fromtag=38`

        console.log('----');
        console.log(song);
        return  song
    }
}
// http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400000Qepff3UyUWO.m4a?guid=9588463978&vkey=E55F473BC7D9C323AC2F55DE975014F56512C84D46CA6EA8645AD21CCCE5DF543BA8125CA6CA869E1A7C11FA5B9B3FB459EE15AB557F9281&uin=0&fromtag=38
//  http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400000Qepff3UyUWO.m4a?guid=3938336900&vkey=8C14F866993F7C9D3CCEC95FB230F4BC9B9F4F63E8A5975B84B76DF93224316A97FAA0296D2B1C96617E5FCA686A7F68626855AC3346B7F8&uin=0&fromtag=38
// https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&hostUin=0&needNewCode=0&platform=yqq&order=listen&begin=0&num=80&songstatus=1&singermid=0025NhlN2yWrP4&jsonpCallback=jp1
//let url=`/hy/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${newSong.songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1552266108016`
//歌词获取  http://ustbhuangyi.com/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=001TXSYu1Gwuwv&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1552285466206