//JS
var JS={
	 varsion:'2.1.1'
}

JS.Class=function(classDefinition){
	//构造函数
	function getBaseClass(){
		return function() {
		console.log(this,constructCall,typeof this["construct"]==="function")
		//第一次CLASS的时候不触发
		if(typeof this["construct"]==="function" && constructCall===false){
			    console.log("fff",arguments);
			    this.construct.apply(this,arguments);
		}
		}
	}
	
	function createBase(classDefinition){
		 var parent=this.prototype["parent"]||(this.prototype["parent"]={})
		 for(var prop in classDefinition){
             //如果遇到静态方法
		 	 if(prop==="statics"){
		 	 	 //类保存静态方法
		 	 	 for(var sprop in classDefinition.statics){
		 	 	 	  this[sprop]=classDefinition.statics[sprop];
		 	 	 }
		 	 }else{
		 	 	
		 	 	//console.log(prop,this.prototype[prop])
		 	 	 //THIS指向都是Base
		 	 	 if(typeof this.prototype[prop]==="function"){
		 	 	 	  var methods=this.prototype[prop];
		 	 	 	  parent[prop]=methods;
		 	 	 	  //console.log(parent)
		 	 	 }
		 	 	 
		 	 	 //把原型方法赋值给BASE 然后把BASE返回给函数变量
		 	 	 this.prototype[prop]=classDefinition[prop];
		 	 }
		 }
	}
	
	var constructCall=true;
	var Base=getBaseClass();
	constructCall=false;
	
	createBase.call(Base,classDefinition);
	
	//继承类
	Base.extend=function(classDefinition){
		constructCall=true;
		var SonClass=getBaseClass();
		//SonClass原型继承Base;
		SonClass.prototype=new this();
		//console.log(SonClass)
		constructCall=false;
		
		//console.log(SonClass)
		createBase.call(SonClass,classDefinition);
		SonClass.extend=this.extend;
		return SonClass;
	}
	
	return Base;
}
