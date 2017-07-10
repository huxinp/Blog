/**
 * Created by huxin on 2017/6/29.
 */
export const toast = (message, options) => {
	if(!message){
		return;
	}
	let info = '',
		timer = null,
		delay = 3000,
		html = document.querySelector('html'),
		style =  {
			"position": "fixed",
			"max-width": "80%",
			"left": "50%",
			"top": "60%",
			"transform": "translate(-50%, -50%)",
			"padding": "6px 12px 8px",
			"border-radius": "4px",
			"font-size": "16px",
			"line-height": "18px",
			"color": "#fff",
			"background-color": "rgba(0, 0, 0, 0.7)",
			"cursor": "pointer",
			"z-index": 10000
		};
	if(typeof message === 'string' || typeof message === 'number'){
		info = message;
		if(options){
			if(options.position){
				if(options.position === 'top'){
					style.top = '20%';
				}else if(options.position === 'middle'){
					style.top = '60%';
				}else if(options.position === 'bottom'){
					style.top = '80%';
				}
			}
			if(options.delay){
				delay = options.delay;
			}
		}
	}else if(typeof message === 'object'){
		if(message.message){
			if(typeof message.message === 'string' || typeof message.message === 'number'){
				info = message.message;
			}else{
				console.log('显示信息类型应为 string 或 number');
				return;
			}
			if(message.position){
				if(message.position === 'top'){
					style.top = '20%';
				}else if(message.position === 'middle'){
					style.top = '60%';
				}else if(message.position === 'bottom'){
					style.top = '80%';
				}
			}
			if(message.delay && typeof message.delay === 'number' && message.delay > 0){
				delay = message.delay;
			}else{
				return;
			}
		}else{
			console.log('请确认传参无误');
			console.log('参考如下\ntoast("the message")\ntoast({message:"the message",position:"middle",delay:3000})');
			return;
		}
	}
	let aStyle = [],
		toast = document.createElement('div');
	for(let i in style){
		aStyle.push(i + ':' +style[i]);
	}
	let sStyle = aStyle.join(';');
	toast.innerHTML = info;
	toast.setAttribute('style', sStyle + ';');

	html.appendChild(toast);

	timer = setTimeout(() => {
		html.removeChild(toast);
	}, delay);
};

export const cookie = {
	getCookie: name => {
		let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
			return unescape(arr[2]);
		else
			return null;
	},
	setCookie: (name, value, expires) =>{
		//expires 过期时间	为负 则是删除    不传就取默认值7天
		let Days, exp = new Date();
		if(expires){
			Days = expires;
		}else{
			Days = 7;//默认7天
		}
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	}
};

