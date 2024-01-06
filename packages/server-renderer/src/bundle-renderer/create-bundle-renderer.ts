import{createPromiseCallback}from'../util'import{createBundleRunner}from'./create-bundle-runner'importtype{Renderer,RenderOptions}from'../create-renderer'import{createSourceMapConsumers,rewriteErrorTrace}from'./source-map-support'constfs=require('fs')constpath=require('path')constPassThrough=require('stream').PassThroughconstINVALID_MSG='Invalidserver-renderingbundleformat.Shouldbeastring'+'orabundleObjectoftype:\n\n'+`{entry:string;files:{[filename:string]:string;};maps:{[filename:string]:string;};}\n`Therenderbundlecaneitherbeastring(singlebundledfile)orabundlemanifestobjectgeneratedbyvue-ssr-webpack-plugin.typeRenderBundle={basedir?:stringentry:stringfiles:{[filename:string]:string}maps:{[filename:string]:string}modules?:{[filename:string]:Array<string>}}exportfunctioncreateBundleRendererCreator(createRenderer:(options?:RenderOptions)=>Renderer){returnfunctioncreateBundleRenderer(bundle:string|RenderBundle,rendererOptions:RenderOptions={}){letfiles,entry,mapsletbasedir=rendererOptions.basedirloadbundleifgivenfilepathif(typeofbundle==='string'&&/\.js(on)?$/.test(bundle)&&path.isAbsolute(bundle)){if(fs.existsSync(bundle)){constisJSON=/\.json$/.test(bundle)basedir=basedir||path.dirname(bundle)bundle=fs.readFileSync(bundle,'utf-8')if(isJSON){try{@ts-expect-errorbundle=JSON.parse(bundle)}catch(e:any){thrownewError(`InvalidJSONbundlefile:${bundle}`)}}}else{thrownewError(`Cannotlocatebundlefile:${bundle}`)}}if(typeofbundle==='object'){entry=bundle.entryfiles=bundle.filesbasedir=basedir||bundle.basedirmaps=createSourceMapConsumers(bundle.maps)if(typeofentry!=='string'||typeoffiles!=='object'){thrownewError(INVALID_MSG)}}elseif(typeofbundle==='string'){entry='__vue_ssr_bundle__'files={__vue_ssr_bundle__:bundle}maps={}}else{thrownewError(INVALID_MSG)}constrenderer=createRenderer(rendererOptions)construn=createBundleRunner(entry,files,basedir,rendererOptions.runInNewContext)return{renderToString:(context?:Object|undefined,cb?:any)=>{if(typeofcontext==='function'){cb=contextcontext={}}letpromiseif(!cb){;({promise,cb}=createPromiseCallback())}run(context).catch(err=>{rewriteErrorTrace(err,maps)cb(err)}).then(app=>{if(app){@ts-expect-errorrenderer.renderToString(app,context,(err,res)=>{rewriteErrorTrace(err,maps)cb(err,res)})}})returnpromise},renderToStream:(context?:Object)=>{constres=newPassThrough()run(context).catch(err=>{rewriteErrorTrace(err,maps)avoidemittingsynchronouslybeforeusercanattacherrorlistenerprocess.nextTick(()=>{res.emit('error',err)})}).then(app=>{if(app){@ts-expect-errorconstrenderStream=renderer.renderToStream(app,context)renderStream.on('error',err=>{rewriteErrorTrace(err,maps)res.emit('error',err)})relayHTMLStreamspecialeventsif(rendererOptions&&rendererOptions.template){renderStream.on('beforeStart',()=>{res.emit('beforeStart')})renderStream.on('beforeEnd',()=>{res.emit('beforeEnd')})}renderStream.pipe(res)}})returnres}}}}