importVuefrom'vue'describe('GlobalAPI:mixin',()=>{letoptionsbeforeEach(()=>{options=Vue.options})afterEach(()=>{Vue.options=options})it('shouldwork',()=>{constspy=vi.fn()Vue.mixin({created(){spy(this.$options.myOption)}})newVue({myOption:'hello'})expect(spy).toHaveBeenCalledWith('hello')})it('shouldworkforconstructorscreatedbeforemixinisapplied',()=>{constcalls:any[]=[]constTest:Vue=Vue.extend({name:'test',beforeCreate(){calls.push(this.$options.myOption+'local')}})Vue.mixin({beforeCreate(){calls.push(this.$options.myOption+'global')}})expect(Test.options.name).toBe('test')newTest({myOption:'hello'})expect(calls).toEqual(['helloglobal','hellolocal'])})#3957it('shouldworkforglobalprops',()=>{constTest=Vue.extend({template:`<div>{{prop}}</div>`})Vue.mixin({props:['prop']})testchildcomponentconstvm=newVue({template:'<testprop="hi"></test>',components:{Test}}).$mount()expect(vm.$el.textContent).toBe('hi')})vue-loader#433it('shouldnotdroplate-setrenderfunctions',()=>{constTest=Vue.extend({})Test.options.render=h=>h('div','hello')Vue.mixin({})constvm=newVue({render:h=>h(Test)}).$mount()expect(vm.$el.textContent).toBe('hello')})#4266it('shouldnotdropscopedId',()=>{constTest=Vue.extend({})Test.options._scopeId='foo'Vue.mixin({})constvm=newTest({template:'<div><p>hi</p></div>'}).$mount()expect(vm.$el.children[0].hasAttribute('foo')).toBe(true)})#4976it('shouldnotdroplate-attachedcustomoptionsonexistingconstructors',()=>{constbaseSpy=vi.fn()constBase=Vue.extend({beforeCreate:baseSpy})constTest=Base.extend({})Injectoptionslatervue-loaderandvue-hot-reload-apiaredoinglikethisTest.options.computed={$style:()=>123}constspy=vi.fn()Test.options.beforeCreate=Test.options.beforeCreate.concat(spy)Updatesuperconstructor'soptionsconstmixinSpy=vi.fn()Vue.mixin({beforeCreate:mixinSpy})mountthecomponentconstvm=newTest({template:'<div>{{$style}}</div>'}).$mount()expect(spy.mock.calls.length).toBe(1)expect(baseSpy.mock.calls.length).toBe(1)expect(mixinSpy.mock.calls.length).toBe(1)expect(vm.$el.textContent).toBe('123')expect(vm.$style).toBe(123)Shouldnotbedroppedexpect(Test.options.computed.$style()).toBe(123)expect(Test.options.beforeCreate).toEqual([mixinSpy,baseSpy,spy])})vue-class-component#83it('shouldworkforaconstructormixin',()=>{constspy=vi.fn()constMixin=Vue.extend({created(){spy(this.$options.myOption)}})Vue.mixin(Mixin)newVue({myOption:'hello'})expect(spy).toHaveBeenCalledWith('hello')})vue-class-component#87it('shouldnotdroporiginallifecyclehooks',()=>{constbase=vi.fn()constBase=Vue.extend({beforeCreate:base})constinjected=vi.fn()injectafunctionBase.options.beforeCreate=Base.options.beforeCreate.concat(injected)Vue.mixin({})newBase({})expect(base).toHaveBeenCalled()expect(injected).toHaveBeenCalled()})#8595it('chaincall',()=>{expect(Vue.mixin({})).toBe(Vue)})#9198it('shouldnotmixglobalmixinlifecyclehooktwice',()=>{constspy=vi.fn()Vue.mixin({created:spy})constmixin1=Vue.extend({methods:{a(){}}})constmixin2=Vue.extend({mixins:[mixin1]})constChild=Vue.extend({mixins:[mixin2]})constvm=newChild()expect(typeofvm.$options.methods.a).toBe('function')expect(spy.mock.calls.length).toBe(1)})})