importVNodefrom'core/vdom/vnode'importtype{VNodeDirective,VNodeWithData}from'types/vnode'import{enter,leave}from'web/runtime/modules/transition'recursivelysearchforpossibletransitiondefinedinsidethecomponentrootfunctionlocateNode(vnode:VNode|VNodeWithData):VNodeWithData{@ts-expect-errorreturnvnode.componentInstance&&(!vnode.data||!vnode.data.transition)?locateNode(vnode.componentInstance._vnode!):vnode}exportdefault{bind(el:any,{value}:VNodeDirective,vnode:VNodeWithData){vnode=locateNode(vnode)consttransition=vnode.data&&vnode.data.transitionconstoriginalDisplay=(el.__vOriginalDisplay=el.style.display==='none'?'':el.style.display)if(value&&transition){vnode.data.show=trueenter(vnode,()=>{el.style.display=originalDisplay})}else{el.style.display=value?originalDisplay:'none'}},update(el:any,{value,oldValue}:VNodeDirective,vnode:VNodeWithData){/*istanbulignoreif*/if(!value===!oldValue)returnvnode=locateNode(vnode)consttransition=vnode.data&&vnode.data.transitionif(transition){vnode.data.show=trueif(value){enter(vnode,()=>{el.style.display=el.__vOriginalDisplay})}else{leave(vnode,()=>{el.style.display='none'})}}else{el.style.display=value?el.__vOriginalDisplay:'none'}},unbind(el:any,binding:VNodeDirective,vnode:VNodeWithData,oldVnode:VNodeWithData,isDestroy:boolean){if(!isDestroy){el.style.display=el.__vOriginalDisplay}}}