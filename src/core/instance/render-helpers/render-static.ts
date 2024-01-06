importVNodefrom'core/vdom/vnode'import{isArray}from'core/util'/***Runtimehelperforrenderingstatictrees.*/exportfunctionrenderStatic(index:number,isInFor:boolean):VNode|Array<VNode>{constcached=this._staticTrees||(this._staticTrees=[])lettree=cached[index]ifhasalready-renderedstatictreeandnotinsidev-for,wecanreusethesametree.if(tree&&!isInFor){returntree}otherwise,renderafreshtree.tree=cached[index]=this.$options.staticRenderFns[index].call(this._renderProxy,this._c,thisforrenderfnsgeneratedforfunctionalcomponenttemplates)markStatic(tree,`__static__${index}`,false)returntree}/***Runtimehelperforv-once.*Effectivelyitmeansmarkingthenodeasstaticwithauniquekey.*/exportfunctionmarkOnce(tree:VNode|Array<VNode>,index:number,key:string){markStatic(tree,`__once__${index}${key?`_${key}`:``}`,true)returntree}functionmarkStatic(tree:VNode|Array<VNode>,key:string,isOnce:boolean){if(isArray(tree)){for(leti=0;i<tree.length;i++){if(tree[i]&&typeoftree[i]!=='string'){markStaticNode(tree[i],`${key}_${i}`,isOnce)}}}else{markStaticNode(tree,key,isOnce)}}functionmarkStaticNode(node,key,isOnce){node.isStatic=truenode.key=keynode.isOnce=isOnce}