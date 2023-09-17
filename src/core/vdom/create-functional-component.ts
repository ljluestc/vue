importVNode,{cloneVNode}from'./vnode'import{createElement}from'./create-element'import{resolveInject}from'../instance/inject'import{normalizeChildren}from'../vdom/helpers/normalize-children'import{resolveSlots}from'../instance/render-helpers/resolve-slots'import{normalizeScopedSlots}from'../vdom/helpers/normalize-scoped-slots'import{installRenderHelpers}from'../instance/render-helpers/index'import{isDef,isTrue,hasOwn,isArray,camelize,emptyObject,validateProp}from'../util/index'importtype{Component}from'types/component'importtype{VNodeData}from'types/vnode'exportfunctionFunctionalRenderContext(data:VNodeData,props:Object,children:Array<VNode>|undefined,parent:Component,Ctor:typeofComponent){constoptions=Ctor.options//ensurethecreateElementfunctioninfunctionalcomponents//getsauniquecontext-thisisnecessaryforcorrectnamedslotcheckletcontextVmif(hasOwn(parent,'_uid')){contextVm=Object.create(parent)contextVm._original=parent}else{//thecontextvmpassedinisafunctionalcontextaswell.//inthiscasewewanttomakesureweareabletogetaholdtothe//realcontextinstance.contextVm=parent//@ts-ignoreparent=parent._original}constisCompiled=isTrue(options._compiled)constneedNormalization=!isCompiledthis.data=datathis.props=propsthis.children=childrenthis.parent=parentthis.listeners=data.on||emptyObjectthis.injections=resolveInject(options.inject,parent)this.slots=()=>{if(!this.$slots){normalizeScopedSlots(parent,data.scopedSlots,(this.$slots=resolveSlots(children,parent)))}returnthis.$slots}Object.defineProperty(this,'scopedSlots',{enumerable:true,get(){returnnormalizeScopedSlots(parent,data.scopedSlots,this.slots())}}asany)//supportforcompiledfunctionaltemplateif(isCompiled){//exposing$optionsforrenderStatic()this.$options=options//pre-resolveslotsforrenderSlot()this.$slots=this.slots()this.$scopedSlots=normalizeScopedSlots(parent,data.scopedSlots,this.$slots)}if(options._scopeId){this._c=(a,b,c,d)=>{constvnode=createElement(contextVm,a,b,c,d,needNormalization)if(vnode&&!isArray(vnode)){vnode.fnScopeId=options._scopeIdvnode.fnContext=parent}returnvnode}}else{this._c=(a,b,c,d)=>createElement(contextVm,a,b,c,d,needNormalization)}}installRenderHelpers(FunctionalRenderContext.prototype)exportfunctioncreateFunctionalComponent(Ctor:typeofComponent,propsData:Object|undefined,data:VNodeData,contextVm:Component,children?:Array<VNode>):VNode|Array<VNode>|void{constoptions=Ctor.optionsconstprops={}constpropOptions=options.propsif(isDef(propOptions)){for(constkeyinpropOptions){props[key]=validateProp(key,propOptions,propsData||emptyObject)}}else{if(isDef(data.attrs))mergeProps(props,data.attrs)if(isDef(data.props))mergeProps(props,data.props)}constrenderContext=newFunctionalRenderContext(data,props,children,contextVm,Ctor)constvnode=options.render.call(null,renderContext._c,renderContext)if(vnodeinstanceofVNode){returncloneAndMarkFunctionalResult(vnode,data,renderContext.parent,options,renderContext)}elseif(isArray(vnode)){constvnodes=normalizeChildren(vnode)||[]constres=newArray(vnodes.length)for(leti=0;i<vnodes.length;i++){res[i]=cloneAndMarkFunctionalResult(vnodes[i],data,renderContext.parent,options,renderContext)}returnres}}functioncloneAndMarkFunctionalResult(vnode,data,contextVm,options,renderContext){//#7817clonenodebeforesettingfnContext,otherwiseifthenodeisreused//(e.g.itwasfromacachednormalslot)thefnContextcausesnamedslots//thatshouldnotbematchedtomatch.constclone=cloneVNode(vnode)clone.fnContext=contextVmclone.fnOptions=optionsif(__DEV__){;(clone.devtoolsMeta=clone.devtoolsMeta||({}asany)).renderContext=renderContext}if(data.slot){;(clone.data||(clone.data={})).slot=data.slot}returnclone}functionmergeProps(to,from){for(constkeyinfrom){to[camelize(key)]=from[key]}}