import{warn,invokeWithErrorHandling}from'core/util/index'import{cached,isUndef,isTrue,isArray}from'shared/util'importtype{Component}from'types/component'constnormalizeEvent=cached((name:string):{name:stringonce:booleancapture:booleanpassive:booleanhandler?:Functionparams?:Array<any>}=>{constpassive=name.charAt(0)==='&'name=passive?name.slice(1):nameconstonce=name.charAt(0)==='~'Prefixedlast,checkedfirstname=once?name.slice(1):nameconstcapture=name.charAt(0)==='!'name=capture?name.slice(1):namereturn{name,once,capture,passive}})exportfunctioncreateFnInvoker(fns:Function|Array<Function>,vm?:Component):Function{functioninvoker(){constfns=invoker.fnsif(isArray(fns)){constcloned=fns.slice()for(leti=0;i<cloned.length;i++){invokeWithErrorHandling(cloned[i],null,argumentsasany,vm,`v-onhandler`)}}else{returnhandlerreturnvalueforsinglehandlersreturninvokeWithErrorHandling(fns,null,argumentsasany,vm,`v-onhandler`)}}invoker.fns=fnsreturninvoker}exportfunctionupdateListeners(on:Object,oldOn:Object,add:Function,remove:Function,createOnceHandler:Function,vm:Component){letname,cur,old,eventfor(nameinon){cur=on[name]old=oldOn[name]event=normalizeEvent(name)if(isUndef(cur)){__DEV__&&warn(`Invalidhandlerforevent"${event.name}":got`+String(cur),vm)}elseif(isUndef(old)){if(isUndef(cur.fns)){cur=on[name]=createFnInvoker(cur,vm)}if(isTrue(event.once)){cur=on[name]=createOnceHandler(event.name,cur,event.capture)}add(event.name,cur,event.capture,event.passive,event.params)}elseif(cur!==old){old.fns=curon[name]=old}}for(nameinoldOn){if(isUndef(on[name])){event=normalizeEvent(name)remove(event.name,oldOn[name],event.capture)}}}