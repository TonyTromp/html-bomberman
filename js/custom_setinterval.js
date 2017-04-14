// This script can be reused as long as the following 
// copyright notice is not removed.  
// SetInterval and ClearInterval Compatibility Script
// Copyright 1999 InsideDHTML.com, LLC. All rights reserved
// See www.insideDHTML.com for more information.

var aTracking = new Array()

var version = parseInt(navigator.appVersion)
var appName = navigator.appName
var ns4 = version>=4 && appName=="Netscape"
function runInterval(sIndex) {
  if (aTracking[sIndex]) {
    var args = aTracking[sIndex].arguments;



    // Call function and pass in any extra argument
    var callargs="aTracking[sIndex].code(";
    for(i=0;i < args.length;++i) {
      callargs=callargs+"args["+i+"]";
      if(i > 1) callargs+=",";
    }
    callargs=callargs+")";
    /*
    if (aTracking[sIndex].arguments[0])
    {
      alert('Arg length: ' +args.length);
      alert('Input: ' +args[0]);
      alert('Call Args: '+callargs);
    }
    */
    
    eval(callargs);
    
    // Start up timer for next iteration
    aTracking[sIndex].timerID = setTimeout("runInterval(" + sIndex + ")" , aTracking[sIndex].interval)
  }
}

function newSetInterval(func,interval) {
 var fCall = func
 if (typeof func!="function") 
  var fCall= new Function(func)
 var nextIdx = aTracking.length;
 aTracking[nextIdx] = new Object
 aTracking[nextIdx].interval = interval
 aTracking[nextIdx].code = fCall
 aTracking[nextIdx].arguments = new Array()
 for (var i=2;i < arguments.length;i++) {
  aTracking[nextIdx].arguments[aTracking[nextIdx].arguments.length] = arguments[i];
 }
 aTracking[nextIdx].timerID = setTimeout("runInterval(" + nextIdx + ")",interval)
 return nextIdx
}

function newClearInterval(idx) {
 if (aTracking[idx]) {
  clearTimeout(aTracking[idx].timerID)
  aTracking[idx] = null
 }
}

if (!ns4) {
 window.setInterval = newSetInterval
 window.clearInterval = newClearInterval
}

