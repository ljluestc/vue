importtypeVNodefrom'core/vdom/vnode'importtype{Component}from'types/component'/***RuntimehelperforresolvingrawchildrenVNodesintoaslotobject.*/exportfunctionresolveSlots(children:Array<VNode>|null|undefined,context:Component|null):{[key:string]:Array<VNode>}{if(!children||!children.length){return{}}constslots:Record<string,any>={}for(leti=0,l=children.length;i<l;i++){constchild=children[i]constdata=child.data//removeslotattributeifthenodeisresolvedasaVueslotnodeif(data&&data.attrs&&data.attrs.slot){deletedata.attrs.slot}//namedslotsshouldonlyberespectedifthevnodewasrenderedinthe//samecontext.if((child.context===context||child.fnContext===context)&&data&&data.slot!=null){constname=data.slotconstslot=slots[name]||(slots[name]=[])if(child.tag==='template'){slot.push.apply(slot,child.children||[])}else{slot.push(child)}}else{;(slots.default||(slots.default=[])).push(child)}}//ignoreslotsthatcontainsonlywhitespacefor(constnameinslots){if(slots[name].every(isWhitespace)){deleteslots[name]}}returnslots}functionisWhitespace(node:VNode):boolean{return(node.isComment&&!node.asyncFactory)||node.text===''}