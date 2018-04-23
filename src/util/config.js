// http://blog.csdn.net/fangfanggaogao/article/details/72674334(vue源码文章，replace的高级用法)
// http://blog.csdn.net/fangfanggaogao/article/details/72636831(JSON.stringify高级用法)
// http://blog.csdn.net/fangfanggaogao/article/details/72629405( Vue2.3.0源码笔记(未完))
// http://blog.csdn.net/fangfanggaogao/article/details/78331264

{
  var str="/student/152188"
  str.replace(/^\/student\/([\d]{6})$/, "W3Schoo21321321l")  // W3Schoo21321321l

  var str="/student/152188"
  str.replace(/ent\/([\d]{6})$/, "我被正则匹配,且替换")  // /stud我被正则匹配,且替换
}




/*	 replace其他用法(回调函数)	*/
{
  var camelizeRE = /-(\w)/g;  
  var camelize =function (str) {  
      return str.replace(camelizeRE, function (_,c) {   
          console.log('camelize',_,c);    //camelize -i i    // camelize -e e  
          return c ? c.toUpperCase() : '';   
      })  
  };  

  var tem = 'this-is-el';  
  console.log(camelize(tem))   //thisIsEl  
}



{
  var tem2 = 'a910-a2-a3qq'  
  tem2 = tem2.replace(/(\d)+/g, function (macth) {  
      return macth*10;  
  })  
  console.log(tem2);   //a9100-a20-a30qq
}

{

  {
    let allcookies = "caToken=18446744071411467872; _ga=GA1.2.1263283024.1493135627; _gat=1";
    allcookies = allcookies.replace(/;/g,'","').replace(/=/g,'":"');
    let cookie_pos = JSON.parse('{"'+allcookies+'"}');
    console.log(cookie_pos)  //{caToken: "18446744071411467872", " _ga": "GA1.2.1263283024.1493135627", " _gat": "1"}
  }

  {
    let allcookies = "caToken=18446744071411467872; _ga=GA1.2.1263283024.1493135627; _gat=1";
    let resultObj = allcookies.split(';').reduce((result,item)=>{
      let [key,value] = item.split('=')
      result[key] = value
      return result
    },Object.create(null))
    console.log(resultObj)   //{caToken: "18446744071411467872", " _ga": "GA1.2.1263283024.1493135627", " _gat": "1"}
  }

}










{
  /*		merge数组	*/
  var arr1 = [{name:'11',age:'AA'},{name:'4',age:'vv'},{name:'77',age:'b'}]
  var arr2 = [{name:'11',eat:'水果'},{name:'1111111',ageeeee:'vv12312'},{name:'77',age2:'bbbb'}]	


  arr1.reduce((result,item)=>{
  	let match = result.find((only)=>{
  		return only.name === item.name && item
  	})

  	match && (match.age = item.age) || result.push(item)
  	return result
  },arr2)
  console.log(arr2)
  //[{age:"AA",eat:"水果",name:"11"},{ageeeee:"vv12312",name:"1111111"},{age:"b",age2:"bbbb",name:"77"},{age:"vv",name:"4"}]
}








/** 见 apptest.js */
{
  {
    var obj = {  
      name: "Shelock",  
      age: 21,  
      class: 1  
    };  
    var b = ['name', 'grade', 'class']  
    var json = JSON.stringify(obj,b);   
    console.log(json, typeof json);   //{"name":"Shelock","class":1} string  


    let obj1 = {name: '11', sex: '22'}
    Reflect.deleteProperty(obj1,'name')
    console.log(obj1)   // {sex: '22'}
  }


  {
    let str = 'aa'
    if(~str.indexOf('b')){
      console.log('找到了b')
    }else{
      console.log('没找到b')
    }
  }
}




/**
 * https://segmentfault.com/a/1190000013972464
 */
{
  let object1 = { a:1, b:2,c:3 }
  let object2 = { b:30, c:40, d:50}
  let merged = {...object1,...object2} //spread and re-add into merged
  console.log(merged) // {a: 1, b: 30, c: 40, d: 50}
}

