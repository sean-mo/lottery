var lottery = (function(global){
	'use strict';
	
	var def     = { 
		num	   : 3,
		turns  : 200,
		list   : [
			{'name': '流量包100M'    		, 'state': 'succ'},
			{'name': '谢谢参与'      		, 'state': 'fail'},
			{'name': 'UC精美水壶'    		, 'state': 'succ'},
			{'name': '再抽一次'      		, 'state': 'try' },
			{'name': 'UC最新版公仔'  		, 'state': 'succ'},
			{'name': '《后会无期》电影票'   , 'state': 'succ'},
			{'name': '小米3'                , 'state': 'succ'}
		],
		handler : 'rnd'    // 中奖控制： rnd 随机数 server ajax请求
	}, conf,
	requestAnimationFrame = window.requestAnimationFrame
						  || window.mozRequestAnimationFrame
						  || window.webkitRequestAnimationFrame
						  || window.msRequestAnimationFrame
						  || window.oRequestAnimationFrame
						  || function(callback) {	setTimeout(callback, 1000 / 60); };

	

	/* 内部函数  */

	// 初始化配置
	var fn = {
		initialize: function(){
			if(!!!(conf.disc && conf.startBtn)) return;
			fn.setting();
			conf.startBtn.addEventListener('touchstart', function(){
				fn.raffle.call(this);
			}, false);
			conf.startBtn.addEventListener('click', function(){
				fn.raffle.call(this);
			}, false);
		},
		setting: function(){
			conf.lock = false;
			fn.renderNum().calcList();
			return this;
		},
		renderNum: function(){
			if(conf.lotNum) conf.lotNum.textContent = conf.num;
			return this;
		},
		calcList: function(){
			if(conf.list) conf.listNum = conf.list.length;
			return this;
		},
		extend: function(target, obj){
			if(typeof target != 'object' || typeof obj != 'object') return;
			var f; for(f in obj) target[f] = obj[f];
			return target;
		}
	};

	// 开始抽奖
	fn.extend(fn, {
		raffle: function(){
			if(conf.lock) 		return;
			if(!fn.hasLottery()) {
				fn.tip('您没有抽奖机会了，请您明天再来！');
				conf.lock = false;
				return;
			};
			conf.lock = true; conf.num--;
			fn.handler();
		},
		hasLottery: function(){
			return conf.num === 0 ? false : true; 
		},
		handler: function(){
			var func = ( typeof conf.handler === 'string'  ? fn[conf.handler]  : conf.handler );
			fn.resetAnimate(); 
			requestAnimationFrame(function(){
				func(fn.doAnimate);
			});
		},
		rnd: function(func){
			if(func) func.call(fn, parseInt(Math.random()*conf.listNum));
		}
	});

	// 抽奖动画
	fn.extend(fn, {
		doAnimate: function(num){
			conf.result = num;
			conf.deg    = (360*conf.turns)+ (360/conf.listNum)*(conf.listNum-conf.result-1) + (360/conf.listNum/2);
			fn.runAnimate(conf.deg, conf.duration);
		},
		runAnimate: function(deg, duration){
			conf.disc.style.cssText = '-webkit-transition-duration: ' + duration + 's; transition-duration: ' + duration + 's; -webkit-transform: rotate(' + deg + 'deg); transform: rotate(' + deg +'deg);';
			if(duration > 0) setTimeout(fn.show, duration*1000);
		},
		resetAnimate: function(){
			fn.runAnimate(0, 0);
		},
		show: function(){
			fn.renderNum();
			var r = conf.list[conf.result];
			if(!r) {
				fn.tip('抱歉，无法得到正确的抽奖结果');
			}else{
				switch(r.state){
					case 'succ':
						fn.tip('恭喜您，抽到了' + r.name + '！')
						break;
					case 'try':
						fn.tip('恭喜您，获得再抽一次的机会！');
						conf.num++;
						fn.renderNum();
						break;
					default: 
						fn.tip('本次抽奖结束，谢谢参与！');
						break;
				};
			};

			conf.lock = false;
		}
	})

	// 基础函数
	fn.extend(fn, {
		tip: function(str){
			alert(str)
		}
	});

	// 函数返回
	return function(options){
		conf = fn.extend(def, options);
		fn.initialize();
	}

})(window); 