+function(){
	var initializing=false,fnTest=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;
	
	//所有人工类的基类
	this.Class=function(){
		
	}
	
	Class.extend=function(prop){
		//console.log(this)
		//保存父类的原型
		var _super=this.prototype;
		
		//阻止INIT被触发 
		initializing=true;
		var prototype=new this();  //创建子类的原型
		initializing=false;
		
		
		for(var name in prop){
			prototype[name]=typeof prop[name]==='function'&&typeof _super[name]==='function'
			&&fnTest.test(prop[name])?(function(name,fn){
				return function(){
					 var tmp=this._super;
					 //console.log(_super,_super[name])
					 //调用的时候把父类的函数
					 this._super=_super[name];
					 
					 var ret=fn.apply(this,arguments);
					 
					 this._super=tmp;
					 
					 return ret;
				}
				
			})(name,prop[name]):prop[name];
		}
		
		
		//目标类真实构造器
		function Class(){
			if(!initializing&&this.init){
				 this.init.apply(this,arguments);
			}
		}
		
		Class.prototype=prototype;
		Class.prototype.constructor=Class;
		Class.extend=arguments.callee;
		
		return Class;
	}
}();

