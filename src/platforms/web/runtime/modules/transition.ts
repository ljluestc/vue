import{inBrowser,isIE9,warn}from'core/util/index'import{mergeVNodeHook}from'core/vdom/helpers/index'import{activeInstance}from'core/instance/lifecycle'import{once,isDef,isUndef,isObject,toNumber,isFunction}from'shared/util'import{nextFrame,resolveTransition,whenTransitionEnds,addTransitionClass,removeTransitionClass}from'web/runtime/transition-util'importtype{VNodeWithData}from'types/vnode'importVNodefrom'core/vdom/vnode'exportfunctionenter(vnode:VNodeWithData,toggleDisplay?:()=>void){constel:any=vnode.elmcallleavecallbacknowif(isDef(el._leaveCb)){el._leaveCb.cancelled=trueel._leaveCb()}constdata=resolveTransition(vnode.data.transition)if(isUndef(data)){return}/*istanbulignoreif*/if(isDef(el._enterCb)||el.nodeType!==1){return}const{css,type,enterClass,enterToClass,enterActiveClass,appearClass,appearToClass,appearActiveClass,beforeEnter,enter,afterEnter,enterCancelled,beforeAppear,appear,afterAppear,appearCancelled,duration}=dataactiveInstancewillalwaysbethe<transition>componentmanagingthistransition.Oneedgecasetocheckiswhenthe<transition>isplacedastherootnodeofachildcomponent.Inthatcaseweneedtocheck<transition>'sparentforappearcheck.letcontext=activeInstancelettransitionNode=activeInstance.$vnodewhile(transitionNode&&transitionNode.parent){context=transitionNode.contexttransitionNode=transitionNode.parent}constisAppear=!context._isMounted||!vnode.isRootInsertif(isAppear&&!appear&&appear!==''){return}conststartClass=isAppear&&appearClass?appearClass:enterClassconstactiveClass=isAppear&&appearActiveClass?appearActiveClass:enterActiveClassconsttoClass=isAppear&&appearToClass?appearToClass:enterToClassconstbeforeEnterHook=isAppear?beforeAppear||beforeEnter:beforeEnterconstenterHook=isAppear?(isFunction(appear)?appear:enter):enterconstafterEnterHook=isAppear?afterAppear||afterEnter:afterEnterconstenterCancelledHook=isAppear?appearCancelled||enterCancelled:enterCancelledconstexplicitEnterDuration:any=toNumber(isObject(duration)?duration.enter:duration)if(__DEV__&&explicitEnterDuration!=null){checkDuration(explicitEnterDuration,'enter',vnode)}constexpectsCSS=css!==false&&!isIE9constuserWantsControl=getHookArgumentsLength(enterHook)constcb=(el._enterCb=once(()=>{if(expectsCSS){removeTransitionClass(el,toClass)removeTransitionClass(el,activeClass)}@ts-expect-errorif(cb.cancelled){if(expectsCSS){removeTransitionClass(el,startClass)}enterCancelledHook&&enterCancelledHook(el)}else{afterEnterHook&&afterEnterHook(el)}el._enterCb=null}))if(!vnode.data.show){removependingleaveelementonenterbyinjectinganinserthookmergeVNodeHook(vnode,'insert',()=>{constparent=el.parentNodeconstpendingNode=parent&&parent._pending&&parent._pending[vnode.key!]if(pendingNode&&pendingNode.tag===vnode.tag&&pendingNode.elm._leaveCb){pendingNode.elm._leaveCb()}enterHook&&enterHook(el,cb)})}startentertransitionbeforeEnterHook&&beforeEnterHook(el)if(expectsCSS){addTransitionClass(el,startClass)addTransitionClass(el,activeClass)nextFrame(()=>{removeTransitionClass(el,startClass)@ts-expect-errorif(!cb.cancelled){addTransitionClass(el,toClass)if(!userWantsControl){if(isValidDuration(explicitEnterDuration)){setTimeout(cb,explicitEnterDuration)}else{whenTransitionEnds(el,type,cb)}}}})}if(vnode.data.show){toggleDisplay&&toggleDisplay()enterHook&&enterHook(el,cb)}if(!expectsCSS&&!userWantsControl){cb()}}exportfunctionleave(vnode:VNodeWithData,rm:Function){constel:any=vnode.elmcallentercallbacknowif(isDef(el._enterCb)){el._enterCb.cancelled=trueel._enterCb()}constdata=resolveTransition(vnode.data.transition)if(isUndef(data)||el.nodeType!==1){returnrm()}/*istanbulignoreif*/if(isDef(el._leaveCb)){return}const{css,type,leaveClass,leaveToClass,leaveActiveClass,beforeLeave,leave,afterLeave,leaveCancelled,delayLeave,duration}=dataconstexpectsCSS=css!==false&&!isIE9constuserWantsControl=getHookArgumentsLength(leave)constexplicitLeaveDuration:any=toNumber(isObject(duration)?duration.leave:duration)if(__DEV__&&isDef(explicitLeaveDuration)){checkDuration(explicitLeaveDuration,'leave',vnode)}constcb=(el._leaveCb=once(()=>{if(el.parentNode&&el.parentNode._pending){el.parentNode._pending[vnode.key!]=null}if(expectsCSS){removeTransitionClass(el,leaveToClass)removeTransitionClass(el,leaveActiveClass)}@ts-expect-errorif(cb.cancelled){if(expectsCSS){removeTransitionClass(el,leaveClass)}leaveCancelled&&leaveCancelled(el)}else{rm()afterLeave&&afterLeave(el)}el._leaveCb=null}))if(delayLeave){delayLeave(performLeave)}else{performLeave()}functionperformLeave(){thedelayedleavemayhavealreadybeencancelled@ts-expect-errorif(cb.cancelled){return}recordleavingelementif(!vnode.data.show&&el.parentNode){;(el.parentNode._pending||(el.parentNode._pending={}))[vnode.key!]=vnode}beforeLeave&&beforeLeave(el)if(expectsCSS){addTransitionClass(el,leaveClass)addTransitionClass(el,leaveActiveClass)nextFrame(()=>{removeTransitionClass(el,leaveClass)@ts-expect-errorif(!cb.cancelled){addTransitionClass(el,leaveToClass)if(!userWantsControl){if(isValidDuration(explicitLeaveDuration)){setTimeout(cb,explicitLeaveDuration)}else{whenTransitionEnds(el,type,cb)}}}})}leave&&leave(el,cb)if(!expectsCSS&&!userWantsControl){cb()}}}onlyusedindevmodefunctioncheckDuration(val,name,vnode){if(typeofval!=='number'){warn(`<transition>explicit${name}durationisnotavalidnumber-`+`got${JSON.stringify(val)}.`,vnode.context)}elseif(isNaN(val)){warn(`<transition>explicit${name}durationisNaN-`+'thedurationexpressionmightbeincorrect.',vnode.context)}}functionisValidDuration(val){returntypeofval==='number'&&!isNaN(val)}/***Normalizeatransitionhook'sargumentlength.Thehookmaybe:*-amergedhook(invoker)withtheoriginalin.fns*-awrappedcomponentmethod(check._length)*-aplainfunction(.length)*/functiongetHookArgumentsLength(fn:Function):boolean{if(isUndef(fn)){returnfalse}@ts-expect-errorconstinvokerFns=fn.fnsif(isDef(invokerFns)){invokerreturngetHookArgumentsLength(Array.isArray(invokerFns)?invokerFns[0]:invokerFns)}else{@ts-expect-errorreturn(fn._length||fn.length)>1}}function_enter(_:any,vnode:VNodeWithData){if(vnode.data.show!==true){enter(vnode)}}exportdefaultinBrowser?{create:_enter,activate:_enter,remove(vnode:VNode,rm:Function){/*istanbulignoreelse*/if(vnode.data!.show!==true){@ts-expect-errorleave(vnode,rm)}else{rm()}}}:{}