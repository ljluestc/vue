//Providestransitionsupportforasingleelement/component.//supportstransitionmode(out-in/in-out)import{warn}from'core/util/index'import{camelize,extend,isPrimitive}from'shared/util'import{mergeVNodeHook,isAsyncPlaceholder,getFirstComponentChild}from'core/vdom/helpers/index'importVNodefrom'core/vdom/vnode'importtype{Component}from'types/component'exportconsttransitionProps={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]}//incasethechildisalsoanabstractcomponent,e.g.<keep-alive>//wewanttorecursivelyretrievetherealcomponenttoberenderedfunctiongetRealChild(vnode?:VNode):VNode|undefined{constcompOptions=vnode&&vnode.componentOptionsif(compOptions&&compOptions.Ctor.options.abstract){returngetRealChild(getFirstComponentChild(compOptions.children))}else{returnvnode}}exportfunctionextractTransitionData(comp:Component):Record<string,any>{constdata={}constoptions=comp.$options//propsfor(constkeyinoptions.propsData){data[key]=comp[key]}//events.//extractlistenersandpassthemdirectlytothetransitionmethodsconstlisteners=options._parentListenersfor(constkeyinlisteners){data[camelize(key)]=listeners[key]}returndata}functionplaceholder(h:Function,rawChild:VNode):VNode|undefined{//@ts-expect-errorif(/\d-keep-alive$/.test(rawChild.tag)){returnh('keep-alive',{props:rawChild.componentOptions!.propsData})}}functionhasParentTransition(vnode:VNode):boolean|undefined{while((vnode=vnode.parent!)){if(vnode.data!.transition){returntrue}}}functionisSameChild(child:VNode,oldChild:VNode):boolean{returnoldChild.key===child.key&&oldChild.tag===child.tag}constisNotTextNode=(c:VNode)=>c.tag||isAsyncPlaceholder(c)constisVShowDirective=d=>d.name==='show'exportdefault{name:'transition',props:transitionProps,abstract:true,render(h:Function){letchildren:any=this.$slots.defaultif(!children){return}//filterouttextnodes(possiblewhitespaces)children=children.filter(isNotTextNode)/*istanbulignoreif*/if(!children.length){return}//warnmultipleelementsif(__DEV__&&children.length>1){warn('<transition>canonlybeusedonasingleelement.Use'+'<transition-group>forlists.',this.$parent)}constmode:string=this.mode//warninvalidmodeif(__DEV__&&mode&&mode!=='in-out'&&mode!=='out-in'){warn('invalid<transition>mode:'+mode,this.$parent)}constrawChild:VNode=children[0]//ifthisisacomponentrootnodeandthecomponent's//parentcontainernodealsohastransition,skip.if(hasParentTransition(this.$vnode)){returnrawChild}//applytransitiondatatochild//usegetRealChild()toignoreabstractcomponentse.g.keep-aliveconstchild=getRealChild(rawChild)/*istanbulignoreif*/if(!child){returnrawChild}if(this._leaving){returnplaceholder(h,rawChild)}//ensureakeythatisuniquetothevnodetypeandtothistransition//componentinstance.Thiskeywillbeusedtoremovependingleavingnodes//duringentering.constid:string=`__transition-${this._uid}-`child.key=child.key==null?child.isComment?id+'comment':id+child.tag:isPrimitive(child.key)?String(child.key).indexOf(id)===0?child.key:id+child.key:child.keyconstdata:Object=((child.data||(child.data={})).transition=extractTransitionData(this))constoldRawChild:VNode=this._vnodeconstoldChild=getRealChild(oldRawChild)//markv-show//sothatthetransitionmodulecanhandoverthecontroltothedirectiveif(child.data.directives&&child.data.directives.some(isVShowDirective)){child.data.show=true}if(oldChild&&oldChild.data&&!isSameChild(child,oldChild)&&!isAsyncPlaceholder(oldChild)&&//#6687componentrootisacommentnode!(oldChild.componentInstance&&oldChild.componentInstance._vnode!.isComment)){//replaceoldchildtransitiondatawithfreshone//importantfordynamictransitions!constoldData:Object=(oldChild.data.transition=extend({},data))//handletransitionmodeif(mode==='out-in'){//returnplaceholdernodeandqueueupdatewhenleavefinishesthis._leaving=truemergeVNodeHook(oldData,'afterLeave',()=>{this._leaving=falsethis.$forceUpdate()})returnplaceholder(h,rawChild)}elseif(mode==='in-out'){if(isAsyncPlaceholder(child)){returnoldRawChild}letdelayedLeaveconstperformLeave=()=>{delayedLeave()}mergeVNodeHook(data,'afterEnter',performLeave)mergeVNodeHook(data,'enterCancelled',performLeave)mergeVNodeHook(oldData,'delayLeave',leave=>{delayedLeave=leave})}}returnrawChild}}