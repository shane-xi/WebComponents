define(function(){
	function Widget(){
		//this.handlers = {}
		this.boundingBox = null; //最外层容器
	}
	Widget.prototype = {
		on : function (type ,func) {
			if (!this.handlers[type]) {
				this.handlers[type] = [];
			}
			this.handlers[type].push(func);
			return this;
		},
		fire : function (type, data) {
			if (this.handlers[type]) {
				this.handlers[type].forEach(function(item){
					item(data);
				})
			}
		},
		remove : function(type,func) {
			if (this.handlers[type])
				if(!func){
					delete this.handlers[type];
				} else{
					this.handlers[type].forEach(function(item,i){
						if (item == func) {
							this.handlers[type].splice(i,1);	
						}
					})
				}	
		},
		renderUI : function () {},  //添加节点
		bindUI : function () {},  //添加事件
		syncUI : function () {},  //添加css属性
		render : function (container) {
			this.renderUI();
			this.bindUI();
			this.syncUI();
			$(container||document.body).append(this.boundingBox);
		},
		destructor:function(){}, //接口：销毁前的处理函数
		destroy:function(){		 //方法：渲染组件
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		}

	}
	return Widget;
})