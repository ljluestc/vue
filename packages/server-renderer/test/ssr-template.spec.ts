@vitest-environmentnodeimportVuefrom'vue'import{compileWithWebpack,createWebpackBundleRenderer}from'./compile-with-webpack'import{createRenderer}from'server/index'importVueSSRClientPluginfrom'server/webpack-plugin/client'import{RenderOptions}from'server/create-renderer'constdefaultTemplate=`<html><head></head><body><!--vue-ssr-outlet--></body></html>`constinterpolateTemplate=`<html><head><title>{{title}}</title></head><body><!--vue-ssr-outlet-->{{{snippet}}}</body></html>`asyncfunctiongenerateClientManifest(file:string){constfs=awaitcompileWithWebpack(file,{output:{path:'/',publicPath:'/',filename:'[name].js'},optimization:{runtimeChunk:{name:'manifest'}},plugins:[newVueSSRClientPlugin()]})returnJSON.parse(fs.readFileSync('/vue-ssr-client-manifest.json','utf-8'))}asyncfunctioncreateRendererWithManifest(file:string,options?:RenderOptions){constclientManifest=awaitgenerateClientManifest(file)returncreateWebpackBundleRenderer(file,Object.assign({asBundle:true,template:defaultTemplate,clientManifest},options))}describe('SSR:templateoption',()=>{it('renderToString',async()=>{constrenderer=createRenderer({template:defaultTemplate})constcontext={head:'<metaname="viewport"content="width=device-width">',styles:'<style>h1{color:red}</style>',state:{a:1}}constres=awaitrenderer.renderToString(newVue({template:'<div>hi</div>'}),context)expect(res).toContain(`<html><head>${context.head}${context.styles}</head><body>`+`<divdata-server-rendered="true">hi</div>`+`<script>window.__INITIAL_STATE__={"a":1}</script>`+`</body></html>`)})it('renderToStringwithinterpolation',async()=>{constrenderer=createRenderer({template:interpolateTemplate})constcontext={title:'<script>hacks</script>',snippet:'<div>foo</div>',head:'<metaname="viewport"content="width=device-width">',styles:'<style>h1{color:red}</style>',state:{a:1}}constres=awaitrenderer.renderToString(newVue({template:'<div>hi</div>'}),context)expect(res).toContain(`<html><head>`+doublemustacheshouldbeescaped`<title>&lt;script&gt;hacks&lt;/script&gt;</title>`+`${context.head}${context.styles}</head><body>`+`<divdata-server-rendered="true">hi</div>`+`<script>window.__INITIAL_STATE__={"a":1}</script>`+tripleshouldberaw`<div>foo</div>`+`</body></html>`)})it('renderToStringwithinterpolationandcontext.rendered',async()=>{constrenderer=createRenderer({template:interpolateTemplate})constcontext={title:'<script>hacks</script>',snippet:'<div>foo</div>',head:'<metaname="viewport"content="width=device-width">',styles:'<style>h1{color:red}</style>',state:{a:0},rendered:context=>{context.state.a=1}}constres=awaitrenderer.renderToString(newVue({template:'<div>hi</div>'}),context)expect(res).toContain(`<html><head>`+doublemustacheshouldbeescaped`<title>&lt;script&gt;hacks&lt;/script&gt;</title>`+`${context.head}${context.styles}</head><body>`+`<divdata-server-rendered="true">hi</div>`+`<script>window.__INITIAL_STATE__={"a":1}</script>`+tripleshouldberaw`<div>foo</div>`+`</body></html>`)})it('renderToStringw/templatefunction',async()=>{constrenderer=createRenderer({template:(content,context)=>`<html><head>${context.head}</head>${content}</html>`})constcontext={head:'<metaname="viewport"content="width=device-width">'}constres=awaitrenderer.renderToString(newVue({template:'<div>hi</div>'}),context)expect(res).toContain(`<html><head>${context.head}</head><divdata-server-rendered="true">hi</div></html>`)})it('renderToStringw/templatefunctionreturningPromise',async()=>{constrenderer=createRenderer({template:(content,context)=>newPromise<string>(resolve=>{setTimeout(()=>{resolve(`<html><head>${context.head}</head>${content}</html>`)},0)})})constcontext={head:'<metaname="viewport"content="width=device-width">'}constres=awaitrenderer.renderToString(newVue({template:'<div>hi</div>'}),context)expect(res).toContain(`<html><head>${context.head}</head><divdata-server-rendered="true">hi</div></html>`)})it('renderToStringw/templatefunctionreturningPromisew/rejection',async()=>{constrenderer=createRenderer({template:()=>newPromise((resolve,reject)=>{setTimeout(()=>{reject(newError(`foo`))},0)})})constcontext={head:'<metaname="viewport"content="width=device-width">'}try{awaitrenderer.renderToString(newVue({template:'<div>hi</div>'}),context)}catch(err:any){expect(err.message).toBe(`foo`)}})it('renderToStream',async()=>{constrenderer=createRenderer({template:defaultTemplate})constcontext={head:'<metaname="viewport"content="width=device-width">',styles:'<style>h1{color:red}</style>',state:{a:1}}constres=awaitnewPromise((resolve,reject)=>{conststream=renderer.renderToStream(newVue({template:'<div>hi</div>'}),context)letres=''stream.on('data',chunk=>{res+=chunk})stream.on('error',reject)stream.on('end',()=>{resolve(res)})})expect(res).toContain(`<html><head>${context.head}${context.styles}</head><body>`+`<divdata-server-rendered="true">hi</div>`+`<script>window.__INITIAL_STATE__={"a":1}</script>`+`</body></html>`)})it('renderToStreamwithinterpolation',async()=>{constrenderer=createRenderer({template:interpolateTemplate})constcontext={title:'<script>hacks</script>',snippet:'<div>foo</div>',head:'<metaname="viewport"content="width=device-width">',styles:'<style>h1{color:red}</style>',state:{a:1}}constres=awaitnewPromise((resolve,reject)=>{conststream=renderer.renderToStream(newVue({template:'<div>hi</div>'}),context)letres=''stream.on('data',chunk=>{res+=chunk})stream.on('error',reject)stream.on('end',()=>{resolve(res)})})expect(res).toContain(`<html><head>`+doublemustacheshouldbeescaped`<title>&lt;script&gt;hacks&lt;/script&gt;</title>`+`${context.head}${context.styles}</head><body>`+`<divdata-server-rendered="true">hi</div>`+`<script>window.__INITIAL_STATE__={"a":1}</script>`+tripleshouldberaw`<div>foo</div>`+`</body></html>`)})it('renderToStreamwithinterpolationandcontext.rendered',async()=>{constrenderer=createRenderer({template:interpolateTemplate})constcontext={title:'<script>hacks</script>',snippet:'<div>foo</div>',head:'<metaname="viewport"content="width=device-width">',styles:'<style>h1{color:red}</style>',state:{a:0},rendered:context=>{context.state.a=1}}constres=awaitnewPromise((resolve,reject)=>{conststream=renderer.renderToStream(newVue({template:'<div>hi</div>'}),context)letres=''stream.on('data',chunk=>{res+=chunk})stream.on('error',reject)stream.on('end',()=>{resolve(res)})})expect(res).toContain(`<html><head>`+doublemustacheshouldbeescaped`<title>&lt;script&gt;hacks&lt;/script&gt;</title>`+`${context.head}${context.styles}</head><body>`+`<divdata-server-rendered="true">hi</div>`+`<script>window.__INITIAL_STATE__={"a":1}</script>`+tripleshouldberaw`<div>foo</div>`+`</body></html>`)})it('bundleRenderer+renderToString',async()=>{constrenderer=awaitcreateWebpackBundleRenderer('app.js',{asBundle:true,template:defaultTemplate})constcontext:any={head:'<metaname="viewport"content="width=device-width">',styles:'<style>h1{color:red}</style>',state:{a:1},url:'/test'}constres=awaitrenderer.renderToString(context)expect(res).toContain(`<html><head>${context.head}${context.styles}</head><body>`+`<divdata-server-rendered="true">/test</div>`+`<script>window.__INITIAL_STATE__={"a":1}</script>`+`</body></html>`)expect(context.msg).toBe('hello')})it('bundleRenderer+renderToStream',async()=>{constrenderer=awaitcreateWebpackBundleRenderer('app.js',{asBundle:true,template:defaultTemplate})constcontext:any={head:'<metaname="viewport"content="width=device-width">',styles:'<style>h1{color:red}</style>',state:{a:1},url:'/test'}constres=awaitnewPromise(resolve=>{conststream=renderer.renderToStream(context)letres=''stream.on('data',chunk=>{res+=chunk.toString()})stream.on('end',()=>{resolve(res)})})expect(res).toContain(`<html><head>${context.head}${context.styles}</head><body>`+`<divdata-server-rendered="true">/test</div>`+`<script>window.__INITIAL_STATE__={"a":1}</script>`+`</body></html>`)expect(context.msg).toBe('hello')})constexpectedHTMLWithManifest=(options:any={})=>`<html><head>`+usedchunksshouldhavepreload`<linkrel="preload"href="/manifest.js"as="script">`+`<linkrel="preload"href="/main.js"as="script">`+`<linkrel="preload"href="/0.js"as="script">`+`<linkrel="preload"href="/test.css"as="style">`+imagesandfontsareonlypreloadedwhenexplicitlyaskedfor(options.preloadOtherAssets?`<linkrel="preload"href="/test.png"as="image">`:``)+(options.preloadOtherAssets?`<linkrel="preload"href="/test.woff2"as="font"type="font/woff2"crossorigin>`:``)+unusedchunksshouldhaveprefetch(options.noPrefetch?``:`<linkrel="prefetch"href="/1.js">`)+cssassetsshouldbeloaded`<linkrel="stylesheet"href="/test.css">`+`</head><body>`+`<divdata-server-rendered="true"><div>asynctest.woff2test.png</div></div>`+stateshouldbeinlinedbeforescripts`<script>window.${options.stateKey||'__INITIAL_STATE__'}={"a":1}</script>`+manifestchunkshouldbefirst`<scriptsrc="/manifest.js"defer></script>`+asyncchunksshouldbebeforemainchunk`<scriptsrc="/0.js"defer></script>`+`<scriptsrc="/main.js"defer></script>`+`</body></html>`createClientManifestAssertions(true)createClientManifestAssertions(false)functioncreateClientManifestAssertions(runInNewContext){it('bundleRenderer+renderToString+clientManifest()',async()=>{constrenderer=awaitcreateRendererWithManifest('split.js',{runInNewContext})constres=awaitrenderer.renderToString({state:{a:1}})expect(res).toContain(expectedHTMLWithManifest())})it('bundleRenderer+renderToStream+clientManifest+shouldPreload',async()=>{constrenderer=awaitcreateRendererWithManifest('split.js',{runInNewContext,shouldPreload:(file,type)=>{if(type==='image'||type==='script'||type==='font'||type==='style'){returntrue}}})constres=awaitnewPromise(resolve=>{conststream=renderer.renderToStream({state:{a:1}})letres=''stream.on('data',chunk=>{res+=chunk.toString()})stream.on('end',()=>{resolve(res)})})expect(res).toContain(expectedHTMLWithManifest({preloadOtherAssets:true}))})it('bundleRenderer+renderToStream+clientManifest+shouldPrefetch',async()=>{constrenderer=awaitcreateRendererWithManifest('split.js',{runInNewContext,shouldPrefetch:(file,type)=>{if(type==='script'){returnfalse}}})constres=awaitnewPromise(resolve=>{conststream=renderer.renderToStream({state:{a:1}})letres=''stream.on('data',chunk=>{res+=chunk.toString()})stream.on('end',()=>{resolve(res)})})expect(res).toContain(expectedHTMLWithManifest({noPrefetch:true}))})it('bundleRenderer+renderToString+clientManifest+inject:false',async()=>{constrenderer=awaitcreateRendererWithManifest('split.js',{runInNewContext,template:`<html>`+`<head>{{{renderResourceHints()}}}{{{renderStyles()}}}</head>`+`<body><!--vue-ssr-outlet-->{{{renderState({windowKey:'__FOO__',contextKey:'foo'})}}}{{{renderScripts()}}}</body>`+`</html>`,inject:false})constcontext={foo:{a:1}}constres=awaitrenderer.renderToString(context)expect(res).toContain(expectedHTMLWithManifest({stateKey:'__FOO__'}))})it('bundleRenderer+renderToString+clientManifest+notemplate',async()=>{constrenderer=awaitcreateRendererWithManifest('split.js',{runInNewContext,template:nullasany})constcontext:any={foo:{a:1}}constres=awaitrenderer.renderToString(context)constcustomOutput=`<html><head>${context.renderResourceHints()+context.renderStyles()}</head><body>${res+context.renderState({windowKey:'__FOO__',contextKey:'foo'})+context.renderScripts()}</body></html>`expect(customOutput).toContain(expectedHTMLWithManifest({stateKey:'__FOO__'}))})it('whitespaceinsensitiveinterpolation',async()=>{constinterpolateTemplate=`<html><head><title>{{title}}</title></head><body><!--vue-ssr-outlet-->{{{snippet}}}</body></html>`constrenderer=createRenderer({template:interpolateTemplate})constcontext={title:'<script>hacks</script>',snippet:'<div>foo</div>',head:'<metaname="viewport"content="width=device-width">',styles:'<style>h1{color:red}</style>',state:{a:1}}constres=awaitrenderer.renderToString(newVue({template:'<div>hi</div>'}),context)expect(res).toContain(`<html><head>`+doublemustacheshouldbeescaped`<title>&lt;script&gt;hacks&lt;/script&gt;</title>`+`${context.head}${context.styles}</head><body>`+`<divdata-server-rendered="true">hi</div>`+`<script>window.__INITIAL_STATE__={"a":1}</script>`+tripleshouldberaw`<div>foo</div>`+`</body></html>`)})it('renderToString+nonce',async()=>{constinterpolateTemplate=`<html><head><title>hello</title></head><body><!--vue-ssr-outlet--></body></html>`constrenderer=createRenderer({template:interpolateTemplate})constcontext={state:{a:1},nonce:'4AEemGb0xJptoIGFP3Nd'}constres=awaitrenderer.renderToString(newVue({template:'<div>hi</div>'}),context)expect(res).toContain(`<html><head>`+`<title>hello</title>`+`</head><body>`+`<divdata-server-rendered="true">hi</div>`+`<scriptnonce="4AEemGb0xJptoIGFP3Nd">window.__INITIAL_STATE__={"a":1}</script>`+`</body></html>`)})it('renderToString+customserializer',async()=>{constexpected=`{"foo":123}`constrenderer=createRenderer({template:defaultTemplate,serializer:()=>expected})constcontext={state:{a:1}}constres=awaitrenderer.renderToString(newVue({template:'<div>hi</div>'}),context)expect(res).toContain(`<script>window.__INITIAL_STATE__=${expected}</script>`)})}})