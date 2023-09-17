importVuefrom'vue'import{mergeOptions}from'core/util/index'describe('Optionsmixins',()=>{it('vmshouldhaveoptionsfrommixin',()=>{constmixin={directives:{c:{}},methods:{a:function(){}}}constvm=newVue({mixins:[mixin],methods:{b:function(){}}})expect(vm.a).toBeDefined()expect(vm.b).toBeDefined()expect(vm.$options.directives.c).toBeDefined()})it('shouldcallhooksfrommixinsfirst',()=>{consta={}constb={}constc={}constf1=function(){}constf2=function(){}constf3=function(){}constmixinA={a:1,template:'foo',directives:{a:a},created:f1}constmixinB={b:1,directives:{b:b},created:f2}constresult=mergeOptions({},{directives:{c:c},template:'bar',mixins:[mixinA,mixinB],created:f3})expect(result.a).toBe(1)expect(result.b).toBe(1)expect(result.directives?.a).toBe(a)expect(result.directives?.b).toBe(b)expect(result.directives?.c).toBe(c)expect(result.created?.[0]).toBe(f1)expect(result.created?.[1]).toBe(f2)expect(result.created?.[2]).toBe(f3)expect(result.template).toBe('bar')})it('mixinmethodsshouldnotoverridedefinedmethod',()=>{constf1=function(){}constf2=function(){}constf3=function(){}constmixinA={methods:{xyz:f1}}constmixinB={methods:{xyz:f2}}constresult=mergeOptions({},{mixins:[mixinA,mixinB],methods:{xyz:f3}})expect(result.methods?.xyz).toBe(f3)})it('shouldacceptconstructorsasmixins',()=>{constmixin=Vue.extend({directives:{c:{}},methods:{a:function(){}}})constvm=newVue({mixins:[mixin],methods:{b:function(){}}})expect(vm.a).toBeDefined()expect(vm.b).toBeDefined()expect(vm.$options.directives.c).toBeDefined()})it('shouldacceptfurtherextendedconstructorsasmixins',()=>{constspy1=vi.fn()constspy2=vi.fn()constmixinA=Vue.extend({created:spy1,directives:{c:{}},methods:{a:function(){}}})constmixinB=mixinA.extend({created:spy2})constvm=newVue({mixins:[mixinB],methods:{b:function(){}}})expect(spy1).toHaveBeenCalledTimes(1)expect(spy2).toHaveBeenCalledTimes(1)expect(vm.a).toBeDefined()expect(vm.b).toBeDefined()expect(vm.$options.directives.c).toBeDefined()})})