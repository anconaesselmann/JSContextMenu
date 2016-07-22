

/***********************************************
	Resource: math/Point.js
***********************************************/




// @author Axel Ancona Esselmann

// declare the parent constructor:
function Point (x, y, z) {
	this.set(x, y, z);
	this._drawn = false;
	this.name = null;

}; //inheritPrototype(Sprite, Element);

Point.prototype.type = 'Point';

Point.prototype.toString = function() {
	return '('+this.x+', '+this.y+', '+this.z+')';
}

Point.prototype._instanceCount = 0;

Point.prototype.getNode = function () {
	if (this.name !== null) {
		return document.getElementById(this.name);
	} else return null;
};

Point.prototype.set = function (x, y, z) {
	x = typeof x !== 'undefined' ? x : 0;
	y = typeof y !== 'undefined' ? y : 0;
	z = typeof z !== 'undefined' ? z : 0;
	this.x = x;
	this.y = y;
	this.z = z;
};

Point.prototype.subtr = function(p) {
	return new Point(
		this.x-p.x,
		this.y-p.y,
		this.z-p.z
	);
};

Point.prototype.round = function(decPl) {
	decPl = typeof decPl !== 'undefined' ? decPl : 0;
	var fact = Math.pow(10,Math.abs(Math.round(decPl)));
	this.x = Math.round(this.x * fact) / fact;
	this.y = Math.round(this.y * fact) / fact;
	this.z = Math.round(this.z * fact) / fact;
}

Point.prototype.shift = function (xShift, yShift, zShift) {
	xShift = typeof xShift !== 'undefined' ? xShift : 0;
	yShift = typeof yShift !== 'undefined' ? yShift : 0;
	zShift = typeof zShift !== 'undefined' ? zShift : 0;
	this.x += xShift;
	this.y += yShift;
	this.x += zShift;
};

Point.prototype.draw = function (domNode, color) {
	color = typeof color !== 'undefined' ? color : 'black';
	if (this.name === null) {
		this.name = 'Point_'+Point.prototype._instanceCount;
		Point.prototype._instanceCount++;

		var fragment = document.createDocumentFragment();

		var svgns = "http://www.w3.org/2000/svg";

		var svg = document.createElementNS(svgns,'svg');

		svg.setAttribute('version', '1.1');
		svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');



		svg.setAttribute('style', 'position:absolute;left:'+(this.x-1)+'px;top:'+(this.y-1)+'px;width:100px;height:100px');

		svg.setAttribute('viewBox', '0 0 200 200');
		svg.setAttribute('enable-background', 'new 0 0 200 200');
		svg.setAttribute('xml:space', 'preserve');
		svg.setAttribute('id', this.name);


		var circle = document.createElementNS(svgns, "circle");
		//circle.setAttribute('class', 'circle');
		//circle.setAttributeNS(null, 'id', this.name+' circle');
		circle.setAttributeNS(null, 'fill', color);
		circle.setAttributeNS(null, 'stroke', color);
		circle.setAttributeNS(null, 'stroke-miterlimit', '10');
		circle.setAttributeNS(null, 'cx', 5.5);
		circle.setAttributeNS(null, 'cy', 5.5);
		circle.setAttributeNS(null, 'r', 5);

		svg.appendChild(circle);
		fragment.appendChild(svg);

		domNode.appendChild(fragment);
	} else {
		alert('inside old node, this has not been tested');
		var svg = this.getNode();
		svg.setAttribute('style', 'position:absolute;left:'+(this.x-1)+'px;top:'+(this.y-1)+'px;width:100px;height:100px;');
	}


}

Point.prototype.norm = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y);
}
Point.prototype.remove = function () {
	alert('not tested');
	alert(this.name);
	this.getNode().parentNode.removeChild(this);
}


/***********************************************
	Resource: std/EventUtil.js
***********************************************/



/**
 * EventUtil is adapted from "Professional JavaScript for Web Developers" by Nicholas Zakas
 */

