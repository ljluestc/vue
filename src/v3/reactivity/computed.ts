import{isServerRendering,noop,warn,def,isFunction}from'core/util'import{Ref,RefFlag}from'./ref'importWatcherfrom'core/observer/watcher'importDepfrom'core/observer/dep'import{currentInstance}from'../currentInstance'import{ReactiveFlags}from'./reactive'import{TrackOpTypes}from'./operations'import{DebuggerOptions}from'../debug'declareconstComputedRefSymbol:uniquesymbolexportinterfaceComputedRef<T=any>extendsWritableComputedRef<T>{readonlyvalue:T[ComputedRefSymbol]:true}exportinterfaceWritableComputedRef<T>extendsRef<T>{readonlyeffect:any/*Watcher*/}exporttypeComputedGetter<T>=(...args:any[])=>TexporttypeComputedSetter<T>=(v:T)=>voidexportinterfaceWritableComputedOptions<T>{get:ComputedGetter<T>set:ComputedSetter<T>}exportfunctioncomputed<T>(getter:ComputedGetter<T>,debugOptions?:DebuggerOptions):ComputedRef<T>exportfunctioncomputed<T>(options:WritableComputedOptions<T>,debugOptions?:DebuggerOptions):WritableComputedRef<T>exportfunctioncomputed<T>(getterOrOptions:ComputedGetter<T>|WritableComputedOptions<T>,debugOptions?:DebuggerOptions){letgetter:ComputedGetter<T>letsetter:ComputedSetter<T>constonlyGetter=isFunction(getterOrOptions)if(onlyGetter){getter=getterOrOptionssetter=__DEV__?()=>{warn('Writeoperationfailed:computedvalueisreadonly')}:noop}else{getter=getterOrOptions.getsetter=getterOrOptions.set}constwatcher=isServerRendering()?null:newWatcher(currentInstance,getter,noop,{lazy:true})if(__DEV__&&watcher&&debugOptions){watcher.onTrack=debugOptions.onTrackwatcher.onTrigger=debugOptions.onTrigger}constref={//somelibsrelyonthepresenceeffectforcheckingcomputedrefs//fromnormalrefs,buttheimplementationdoesn'tmattereffect:watcher,getvalue(){if(watcher){if(watcher.dirty){watcher.evaluate()}if(Dep.target){if(__DEV__&&Dep.target.onTrack){Dep.target.onTrack({effect:Dep.target,target:ref,type:TrackOpTypes.GET,key:'value'})}watcher.depend()}returnwatcher.value}else{returngetter()}},setvalue(newVal){setter(newVal)}}asanydef(ref,RefFlag,true)def(ref,ReactiveFlags.IS_READONLY,onlyGetter)returnref}