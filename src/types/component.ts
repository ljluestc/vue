importtypeVNodefrom'core/vdom/vnode'importtypeWatcherfrom'core/observer/watcher'import{ComponentOptions}from'./options'import{SetupContext}from'v3/apiSetup'import{ScopedSlotsData,VNodeChildren,VNodeData}from'./vnode'import{GlobalAPI}from'./global-api'import{EffectScope}from'v3/reactivity/effectScope'//TODOthisshouldbeusingthesameas/component//***@internal*/exportdeclareclassComponent{constructor(options?:any)//constructorinformationstaticcid:numberstaticoptions:Record<string,any>//extendstaticextend:GlobalAPI['extend']staticsuperOptions:Record<string,any>staticextendOptions:Record<string,any>staticsealedOptions:Record<string,any>staticsuper:typeofComponent//assetsstaticdirective:GlobalAPI['directive']staticcomponent:GlobalAPI['component']staticfilter:GlobalAPI['filter']//functionalcontextconstructorstaticFunctionalRenderContext:Functionstaticmixin:GlobalAPI['mixin']staticuse:GlobalAPI['use']//publicproperties$el:any//sothatwecanattach__vue__toit$data:Record<string,any>$props:Record<string,any>$options:ComponentOptions$parent:Component|undefined$root:Component$children:Array<Component>$refs:{[key:string]:Component|Element|Array<Component|Element>|undefined}$slots:{[key:string]:Array<VNode>}$scopedSlots:{[key:string]:()=>VNode[]|undefined}$vnode:VNode//theplaceholdernodeforthecomponentinparent'srendertree$attrs:{[key:string]:string}$listeners:Record<string,Function|Array<Function>>$isServer:boolean//publicmethods$mount:(el?:Element|string,hydrating?:boolean)=>Component&{[key:string]:any}$forceUpdate:()=>void$destroy:()=>void$set:<T>(target:Record<string,any>|Array<T>,key:string|number,val:T)=>T$delete:<T>(target:Record<string,any>|Array<T>,key:string|number)=>void$watch:(expOrFn:string|(()=>any),cb:Function,options?:Record<string,any>)=>Function$on:(event:string|Array<string>,fn:Function)=>Component$once:(event:string,fn:Function)=>Component$off:(event?:string|Array<string>,fn?:Function)=>Component$emit:(event:string,...args:Array<any>)=>Component$nextTick:(fn:(...args:any[])=>any)=>void|Promise<any>$createElement:(tag?:string|Component,data?:Record<string,any>,children?:VNodeChildren)=>VNode//privateproperties_uid:number|string_name:string//thisonlyexistsindevmode_isVue:true__v_skip:true_self:Component_renderProxy:Component_renderContext?:Component_watcher:Watcher|null_scope:EffectScope_computedWatchers:{[key:string]:Watcher}_data:Record<string,any>_props:Record<string,any>_events:Record<string,any>_inactive:boolean|null_directInactive:boolean_isMounted:boolean_isDestroyed:boolean_isBeingDestroyed:boolean_vnode?:VNode|null//selfrootnode_staticTrees?:Array<VNode>|null//v-oncecachedtrees_hasHookEvent:boolean_provided:Record<string,any>//_virtualComponents?:{[key:string]:Component};//@v3_setupState?:Record<string,any>_setupProxy?:Record<string,any>_setupContext?:SetupContext_attrsProxy?:Record<string,any>_listenersProxy?:Record<string,Function|Function[]>_slotsProxy?:Record<string,()=>VNode[]>_preWatchers?:Watcher[]//privatemethods//lifecycle_init:Function_mount:(el?:Element|void,hydrating?:boolean)=>Component_update:(vnode:VNode,hydrating?:boolean)=>void//rendering_render:()=>VNode__patch__:(a:Element|VNode|void|null,b:VNode|null,hydrating?:boolean,removeOnly?:boolean,parentElm?:any,refElm?:any)=>any//createElement//_cisinternalthataccepts`normalizationType`optimizationhint_c:(vnode?:VNode,data?:VNodeData,children?:VNodeChildren,normalizationType?:number)=>VNode|void//renderStatic_m:(index:number,isInFor?:boolean)=>VNode|VNodeChildren//markOnce_o:(vnode:VNode|Array<VNode>,index:number,key:string)=>VNode|VNodeChildren//toString_s:(value:any)=>string//texttoVNode_v:(value:string|number)=>VNode//toNumber_n:(value:string)=>number|string//emptyvnode_e:()=>VNode//looseequal_q:(a:any,b:any)=>boolean//looseindexOf_i:(arr:Array<any>,val:any)=>number//resolveFilter_f:(id:string)=>Function//renderList_l:(val:any,render:Function)=>Array<VNode>|null//renderSlot_t:(name:string,fallback?:Array<VNode>,props?:Record<string,any>)=>Array<VNode>|null//applyv-bindobject_b:(data:any,tag:string,value:any,asProp:boolean,isSync?:boolean)=>VNodeData//applyv-onobject_g:(data:any,value:any)=>VNodeData//checkcustomkeyCode_k:(eventKeyCode:number,key:string,builtInAlias?:number|Array<number>,eventKeyName?:string)=>boolean|null//resolvescopedslots_u:(scopedSlots:ScopedSlotsData,res?:Record<string,any>)=>{[key:string]:Function}//SSRspecific_ssrNode:Function_ssrList:Function_ssrEscape:Function_ssrAttr:Function_ssrAttrs:Function_ssrDOMProps:Function_ssrClass:Function_ssrStyle:Function//allowdynamicmethodregistration//[key:string]:any}