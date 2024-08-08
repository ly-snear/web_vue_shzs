!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).WebOfficeSDK=t()}(this,function(){"use strict";var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};function t(t,n){function i(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}var n,i,s,r,o=function(){return(o=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var s in t=arguments[n])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e}).apply(this,arguments)};function a(e,t,n,i){return new(n||(n=Promise))(function(s,r){function o(e){try{c(i.next(e))}catch(e){r(e)}}function a(e){try{c(i.throw(e))}catch(e){r(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n(function(e){e(t)})).then(o,a)}c((i=i.apply(e,t||[])).next())})}function c(e,t){var n,i,s,r,o={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,i&&(s=2&r[0]?i.return:r[0]?i.throw||((s=i.return)&&s.call(i),0):i.next)&&!(s=s.call(i,r[1])).done)return s;switch(i=0,s&&(r=[2&r[0],s.value]),r[0]){case 0:case 1:s=r;break;case 4:return o.label++,{value:r[1],done:!1};case 5:o.label++,i=r[1],r=[0];continue;case 7:r=o.ops.pop(),o.trys.pop();continue;default:if(!(s=(s=o.trys).length>0&&s[s.length-1])&&(6===r[0]||2===r[0])){o=0;continue}if(3===r[0]&&(!s||r[1]>s[0]&&r[1]<s[3])){o.label=r[1];break}if(6===r[0]&&o.label<s[1]){o.label=s[1],s=r;break}if(s&&o.label<s[2]){o.label=s[2],o.ops.push(r);break}s[2]&&o.ops.pop(),o.trys.pop();continue}r=t.call(e,o)}catch(e){r=[6,e],i=0}finally{n=s=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}([r,a])}}}!function(e){e.refreshToken="api.getToken"}(n||(n={})),function(e){e.unknown="unknown",e.spreadsheet="s",e.writer="w",e.presentation="p",e.pdf="f",e.otl="o",e.dbt="d",e.ksheet="k"}(i||(i={})),function(e){e.nomal="nomal",e.simple="simple",e.embed="embed"}(s||(s={})),function(e){e[e.requestFullscreen=1]="requestFullscreen",e[e.exitFullscreen=0]="exitFullscreen"}(r||(r={}));var l=window.navigator.userAgent.toLowerCase(),u=/iPhone|iPod|iPad/i.test(l);function d(e){if(!e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}var h=function(){function e(e,t,n,i,s,r,o){var a=this;void 0===s&&(s=!0),void 0===r&&(r=!1),void 0===o&&(o={}),this.instance=e,this.instanceId=t,this.url=n,this.mount=i,this.isListenResize=s,this.addedStyles=r,this.customAttrs=o,this.handleResize=function(){var e=a.mount,t=a.mountResizeObserver,n=e.clientHeight,i=e.clientWidth;0!==n||0!==i||t?0===n&&0===i||!t||(t.disconnect(),t=null):window.ResizeObserver&&(t=new ResizeObserver(function(e){a.handleResize()})).observe(e),a.iframe.style.cssText+="height: "+e.clientHeight+"px; width: "+e.clientWidth+"px"},this.iframe=this.initIframe()}return e.prototype.initIframe=function(){var e=this,t=this.mount,n=document.createElement("iframe");n.classList.add("web-office-iframe");var i=this.mergeAttrs({id:"office-iframe-"+this.instanceId,src:this.url,scrolling:"no",frameborder:"0",allowfullscreen:"allowfullscreen",webkitallowfullscreen:"true",mozallowfullscreen:"true",allow:"clipboard-read; clipboard-write"});for(var s in t?(i.style="width: "+t.clientWidth+"px; height: "+t.clientHeight+"px;",this.isListenResize&&window.addEventListener("resize",this.handleResize)):((t=document.createElement("div")).classList.add("web-office-default-container"),this.addedStyles||this.addStylesheetRules(".web-office-default-container {position: absolute; padding: 0;  margin: 0; width: 100vw; height: 100vh; left: 0; top: 0;}"),document.body.appendChild(t),i.style="width: 100vw; height: 100vh;"),u&&window.visualViewport&&this.isListenResize&&window.visualViewport.addEventListener("resize",function(){var t=window.visualViewport,n=t.width,i=t.height,s=document.body.clientHeight-e.iframe.clientHeight;e.instance.sendMsgToWps({eventName:"visualViewportResize",data:{width:n,height:i-s}})}),i)n.setAttribute(s,i[s]);return t.appendChild(n),n.destroy=function(){window.removeEventListener("resize",e.handleResize),n.parentNode.removeChild(n),n=null,e.mountResizeObserver&&(e.mountResizeObserver.disconnect(),e.mountResizeObserver=null)},n},e.prototype.destroy=function(){this.iframe.parentNode.removeChild(this.iframe),window.removeEventListener("resize",this.handleResize)},e.prototype.addStylesheetRules=function(e){var t=document.createElement("style");document.head.appendChild(t);var n=t.sheet;n.insertRule(e,n.cssRules.length)},e.prototype.mergeAttrs=function(e){var t=this.customAttrs;if(t&&Object.keys(t).length&&t.allow){var n=t.allow instanceof Array?t.allow:t.allow.split(";");n.unshift("clipboard-write"),n.unshift("clipboard-read"),t.allow=n.join(";"),Object.assign(e,t)}return e},e}(),f=function(){function e(){this.HANDLE_LIST=[]}return e.prototype.add=function(e){this.HANDLE_LIST.push(e),window.addEventListener("message",e,!1)},e.prototype.remove=function(e){var t=this.HANDLE_LIST.indexOf(e);t>=0&&this.HANDLE_LIST.splice(t,1),window.removeEventListener("message",e,!1)},e.prototype.empty=function(){for(;this.HANDLE_LIST.length;){var e=this.HANDLE_LIST.shift();window.removeEventListener("message",e,!1)}},e.prototype.parse=function(e){try{return"object"==typeof e?e:e?JSON.parse(e):e}catch(t){return e}},e}(),p=function(){function e(e,t){var n=this;this.collectObjIdHandlers=new Set,this.polyfillApi=["ExportAsFixedFormat","GetOperatorsInfo","ImportDataIntoFields","ReplaceText","ReplaceBookmark","GetBookmarkText","GetComments"],this.getId=function(){return""},this.setterCallbacks={idMap:{}},this.sendMsgToWps=function(){},this.objId=0,this.origin="",this.apiChannel=function(e,t,i,s){return a(n,void 0,void 0,function(){var n,r,o,l,u,d,h,f,p,m=this;return c(this,function(v){switch(v.label){case 0:return n=this.getId(),l=new Promise(function(e,t){r=e,o=t}),u={},t.args?[4,this.reduceArgs(t.args)]:[3,2];case 1:d=v.sent(),h=d[0],f=d[1],t.args=h,u=f,v.label=2;case 2:return e!==this.prefix+"setter"?[3,4]:[4,this.handleApiSetter(t)];case 3:v.sent(),v.label=4;case 4:return p=function(){var t=function(l){return a(m,void 0,void 0,function(){var a,d,h;return c(this,function(c){switch(c.label){case 0:return this.instance.originWhiteList.includes(l.origin)||this.origin===l.origin?(a=this.message.parse(l.data)).eventName===this.prefix+"callback"&&a.callbackId&&u[a.callbackId]?[4,u[a.callbackId].apply(u,a.data.args)]:[3,2]:[2];case 1:d=c.sent(),this.sendMsgToWps({result:d,eventName:this.prefix+"callback.reply",callbackId:a.callbackId}),c.label=2;case 2:return a.eventName===e+".reply"&&a.msgId===n&&(a.error?((h=new Error("")).stack=a.error+"\n"+i,s&&s(),o(h)):r(a.result),this.message.remove(t)),[2]}})})};return m.message.add(t),l},this.handleSendApiChannel([{eventName:e,data:t,msgId:n},p]),[2,l]}})})},this.handleApiSetter=function(e){return a(n,void 0,void 0,function(){var t,n,i,s,r,o,a,l,u,d,h=this;return c(this,function(c){switch(c.label){case 0:return t=function(){return Object.keys(h.setterCallbacks.idMap).find(function(e){return h.setterCallbacks.idMap[e]===i+":"+n})},n=e.prop,i=e.parentObjId,s=e.value,[4,this.reduceArgs([s])];case 1:return r=c.sent(),o=r[0],a=r[1],e.value=o[0],l=Object.keys(a)[0],u=this.setterCallbacks[i],null===s&&u&&u[n]&&((d=t())&&delete this.setterCallbacks.idMap[d],delete u[n],Object.keys(u).length||delete this.setterCallbacks[i],Object.keys(this.setterCallbacks.idMap).length||this.message.remove(this.setterCallbackSubscribe.bind(this))),l&&(Object.keys(this.setterCallbacks.idMap).length||this.message.add(this.setterCallbackSubscribe.bind(this)),this.setterCallbacks[i]||(this.setterCallbacks[i]={}),this.setterCallbacks[i][n]={callbackId:l,callback:a[l]},(d=t())&&delete this.setterCallbacks.idMap[d],this.setterCallbacks.idMap[l]=i+":"+n),[2]}})})},this.prefix=t,this.origin=e.origin,this.sendMsgToWps=e.sendMsgToWps.bind(e),this.getId=e.getId.bind(e),this.message=e.message,this.sdkInstanceId=e.instanceId,this.instance=e}return e.prototype.destroyApplication=function(){this.collectObjIdHandlers=new Set,this.objId=0},e.prototype.subEventHandle=function(e,t){var n=this,i={};this.message.add(function(e){return a(n,void 0,void 0,function(){var t,n,s,r,o,a;return c(this,function(c){switch(c.label){case 0:return this.instance.originWhiteList.includes(e.origin)||this.origin===e.origin?(t=this.message.parse(e.data),n=t.sdkInstanceId,t.eventName===this.prefix+"event"&&Number(n)===this.sdkInstanceId&&t.data?(s=t.data,r=s.eventName,o=s.data,(a=i[r])?[4,a(o)]:[3,2]):[3,2]):[2];case 1:c.sent(),c.label=2;case 2:return[2]}})})});var s=function(s){var r=t[s];Object.defineProperty(e,r,{set:function(e){i[r]=e,n.sendMsgToWps({eventName:n.prefix+"event.register",data:{eventName:r,register:!!e,objId:n.objId+=1},sdkInstanceId:n.sdkInstanceId})}})};for(var r in t)s(r)},e.prototype.mixinProto=function(e,t){Object.assign(e,t)},e.prototype.makeCollectObjIdHandle=function(e){var t=this;return function(){var n=[],i=function(e){n.push(e)};return t.collectObjIdHandlers.add(i),{End:function(){e(n),t.collectObjIdHandlers.delete(i)}}}},e.prototype.assign=function(e,t,n){for(var i=this,s=t.slice(0),r=function(){var t=s.shift();!t.alias&&~a.polyfillApi.indexOf(t.prop)&&s.push(o(o({},t),{alias:t.prop+"Async"})),Object.defineProperty(e,t.alias||t.prop,{get:function(){var s=1===t.cache,r=s&&e["__"+t.prop+"CacheValue"];if(!r){var o=i.getError(),a=i.createObjId(s),c=function(){for(var s,r=[],a=0;a<arguments.length;a++)r[a]=arguments[a];return void 0!==t.caller?(s={objId:i.createObjId()},i.assign(s,n[t.caller],n)):s={},i.wrapper(c,s,i.prefix+"caller",{obj:c,args:r,parentObjId:e.objId,objId:s.objId,prop:t.prop},o),s};return c.objId=-1,void 0!==t.getter&&(c.objId=a,i.assign(c,n[t.getter],n)),i.wrapper(e,c,i.prefix+"getter",{parentObjId:e.objId,objId:c.objId,prop:t.prop},o,function(){delete e["__"+t.prop+"CacheValue"]}),s&&(e["__"+t.prop+"CacheValue"]=c),c}return r},set:function(n){var s=i.getError();return i.wrapper(e,{},i.prefix+"setter",{value:n,parentObjId:e.objId,objId:-1,prop:t.prop},s)}})},a=this;s.length;)r()},e.prototype.wrapper=function(e,t,n,i,s,r){var o,a=this,c=(e.done?e.done():Promise.resolve()).then(function(){return o||(o=a.apiChannel(n,i,s,r)),o});t.done=function(){return c},t.then=function(e,n){return i.objId>=0?(t.then=null,t.catch=null,c.then(function(){e(t)}).catch(function(e){return n(e)})):c.then(e,n)},t.catch=function(e){return c.catch(e)},t.Destroy=function(){return this.apiChannel(this.prefix+"free",{objId:t.objId},"")}},e.prototype.handleSendApiChannel=function(e){var t=e[0],n=e[1];"function"==typeof(t=o({},t)).data&&(t.data=t.data()),n(),this.sendMsgToWps(t)},e.prototype.setterCallbackSubscribe=function(e){return a(this,void 0,void 0,function(){var t,n,i,s,r,o,a,l,u,d;return c(this,function(c){switch(c.label){case 0:return this.instance.originWhiteList.includes(e.origin)||this.origin===e.origin?(t=this.message.parse(e.data),n=t.eventName,i=t.callbackId,s=t.data,i&&(r=this.setterCallbacks.idMap[i])?(o=r.split(":"),a=o[0],l=o[1],n===this.prefix+"callback"&&this.setterCallbacks[a]&&this.setterCallbacks[a][l]?[4,(d=this.setterCallbacks[a][l]).callback.apply(d,s.args)]:[3,2]):[3,2]):[2];case 1:u=c.sent(),this.sendMsgToWps({result:u,callbackId:i,eventName:this.prefix+"callback.reply"}),c.label=2;case 2:return[2]}})})},e.prototype.reduceArgs=function(e){return a(this,void 0,void 0,function(){var t,n,i,s,r,o,a,l,u,h,f;return c(this,function(c){switch(c.label){case 0:t={},n=[],i=e.slice(0),c.label=1;case 1:return i.length?(s=void 0,[4,i.shift()]):[3,13];case 2:return(r=c.sent())&&r.done?[4,r.done()]:[3,4];case 3:c.sent(),c.label=4;case 4:if(!d(s))return[3,11];for(a in s={},o=[],r)o.push(a);l=0,c.label=5;case 5:return l<o.length?(u=o[l],h=r[u],/^[A-Z]/.test(u)?h&&h.done?[4,h.done()]:[3,7]:[3,8]):[3,10];case 6:c.sent(),c.label=7;case 7:h&&h.objId?h={objId:h.objId}:"function"==typeof h&&(f=this.getId(),t[f]=h,h={callbackId:f}),c.label=8;case 8:s[u]=h,c.label=9;case 9:return l++,[3,5];case 10:return[3,12];case 11:r&&r.objId?s={objId:r.objId}:"function"==typeof r&&void 0===r.objId?(f=this.getId(),t[f]=r,s={callbackId:f}):s=r,c.label=12;case 12:return n.push(s),[3,1];case 13:return[2,[n,t]]}})})},e.prototype.createObjId=function(e){return this.objId+=1,!e&&this.collectObjId(),this.objId},e.prototype.collectObjId=function(){var e=this;this.collectObjIdHandlers.forEach(function(t){return t(e.objId)})},e.prototype.getError=function(){var e=new Error("");return(e.stack||e.message||"").split("\n").slice(2).join("\n")},e}(),m=function(e){function n(t,n,s){var r=e.call(this,t,s)||this,o={},a=t.officeType,c=n.Events,l=n.Enum,u=n.Props,d=u[0],h=u[1],f={objId:r.objId};switch(r.assign(f,d,h),f.Events=c,f.Enum=l,f.Sub={},o.Enum=f.Enum,o.Events=f.Events,o.Props=u,a){case i.writer:o.WordApplication=t.WpsApplication=function(){return f};break;case i.spreadsheet:o.ExcelApplication=t.EtApplication=function(){return f};break;case i.presentation:o.PPTApplication=t.WppApplication=function(){return f};break;case i.pdf:o.PDFApplication=function(){return f}}return o.Application=f,o.Free=function(e){return r.apiChannel(r.prefix+"free",{objId:e},"")},o.Stack=f.Stack=r.makeCollectObjIdHandle(function(e){r.apiChannel(r.prefix+"free",{objId:e},"")}),o.destroyApplication=function(){r.destroyApplication()},r.subEventHandle(f.Sub,c),r.mixinProto(t,o),r}return t(n,e),n}(p),v=function(e){function n(t,n,i){var s=e.call(this,t,i)||this,r={},o=n.Events,a=n.Enum,c=n.Props,l=c[0],u=c[1],d={objId:s.objId};return s.assign(d,l,u),d.Events=o,d.Enum=a,d.Sub={},r.CommonEnum=d.Enum,r.CommonEvents=d.Events,r.CommonProps=c,r.CommonApi=d,r.CommonFree=function(e){return s.apiChannel(s.prefix+"free",{objId:e},"")},r.CommonStack=d.Stack=s.makeCollectObjIdHandle(function(e){s.apiChannel(s.prefix+"free",{objId:e},"")}),r.destroyCommonApp=function(){s.destroyApplication()},s.subEventHandle(d.Sub,o),s.mixinProto(t,r),s}return t(n,e),n}(p);var b=function(){function e(t){var n,i=this;this.id=0,this.origin="",this.originWhiteList=[],this.realOrigin="",this.iframeWH=null,this.cbConfigsSub={},this.readyEventNames=[{event:"ready",callback:function(){i.handleBaseReady()},after:!0},{event:"open.result"},{event:"api.ready",callback:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=e[0];return new m(i,n,"api."),i.Application}},{event:"commonApi.ready",callback:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=e[0];return new v(i,n,"commonApi."),i.CommonApi}}],this.cbConfigs=["refreshToken"],this.onEventNames={"open.result":"fileOpen","tab.switch":"tabSwitch","file.saved":"fileStatus",error:"error",stage:"stage"},this.polyfillConfigName=[["wpsOptions","wordOptions"],["etOptions","excelOptions"],["wppOptions","pptOptions"]],this.flag={advancedApiReadySended:!1,advancedApiReadySendedJust:!1,commonApiReadySended:!1,commonApiReadySendedJust:!1},this.baseReadyPromise=Promise.resolve(),this.fileOpenPromise=Promise.resolve(),this.advancedReadyPromise=Promise.resolve(),this.commonApiPromise=Promise.resolve(),this.iframeInstance=null,this.officeType="",this.url="",this.version="2.0.6",this.iframeReady=!1,this.forceIframeResize=function(){i.iframeInstance&&i.iframeInstance.handleResize()},this.isOtherEvent=function(e){return void 0!==e&&e!==i.instanceId},this.handleBaseReady=function(){i.sendMsgToWps({eventName:"setConfig",data:o(o({},i.sdkConfig),{version:i.version})}),i.tokenData&&i.setToken(o(o({},i.tokenData),{hasRefreshTokenConfig:!!i.sdkConfig.refreshToken})),i.flag.advancedApiReadySended&&i.sendMsgToWps({eventName:"api.ready"}),i.flag.commonApiReadySended&&i.sendMsgToWps({eventName:"commonApi.ready"}),i.iframeReady=!0},this.handleFullscreenChange=function(){var e={status:r.requestFullscreen};document.fullscreenElement?e.status=r.requestFullscreen:e.status=r.exitFullscreen,i.sendMsgToWps({data:e,eventName:"fullscreenchange"})},this.instanceId=e.instanceId,e.instanceId+=1,this.message=new f,this.mittInstance=(n=n||Object.create(null),{on:function(e,t){(n[e]||(n[e]=[])).push(t)},off:function(e,t){n[e]&&n[e].splice(n[e].indexOf(t)>>>0,1)},emit:function(e,t){(n[e]||[]).slice().map(function(e){e(t)}),(n["*"]||[]).slice().map(function(n){n(e,t)})}}),this.handleConfig(t)}return e.config=function(t){return void 0===t&&(t={}),e.singleInstance||(e.singleInstance=new e(t)),e.singleInstance},e.prototype.setToken=function(e){return a(this,void 0,void 0,function(){return c(this,function(t){switch(t.label){case 0:return[4,this.basicReady()];case 1:return t.sent(),this.tokenData=e,this.sendMsgToWps({eventName:"setToken",data:e}),[2]}})})},e.prototype.advancedApiReady=function(){return a(this,void 0,void 0,function(){return c(this,function(e){switch(e.label){case 0:return this.flag.advancedApiReadySendedJust?[3,2]:(this.flag.advancedApiReadySendedJust=!0,[4,this.fileOpenPromise]);case 1:e.sent(),this.flag.advancedApiReadySended||(this.flag.advancedApiReadySended=!0,this.sendMsgToWps({eventName:"api.ready"})),e.label=2;case 2:return[4,this.advancedReadyPromise];case 3:return[2,e.sent()]}})})},e.prototype.commonApiReady=function(){return a(this,void 0,void 0,function(){return c(this,function(e){switch(e.label){case 0:return this.flag.commonApiReadySendedJust?[3,2]:(this.flag.commonApiReadySendedJust=!0,[4,this.basicReady()]);case 1:e.sent(),this.flag.commonApiReadySended||(this.flag.commonApiReadySended=!0,this.sendMsgToWps({eventName:"commonApi.ready"})),e.label=2;case 2:return[4,this.commonApiPromise];case 3:return[2,e.sent()]}})})},e.prototype.destroy=function(){this.iframeInstance.destroy(),this.message.empty(),this.destroyApplication&&this.destroyApplication(),this.destroyCommonApp&&this.destroyCommonApp(),this.removeFullscreenEventListener()},e.prototype.on=function(e,t){return a(this,void 0,void 0,function(){var n;return c(this,function(i){switch(i.label){case 0:return[4,this.basicReady()];case 1:return i.sent(),n=e,"fullscreenChange"===e&&(n="fullscreenchange"),this.handleBasicEvent(n,"on"),this.mittInstance.on(e,t),[2]}})})},e.prototype.off=function(e,t){return a(this,void 0,void 0,function(){return c(this,function(n){switch(n.label){case 0:return[4,this.basicReady()];case 1:return n.sent(),this.handleBasicEvent(e,"off"),this.mittInstance.off(e,t),[2]}})})},e.prototype.handleConfig=function(e){var t,n=this;void 0===e&&(e={});try{var i=this.userConfHandler(e),s=i.subscriptions,r=void 0===s?{}:s,o=i.mount,a=void 0===o?null:o,c=i.url,l=i.originWhiteList;this.origin=(c.match(/https*:\/\/[^\/]+/g)||[])[0],this.originWhiteList=l||[];var u=this.readyEventNames.map(function(e){return n.makeReady(e)}),d=u[0],f=u[1],p=u[2],m=u[3];this.baseReadyPromise=d,this.fileOpenPromise=f,this.advancedReadyPromise=p,this.commonApiPromise=m,this.iframeWH=a?{width:a.clientWidth+"px",height:a.clientHeight+"px"}:{width:"100vw",height:"100vh"},delete i.mount,c&&delete i.url,this.url=c,delete i.subscriptions,this.sdkConfig=i,this.iframeInstance=new h(this,this.instanceId,c,a,null===(t=i.isListenResize)||void 0===t||t,!1,{allow:i.attrAllow}),this.iframe=this.iframeInstance.iframe,this.listener(r)}catch(e){return console.error(e),null}},e.prototype.listener=function(e){var t=this;this.message.add(function(n){return a(t,void 0,void 0,function(){var t,i,s,r,o,a,l,u,d;return c(this,function(c){return t=this.message.parse(n.data),i=t.eventName,s=void 0===i?"":i,r=t.data,o=void 0===r?null:r,a=t.url,l=void 0===a?null:a,u=t.sdkInstanceId,this.isOtherEvent(u)?[2]:-1!==["wps.jssdk.api"].indexOf(s)?[2]:((d=this.handleListenEvent(s,o))?d():Object.keys(this.onEventNames).includes(s)&&("open.result"===s&&(this.officeType=o.fileInfo.officeType),this.mittInstance.emit(this.onEventNames[s],o)),"function"==typeof e[s]&&e[s](this,l||o),[2])})})})},e.prototype.handleListenEvent=function(e,t){var i,s=this;return((i={"api.scroll":function(){return window.scrollTo(t.x,t.y)},"event.callback":function(){return a(s,void 0,void 0,function(){var e,n,i,s,r,o,a;return c(this,function(c){return e=t.eventName,n=t.data,i=e,"fullScreenChange"===e&&(i="fullscreenChange"),((null===(o=this.sdkConfig.commonOptions)||void 0===o?void 0:o.isBrowserViewFullscreen)||(null===(a=this.sdkConfig.commonOptions)||void 0===a?void 0:a.isParentFullscreen))&&"fullscreenchange"===i&&(s=n.status,r=n.isDispatchEvent,this.sdkConfig.commonOptions.isBrowserViewFullscreen?this.iframeWH&&function(e,t,n,i){0===e?t.style="position: static; width: "+n.width+"; height: "+n.height:1===e&&(t.style="position: absolute; width: 100%; height: 100%"),i&&function(e){["fullscreen","fullscreenElement"].forEach(function(t){Object.defineProperty(document,t,{get:function(){return!!e.status},configurable:!0})});var t=new CustomEvent("fullscreenchange");document.dispatchEvent(t)}({status:e})}(s,this.iframe,this.iframeWH,r):this.sdkConfig.commonOptions.isParentFullscreen&&function(e,t){if(0===e){var n=document,i=n.exitFullscreen||n.mozCancelFullScreen||n.msExitFullscreen||n.webkitCancelFullScreen||n.webkitExitFullscreen;i.call(document)}else if(1===e){var s=t.requestFullscreen||t.mozRequestFullScreen||t.msRequestFullscreen||t.webkitRequestFullscreen;s.call(t)}}(s,this.iframe)),this.mittInstance.emit(i,n),[2]})})}})[n.refreshToken]=function(){return a(s,void 0,void 0,function(){var t,n;return c(this,function(i){switch(i.label){case 0:t={token:!1},i.label=1;case 1:return i.trys.push([1,3,,4]),[4,this.cbConfigsSub.refreshToken()];case 2:return t=i.sent(),[3,4];case 3:return n=i.sent(),console.error("refreshToken: "+(n||"fail to get")),[3,4];case 4:return this.sendMsgToWps({eventName:e+".reply",data:t}),[2]}})})},i)[e]},e.prototype.basicReady=function(){return this.baseReadyPromise},e.prototype.userConfHandler=function(e,t){var i=this;void 0===t&&(t=!0);var r=o({},e),a=r.headers,c=void 0===a?{}:a,l=r.subscriptions,u=void 0===l?{}:l,d=r.commonOptions,h=r.url,f=void 0===h?"":h,p=r.wpsUrl,m=void 0===p?"":p,v=r.mode,b=void 0===v?s.nomal:v,g=r.debug,y=r.disablePlugins,w=r.hideGuide,k=r.readOnly;return Object.assign(r,this.handleHeadersAndSubscriptionsConfig(c,u,t)),r.url=this.handleUrlConfig(d,b,g,f,m,y,w,k),d&&(d.isParentFullscreen||d.isBrowserViewFullscreen)&&document.addEventListener("fullscreenchange",this.handleFullscreenChange),this.polyfillConfigName.map(function(e){var t=e[0],n=e[1];r[n]&&(r[t]=r[n])}),this.cbConfigs.map(function(e){var t,s,o=r[e];o&&(t=o,s="Function",{}.toString.call(t)==="[object "+s+"]")&&(i.cbConfigsSub[e]=o,r[e]={eventName:n[e]})}),r.commandBars&&this.handleCommandBarsConfig(r.commandBars,!1),o({},r)},e.prototype.handleBasicEvent=function(e,t){if(!["error","fileOpen"].includes(e)){var n={eventName:"basic.event",data:{eventName:e,action:t}};this.sendMsgToWps(n)}},e.prototype.removeFullscreenEventListener=function(){document.removeEventListener("fullscreenchange",this.handleFullscreenChange)},e.prototype.handleHeadersAndSubscriptionsConfig=function(e,t,n){var i=e.backBtn,s=void 0===i?{}:i,r=e.shareBtn,o=void 0===r?{}:r,a=e.otherMenuBtn,c=void 0===a?{}:a,l=[["wpsconfig_back_btn",s],["wpsconfig_share_btn",o],["wpsconfig_other_menu_btn",c]],u=[];return c.items&&Array.isArray(c.items)&&c.items.forEach(function(e,t){void 0===e&&(e={}),"custom"===e.type&&u.push(["wpsconfig_other_menu_btn_"+t,e])}),l.concat(u).forEach(function(e){var i,s;i=e[1],s=e[0],i.subscribe&&"function"==typeof i.subscribe&&(i.callback=s,t[s]=i.subscribe,n&&delete i.subscribe)}),{}},e.prototype.handleUrlConfig=function(e,t,n,i,r,o,a,c){var l=[];l.push("sdkId="+this.instanceId),t===s.simple||e&&!1===e.isShowTopArea?l.push("simple","hidecmb"):t===s.embed&&l.push("simple=1","hidecmb=1","embed=1"),o&&l.push("disablePlugins"),a&&l.push("hideguide"),c&&l.push("readonly"),n&&l.push("debugger");var u=i||r;return u&&l.length&&(u=u+(u.indexOf("?")>=0?"&":"?")+l.join("&")),u},e.prototype.handleCommandBarsConfig=function(e,t){void 0===t&&(t=!0);var n=e.map(function(e){var t=e.attributes;if(!Array.isArray(t)){var n=[];for(var i in t)if(t.hasOwnProperty(i)){var s={name:i,value:t[i]};n.push(s)}e.attributes=n}return e});return t&&this.sendMsgToWps({data:n,eventName:"setCommandBars"}),n},e.prototype.sendMsgToWps=function(e){var t,n,i=o(o({},e),{sdkInstanceId:this.instanceId});null===(n=null===(t=this.iframe)||void 0===t?void 0:t.contentWindow)||void 0===n||n.postMessage(JSON.stringify(i),this.realOrigin)},e.prototype.makeReady=function(e){var t=this,n=e.event,i=e.callback,s=e.after;return new Promise(function(e){var r=function(o){if(t.realOrigin=o.origin,t.originWhiteList.includes(o.origin)||t.origin===o.origin){var a=t.message.parse(o.data),c=a.eventName,l=a.data,u=a.sdkInstanceId;if(!t.isOtherEvent(u)&&c===n){var d=void 0;!s&&i&&(d=i(l)),e(d),s&&i&&i(l),"ready"!==n&&t.message.remove(r)}}};t.message.add(r)})},e.prototype.getId=function(){return this.id+=1,this.instanceId+"-"+this.id},e.instanceId=1,e}(),g={executeCommandBar:"ExecuteCommandBar",off:"Off",save:"Save",setCommandBars:"SetCommandBars",setCooperUserColor:"SetCooperUserColor",tabs:"Tabs",Stack:"Stack",WhenStacksEmpty:"WhenStacksEmpty"};function y(e,t){var n=this;return void 0===t&&(t={}),new Proxy(e,o(o({},{get:function(e,t){if(Object.keys(g).includes(t)){var i=g[t];return"Tabs"===i?function(e){var t=this;return{switchTab:function(n){return a(t,void 0,void 0,function(){return c(this,function(t){switch(t.label){case 0:return[4,e.commonApiReady()];case 1:return t.sent(),[4,e.CommonApi.Tabs.SwitchTab(n.tabKey)];case 2:return[2,t.sent()]}})})},getTabs:function(){return a(t,void 0,void 0,function(){return c(this,function(t){switch(t.label){case 0:return[4,e.commonApiReady()];case 1:return t.sent(),[4,e.CommonApi.Tabs.GetTabs()];case 2:return[2,t.sent()]}})})}}}(e):e.CommonApi?Reflect.get(e.CommonApi,i):function(){return a(n,void 0,void 0,function(){var t;return c(this,function(n){switch(n.label){case 0:return[4,e.commonApiReady()];case 1:return n.sent(),[4,e.commonApiPromise];case 2:return n.sent(),"function"!=typeof e.CommonApi[i]?[3,4]:[4,e.CommonApi[i]()];case 3:return t=n.sent(),[3,5];case 4:t=e.CommonApi[i],n.label=5;case 5:return[2,t]}})})}}return Reflect.get(e,t)},set:function(e,t,n){return!!Reflect.has(e,t)&&Reflect.set(e,t,n)}}),t))}var w;!function(e){e.Spreadsheet="s",e.Writer="w",e.Presentation="p",e.Pdf="f",e.Otl="o",e.Dbt="d",e.KSheet="k"}(w||(w={}));var k=function(e){function n(t){var n=e.call(this,t)||this;return t.token&&(d(t.token)?n.setToken(o({},t.token)):n.setToken({token:t.token})),n.ApiEvent={AddApiEventListener:function(e,t){n.on(e,t)},RemoveApiEventListener:function(e,t){n.off(e,t)}},n}return t(n,e),n.init=function(e){var t=o({},e);if("string"==typeof t.mount){var i=document.querySelector(t.mount);i?t.mount=i:(console.warn("[WebOfficeSDK.init] mount挂载节点未找到"),delete t.mount)}if(t.url)throw Error("[WebOfficeSDK.init] 不支持传递url，请使用appId、fileId、officeType、token等参数初始化！");if(!t.appId||!t.fileId||!t.officeType)throw Error("[WebOfficeSDK.init] appId、fileId、officeType为必选项！");t.endpoint=t.endpoint||"https://o.wpsgo.com";var s=new n(function(e){var t=o({},e);t.token=t.token||t.fileToken;var n=t.appId,i=t.fileId,s=t.officeType,r=t.token,a=t.endpoint,c=t.customArgs,l=void 0===c?"":c;if(!Object.values(w).includes(s))throw Error("[WebOfficeSDK.init] officeType属性值错误，可选值参考WebOfficeSDK.OfficeType: "+JSON.stringify(w));var u=r?1:0,h={token:""};if("string"==typeof r?h.token=r:d(r)&&(h=o({tokenData:h},r)),u&&!h.token)return console.error("[WebOfficeSDK.init] token设置无效"),t;if(t.url=a+"/office/"+s+"/"+i+"?_w_appid="+n+"&_w_tokentype="+u,d(l)){var f=Object.entries(l).map(function(e){var t=e[0],n=e[1];return t+"="+encodeURIComponent(n)}).join("&");t.url=t.url+"&"+f}return o({},t)}(t));return function(e,t){a(this,void 0,void 0,function(){var n,i,s,r;return c(this,function(o){switch(o.label){case 0:return[4,e.commonApiReady()];case 1:for(i in o.sent(),n=[],t)n.push(i);s=0,o.label=2;case 2:if(!(s<n.length))return[3,11];switch(r=n[s]){case"onHyperLinkOpen":return[3,3];case"onToast":return[3,5];case"getClipboardData":return[3,7]}return[3,9];case 3:return[4,e.CommonApi.Hooks.Add("hyperLink")];case 4:return o.sent().OnAction=t[r],[3,10];case 5:return[4,e.CommonApi.Hooks.Add("toast")];case 6:return o.sent().OnAction=t[r],[3,10];case 7:return[4,e.CommonApi.Hooks.Add("getClipboardData")];case 8:return o.sent().OnAction=t[r],[3,10];case 9:return[3,10];case 10:return s++,[3,2];case 11:return[2]}})})}(s,e),y(s)},Object.defineProperty(n,"version",{get:function(){return"2.0.6"},enumerable:!1,configurable:!0}),n.prototype.ready=function(){return a(this,void 0,void 0,function(){return c(this,function(e){switch(e.label){case 0:return[4,this.advancedApiReady()];case 1:return[2,e.sent()]}})})},n.OfficeType=Object.freeze({Spreadsheet:"s",Writer:"w",Presentation:"p",Pdf:"f",Otl:"o",KSheet:"k",Dbt:"d"}),n}(b);return window.WPS=k,k});