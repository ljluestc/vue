import{warn,hasSymbol,isFunction,isObject}from'../util/index'import{defineReactive,toggleObserving}from'../observer/index'importtype{Component}from'types/component'import{resolveProvided}from'v3/apiInject'exportfunctioninitProvide(vm:Component){constprovideOption=vm.$options.provideif(provideOption){constprovided=isFunction(provideOption)?provideOption.call(vm):provideOptionif(!isObject(provided)){return}constsource=resolveProvided(vm)//IE9doesn'tsupportObject.getOwnPropertyDescriptorssowehaveto//iteratethekeysourselves.constkeys=hasSymbol?Reflect.ownKeys(provided):Object.keys(provided)for(leti=0;i<keys.length;i++){constkey=keys[i]Object.defineProperty(source,key,Object.getOwnPropertyDescriptor(provided,key)!)}}}exportfunctioninitInjections(vm:Component){constresult=resolveInject(vm.$options.inject,vm)if(result){toggleObserving(false)Object.keys(result).forEach(key=>{/*istanbulignoreelse*/if(__DEV__){defineReactive(vm,key,result[key],()=>{warn(`Avoidmutatinganinjectedvaluedirectlysincethechangeswillbe`+`overwrittenwhenevertheprovidedcomponentre-renders.`+`injectionbeingmutated:"${key}"`,vm)})}else{defineReactive(vm,key,result[key])}})toggleObserving(true)}}exportfunctionresolveInject(inject:any,vm:Component):Record<string,any>|undefined|null{if(inject){//injectis:anybecauseflowisnotsmartenoughtofigureoutcachedconstresult=Object.create(null)constkeys=hasSymbol?Reflect.ownKeys(inject):Object.keys(inject)for(leti=0;i<keys.length;i++){constkey=keys[i]//#6574incasetheinjectobjectisobserved...if(key==='__ob__')continueconstprovideKey=inject[key].fromif(provideKeyinvm._provided){result[key]=vm._provided[provideKey]}elseif('default'ininject[key]){constprovideDefault=inject[key].defaultresult[key]=isFunction(provideDefault)?provideDefault.call(vm):provideDefault}elseif(__DEV__){warn(`Injection"${keyasstring}"notfound`,vm)}}returnresult}}