{
  let object1 = { a:1, b:2,c:3 }
  let object2 = { b:30, c:40, d:50}
  let merged = {...object2,...object1} //spread and re-add into merged
  console.log(merged) // {a: 1, b: 2, c: 3, d: 50}
}

{
  let cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
  let carsObj = cars.reduce(function (obj, name) { 
    obj[name] = obj[name] && ++obj[name] || 1
    return obj
  }, Object.create(null));
  console.log(carsObj) // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }
}



{
  function getArrRepeatIndex(arr,el){
    let repeatIndex = []
    let idx = arr.lastIndexOf(el)

    while(idx !== -1){
      repeatIndex = [...repeatIndex,idx]

      if(idx > 0){
        idx = arr.lastIndexOf(el,idx - 1)
      }else{
        idx = -1
      }
    }
    return repeatIndex
  }

  let arr = ['a','b','a','c','a','d'];
  getArrRepeatIndex(arr,'a')
}


{
  function getArrRepeatIndex(arr,el){
    let repeatIndex = []
    let idx = arr.lastIndexOf(el)
    
    while(idx !== -1){
      repeatIndex = [...repeatIndex,idx]
      idx = idx > 0 ? arr.lastIndexOf(el,idx - 1) : -1
    }
    return repeatIndex
  }

  let arr = ['a','b','a','c','a','d'];
  getArrRepeatIndex(arr,'a')
}


{
  function getArrRepeatIndex(arr,el){
    let idx = arr.lastIndexOf(el)
    return arr.reduce((result,item)=>{
      if(idx >= 0){
        result = [...result,idx]
      }
      idx = idx > 0 ? arr.lastIndexOf(el,idx - 1) : -1
      return result
    },[])
  }

  let arr = ['a','b','a','c','a','d'];
  getArrRepeatIndex(arr,'a')
}












{
  function getArrRepeatIndex(arr,el){
    let repeatIndex = []
    let idx = arr.lastIndexOf(el)

    while(idx !== -1){
      repeatIndex = [...repeatIndex,idx]

      if(idx > 0){
        idx = arr.lastIndexOf(el,idx - 1)
      }else{
        idx = -1
      }
    }
    return repeatIndex
  }

  let arr = ['a','b','a','c','a','d'];
  getArrRepeatIndex(arr,'a')
}

{
  function getArrRepeatIndex(arr,el){
    let repeatIndex = []
    let idx = arr.lastIndexOf(el)
    
    while(idx !== -1){
      repeatIndex = [...repeatIndex,idx]
      idx = idx > 0 ? arr.lastIndexOf(el,idx - 1) : -1
    }
    return repeatIndex
  }

  let arr = ['a','b','a','c','a','d'];
  getArrRepeatIndex(arr,'a')
}

{
  function getArrRepeatIndex(arr,el){
    let idx = arr.lastIndexOf(el)
    return arr.reduce((result,item)=>{
      if(idx >= 0){
        result = [...result,idx]
      }
      idx = idx > 0 ? arr.lastIndexOf(el,idx - 1) : -1
      return result
    },[])
  }

  let arr = ['a','b','a','c','a','d'];
  getArrRepeatIndex(arr,'a')
}








{
  isParensBalanced('(())') // 0 <-- balanced
  isParensBalanced('(asdfds)') //0 <-- balanced
  isParensBalanced('(()') // 1 <-- not balanced
  isParensBalanced(')(') // -1 <-- not balanced

  function isParensBalanced(str){
    return str.split('').reduce((result,item)=>{
      // if(result < 0) { //matched ")" before "("
      //   return result;
      // } else if(item === '(') {
      //   return ++result;
      // } else if(item === ')') {
      //   return --result;
      // }  else { //matched some other char
      //   return result;
      // }
      

      if(result < 0){
        return result
      }

      if(item === '(') {
        ++result;
      } else if(item === ')') {
        --result;
      }
      return result
    },0)
  }
}