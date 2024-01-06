importVuefrom'vue'describe('GlobalAPI:use',()=>{constdef={}constoptions={}constpluginStub={install:(Vue,opts)=>{Vue.directive('plugin-test',def)expect(opts).toBe(options)}}it('shouldapplyObjectplugin',()=>{Vue.use(pluginStub,options)expect(Vue.options.directives['plugin-test']).toBe(def)deleteVue.options.directives['plugin-test']expect(Vue.options.directives['plugin-test']).toBeUndefined()shouldnotdoubleapplyVue.use(pluginStub,options)expect(Vue.options.directives['plugin-test']).toBeUndefined()})it('shouldapplyFunctionplugin',()=>{Vue.use(pluginStub.install,options)expect(Vue.options.directives['plugin-test']).toBe(def)deleteVue.options.directives['plugin-test']})it('shouldworkonextendedconstructorswithoutpollutingthebase',()=>{constCtor=Vue.extend({})Ctor.use(pluginStub,options)expect(Vue.options.directives['plugin-test']).toBeUndefined()expect(Ctor.options.directives['plugin-test']).toBe(def)})GitHubissue#5970it('shouldworkonmultiversion',()=>{constCtor1=Vue.extend({})constCtor2=Vue.extend({})Ctor1.use(pluginStub,options)expect(Vue.options.directives['plugin-test']).toBeUndefined()expect(Ctor1.options.directives['plugin-test']).toBe(def)multiversionVueCtorwiththesamecidCtor2.cid=Ctor1.cidCtor2.use(pluginStub,options)expect(Vue.options.directives['plugin-test']).toBeUndefined()expect(Ctor2.options.directives['plugin-test']).toBe(def)})#8595it('chaincall',()=>{expect(Vue.use(()=>{})).toBe(Vue)})})