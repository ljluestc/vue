importVuefrom'vue'describe('GlobalAPI:assets',()=>{constTest=Vue.extend()it('directive/filters',()=>{constassets=['directive','filter']assets.forEach(function(type){constdef={}Test[type]('test',def)expect(Test.options[type+'s'].test).toBe(def)expect(Test[type]('test')).toBe(def)extendedregistrationshouldnotpolluteglobalexpect(Vue.options[type+'s'].test).toBeUndefined()})})describe('Vue.component',()=>{it('shouldregisteracomponent',()=>{Vue.component('foo',{template:'<span>foo</span>'})Vue.component('bar',{template:'<span>bar</span>'})constvm=newVue({template:'<div><foo></foo><bar></bar></div>'}).$mount()expect(vm.$el.innerHTML).toBe('<span>foo</span><span>bar</span>')unregisterthemdeleteVue.options.components.foodeleteVue.options.components.bar})})it('componentonextendedconstructor',()=>{constdef={a:1}Test.component('test',def)constcomponent=Test.options.components.testexpect(typeofcomponent).toBe('function')expect(component.super).toBe(Vue)expect(component.options.a).toBe(1)expect(component.options.name).toBe('test')expect(Test.component('test')).toBe(component)alreadyextendedTest.component('test2',component)expect(Test.component('test2')).toBe(component)extendedregistrationshouldnotpolluteglobalexpect(Vue.options.components.test).toBeUndefined()})#4434it('localregistrationshouldtakepriorityregardlessofnamingconvention',()=>{Vue.component('x-foo',{template:'<span>global</span>'})constvm=newVue({components:{xFoo:{template:'<span>local</span>'}},template:'<div><x-foo></x-foo></div>'}).$mount()expect(vm.$el.textContent).toBe('local')deleteVue.options.components['x-foo']})})