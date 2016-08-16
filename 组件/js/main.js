require(['jquery','Window'],function ($,w) {
	$('.btn').click(function() {
		var win	= new w.Window();
		win.alert({
					content: "welcome!",
					/*handler4AlertBtn:function(){
						alert('你点击了确定按钮');
					},
					handler4CloseBtn:function(){
						alert('你点击了关闭按钮');
					},*/
					title : "标题",
					width:300,
					height:150,
					y:50,
					skinClassName:'window_skin_a',
					text4AlertBtn: 'OK',
					hasCloseBtn : true,
					hasMask : true,
					isDraggable: true,
					dragHandle:'.window_header',
				});
		win.on('alert',function(){alert('你点击了确定按钮')});
		win.on('close',function(){alert('第一次点击了关闭按钮')});

	});
	$('.btn_confirm').click(function(){
		var win = new w.Window().confirm({
			title:'系统消息',
			content:'您确定要删除这个文件吗',
			width:300,
			height:150,
			y:50,
			x:600,
			text4ConfirmBtn:'是',
			text4CancelBtn:'否',
			isDraggable: true,
			dragHandle:'.window_header'
		}).on('confirm',function(){
			alert('确定');
		}).on('cancel',function(){
			alert('取消');
		});
	});
	$('.btn_prompt').click(function(){
		var win = new w.Window().prompt({
			title:'请输入您的名字',
			content:'我们将会为您保密您输入的信息',
			width:300,
			height:150,
			y:50,
			text4PromptBtn:'输入',
			text4CancelBtn:'取消',
			defaultValue4PromptInput:'张三',
			dragHandle:'.window_header',
			isDraggable: true,
			handler4PromptBtn:function(inputVlaue){
				alert('您输入的内容是：'+inputVlaue);
			},
			handler4CancelBtn:function(){
				alert('取消');
			}
		});
	});
	$('.btn_common').click(function(){
		var win = new w.Window().common({
				content:'这是一个通用弹窗',
				width:300,
				height:150,
				hasCloseBtn:true
		});
	});

})