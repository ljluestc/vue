importVNodefrom'core/vdom/vnode'import{Ref}from'v3'import{Component}from'./component'import{ASTModifiers}from'./compiler'/***@internal*/exporttypeVNodeChildren=|Array<null|VNode|string|number|VNodeChildren>|string/***@internal*/exporttypeVNodeComponentOptions={Ctor:typeofComponentpropsData?:Objectlisteners?:Record<string,Function|Function[]>children?:Array<VNode>tag?:string}/***@internal*/exporttypeMountedComponentVNode=VNode&{context:ComponentcomponentOptions:VNodeComponentOptionscomponentInstance:Componentparent:VNodedata:VNodeData}/***@internal*///interfaceforvnodesinupdatemodulesexporttypeVNodeWithData=VNode&{tag:stringdata:VNodeDatachildren:Array<VNode>text:voidelm:anyns:string|voidcontext:Componentkey:string|number|undefinedparent?:VNodeWithDatacomponentOptions?:VNodeComponentOptionscomponentInstance?:ComponentisRootInsert:boolean}////interfaceforvnodesinupdatemodules//exporttypeVNodeWithData={//tag:string;//data:VNodeData;//children:Array<VNode>;//text:void;//elm:any;//ns:string|void;//context:Component;//key:string|number|undefined;//parent?:VNodeWithData;//componentOptions?:VNodeComponentOptions;//componentInstance?:Component;//isRootInsert:boolean;//};/***@internal*/exportinterfaceVNodeData{key?:string|numberslot?:stringref?:string|Ref|((el:any)=>void)is?:stringpre?:booleantag?:stringstaticClass?:stringclass?:anystaticStyle?:{[key:string]:any}style?:string|Array<Object>|ObjectnormalizedStyle?:Objectprops?:{[key:string]:any}attrs?:{[key:string]:string}domProps?:{[key:string]:any}hook?:{[key:string]:Function}on?:{[key:string]:Function|Array<Function>}nativeOn?:{[key:string]:Function|Array<Function>}transition?:Objectshow?:boolean//markerforv-showinlineTemplate?:{render:FunctionstaticRenderFns:Array<Function>}directives?:Array<VNodeDirective>keepAlive?:booleanscopedSlots?:{[key:string]:Function}model?:{value:anycallback:Function}[key:string]:any}/***@internal*/exporttypeVNodeDirective={name:stringrawName:stringvalue?:anyoldValue?:anyarg?:stringoldArg?:stringmodifiers?:ASTModifiersdef?:Object}/***@internal*/exporttypeScopedSlotsData=Array<{key:string;fn:Function}|ScopedSlotsData>