/*
	Plugn jWheel - Add event 'mousewheel'
	@param Object (event), Function
	@return undefined
	@author Evandro L. Gonçalves
*/
(function($){
	var 
		NAME_EVENT = "mousewheel",
		Wheel = {
			event: $.browser.mozilla ? "DOMMouseScroll" : "mousewheel",
			/* 
				Method construct
				@param Object (event) 
				@return undefined
				@author undefined / change by Evandro L. Gonçalves
			*/
			init: function(e){
				var delta = 0;
				
				if(!e){
					e = window.event;
				}
				
				if(e.wheelDelta){
					delta = e.wheelDelta / 120;
					
					if(window.opera){
						delta = -delta;
					}
				}else if(e.detail){
					delta = -e.detail / 3;
				}
				
				e.type = NAME_EVENT;
				$.event.handle.call(this, e, delta);
			}
		}
	
	$.fn.mousewheel = function(fn){
		return this["bind"](NAME_EVENT, fn);
	}
	
	$.event.special.mousewheel = {
		setup: function(){
			$.event.add(this, Wheel.event, Wheel.init, {});
		},
		
		teardown: function(){
			$.event.remove(this, Wheel.event, Wheel.init);
		}
	}
})(jQuery);