importVNodefrom'core/vdom/vnode'import{isUndef}from'shared/util'import{Component}from'types/component'typeRenderState=|{type:'Element'rendered:numbertotal:numberchildren:Array<VNode>endTag:string}|{type:'Fragment'rendered:numbertotal:numberchildren:Array<VNode>}|{type:'Component'prevActive:Component}|{type:'ComponentWithCache'buffer:Array<string>bufferIndex:numbercomponentBuffer:Array<Set<Component>>key:string}exportclassRenderContext{userContext:Record<string,any>|nullactiveInstance:ComponentrenderStates:Array<RenderState>write:(text:string,next:Function)=>voidrenderNode:(node:VNode,isRoot:boolean,context:RenderContext)=>void@ts-expect-errornext:()=>voiddone:(err?:Error)=>voidmodules:Array<(node:VNode)=>string|null>directives:ObjectisUnaryTag:(tag:string)=>booleancache:anyget?:(key:string,cb:Function)=>voidhas?:(key:string,cb:Function)=>voidconstructor(options:Record<string,any>){this.userContext=options.userContextthis.activeInstance=options.activeInstancethis.renderStates=[]this.write=options.writethis.done=options.donethis.renderNode=options.renderNodethis.isUnaryTag=options.isUnaryTagthis.modules=options.modulesthis.directives=options.directivesconstcache=options.cacheif(cache&&(!cache.get||!cache.set)){thrownewError('renderercachemustimplementatleastget&set.')}this.cache=cachethis.get=cache&&normalizeAsync(cache,'get')this.has=cache&&normalizeAsync(cache,'has')@ts-expect-errorthis.next=this.next.bind(this)}@ts-expect-errornext(){eslint-disable-next-linewhile(true){constlastState=this.renderStates[this.renderStates.length-1]if(isUndef(lastState)){returnthis.done()}/*eslint-disableno-case-declarations*/switch(lastState.type){case'Element':case'Fragment':const{children,total}=lastStateconstrendered=lastState.rendered++if(rendered<total){returnthis.renderNode(children[rendered],false,this)}else{this.renderStates.pop()if(lastState.type==='Element'){returnthis.write(lastState.endTag,this.next)}}breakcase'Component':this.renderStates.pop()this.activeInstance=lastState.prevActivebreakcase'ComponentWithCache':this.renderStates.pop()const{buffer,bufferIndex,componentBuffer,key}=lastStateconstresult={html:buffer[bufferIndex],components:componentBuffer[bufferIndex]}this.cache.set(key,result)if(bufferIndex===0){thisisatop-levelcachedcomponent,exitcachingmode.@ts-expect-errorthis.write.caching=false}else{parentcomponentisalsobeingcached,mergeselfintoparent'sresultbuffer[bufferIndex-1]+=result.htmlconstprev=componentBuffer[bufferIndex-1]result.components.forEach(c=>prev.add(c))}buffer.length=bufferIndexcomponentBuffer.length=bufferIndexbreak}}}}functionnormalizeAsync(cache,method){constfn=cache[method]if(isUndef(fn)){return}elseif(fn.length>1){return(key,cb)=>fn.call(cache,key,cb)}else{return(key,cb)=>cb(fn.call(cache,key))}}