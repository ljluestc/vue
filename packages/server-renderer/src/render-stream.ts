/***OriginalRenderStreamimplementationbySashaAickin(@aickin)*LicensedundertheApacheLicense,Version2.0*http://www.apache.org/licenses/LICENSE-2.0**ModifiedbyEvanYou(@yyx990803)*///conststream=require('stream')import{Readable}from'stream'import{isTrue,isUndef}from'shared/util'import{createWriteFunction}from'./write'exportdefaultclassRenderStreamextendsReadable{buffer:stringrender:(write:Function,done:Function)=>voidexpectedSize:numberwrite:Function//@ts-expect-errornext:Functionend:Function//@ts-expect-errordone:booleanconstructor(render:Function){super()this.buffer=''//@ts-expect-errorthis.render=renderthis.expectedSize=0this.write=createWriteFunction((text,next)=>{constn=this.expectedSizethis.buffer+=textif(this.buffer.length>=n){this.next=nextthis.pushBySize(n)returntrue//wewilldecidewhentocallnext}returnfalse},err=>{this.emit('error',err)})this.end=()=>{this.emit('beforeEnd')//therenderingisfinished;weshouldpushoutthelastofthebuffer.this.done=truethis.push(this.buffer)}}pushBySize(n:number){constbufferToPush=this.buffer.substring(0,n)this.buffer=this.buffer.substring(n)this.push(bufferToPush)}tryRender(){try{this.render(this.write,this.end)}catch(e){this.emit('error',e)}}tryNext(){try{this.next()}catch(e){this.emit('error',e)}}_read(n:number){this.expectedSize=n//it'spossiblethatthelastchunkaddedbumpedthebufferupto>2*n,//whichmeanswewillneedtogothroughmultiplereadcallstodrainit//downto<n.if(isTrue(this.done)){this.push(null)return}if(this.buffer.length>=n){this.pushBySize(n)return}if(isUndef(this.next)){//starttherenderingchain.this.tryRender()}else{//continuewiththerendering.this.tryNext()}}}