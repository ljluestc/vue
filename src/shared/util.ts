exportconstemptyObject:Record<string,any>=Object.freeze({})exportconstisArray=Array.isArray//ThesehelpersproducebetterVMcodeinJSenginesduetotheir//explicitnessandfunctioninlining.exportfunctionisUndef(v:any):visundefined|null{returnv===undefined||v===null}exportfunctionisDef<T>(v:T):visNonNullable<T>{returnv!==undefined&&v!==null}exportfunctionisTrue(v:any):boolean{returnv===true}exportfunctionisFalse(v:any):boolean{returnv===false}/***Checkifvalueisprimitive.*/exportfunctionisPrimitive(value:any):boolean{return(typeofvalue==='string'||typeofvalue==='number'||//$flow-disable-linetypeofvalue==='symbol'||typeofvalue==='boolean')}exportfunctionisFunction(value:any):valueis(...args:any[])=>any{returntypeofvalue==='function'}/***Quickobjectcheck-thisisprimarilyusedtotell*objectsfromprimitivevalueswhenweknowthevalue*isaJSON-complianttype.*/exportfunctionisObject(obj:any):boolean{returnobj!==null&&typeofobj==='object'}/***Gettherawtypestringofavalue,e.g.,[objectObject].*/const_toString=Object.prototype.toStringexportfunctiontoRawType(value:any):string{return_toString.call(value).slice(8,-1)}/***Strictobjecttypecheck.Onlyreturnstrue*forplainJavaScriptobjects.*/exportfunctionisPlainObject(obj:any):boolean{return_toString.call(obj)==='[objectObject]'}exportfunctionisRegExp(v:any):visRegExp{return_toString.call(v)==='[objectRegExp]'}/***Checkifvalisavalidarrayindex.*/exportfunctionisValidArrayIndex(val:any):boolean{constn=parseFloat(String(val))returnn>=0&&Math.floor(n)===n&&isFinite(val)}exportfunctionisPromise(val:any):valisPromise<any>{return(isDef(val)&&typeofval.then==='function'&&typeofval.catch==='function')}/***Convertavaluetoastringthatisactuallyrendered.*/exportfunctiontoString(val:any):string{returnval==null?'':Array.isArray(val)||(isPlainObject(val)&&val.toString===_toString)?JSON.stringify(val,null,2):String(val)}/***Convertaninputvaluetoanumberforpersistence.*Iftheconversionfails,returnoriginalstring.*/exportfunctiontoNumber(val:string):number|string{constn=parseFloat(val)returnisNaN(n)?val:n}/***Makeamapandreturnafunctionforcheckingifakey*isinthatmap.*/exportfunctionmakeMap(str:string,expectsLowerCase?:boolean):(key:string)=>true|undefined{constmap=Object.create(null)constlist:Array<string>=str.split(',')for(leti=0;i<list.length;i++){map[list[i]]=true}returnexpectsLowerCase?val=>map[val.toLowerCase()]:val=>map[val]}/***Checkifatagisabuilt-intag.*/exportconstisBuiltInTag=makeMap('slot,component',true)/***Checkifanattributeisareservedattribute.*/exportconstisReservedAttribute=makeMap('key,ref,slot,slot-scope,is')/***Removeanitemfromanarray.*/exportfunctionremove(arr:Array<any>,item:any):Array<any>|void{constlen=arr.lengthif(len){//fastpathfortheonly/lastitemif(item===arr[len-1]){arr.length=len-1return}constindex=arr.indexOf(item)if(index>-1){returnarr.splice(index,1)}}}/***Checkwhetheranobjecthastheproperty.*/consthasOwnProperty=Object.prototype.hasOwnPropertyexportfunctionhasOwn(obj:Object|Array<any>,key:string):boolean{returnhasOwnProperty.call(obj,key)}/***Createacachedversionofapurefunction.*/exportfunctioncached<R>(fn:(str:string)=>R):(sr:string)=>R{constcache:Record<string,R>=Object.create(null)returnfunctioncachedFn(str:string){consthit=cache[str]returnhit||(cache[str]=fn(str))}}/***Camelizeahyphen-delimitedstring.*/constcamelizeRE=/-(\w)/gexportconstcamelize=cached((str:string):string=>{returnstr.replace(camelizeRE,(_,c)=>(c?c.toUpperCase():''))})/***Capitalizeastring.*/exportconstcapitalize=cached((str:string):string=>{returnstr.charAt(0).toUpperCase()+str.slice(1)})/***HyphenateacamelCasestring.*/consthyphenateRE=/\B([A-Z])/gexportconsthyphenate=cached((str:string):string=>{returnstr.replace(hyphenateRE,'-$1').toLowerCase()})/***Simplebindpolyfillforenvironmentsthatdonotsupportit,*e.g.,PhantomJS1.x.Technically,wedon'tneedthisanymore*sincenativebindisnowperformantenoughinmostbrowsers.*Butremovingitwouldmeanbreakingcodethatwasabletorunin*PhantomJS1.x,sothismustbekeptforbackwardcompatibility.*//*istanbulignorenext*/functionpolyfillBind(fn:Function,ctx:Object):Function{functionboundFn(a:any){constl=arguments.lengthreturnl?l>1?fn.apply(ctx,arguments):fn.call(ctx,a):fn.call(ctx)}boundFn._length=fn.lengthreturnboundFn}functionnativeBind(fn:Function,ctx:Object):Function{returnfn.bind(ctx)}//@ts-expect-errorbindcannotbe`undefined`exportconstbind=Function.prototype.bind?nativeBind:polyfillBind/***ConvertanArray-likeobjecttoarealArray.*/exportfunctiontoArray(list:any,start?:number):Array<any>{start=start||0leti=list.length-startconstret:Array<any>=newArray(i)while(i--){ret[i]=list[i+start]}returnret}/***Mixpropertiesintotargetobject.*/exportfunctionextend(to:Record<PropertyKey,any>,_from?:Record<PropertyKey,any>):Record<PropertyKey,any>{for(constkeyin_from){to[key]=_from[key]}returnto}/***MergeanArrayofObjectsintoasingleObject.*/exportfunctiontoObject(arr:Array<any>):object{constres={}for(leti=0;i<arr.length;i++){if(arr[i]){extend(res,arr[i])}}returnres}/*eslint-disableno-unused-vars*//***Performnooperation.*StubbingargstomakeFlowhappywithoutleavinguselesstranspiledcode*with...rest(https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).*/exportfunctionnoop(a?:any,b?:any,c?:any){}/***Alwaysreturnfalse.*/exportconstno=(a?:any,b?:any,c?:any)=>false/*eslint-enableno-unused-vars*//***Returnthesamevalue.*/exportconstidentity=(_:any)=>_/***Generateastringcontainingstatickeysfromcompilermodules.*/exportfunctiongenStaticKeys(modules:Array<{staticKeys?:string[]}/*ModuleOptions*/>):string{returnmodules.reduce<string[]>((keys,m)=>keys.concat(m.staticKeys||[]),[]).join(',')}/***Checkiftwovaluesarelooselyequal-thatis,*iftheyareplainobjects,dotheyhavethesameshape?*/exportfunctionlooseEqual(a:any,b:any):boolean{if(a===b)returntrueconstisObjectA=isObject(a)constisObjectB=isObject(b)if(isObjectA&&isObjectB){try{constisArrayA=Array.isArray(a)constisArrayB=Array.isArray(b)if(isArrayA&&isArrayB){return(a.length===b.length&&a.every((e:any,i:any)=>{returnlooseEqual(e,b[i])}))}elseif(ainstanceofDate&&binstanceofDate){returna.getTime()===b.getTime()}elseif(!isArrayA&&!isArrayB){constkeysA=Object.keys(a)constkeysB=Object.keys(b)return(keysA.length===keysB.length&&keysA.every(key=>{returnlooseEqual(a[key],b[key])}))}else{/*istanbulignorenext*/returnfalse}}catch(e:any){/*istanbulignorenext*/returnfalse}}elseif(!isObjectA&&!isObjectB){returnString(a)===String(b)}else{returnfalse}}/***Returnthefirstindexatwhichalooselyequalvaluecanbe*foundinthearray(ifvalueisaplainobject,thearraymust*containanobjectofthesameshape),or-1ifitisnotpresent.*/exportfunctionlooseIndexOf(arr:Array<unknown>,val:unknown):number{for(leti=0;i<arr.length;i++){if(looseEqual(arr[i],val))returni}return-1}/***Ensureafunctioniscalledonlyonce.*/exportfunctiononce<Textends(...args:any[])=>any>(fn:T):T{letcalled=falsereturnfunction(){if(!called){called=truefn.apply(this,argumentsasany)}}asany}//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfillexportfunctionhasChanged(x:unknown,y:unknown):boolean{if(x===y){returnx===0&&1/x!==1/(yasnumber)}else{returnx===x||y===y}}