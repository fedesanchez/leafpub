;(function($,undefined){$.fn.centerIn=function(selector,options,callback){var elements=this;options=options||{};if(typeof(options)==='function'){callback=options;options={};}
var direction=options.direction||$.fn.centerIn.defaults.direction;var extraleft=options.left||0;var extratop=options.top||0;if(selector){selector=$(selector).first();}
else{selector=elements.first().parent();}
try{if(!selector.css('position')||selector.css('position')==='static'){selector.css('position','relative');}}
catch(e){}
var horizontal=function(element){var left=Math.round((selector.innerWidth()- element.outerWidth(false))/ 2);
left+=translateDisplacement(selector,extraleft,'width');element.css('left',left+"px");};var vertical=function(element){var top=Math.round((selector.innerHeight()- element.outerHeight(false))/ 2);
top+=translateDisplacement(selector,extratop,'height');element.css('top',top+"px");};var centerfn=constructCenterFn(horizontal,vertical,callback,direction);elements.each(function(index,element){element=$(element);if(element.css("position")!=='fixed'){element.css("position",'absolute');}
centerfn(element);});return this;};$.fn.alwaysCenterIn=function(){var args=arguments||[];var selector=$(this);selector.centerIn.apply(selector,args);var evt='resize.centerIn';if(selector.attr('id')){evt+='.'+ selector.attr('id');}
$(window).on(evt,function(){selector.centerIn.apply(selector,args);});return this;};$.fn.centerIn.defaults={direction:'both'};function translateDisplacement(selector,value,direction){if(typeof(value)==='number'){return value;}
else if(/px$/i.test(value)){return parseFloat(value.replace('px',''),10);}
else if(/%$/.test(value)){var total=(direction==='width')?$(selector).innerWidth():$(selector).innerHeight();value=parseFloat(value.replace('%',''),10);value/=100;return value*total;}
return parseFloat(value,10);}
function constructCenterFn(horizontal,vertical,callback,direction){var fns=[]
if(!direction||direction==='both'){fns.push(vertical);fns.push(horizontal);}
else if(direction==='horizontal'){fns.push(horizontal);}
else if(direction==='vertical'){fns.push(vertical);}
if(callback){fns.push(callback);}
return compose(fns);}
function compose(){var fns=flatten(arguments);return function(){for(var i=0;i<fns.length;i++){fns[i].apply(this,arguments);}};}
function flatten(array){array=array||[];var flat=[];var len=array.length;for(var i=0;i<len;i++){var item=array[i];if(typeof(item)==='object'&&Array.isArray(item)){flat=flat.concat(flatten(item));}
else{flat.push(item);}}
return flat;}})(jQuery);