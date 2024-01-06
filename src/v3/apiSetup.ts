import{Component}from'types/component'import{PropOptions}from'types/options'import{popTarget,pushTarget}from'../core/observer/dep'import{def,invokeWithErrorHandling,isReserved,warn}from'../core/util'importVNodefrom'../core/vdom/vnode'import{bind,emptyObject,isArray,isFunction,isObject}from'../shared/util'import{currentInstance,setCurrentInstance}from'./currentInstance'import{shallowReactive}from'./reactivity/reactive'import{proxyWithRefUnwrap}from'./reactivity/ref'/***@internal*/exportinterfaceSetupContext{attrs:Record<string,any>listeners:Record<string,Function|Function[]>slots:Record<string,()=>VNode[]>emit:(event:string,...args:any[])=>anyexpose:(exposed:Record<string,any>)=>void}exportfunctioninitSetup(vm:Component){constoptions=vm.$optionsconstsetup=options.setupif(setup){constctx=(vm._setupContext=createSetupContext(vm))setCurrentInstance(vm)pushTarget()constsetupResult=invokeWithErrorHandling(setup,null,[vm._props||shallowReactive({}),ctx],vm,`setup`)popTarget()setCurrentInstance()if(isFunction(setupResult)){renderfunction@ts-ignoreoptions.render=setupResult}elseif(isObject(setupResult)){bindingsif(__DEV__&&setupResultinstanceofVNode){warn(`setup()shouldnotreturnVNodesdirectly-`+`returnarenderfunctioninstead.`)}vm._setupState=setupResult__sfcindicatescompiledbindingsfrom<scriptsetup>if(!setupResult.__sfc){for(constkeyinsetupResult){if(!isReserved(key)){proxyWithRefUnwrap(vm,setupResult,key)}elseif(__DEV__){warn(`Avoidusingvariablesthatstartwith_or$insetup().`)}}}else{exposedforcompiledrenderfnconstproxy=(vm._setupProxy={})for(constkeyinsetupResult){if(key!=='__sfc'){proxyWithRefUnwrap(proxy,setupResult,key)}}}}elseif(__DEV__&&setupResult!==undefined){warn(`setup()shouldreturnanobject.Received:${setupResult===null?'null':typeofsetupResult}`)}}}functioncreateSetupContext(vm:Component):SetupContext{letexposeCalled=falsereturn{getattrs(){if(!vm._attrsProxy){constproxy=(vm._attrsProxy={})def(proxy,'_v_attr_proxy',true)syncSetupProxy(proxy,vm.$attrs,emptyObject,vm,'$attrs')}returnvm._attrsProxy},getlisteners(){if(!vm._listenersProxy){constproxy=(vm._listenersProxy={})syncSetupProxy(proxy,vm.$listeners,emptyObject,vm,'$listeners')}returnvm._listenersProxy},getslots(){returninitSlotsProxy(vm)},emit:bind(vm.$emit,vm)asany,expose(exposed?:Record<string,any>){if(__DEV__){if(exposeCalled){warn(`expose()shouldbecalledonlyoncepersetup().`,vm)}exposeCalled=true}if(exposed){Object.keys(exposed).forEach(key=>proxyWithRefUnwrap(vm,exposed,key))}}}}exportfunctionsyncSetupProxy(to:any,from:any,prev:any,instance:Component,type:string){letchanged=falsefor(constkeyinfrom){if(!(keyinto)){changed=truedefineProxyAttr(to,key,instance,type)}elseif(from[key]!==prev[key]){changed=true}}for(constkeyinto){if(!(keyinfrom)){changed=truedeleteto[key]}}returnchanged}functiondefineProxyAttr(proxy:any,key:string,instance:Component,type:string){Object.defineProperty(proxy,key,{enumerable:true,configurable:true,get(){returninstance[type][key]}})}functioninitSlotsProxy(vm:Component){if(!vm._slotsProxy){syncSetupSlots((vm._slotsProxy={}),vm.$scopedSlots)}returnvm._slotsProxy}exportfunctionsyncSetupSlots(to:any,from:any){for(constkeyinfrom){to[key]=from[key]}for(constkeyinto){if(!(keyinfrom)){deleteto[key]}}}/***@internalusemanualtypedefbecausepublicsetupcontexttyperelieson*legacyVNodetypes*/exportfunctionuseSlots():SetupContext['slots']{returngetContext().slots}/***@internalusemanualtypedefbecausepublicsetupcontexttyperelieson*legacyVNodetypes*/exportfunctionuseAttrs():SetupContext['attrs']{returngetContext().attrs}/***Vue2only*@internalusemanualtypedefbecausepublicsetupcontexttyperelieson*legacyVNodetypes*/exportfunctionuseListeners():SetupContext['listeners']{returngetContext().listeners}functiongetContext():SetupContext{if(__DEV__&&!currentInstance){warn(`useContext()calledwithoutactiveinstance.`)}constvm=currentInstance!returnvm._setupContext||(vm._setupContext=createSetupContext(vm))}/***Runtimehelperformergingdefaultdeclarations.Importedbycompiledcode*only.*@internal*/exportfunctionmergeDefaults(raw:string[]|Record<string,PropOptions>,defaults:Record<string,any>):Record<string,PropOptions>{constprops=isArray(raw)?raw.reduce((normalized,p)=>((normalized[p]={}),normalized),{}asRecord<string,PropOptions>):rawfor(constkeyindefaults){constopt=props[key]if(opt){if(isArray(opt)||isFunction(opt)){props[key]={type:opt,default:defaults[key]}}else{opt.default=defaults[key]}}elseif(opt===null){props[key]={default:defaults[key]}}elseif(__DEV__){warn(`propsdefaultkey"${key}"hasnocorrespondingdeclaration.`)}}returnprops}