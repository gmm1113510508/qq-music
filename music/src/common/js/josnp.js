//https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1&jsonpCallback=jp0
import originJsonp from 'jsonp'
export default function jsonp(url ,data){
    return new Promise((resove,reject)=>{
         //异步调用
         let opt={
            param:'jsonpCallback' // jsonp 传递回调函数的字段
        }
         originJsonp(url,opt,(err,data)=>{
            if(err){
                // 失败 执行 reject方法 
                reject(err)
            }else{
                resove(data)
            }
        })  
    })
} 

//封装promise对象
// 返回一个promise
// promise 对象内部是一个回调函数 参数1 resolve（then接受）  参数2 reject （catch接受） 都是函数  
// 回调函数内部放异步操作
/* function test(){
    return Promise(（resolve，reject）=>{

    })
}
https://blog.csdn.net/qq_38209578/article/details/80405091
*/