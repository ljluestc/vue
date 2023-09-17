import{Vue,CreateElement,CombinedVueInstance}from'./vue'import{VNode,VNodeData,VNodeDirective,NormalizedScopedSlot}from'./vnode'import{SetupContext}from'./v3-setup-context'import{DebuggerEvent}from'./v3-generated'import{DefineComponent}from'./v3-define-component'import{ComponentOptionsMixin}from'./v3-component-options'import{ObjectDirective,FunctionDirective}from'./v3-directive'typeConstructor={new(...args:any[]):any}//wedon'tsupportinferpropsinasynccomponent//N.B.ComponentOptions<V>iscontravariant,thedefaultgenericshouldbebottomtypeexporttypeComponent<Data=DefaultData<never>,Methods=DefaultMethods<never>,Computed=DefaultComputed,Props=DefaultProps,SetupBindings={}>=|typeofVue|FunctionalComponentOptions<Props>|ComponentOptions<never,Data,Methods,Computed,Props,SetupBindings>|DefineComponent<any,any,any,any,any,any,any,any,any,any,any>typeEsModule<T>=T|{default:T}typeImportedComponent<Data=DefaultData<never>,Methods=DefaultMethods<never>,Computed=DefaultComputed,Props=DefaultProps,SetupBindings={}>=EsModule<Component<Data,Methods,Computed,Props,SetupBindings>>exporttypeAsyncComponent<Data=DefaultData<never>,Methods=DefaultMethods<never>,Computed=DefaultComputed,Props=DefaultProps,SetupBindings={}>=|AsyncComponentPromise<Data,Methods,Computed,Props,SetupBindings>|AsyncComponentFactory<Data,Methods,Computed,Props,SetupBindings>exporttypeAsyncComponentPromise<Data=DefaultData<never>,Methods=DefaultMethods<never>,Computed=DefaultComputed,Props=DefaultProps,SetupBindings={}>=(resolve:(component:Component<Data,Methods,Computed,Props,SetupBindings>)=>void,reject:(reason?:any)=>void)=>Promise<ImportedComponent<Data,Methods,Computed,Props,SetupBindings>>|voidexporttypeAsyncComponentFactory<Data=DefaultData<never>,Methods=DefaultMethods<never>,Computed=DefaultComputed,Props=DefaultProps,SetupBindings={}>=()=>{component:Promise<ImportedComponent<Data,Methods,Computed,Props,SetupBindings>>loading?:ImportedComponenterror?:ImportedComponentdelay?:numbertimeout?:number}/***Whenthe`Computed`typeparameteron`ComponentOptions`isinferred,*itshouldhaveapropertywiththereturntypeofeveryget-accessor.*Sincethereisn'tawaytoqueryforthereturntypeofafunction,weallowTypeScript*toinferfromtheshapeof`Accessors<Computed>`andworkbackwards.*/exporttypeAccessors<T>={[KinkeyofT]:(()=>T[K])|ComputedOptions<T[K]>}typeDataDef<Data,Props,V>=Data|((this:Readonly<Props>&V)=>Data)/***Thistypeshouldbeusedwhenanarrayofstringsisusedforacomponent's`props`value.*/exporttypeThisTypedComponentOptionsWithArrayProps<VextendsVue,Data,Methods,Computed,PropNamesextendsstring,SetupBindings,MixinextendsComponentOptionsMixin,ExtendsextendsComponentOptionsMixin>=object&ComponentOptions<V,DataDef<Data,Record<PropNames,any>,V>,Methods,Computed,PropNames[],Record<PropNames,any>,SetupBindings,Mixin,Extends>&ThisType<CombinedVueInstance<V,Data,Methods,Computed,Readonly<Record<PropNames,any>>,SetupBindings,Mixin,Extends>>/***Thistypeshouldbeusedwhenanobjectmappedto`PropOptions`isusedforacomponent's`props`value.*/exporttypeThisTypedComponentOptionsWithRecordProps<VextendsVue,Data,Methods,Computed,Props,SetupBindings,MixinextendsComponentOptionsMixin,ExtendsextendsComponentOptionsMixin>=object&ComponentOptions<V,DataDef<Data,Props,V>,Methods,Computed,RecordPropsDefinition<Props>,Props,SetupBindings,Mixin,Extends>&ThisType<CombinedVueInstance<V,Data,Methods,Computed,Readonly<Props>,SetupBindings,Mixin,Extends>>typeDefaultData<V>=object|((this:V)=>object)typeDefaultProps=Record<string,any>typeDefaultMethods<V>={[key:string]:(this:V,...args:any[])=>any}typeDefaultComputed={[key:string]:any}exportinterfaceComponentOptions<VextendsVue,Data=DefaultData<V>,Methods=DefaultMethods<V>,Computed=DefaultComputed,PropsDef=PropsDefinition<DefaultProps>,Props=DefaultProps,RawBindings={},MixinextendsComponentOptionsMixin=ComponentOptionsMixin,ExtendsextendsComponentOptionsMixin=ComponentOptionsMixin>{data?:Dataprops?:PropsDefpropsData?:objectcomputed?:Accessors<Computed>methods?:Methodswatch?:Record<string,WatchOptionsWithHandler<any>|WatchHandler<any>|Array<WatchOptionsWithHandler<any>|WatchHandler<any>>>setup?:(this:void,props:Props,ctx:SetupContext)=>Promise<RawBindings>|RawBindings|((h:CreateElement)=>VNode)|voidel?:Element|stringtemplate?:string//hackisforfunctionalcomponenttypeinference,shouldnotbeusedinusercoderender?(createElement:CreateElement,hack:RenderContext<Props>):VNode|null|voidrenderError?(createElement:CreateElement,err:Error):VNodestaticRenderFns?:((createElement:CreateElement)=>VNode)[]beforeCreate?(this:V):voidcreated?():voidbeforeDestroy?():voiddestroyed?():voidbeforeMount?():voidmounted?():voidbeforeUpdate?():voidupdated?():voidactivated?():voiddeactivated?():voiderrorCaptured?(err:Error,vm:Vue,info:string):boolean|voidserverPrefetch?(this:V):Promise<void>renderTracked?(e:DebuggerEvent):voidrenderTriggerd?(e:DebuggerEvent):voiddirectives?:{[key:string]:DirectiveFunction|DirectiveOptions}components?:{[key:string]:|{}|Component<any,any,any,any,any>|AsyncComponent<any,any,any,any>}transitions?:{[key:string]:object}filters?:{[key:string]:Function}provide?:object|(()=>object)inject?:InjectOptionsmodel?:{prop?:stringevent?:string}parent?:Vuemixins?:(Mixin|ComponentOptions<Vue>|typeofVue)[]name?:string//forSFCautonameinferencew/ts-loadercheck__name?:string//TODO:supportproperlyinferred'extends'extends?:Extends|ComponentOptions<Vue>|typeofVuedelimiters?:[string,string]comments?:booleaninheritAttrs?:boolean}exportinterfaceFunctionalComponentOptions<Props=DefaultProps,PropDefs=PropsDefinition<Props>>{name?:stringprops?:PropDefsmodel?:{prop?:stringevent?:string}inject?:InjectOptionsfunctional:booleanrender?(this:undefined,createElement:CreateElement,context:RenderContext<Props>):VNode|VNode[]}exportinterfaceRenderContext<Props=DefaultProps>{props:Propschildren:VNode[]slots():anydata:VNodeDataparent:Vuelisteners:{[key:string]:Function|Function[]}scopedSlots:{[key:string]:NormalizedScopedSlot}injections:any}exporttypeProp<T>=|{():T}|{new(...args:never[]):T&object}|{new(...args:string[]):Function}exporttypePropType<T>=Prop<T>|Prop<T>[]exporttypePropValidator<T>=PropOptions<T>|PropType<T>exportinterfacePropOptions<T=any>{type?:PropType<T>required?:booleandefault?:T|null|undefined|(()=>T|null|undefined)validator?(value:unknown):boolean}exporttypeRecordPropsDefinition<T>={[KinkeyofT]:PropValidator<T[K]>}exporttypeArrayPropsDefinition<T>=(keyofT)[]exporttypePropsDefinition<T>=|ArrayPropsDefinition<T>|RecordPropsDefinition<T>exportinterfaceComputedOptions<T>{get?():Tset?(value:T):voidcache?:boolean}exporttypeWatchHandler<T>=string|((val:T,oldVal:T)=>void)exportinterfaceWatchOptions{deep?:booleanimmediate?:boolean}exportinterfaceWatchOptionsWithHandler<T>extendsWatchOptions{handler:WatchHandler<T>}exportinterfaceDirectiveBindingextendsReadonly<VNodeDirective>{readonlymodifiers:{[key:string]:boolean}}/***@deprecateduse{@linkFunctionDirective}instead*/exporttypeDirectiveFunction=(el:HTMLElement,binding:DirectiveBinding,vnode:VNode,oldVnode:VNode)=>void/***@deprecateduse{@linkObjectDirective}instead*/exportinterfaceDirectiveOptions{bind?:DirectiveFunctioninserted?:DirectiveFunctionupdate?:DirectiveFunctioncomponentUpdated?:DirectiveFunctionunbind?:DirectiveFunction}exporttypeInjectKey=string|symbolexporttypeInjectOptions=|{[key:string]:InjectKey|{from?:InjectKey;default?:any}}|string[]