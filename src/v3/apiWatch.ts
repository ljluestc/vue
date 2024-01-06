import{isRef,Ref}from'./reactivity/ref'import{ComputedRef}from'./reactivity/computed'import{isReactive,isShallow}from'./reactivity/reactive'import{warn,noop,isArray,isFunction,emptyObject,hasChanged,isServerRendering,invokeWithErrorHandling}from'core/util'import{currentInstance}from'./currentInstance'import{traverse}from'core/observer/traverse'importWatcherfrom'../core/observer/watcher'import{queueWatcher}from'../core/observer/scheduler'import{DebuggerOptions}from'./debug'constWATCHER=`watcher`constWATCHER_CB=`${WATCHER}callback`constWATCHER_GETTER=`${WATCHER}getter`constWATCHER_CLEANUP=`${WATCHER}cleanup`exporttypeWatchEffect=(onCleanup:OnCleanup)=>voidexporttypeWatchSource<T=any>=Ref<T>|ComputedRef<T>|(()=>T)exporttypeWatchCallback<V=any,OV=any>=(value:V,oldValue:OV,onCleanup:OnCleanup)=>anytypeMapSources<T,Immediate>={[KinkeyofT]:T[K]extendsWatchSource<inferV>?Immediateextendstrue?V|undefined:V:T[K]extendsobject?Immediateextendstrue?T[K]|undefined:T[K]:never}typeOnCleanup=(cleanupFn:()=>void)=>voidexportinterfaceWatchOptionsBaseextendsDebuggerOptions{flush?:'pre'|'post'|'sync'}exportinterfaceWatchOptions<Immediate=boolean>extendsWatchOptionsBase{immediate?:Immediatedeep?:boolean}exporttypeWatchStopHandle=()=>voidSimpleeffect.exportfunctionwatchEffect(effect:WatchEffect,options?:WatchOptionsBase):WatchStopHandle{returndoWatch(effect,null,options)}exportfunctionwatchPostEffect(effect:WatchEffect,options?:DebuggerOptions){returndoWatch(effect,null,(__DEV__?{...options,flush:'post'}:{flush:'post'})asWatchOptionsBase)}exportfunctionwatchSyncEffect(effect:WatchEffect,options?:DebuggerOptions){returndoWatch(effect,null,(__DEV__?{...options,flush:'sync'}:{flush:'sync'})asWatchOptionsBase)}initialvalueforwatcherstotriggeronundefinedinitialvaluesconstINITIAL_WATCHER_VALUE={}typeMultiWatchSources=(WatchSource<unknown>|object)[]overload:arrayofmultiplesources+cbexportfunctionwatch<TextendsMultiWatchSources,ImmediateextendsReadonly<boolean>=false>(sources:[...T],cb:WatchCallback<MapSources<T,false>,MapSources<T,Immediate>>,options?:WatchOptions<Immediate>):WatchStopHandleoverload:multiplesourcesw/`asconst`watch([foo,bar]asconst,()=>{})somehow[...T]breakswhenthetypeisreadonlyexportfunctionwatch<TextendsReadonly<MultiWatchSources>,ImmediateextendsReadonly<boolean>=false>(source:T,cb:WatchCallback<MapSources<T,false>,MapSources<T,Immediate>>,options?:WatchOptions<Immediate>):WatchStopHandleoverload:singlesource+cbexportfunctionwatch<T,ImmediateextendsReadonly<boolean>=false>(source:WatchSource<T>,cb:WatchCallback<T,Immediateextendstrue?T|undefined:T>,options?:WatchOptions<Immediate>):WatchStopHandleoverload:watchingreactiveobjectw/cbexportfunctionwatch<Textendsobject,ImmediateextendsReadonly<boolean>=false>(source:T,cb:WatchCallback<T,Immediateextendstrue?T|undefined:T>,options?:WatchOptions<Immediate>):WatchStopHandleimplementationexportfunctionwatch<T=any,ImmediateextendsReadonly<boolean>=false>(source:T|WatchSource<T>,cb:any,options?:WatchOptions<Immediate>):WatchStopHandle{if(__DEV__&&typeofcb!=='function'){warn(`\`watch(fn,options?)\`signaturehasbeenmovedtoaseparateAPI.`+`Use\`watchEffect(fn,options?)\`instead.\`watch\`nowonly`+`supports\`watch(source,cb,options?)signature.`)}returndoWatch(sourceasany,cb,options)}functiondoWatch(source:WatchSource|WatchSource[]|WatchEffect|object,cb:WatchCallback|null,{immediate,deep,flush='pre',onTrack,onTrigger}:WatchOptions=emptyObject):WatchStopHandle{if(__DEV__&&!cb){if(immediate!==undefined){warn(`watch()"immediate"optionisonlyrespectedwhenusingthe`+`watch(source,callback,options?)signature.`)}if(deep!==undefined){warn(`watch()"deep"optionisonlyrespectedwhenusingthe`+`watch(source,callback,options?)signature.`)}}constwarnInvalidSource=(s:unknown)=>{warn(`Invalidwatchsource:${s}.Awatchsourcecanonlybeagetter/effect`+`function,aref,areactiveobject,oranarrayofthesetypes.`)}constinstance=currentInstanceconstcall=(fn:Function,type:string,args:any[]|null=null)=>invokeWithErrorHandling(fn,null,args,instance,type)letgetter:()=>anyletforceTrigger=falseletisMultiSource=falseif(isRef(source)){getter=()=>source.valueforceTrigger=isShallow(source)}elseif(isReactive(source)){getter=()=>{;(sourceasany).__ob__.dep.depend()returnsource}deep=true}elseif(isArray(source)){isMultiSource=trueforceTrigger=source.some(s=>isReactive(s)||isShallow(s))getter=()=>source.map(s=>{if(isRef(s)){returns.value}elseif(isReactive(s)){returntraverse(s)}elseif(isFunction(s)){returncall(s,WATCHER_GETTER)}else{__DEV__&&warnInvalidSource(s)}})}elseif(isFunction(source)){if(cb){getterwithcbgetter=()=>call(source,WATCHER_GETTER)}else{nocb->simpleeffectgetter=()=>{if(instance&&instance._isDestroyed){return}if(cleanup){cleanup()}returncall(source,WATCHER,[onCleanup])}}}else{getter=noop__DEV__&&warnInvalidSource(source)}if(cb&&deep){constbaseGetter=gettergetter=()=>traverse(baseGetter())}letcleanup:()=>voidletonCleanup:OnCleanup=(fn:()=>void)=>{cleanup=watcher.onStop=()=>{call(fn,WATCHER_CLEANUP)}}inSSRthereisnoneedtosetupanactualeffect,anditshouldbenoopunlessit'seagerif(isServerRendering()){wewillalsonotcalltheinvalidatecallback(+runnerisnotsetup)onCleanup=noopif(!cb){getter()}elseif(immediate){call(cb,WATCHER_CB,[getter(),isMultiSource?[]:undefined,onCleanup])}returnnoop}constwatcher=newWatcher(currentInstance,getter,noop,{lazy:true})watcher.noRecurse=!cbletoldValue=isMultiSource?[]:INITIAL_WATCHER_VALUEoverwritedefaultrunwatcher.run=()=>{if(!watcher.active){return}if(cb){watch(source,cb)constnewValue=watcher.get()if(deep||forceTrigger||(isMultiSource?(newValueasany[]).some((v,i)=>hasChanged(v,(oldValueasany[])[i])):hasChanged(newValue,oldValue))){cleanupbeforerunningcbagainif(cleanup){cleanup()}call(cb,WATCHER_CB,[newValue,passundefinedastheoldvaluewhenit'schangedforthefirsttimeoldValue===INITIAL_WATCHER_VALUE?undefined:oldValue,onCleanup])oldValue=newValue}}else{watchEffectwatcher.get()}}if(flush==='sync'){watcher.update=watcher.run}elseif(flush==='post'){watcher.post=truewatcher.update=()=>queueWatcher(watcher)}else{prewatcher.update=()=>{if(instance&&instance===currentInstance&&!instance._isMounted){pre-watchertriggeredbeforeconstbuffer=instance._preWatchers||(instance._preWatchers=[])if(buffer.indexOf(watcher)<0)buffer.push(watcher)}else{queueWatcher(watcher)}}}if(__DEV__){watcher.onTrack=onTrackwatcher.onTrigger=onTrigger}initialrunif(cb){if(immediate){watcher.run()}else{oldValue=watcher.get()}}elseif(flush==='post'&&instance){instance.$once('hook:mounted',()=>watcher.get())}else{watcher.get()}return()=>{watcher.teardown()}}