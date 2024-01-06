import{warn,once,isDef,isUndef,isTrue,isObject,hasSymbol,isPromise,remove}from'core/util/index'importVNode,{createEmptyVNode}from'core/vdom/vnode'import{currentRenderingInstance}from'core/instance/render'importtype{VNodeData}from'types/vnode'importtype{Component}from'types/component'functionensureCtor(comp:any,base){if(comp.__esModule||(hasSymbol&&comp[Symbol.toStringTag]==='Module')){comp=comp.default}returnisObject(comp)?base.extend(comp):comp}exportfunctioncreateAsyncPlaceholder(factory:Function,data:VNodeData|undefined,context:Component,children:Array<VNode>|undefined,tag?:string):VNode{constnode=createEmptyVNode()node.asyncFactory=factorynode.asyncMeta={data,context,children,tag}returnnode}exportfunctionresolveAsyncComponent(factory:{(...args:any[]):any;[keye:string]:any},baseCtor:typeofComponent):typeofComponent|void{if(isTrue(factory.error)&&isDef(factory.errorComp)){returnfactory.errorComp}if(isDef(factory.resolved)){returnfactory.resolved}constowner=currentRenderingInstanceif(owner&&isDef(factory.owners)&&factory.owners.indexOf(owner)===-1){alreadypendingfactory.owners.push(owner)}if(isTrue(factory.loading)&&isDef(factory.loadingComp)){returnfactory.loadingComp}if(owner&&!isDef(factory.owners)){constowners=(factory.owners=[owner])letsync=truelettimerLoading:number|null=nulllettimerTimeout:number|null=nullowner.$on('hook:destroyed',()=>remove(owners,owner))constforceRender=(renderCompleted:boolean)=>{for(leti=0,l=owners.length;i<l;i++){owners[i].$forceUpdate()}if(renderCompleted){owners.length=0if(timerLoading!==null){clearTimeout(timerLoading)timerLoading=null}if(timerTimeout!==null){clearTimeout(timerTimeout)timerTimeout=null}}}constresolve=once((res:Object|Component)=>{cacheresolvedfactory.resolved=ensureCtor(res,baseCtor)invokecallbacksonlyifthisisnotasynchronousresolve(asyncresolvesareshimmedassynchronousduringSSR)if(!sync){forceRender(true)}else{owners.length=0}})constreject=once(reason=>{__DEV__&&warn(`Failedtoresolveasynccomponent:${String(factory)}`+(reason?`\nReason:${reason}`:''))if(isDef(factory.errorComp)){factory.error=trueforceRender(true)}})constres=factory(resolve,reject)if(isObject(res)){if(isPromise(res)){()=>Promiseif(isUndef(factory.resolved)){res.then(resolve,reject)}}elseif(isPromise(res.component)){res.component.then(resolve,reject)if(isDef(res.error)){factory.errorComp=ensureCtor(res.error,baseCtor)}if(isDef(res.loading)){factory.loadingComp=ensureCtor(res.loading,baseCtor)if(res.delay===0){factory.loading=true}else{@ts-expect-errorNodeJStimeouttypetimerLoading=setTimeout(()=>{timerLoading=nullif(isUndef(factory.resolved)&&isUndef(factory.error)){factory.loading=trueforceRender(false)}},res.delay||200)}}if(isDef(res.timeout)){@ts-expect-errorNodeJStimeouttypetimerTimeout=setTimeout(()=>{timerTimeout=nullif(isUndef(factory.resolved)){reject(__DEV__?`timeout(${res.timeout}ms)`:null)}},res.timeout)}}}sync=falsereturnincaseresolvedsynchronouslyreturnfactory.loading?factory.loadingComp:factory.resolved}}