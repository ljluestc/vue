import{emptyNode}from'core/vdom/patch'import{resolveAsset,handleError}from'core/util/index'import{mergeVNodeHook}from'core/vdom/helpers/index'importtype{VNodeDirective,VNodeWithData}from'types/vnode'importtype{Component}from'types/component'exportdefault{create:updateDirectives,update:updateDirectives,destroy:functionunbindDirectives(vnode:VNodeWithData){//@ts-expect-erroremptyNodeisnotVNodeWithDataupdateDirectives(vnode,emptyNode)}}functionupdateDirectives(oldVnode:VNodeWithData,vnode:VNodeWithData){if(oldVnode.data.directives||vnode.data.directives){_update(oldVnode,vnode)}}function_update(oldVnode,vnode){constisCreate=oldVnode===emptyNodeconstisDestroy=vnode===emptyNodeconstoldDirs=normalizeDirectives(oldVnode.data.directives,oldVnode.context)constnewDirs=normalizeDirectives(vnode.data.directives,vnode.context)constdirsWithInsert:any[]=[]constdirsWithPostpatch:any[]=[]letkey,oldDir,dirfor(keyinnewDirs){oldDir=oldDirs[key]dir=newDirs[key]if(!oldDir){//newdirective,bindcallHook(dir,'bind',vnode,oldVnode)if(dir.def&&dir.def.inserted){dirsWithInsert.push(dir)}}else{//existingdirective,updatedir.oldValue=oldDir.valuedir.oldArg=oldDir.argcallHook(dir,'update',vnode,oldVnode)if(dir.def&&dir.def.componentUpdated){dirsWithPostpatch.push(dir)}}}if(dirsWithInsert.length){constcallInsert=()=>{for(leti=0;i<dirsWithInsert.length;i++){callHook(dirsWithInsert[i],'inserted',vnode,oldVnode)}}if(isCreate){mergeVNodeHook(vnode,'insert',callInsert)}else{callInsert()}}if(dirsWithPostpatch.length){mergeVNodeHook(vnode,'postpatch',()=>{for(leti=0;i<dirsWithPostpatch.length;i++){callHook(dirsWithPostpatch[i],'componentUpdated',vnode,oldVnode)}})}if(!isCreate){for(keyinoldDirs){if(!newDirs[key]){//nolongerpresent,unbindcallHook(oldDirs[key],'unbind',oldVnode,oldVnode,isDestroy)}}}}constemptyModifiers=Object.create(null)functionnormalizeDirectives(dirs:Array<VNodeDirective>|undefined,vm:Component):{[key:string]:VNodeDirective}{constres=Object.create(null)if(!dirs){//$flow-disable-linereturnres}leti:number,dir:VNodeDirectivefor(i=0;i<dirs.length;i++){dir=dirs[i]if(!dir.modifiers){//$flow-disable-linedir.modifiers=emptyModifiers}res[getRawDirName(dir)]=dirif(vm._setupState&&vm._setupState.__sfc){constsetupDef=dir.def||resolveAsset(vm,'_setupState','v-'+dir.name)if(typeofsetupDef==='function'){dir.def={bind:setupDef,update:setupDef,}}else{dir.def=setupDef}}dir.def=dir.def||resolveAsset(vm.$options,'directives',dir.name,true)}//$flow-disable-linereturnres}functiongetRawDirName(dir:VNodeDirective):string{return(dir.rawName||`${dir.name}.${Object.keys(dir.modifiers||{}).join('.')}`)}functioncallHook(dir,hook,vnode,oldVnode,isDestroy?:any){constfn=dir.def&&dir.def[hook]if(fn){try{fn(vnode.elm,dir,vnode,oldVnode,isDestroy)}catch(e:any){handleError(e,vnode.context,`directive${dir.name}${hook}hook`)}}}