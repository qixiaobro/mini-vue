class Observer{
 constructor (data) {
  this.walk(data)
 }
 
 walk(data){
  //1. 判断data是否是对象
  if(!data || typeof data !== 'object'){
   return
  }

  //2. 遍历data对象的所有属性
  Object.keys(data).forEach(key => {
   this.defineReactive(data, key, data[key])
  })
 }

 //val 防止死递归,不能使用obj[key]
 defineReactive(obj, key, val) {
  let that = this
  // 负责收集依赖
  let dep = new Dep()
  this.walk(val)//判断val是不是对象，如果是将val内部的属性转为响应式
  Object.defineProperty(obj, key, {
   enumerable:true,
   configurable: true,
   get() {
    //收集依赖
    Dep.target && dep.addSub(Dep.target)
    return val
   },
   set (newValue){
    if(newValue === val) {
     return
    }
    val = newValue
    //新赋值的数据是对象的话需要将其属性转为响应式
    that.walk(val)
    //发送通知
    dep.notify()
   }
  })
 }
}