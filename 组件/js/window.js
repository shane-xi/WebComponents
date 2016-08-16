define(['jquery','jqueryUI','Widget'],function($,$UI,Widget) {
	function Window () {
		this.cfg = {
			width :500,
			height :500,
			content : '',
			title : '系统消息',
			handler : null,
			handler4CloseBtn:null,
			skinClassName :null,
			text4AlertBtn : '确定',
			hsaMask :'true',
			dragHandle : null,
			handler4ConfirmBtn:null,
			handler4CancelBtn:null,
			text4PromptBtn:'确定',
			isPromptInputPassword:false,
			defaultValue4PromptInput:false,
			maxlength4PromptInput:30,
			handler4PromptBtn:null
		};
		this.handlers = {};
	}
	var widget = new Widget();
	//这里有个关键点：如果Window构造函数没有this.handlers{}这个属性，那么他就会被绑定到其原型上
//实例化这个Window对象，就会造成他们原型链的共享，从而导致this.handlers上绑定的自定义事件共享
//所以,这个属性应该放在Window的构造函数中，作为一个实例属性，不可共享
	//var CFG = $.extend({},this.cfg,cfg);
	Window.prototype = $.extend({},widget,{
		alert:function(cfg){
			this.cfg = $.extend({},this.cfg,cfg,{winType:'alert'});
			this.render();
			return this;
		},

		confirm : function(cfg){
			this.cfg = $.extend({},this.cfg,cfg,{winType:'confirm'});
			this.render();
			return this;
		},
		prompt : function(cfg){
			this.cfg = $.extend({},this.cfg,cfg,{winType:'prompt'});
			this.render();
			this._promptInput.focus();
			return this;
		},
		common:function(cfg){
			$.extend(this.cfg,cfg,{winType:'common'});
			this.render();
			return this;
		},
		renderUI : function () {
			var footerContent='';
			switch(this.cfg.winType){
				case "alert":footerContent='<input type="button" value="'+this.cfg.text4AlertBtn+'" class="window_alertBtn">';
					break;
				case "confirm":footerContent='<input type="button" value="'+
					this.cfg.text4ConfirmBtn+'" class="window_confirmBtn"><input type="button" value="'+
					this.cfg.text4CancelBtn+'" class="window_cancelBtn">';
					break;
				case "prompt":
					this.cfg.content+='<p class="window_promptInputWrapper"><input type="'+
					(this.cfg.isPromptInputPassword?"password":"text")+
					'" value="'+this.cfg.defaultValue4PromptInput+
					'" maxlength="'+this.cfg.maxlength4PromptInput+
					'" class="window_promptInput"></p>';
					footerContent='<input type="button" value="'+this.cfg.text4PromptBtn+
					' " class="window_promptBtn"><input type="button" value="'+
					this.cfg.text4CancelBtn+'" class="window_cancelBtn">';
					break;
			}			
			this.boundingBox = $(
			    	'<div class="window_boundingBox">'+
			    		'<div class="window_body">'+this.cfg.content+'</div>'+
			    	'</div>'
			    );
			if (this.cfg.winType!="common") {
				this.boundingBox.prepend('<div class="window_header">'+this.cfg.title+'</div>');
				this.boundingBox.append('<div class="window_footer">'+footerContent+'</div>');
			};
			this.boundingBox.appendTo(document.body);
			if(this.cfg.hsaMask) {
				this.mask = $('<div class="window_mask"></div>');
				this.mask.appendTo("body");
			}
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">X</span>');
			}
			this._promptInput = this.boundingBox.find('.window_promptInput');
		},
		bindUI : function() {
			var that = this;
			this.boundingBox.on("click",".window_alertBtn",function(){
				that.fire('alert');
				that.destroy();
			}).on("click",".window_closeBtn",function(){
				that.fire('close');
				that.destroy();
			}).delegate(".window_confirmBtn","click",function(){
				that.fire('confirm');
				that.destroy();
			}).delegate(".window_cancelBtn","click",function(){
				that.fire('cancel');
				that.destroy();
			}).delegate(".window_promptBtn","click",function(){
				that.fire('prompt',that._promptInput.val());
				that.destroy();
			});
			if (this.cfg.handler4AlertBtn) {
				this.on('alert',this.cfg.handler4AlertBtn);
			};
			if (this.cfg.handler4CloseBtn) {
				this.on('close',this.cfg.handler4CloseBtn);
			};
			if (this.cfg.handler4PromptBtn) {
				this.on("prompt",this.cfg.handler4PromptBtn);
			};			
		},
		syncUI:function(){
			this.boundingBox.css({
				width:this.cfg.width + 'px',
				height:this.cfg.height + 'px',
				left:(this.cfg.x||(window.innerWidth-this.cfg.width)/2) + 'px',
				top:(this.cfg.y||(window.innerHeight-this.cfg.height)/2) + 'px'
			});
			if (this.cfg.skinClassName) {
				this.boundingBox.addClass(this.cfg.skinClassName);
			};
			if (this.cfg.isDraggable) {
				if (this.cfg.dragHandle) {
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}else{
					this.boundingBox.draggable();
				}
			};
		},		
		destructor:function(){
			this.mask && this.mask.remove();
		},
	});
	return {
		Window: Window
	}
})