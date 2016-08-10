var subStr1 = /^[a-z]/i;

var subStr2 = /^#/;

var subStr3 = /^\./;

function getClass(classStyle) {

	var elements = document.getElementsByTagName('*');

	var arrClass = [];

	for (var i = 0; i < elements.length; i++) {

		var reg = new RegExp('\\b' + classStyle + '\\b', 'i');

		if (elements[i].className.match(reg)) {

			arrClass.push(elements[i]);

		};

	};

	return arrClass;

};

function getStyle(obj, attr) {

	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];

};

function Attacks(elements) {

	this.el = [];

	this.This = null;

	this.fxTimer = null;

	if (typeof elements === 'string') {

		if (elements.match(subStr1)) {

			var nodes = document.getElementsByTagName(elements);

			var nodesLen = nodes.length;

			for (var i = 0; i < nodesLen; i++) {

				this.el.push(nodes[i]);

			};

		};

		if (elements.match(subStr2)) {

			var nodeId = elements.substr(1);

			this.el.push(document.getElementById(nodeId)); //这是获取ID

		};

		if (elements.match(subStr3)) {

			var nodeClass = getClass(elements.substr(1));

			var nodeClassLen = nodeClass.length;

			for (var i = 0; i < nodeClassLen; i++) {

				this.el.push(nodeClass[i]);

			};

		};

	} else if (typeof elements === 'object') {

		this.This = elements;

	};

	//	return el;
};

