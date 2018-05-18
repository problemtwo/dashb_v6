window.onload = function(){
	function g(x){switch(x.substr(0,1)){
		case '#':return document.getElementById(x.substr(1));
	 case '.':return document.getElementsByClassName(x.substr(1));
		default:return document.getElementsByTagName(x);}};
	function fmt(x){return x>=10?x:'0'+x;}
	g('#time').children[0].innerText = fmt(new Date().getHours()) + ':' +
																																				fmt(new Date().getMinutes()) + ':' + 
																																				fmt(new Date().getSeconds());
	setInterval(function(){
		g('#time').children[0].innerText = fmt(new Date().getHours()) + ':' +
			                                  fmt(new Date().getMinutes()) + ':' + 
																																					fmt(new Date().getSeconds());
	},1000);
	const months = ['Jan','Feb','Mar','Apr','May','Jun',
	                'Jul','Aug','Sep','Oct','Nov','Dec'];
	g('#date-a').innerText = months[new Date().getMonth()];
	g('#date-b').innerText = new Date().getDate();
	let days = [31,28,31,30,31,30,31,31,30,31,30,31];
	if(new Date().getFullYear()%4===0){days[1] = 29;}
	for(let i=0;i<days[new Date().getMonth()];i++){
		const el = document.createElement('div');
		el.classList.add('day');
		if(i+1 === new Date().getDate()){el.classList.add('current-day');}
		el.innerText = i+1;
		g('#calendar').children[0].appendChild(el);
	}
	g('#add-reminder').onclick = function(){
		if(g('#reminders-b').children.length < 10){
			const el = document.createElement('div');
			el.classList.add('reminder');
			el.innerText = g('#reminder-text').value;
			g('#reminders-b').appendChild(el);
		}
	};

	let shift = false;
	window.onkeydown = e => {
		if(e.keyCode === 16){shift = true;}
	};
	window.onkeyup = e => {
		if(e.keyCode === 16){shift = false;}
	};

	[...g('.goal-completion')].forEach(v => {
		const v_ctx = v.getContext('2d');
		let v_v = parseInt(v.innerHTML);
		v_ctx.fillStyle = '#2b2b2d';
		v_ctx.textAlign = 'center';
		v_ctx.textBaseline = 'middle';
		v_ctx.font = '36px Ubuntu Condensed';
		v_ctx.fillText(v_v,v.width/2,v.height/2);
		v.onmousedown = () => {
			if(shift){v_v=(v_v+10)>360?0:(v_v+10);}
			else{v_v=(v_v+1)>360?0:(v_v+1);}
			v.innerText = v_v;
			v_ctx.clearRect(0,0,v.width,v.height);
			v_ctx.strokeStyle = '#2b2b2d';
			v_ctx.lineWidth = 10;
			v_ctx.beginPath();
			v_ctx.arc(v.width/2,v.height/2,Math.min(v.width,v.height)/4,0,v_v/360*2*Math.PI);
			v_ctx.stroke();
			v_ctx.fillStyle = '#2b2b2d';
			v_ctx.textAlign = 'center';
			v_ctx.textBaseline = 'middle';
			v_ctx.font = '36px Ubuntu Condensed';
			v_ctx.fillText(v_v,v.width/2,v.height/2);
		};
	});

	g('#change-color').onkeydown = e => {
		switch(e.keyCode) {
			case 13:
				e.preventDefault();
				g('html')[0].style.setProperty('--shade',g('#change-color').value);
			default:
				break;
		}
	};
};
