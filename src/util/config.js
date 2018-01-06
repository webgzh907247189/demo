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