Attacks.prototype = {

	css: function(attr, value) {

		var arrStyle = [];

		if (this.This === null) {

			if (typeof attr === 'object' && arguments.length === 1) {

				for (var i = 0; i < this.el.length; i++) { //双循环 第一次循环数组里面的元素 这是为了获取多个元素搞的

					for (var j in attr) { //然后 添加CSS

						this.el[i].style[j] = attr[j]; //i个元素的j属性和属性值

					};

				};

			} else if (typeof attr === 'string' && arguments.length === 1) { //判断attr是否为字符串 和参数数量是否为1

				for (var i = 0; i < this.el.length; i++) {

					arrStyle.push(getStyle(this.el[i], attr));

				};

				//获取多组元素CSS如果数组数量为1那么直接返回1 方便使用 下文同这里
				return (arrStyle.length === 1) ? arrStyle[0] : arrStyle;

			} else if (arguments.length === 2); //如果传了两个东西	

			for (var i = 0; i < this.el.length; i++) {

				this.el[i].style[attr] = value; //直接添加

			};

		} else {

			if (typeof attr === 'object' && arguments.length === 1) {

				for (var j in attr) {

					this.This.style[j] = attr[j];

				};


			} else if (typeof attr === 'string' && arguments.length === 1) {

				arrStyle.push(getStyle(this.This, attr));

				return (arrStyle.length === 1) ? arrStyle[0] : arrStyle;

			} else if (arguments.length === 2); //如果传了两个东西	

			this.This.style[attr] = value; //直接添加

		};


	},

	changeCss: function(attr, value) {

		attrValue = [];

		value = parseInt(value); //转换

		if (this.This === null) {

			if (!value) {

				for (var i = 0; i < this.el.length; i++) {

					attrValue.push(parseInt(getStyle(this.el[i], attr)));

				};

				return (attrValue.length === 1) ? attrValue[0] : attrValue; //同CSS写法

			} else if (typeof value === 'number') {

				for (var i = 0; i < this.el.length; i++) {

					this.el[i].style[attr] = value + 'px';

				}

				return value; //返回设置值

			};

		} else {

			if (!value) {

				attrValue.push(parseInt(getStyle(this.This, attr)));

				return (attrValue.length === 1) ? attrValue[0] : attrValue; //同CSS写法

			} else if (typeof value === 'number') {

				this.This.style[attr] = value + 'px';

				return value; //返回设置值

			};

		};


	},

	height: function(value) {

		return this.changeCss('height', value);

	},

	width: function(value) {

		return this.changeCss('width', value);

	},

	top: function(value) {

		return this.changeCss('top', value);

	},

	left: function(value) {

		return this.changeCss('left', value);

	},

	html: function(value) {

		var arrHtml = [];

		if (this.This === null) {

			if (value) {

				for (var i = 0; i < this.el.length; i++) {

					this.el[i].innerHTML = value;

				};

				return value; //返回设置值

			} else {

				for (var i = 0; i < this.el.length; i++) {

					arrHtml.push(this.el[i].innerHTML);

				};

				return arrHtml; //返回取值

			};

		} else {

			if (value) {

				this.This.innerHTML = value;

				return value; //返回设置值

			} else {

				return this.This.innerHTML; //返回取值

			};

		};

	},

	text: function(value) {

		var arrText = [];

		if (this.This === null) {

			if (!value) {

				for (var i = 0; i < this.el.length; i++) {

					this.el[i].textContent ? arrText.push(this.el[i].textContent) : arrText.push(this.el[i].innerText);

				};

				return arrText; //返回取值

			} else {

				for (var i = 0; i < this.el.length; i++) {

					this.el[i].textContent ? this.el[i].textContent = value : this.el[i].innerText = value;
					//判断方法
				};

				return value; //返回value值

			};

		} else {

			if (!value) {

				return (this.This.textContent) ? this.This.textContent : this.This.innerText;

			} else {

				this.This.textContent ? this.This.textContent = value : this.This.innerText = value;

				//判断方法			
				return value; //返回value值

			};

		};

	},

	val: function(value) {

		arrVal = [];

		if (this.This === null) {

			if (!value) {

				for (var i = 0; i < this.el.length; i++) {

					arrVal.push(this.el[i].value);

				};

				return (arrVal.length === 1) ? arrVal[0] : arrVal;

			} else {

				for (var i = 0; i < this.el.length; i++) {

					this.el[i].value = value;

				};

				return value;

			};

		} else {

			if (!value) {

				return this.This.value;

			} else {

				this.This.value = value;

				return value;

			};

		};

	},

	attr: function(Attr, setAttr) {

		var arrAttr = [];

		if (this.This === null) {

			if (Attr && arguments.length === 1) { //判断是否有Attr 和参数数量

				for (var i = 0; i < this.el.length; i++) {

					arrAttr.push(this.el[i].getAttribute(Attr));

				};

				return (arrAttr.length === 1) ? arrAttr[0] : arrAttr; //同CSS写法

			};

			if (typeof Attr === 'string' && setAttr) { //判断Attr类型 是否有第二个参数

				for (var i = 0; i < this.el.length; i++) {

					this.el[i].setAttribute(Attr, setAttr); //给遍历到多组元素全部设置

				};

			};

		} else {

			if (Attr && arguments.length === 1) { //判断是否有Attr 和参数数量

				return this.This.getAttribute(Attr) //同CSS写法

			};

			if (typeof Attr === 'string' && setAttr) { //判断Attr类型 是否有第二个参数

				this.This.setAttribute(Attr, setAttr); //给当前设置

				return Attr;

			};

		};

	},

	choose: function(index) {

		return index ? this.el[index] : null;

	},

	newElement: function(el,jsonAttr) {

		if (typeof el === 'string') {

			var newEl = document.createElement(el)

			return newEl;

		} else {

			return null;

		};

	},

	El: function() {

		return (this.This === null) ? this.el : this.This;

	},

	hide: function() {

		if (this.This === null) {

			for (var i = 0; i < this.el.length; i++) {

				this.el[i].style.display = 'none';

			};

		} else {

			this.This.style.display = 'none';

		};

	},

	show: function() {

		if (this.This === null) {

			for (var i = 0; i < this.el.length; i++) {

				this.el[i].style.display = 'block';

			};

		} else {

			this.This.style.display = 'block';

		};

	},

	addClass: function(classStyle) {

		if (this.This === null) {

			if (typeof classStyle === 'string') {

				for (var i = 0; i < this.el.length; i++) {

					this.el[i].className += ' ' + classStyle;

				};

			} else if (typeof classStyle === 'object') {

				for (var i = 0; i < this.el.length; i++) {

					for (var j in classStyle) {

						this.el[i].className += ' ' + classStyle[j];

					};

				};

			};

		} else {

			if (typeof classStyle === 'string') {

				this.This.className += ' ' + classStyle;

			} else if (typeof classStyle === 'object') {

				for (var j in classStyle) {

					this.This.className += ' ' + classStyle[j];

				};

			};

		};

	},

	delClass: function(delVal) {

		if (this.This === null) {

			if (!delVal) {

				for (var i = 0; i < this.el.length; i++) {

					this.el[i].className = '';

				};

			};

		} else {
			
			if(!delVal){
				
				this.This.className = '';
				
			}else{
				
				var sclass=this.attr('class');
				
				var reg=new RegExp(delVal,'g');
				
				this.This.className=sclass.replace(reg,'');
				
			};
			
		};

	},

	first: function() {

		return this.el[0];

	},

	last: function() {

		return this.el[this.el.length - 1];

	},

	less: function(numVal) {

		var arrLessEl = [];

		if (typeof numVal === 'number' && numVal >= 0) {

			if (numVal > this.el.length) return;

			for (var i = 0; i < numVal; i++) {

				arrLessEl.push(this.el[i]);

			};

			return arrLessEl;

		} else {

			return undefined;

		};

	},

	more: function(numVal) {

		var arrMoreEl = [];

		if (typeof numVal === 'number' && numVal >= 0) {

			if (numVal > this.el.length) return;

			for (var i = numVal; i < this.el.length; i++) {

				arrMoreEl.push(this.el[i]);

			};

			return arrMoreEl;

		} else {

			return undefined;

		};

	},

	even: function(startVal) {

		var arrEvenEl = [];

		startVal = startVal ? startVal : 0;

		if (startVal > this.el.length || typeof startVal === 'string') return;

		for (var i = startVal; i < this.el.length; i += 2) {

			arrEvenEl.push(this.el[i]);

		}

		return arrEvenEl;

	},

	odd: function(startVal) {

		var arrOddEl = [];

		startVal = startVal ? startVal : 1;

		if (startVal > this.el.length || typeof startVal === 'string') return;

		for (var i = startVal; i < this.el.length; i += 2) {

			arrOddEl.push(this.el[i]);

		}

		return arrOddEl;

	},

	animate: function(json, callback) {

		obj = (this.This === null) ? this.el[0] : this.This;

		clearInterval(obj.timer);

		obj.timer = setInterval(function() {

			var bStop = true;

			for (var attr in json) {

				var cur = 0;

				if (attr == 'opacity') {

					cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);

				} else {

					cur = parseInt(getStyle(obj, attr));

				};

				var speed = (json[attr] - cur) / 6;

				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

				if (cur != json[attr])

					bStop = false;

				if (attr == 'opacity') {

					obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';

					obj.style.opacity = (cur + speed) / 100;

				} else {

					obj.style[attr] = cur + speed + 'px';

				};

			};

			if (bStop) {

				clearInterval(obj.timer);

				if (callback) callback();

			};

		}, 30);

	},
	
	forEach: function(obj,fn){
		
		if(typeof obj ==='function'){
			
			for(var i = 0; i < this.el.length;i++){
				
				obj(i,this.el[i]);
			
			};
			
		};
		
		if(obj instanceof Array && typeof fn === 'function'){
			
			for(var i = 0; i < obj.length; i++){
				
				fn(i,obj[i]);

			};			
			
		};
		   //通过原型内置对象判断
		if(Object.prototype.toString.call(obj) === '[object Object]' && typeof fn === 'function'){
			
			for(var i in obj){
					
				fn(i,obj[i]);
						
			};

		};

	},
	
	isArr: function(arr){
		
		return (Object.prototype.toString.call(arr) === '[object Array]');
		
	},
	
	isFn: function(fn){
		
		return (Object.prototype.toString.call(fn) === '[object Function]');
		
	},
	
	isObj: function(obj){
		
		return (Object.prototype.toString.call(obj) === '[object Object]');
		
	},
	
	isStr: function(str){
		
		return (Object.prototype.toString.call(str) === '[object String]');
		
	},
	
	isNum: function(num){
		
		return (Object.prototype.toString.call(num) === '[object Number]');
		
	},
	
	isBlo: function(blo){
		
		return (Object.prototype.toString.call(blo) === '[object Boolean]');
		
	},
	
	isUnde: function(un){
		
		return (Object.prototype.toString.call(un) === '[object Undefined]');
		
	},
	
	isNull: function(obj){
		
		return (obj === null || obj === undefined);

	},
	
	isDate: function(obj){
		
		return (Object.prototype.toString.call(obj) === '[object Date]');
		
	},
	
	isReg: function(obj){
		
		return (Object.prototype.toString.call(obj) === '[object RegExp]');
		
	},
	
	sum: function(arr){
		
		var results =0;
		
		for(var i = 0 ;i < arr.length;i++){
			
			results+=arr[i];			
			
		};
		
	    return results;
		
	},
	
	max: function(arr){
		
		var maxNum=Math.max.apply(this.max,arr);
		
		return maxNum;
		
	},
	
	min: function(arr){
		
		var minNum=Math.min.apply(this.min,arr);
		
		return minNum;
		
	},
	
	avg: function(arr){
		
		var avgNum=null;
		
		var sum=this.sum(arr);
		
		avgNum=sum/arr.length;
		
		return avgNum;
		
	},
	
	random: function(arr){
		
		var random=arr[Math.floor(Math.random()*arr.length)];
		
		return random;
	},
	
	indexOf: function(arr,val){
		
		for(var i = 0; i < arr.length;i++){
			
			if(arr[i] === val){
				
				return i;
				
			};
			
		};
		
	},
	
	removeVal: function(arr,val){
		
		var index=this.indexof(arr,val);
		
		if(index > -1){
			
			arr.splice(index,1);
			
		};
		
	},
	
	lessNum: function(arr,num){
		
		var lessResults=[];		
		 	
		for(var i = 0;i < arr.length;i++){
			
			if(arr[i] < num){
				
				lessResults.push(arr[i]);
				
			};
			
		};
	
	return lessResults;
		
	},
	
	moreNum: function(arr,num){
		
		var moreResults=[];
		
		for(var i = 0;i < arr.length;i++){

			if(arr[i] > num){
				
				moreResults.push(arr[i]);
				
			};
			
		};
	
	return moreResults;
		
	},
	
	jsonLen: function(obj){
		
		var i = 0;
		
		if(this.isObj(obj)){
			
			for(var j in obj){
				
				i++;
				
			};
			
			return i;
			
		}else{
			
			return null;
			
		};	
		
	},
	
	findNum: function(arr){
		
		var NumResults=[];
		
		for(var i = 0 ;i < arr.length; i++){
			
			if(typeof arr[i] === 'number'){
				
				NumResults.push(arr[i]);
							
			};		
			
		};
		
	return NumResults;
		
	},
	
	findStr: function(arr){
		
		var StrResults=[];
		
		for(var i = 0 ;i < arr.length; i++){
			
			if(typeof arr[i] === 'string'){
				
				StrResults.push(arr[i]);
							
			};		
			
		};
		
	return StrResults; 	
		
	},
	
	common: function(){
		
		var commons=[];
		
		var concatArr=[];
		
		for(var i = 0; i < arguments.length;i++){
			
			for(var j = 0; j < arguments[i].length;j++){
				
				concatArr.push(arguments[i][j]);
			
			};
			
		};
		
		concatArr=concatArr.sort();
		
		for (var i = 0; i < concatArr.length; i++) {
			
			if (concatArr[i] === concatArr[i+1]) {
				
				commons.push(concatArr[i]);
			
			};
			
    };
		
		return commons;
		
	},	
	
	uneff:function(arr){
		
		var effArr=[];
		
		for(var i=0 ;i < arr.length;i++){
			
			if( arr[i] === null || arr[i] === undefined || arr[i] === ''){
			
			this.removeVal(arr,arr[i]);
			
			}else{
				
				effArr.push(arr[i]);
			
			};
		
		};
		
		return effArr;
			
	},
	
	unNum: function(arr){
		
		var unNumArr=[];
		
		for(var i = 0; i < arr.length;i++){
			
			(typeof arr[i] === 'number')?this.removeVal(arr,arr[i]):unNumArr.push(arr[i]);
			
		};
		
	return unNumArr;
		
	},
	
	unStr: function(arr){
		
		var unStrArr=[];
		
		for(var i = 0; i < arr.length;i++){
			
			if(typeof arr[i] !== 'string'){
				
				unStrArr.push(arr[i])
				
			};
			
		};
		
	return unStrArr;
		
	},
	
	unique: function(arr){
		
		var uniqueArr=[];		
		
		var json = {};
		
		for(var i = 0; i < arr.length; i++){
			
			if(!json[arr[i]]){
				
				uniqueArr.push(arr[i]);
				
				json[arr[i]] = 1;
				
			};
 
		};
		
/*1.创建一个新的数组存放结果

2.创建一个空对象

3.for循环时，每次取出一个元素与对象进行对比，如果这个元素不重复，则把它存放到结果数组中，
同时把这个元素的内容作为对象的一个属性，并赋值为1，存入到第2步建立的对象中。

说明：至于如何对比，就是每次从原数组中取出一个元素，然后到对象中去访问这个属性，
如果能访问到值，则说明重复。*/
		
	return uniqueArr;
		
	},
	
	action: function(ev, fn) {

		for (var i = 0; i < this.el.length; i++) { //为多个元素创建同一事件

			this.el[i].attachEvent ? this.el[i].attachEvent("on" + ev, fn) : this.el[i].addEventListener(ev, fn, false);
			//兼容写法
		};

	},

	setkillf: function(focus, blur) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].onfocus = focus;

			this.el[i].onblur = blur;

		};

	},

	keydown: function(fn) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].onkeydown = fn;

		};

	},

	click: function(fn) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].onclick = fn;

		};

	},

	dclick: function(fn) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].ondblclick = fn;

		};

	},

	mouseover: function(fn) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].onmouseover = fn;

		};

	},

	mouseout: function(fn) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].onmouseout = fn;

		};

	},

	focus: function(fn) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].onfocus = fn;

		};

	},

	blur: function(fn) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].onblur = fn;

		};

	},

	change: function(fn) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].onchange = fn;

		};

	},

	hover: function(over, out) {

		for (var i = 0; i < this.el.length; i++) {

			this.el[i].onmouseover = over;

			this.el[i].onmouseout = out;

		};

	}

};
window.att = function(elements) {

	return new Attacks(elements);

};

(function() {

	"use strict";
	
	console.log('Version:1.0');
	
	console.log('Date:2016/8/9/23:43');

})();