var EventUtil = {

    addHandler: function(element, type, handler){
        if (element.addEventListener){
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent){
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    getButton: function(event){
        if (document.implementation.hasFeature("MouseEvents", "2.0")){
            return event.button;
        } else {
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4: return 1;
            }
        }
    },

    getCharCode: function(event){
        if (typeof event.charCode == "number"){
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },

    getClipboardText: function(event){
        var clipboardData =  (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },

    getEvent: function(event){
        return event ? event : window.event;
    },

    getRelatedTarget: function(event){
        if (event.relatedTarget){
            return event.relatedTarget;
        } else if (event.toElement){
            return event.toElement;
        } else if (event.fromElement){
            return event.fromElement;
        } else {
            return null;
        }

    },

    getTarget: function(event){
        return event.target || event.srcElement;
    },

    getWheelDelta: function(event){
        if (event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },

    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    removeHandler: function(element, type, handler){
        if (element.removeEventListener){
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent){
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    setClipboardText: function(event, value){
        if (event.clipboardData){
            event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData){
            window.clipboardData.setData("text", value);
        }
    },

    stopPropagation: function(event){
        if (event.stopPropagation){
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }

};

/***********************************************
	Resource: std/OnLoadQueue.js
***********************************************/




// @author Axel Ancona Esselmann

function OnLoadQueue () {
    this.onLoadQueue = [];
    var q = this;
    window.onload = function() {
        for (var i = 0; i < q.onLoadQueue.length; i++) q.onLoadQueue[i]();
    };
}
OnLoadQueue.prototype.registerQueue = function (queue) {
    var callback = function() {
        for (var i = 0; i < queue.length; i++) queue[i]();
    };
    this.push(callback);
}
OnLoadQueue.prototype.push = function (callback) {
    var body = document.getElementsByTagName('body')[0];
    if (body == null) this.onLoadQueue.push(callback);
    else callback();
}
var globalOnLoadQueue = new OnLoadQueue();

/***********************************************
	Resource: ui/ContMenu.js
***********************************************/



/*** include math/Point.js ***/
/*** include std/EventUtil.js ***/
/*** include std/OnLoadQueue.js ***/
/** include ui/ContMenu.css **/

// @author Axel Ancona Esselmann

/**
 * [ContMenu description]
 * @param {[type]} name          [description]
 * @param {[type]} x             [description]
 * @param {[type]} y             [description]
 * @param {[type]} domParent     [description]
 * @param bool onContextMenu If true, the cont menu replaces the right click menu.
 *                           If false, it replaces the click event.default is true.
 */
function ContMenu (name, x, y, domParent, onContextMenu) {
	this.name         = name;
	this.pos          = new Point(x,y);
	this.elements     = [];
	this.onLoadQueue  = [];
	this.domParent    = (domParent != undefined) ? domParent : null;
	this.clickedEvent = null;
	this.activeSubMenu = null;
	this.delegate      = null;
	this.onContextMenu = (onContextMenu != undefined) ? onContextMenu : true;
	var cm            = this;
	var buildCallback = function () {
	    cm.build();
	}
	window.globalOnLoadQueue.push(buildCallback);
    this.forceLeft = false;
    this.useParentCoord = false;
};

ContMenu.prototype.build = function () {
	if (this.getNode() == null) this.createView();
	else this.connectView();
	for (var i = 0; i < this.onLoadQueue.length; i++) this.onLoadQueue[i]();
	this.set();
}

ContMenu.prototype.type = 'ContMenu';

ContMenu.prototype.getNode = function () {
	return document.getElementById(this.name);
};

ContMenu.prototype.toString = function() {
	return '('+this.x+', '+this.y+', '+this.z+')';
};

ContMenu.prototype.loaded = function() {
    var body = document.getElementsByTagName('body')[0];
    if (body == null) return false;
    else return true;
}

ContMenu.prototype.set = function (x, y) {
	x = (x == undefined) ? this.pos.x : x;
	y = (y == undefined) ? this.pos.y : y;
	this.pos.set(x, y);
	var that           = this.getNode();
	that.style.left    = x+"px";
	that.style.top     = y+"px";
	// this.hide(false);
};

ContMenu.prototype.createView = function () {
	if (this.getNode() != null) return;
	var menuView = document.createElement("ul");
	menuView.setAttribute("class", "ContMenu");
	menuView.setAttribute("id", this.name);
	this.connectView(menuView);
};

ContMenu.prototype.connectView = function (menuView) {
	var cm = this;
	this.onLoadQueue.unshift(
		function() {
			menuView = menuView || document.getElementById(cm.name);
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(menuView);
			if (cm.domParent == null) {
				var parent = document.getElementsByTagName('body')[0];
				// show when clicked anywhere
				EventUtil.addHandler(parent, "click", function(event) {
				    event = EventUtil.getEvent(event);
					EventUtil.stopPropagation(event);
					cm.set(event.pageX, event.pageY);
					cm.hide(false);
				});
			} else if (cm.domParent == false) {
				var body = document.getElementsByTagName('body')[0];
				EventUtil.addHandler(body, "click", function(event) {
				    event = EventUtil.getEvent(event);
					EventUtil.stopPropagation(event);
					cm.hide();
					if (cm.delegate != null) cm.delegate.hide();
				});
			} else {
				var parents = document.getElementsByClassName(cm.domParent);
				for (var i = 0; i < parents.length; i++) {
					 cm.linkElement(parents[i]);
				}
			}
		}
	);
};
function getLargestStyle(nodes) {
    console.log("element:");
    console.log(nodes[0].getNode().getBoundingClientRect())
    var largest = 0;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i].getNode()
        console.log(node);
        current =  parseInt(window.getComputedStyle(node).width);
        if (current > largest) {
            largest = current;
        }
    }
    // var cs = window.getComputedStyle(nodes[0].getNode())
    // var offset = parseInt(cs.paddingRight) + parseInt(cs.paddingLeft) + parseInt(cs.marginRight) + parseInt(cs.marginLeft);
    return largest;
}
/* adds the context menu to elem */
ContMenu.prototype.linkElement = function (elem) {
	var body = document.getElementsByTagName('body')[0];
	var cm = this;
	 (function(obj) {
	 	// show when clicked on a parent element
	 	var clickCallback = function(event) {
	 	    event = EventUtil.getEvent(event);
	 		EventUtil.stopPropagation(event);
            var x,y;
            var leftOffset = 0;
            if (cm.forceLeft == true) {
                leftOffset = getLargestStyle(cm.elements);
            }
            if (cm.useParentCoord == true) {
                var target =  event.target || event.srcElement;
                var br = target.getBoundingClientRect();
                x = br.left;
                y = br.top;
                console.log(br);
            } else {
                x = event.pageX;
                y = event.pageY;
            }
	 		cm.set(x - leftOffset, y);
	 		// console.log(event.toElement);
	 		cm.clickedEvent = event;
			cm.hide(false);
			EventUtil.preventDefault(event);
	 	};
	 	if (cm.onContextMenu) {
	 		EventUtil.addHandler(obj, "contextmenu", clickCallback);
	 	} else {
	 		EventUtil.addHandler(obj, "click", clickCallback);
	 	};
	 	// hide when clicked anywhere else
	 	EventUtil.addHandler(body, "click", function(event) {
	 	    event = EventUtil.getEvent(event);
	 		EventUtil.stopPropagation(event);
	 		cm.hide();
	 		if (cm.delegate != null) cm.delegate.hide();
	 	});
	 	// EventUtil.addHandler(obj, "contextmenu", alert("works"));
    })(elem);
}

/** funct is the name of a function. The original click event is passed. */
ContMenu.prototype.addElement = function (name, funct, caption) {
	var menuItemNode = document.getElementById(name);
	if (menuItemNode == null) {
		menuItemNode = document.createElement('li');
		menuItemNode.innerHTML = caption;

		menuItemNode.setAttribute('class', 'MenuItem');
		menuItemNode.setAttribute('id', name);

		var cm = this;
		this.onLoadQueue.push(
		    function() {
		        var that = cm.getNode();
		        that.appendChild(menuItemNode);
		    }
		);
	};

    this.connectElement(name, funct);
};

ContMenu.prototype.connectElement = function (name, funct, connect) {
    var menuItem = new MenuItem(name, funct, "");
    this.elements.push(menuItem);

    var cm = this;
    var registerMouseClick = function() {
        var menuItemNode = document.getElementById(name);
        EventUtil.addHandler(menuItemNode, "click", function(event) {
            event = EventUtil.getEvent(event);
            EventUtil.stopPropagation(event);
            cm.hide();
            if (cm.delegate != null) cm.delegate.hide();
            window[funct](cm.clickedEvent, menuItem);
        });
    }
    if (connect == true) {
        registerMouseClick();
    } else this.onLoadQueue.push(registerMouseClick);
};

ContMenu.prototype.addSubHeaderElement = function (name, menuCallback, caption) {
    var menuItemNode       = document.createElement('li');
    menuItemNode.innerHTML = caption;

    menuItemNode.setAttribute('class', 'MenuItem');
    menuItemNode.setAttribute('class', 'SubMenuHeaderItem');
    menuItemNode.setAttribute('id', name);



    var cm = this;
    this.onLoadQueue.push(
        function() {
            var that = cm.getNode();
            that.appendChild(menuItemNode);
        }
    );
    this.connectSubHeaderElement(name, menuCallback);
};

ContMenu.prototype.connectSubHeaderElement = function (name, menuCallback) {
    var menuItem = new MenuItem(name, null, "");
    this.elements.push(menuItem);

    var cm = this;
    var connectSubHeaderElementCallback = function() {
    	var menuItemNode = document.getElementById(name);
    	EventUtil.addHandler(menuItemNode, "mouseenter", function(event) {
    	    event = EventUtil.getEvent(event);
    	    EventUtil.stopPropagation(event);
    	    console.log("mouseenter on " + name);
    	    var menu = menuCallback(cm.clickedEvent);
    	    if (menu.clickedEvent == null) menu.clickedEvent = cm.clickedEvent;
    	    menu.delegate    = cm;
    	    cm.activeSubMenu = menu;
    	    var width = parseInt(getComputedStyle(cm.getNode()).getPropertyValue("width"));
    	    menu.pos.set(cm.pos.x + width, cm.pos.y);
    	    cm.hide(false);
    	});
    	EventUtil.addHandler(menuItemNode, "mouseout", function(event) {
    	    event = EventUtil.getEvent(event);
    	    EventUtil.stopPropagation(event);
    	    console.log("mouseout on " + name);
    	});
    }
    if (this.loaded()) connectSubHeaderElementCallback();
    else this.onLoadQueue.push(connectSubHeaderElementCallback);
};

ContMenu.prototype.deleteElements = function() {
	this.elements = [];
	this.getNode().innerHTML = '';
}

ContMenu.prototype.hide = function(bool) {
	var that = this.getNode();
	if (that == undefined) return;
	bool = (bool == undefined) ? true : bool;
	if (bool) {
		that.style.display = "none";
		if (this.delegate != null) {
			this.deleteElements();
		};
		if (this.activeSubMenu != null) {
			this.activeSubMenu.hide();
		}
	} else {
		that.style.display = "inherit";
		if (this.activeSubMenu != null) {
			this.activeSubMenu.hide();
		};
	}
}

function MenuItem (name, funct, capt) {
	this.name = name;
	this.set(funct, capt);
};

MenuItem.prototype.type = 'MenuItem';

MenuItem.prototype.getNode = function () {
	return document.getElementById(this.name);
};

MenuItem.prototype.set = function(funct, capt) {
	this.caption = capt;
	this.funct = funct;
};


function SubMenuHeaderItem (name, capt) {
	this.name = name;
	this.set(capt);
}
MenuItem.prototype.set = function(capt) {
	this.caption = capt;
};

SubMenuHeaderItem.prototype.getNode = function () {
	return document.getElementById(this.name);
};
