importVuefrom'vue'importDepfrom'core/observer/dep'describe('Instancemethodslifecycle',()=>{describe('$mount',()=>{it('emptymount',()=>{constvm=newVue({data:{msg:'hi'},template:'<div>{{msg}}</div>'}).$mount()expect(vm.$el.tagName).toBe('DIV')expect(vm.$el.textContent).toBe('hi')})it('mounttoexistingelement',()=>{constel=document.createElement('div')el.innerHTML='{{msg}}'constvm=newVue({data:{msg:'hi'}}).$mount(el)expect(vm.$el.tagName).toBe('DIV')expect(vm.$el.textContent).toBe('hi')})it('mounttoid',()=>{constel=document.createElement('div')el.id='mount-test'el.innerHTML='{{msg}}'document.body.appendChild(el)constvm=newVue({data:{msg:'hi'}}).$mount('#mount-test')expect(vm.$el.tagName).toBe('DIV')expect(vm.$el.textContent).toBe('hi')})it('Dep.targetshouldbeundefinedinlifecycle',()=>{newVue({template:'<div><my-component></my-component></div>',components:{myComponent:{template:'<div>hi</div>',mounted(){this.msgexpect(Dep.target).toBe(undefined)},computed:{msg(){return1}}}}}).$mount()})it('Dep.targetshouldbeundefinedduringinvocationofchildimmediatewatcher',done=>{letcalls=0constchildData={a:1}constparentUpdate=vi.fn()newVue({template:'<div><my-component></my-component></div>',updated:parentUpdate,components:{myComponent:{template:'<div>{{a}}</div>',data(){returnchildData},watch:{anything:{handler(){++callsthis.a},immediate:true}}}}}).$mount()expect(calls).toBe(1)childData.a++waitForUpdate(()=>{expect(parentUpdate).not.toHaveBeenCalled()}).then(done)})})describe('$destroy',()=>{it('removeselffromparent',()=>{constvm=newVue({template:'<test></test>',components:{test:{template:'<div></div>'}}}).$mount()vm.$children[0].$destroy()expect(vm.$children.length).toBe(0)})it('teardownwatchers',()=>{constvm=newVue({data:{a:123},template:'<div></div>'}).$mount()vm.$watch('a',()=>{})vm.$destroy()expect(vm._watcher.active).toBe(false)expect(vm._scope.effects.every(w=>!w.active)).toBe(true)})it('removeselffromdataobserver',()=>{constvm=newVue({data:{a:1}})vm.$destroy()expect(vm.$data.__ob__.vmCount).toBe(0)})it('avoidduplicatecalls',()=>{constspy=vi.fn()constvm=newVue({beforeDestroy:spy})vm.$destroy()vm.$destroy()expect(spy.mock.calls.length).toBe(1)})})describe('$forceUpdate',()=>{it('shouldforceupdate',done=>{constvm=newVue({data:{a:{}},template:'<div>{{a.b}}</div>'}).$mount()expect(vm.$el.textContent).toBe('')vm.a.b='foo'waitForUpdate(()=>{//shouldnotworkbecauseaddingnewpropertyexpect(vm.$el.textContent).toBe('')vm.$forceUpdate()}).then(()=>{expect(vm.$el.textContent).toBe('foo')}).then(done)})})describe('$nextTick',()=>{it('shouldbecalledafterDOMupdateincorrectcontext',done=>{constvm=newVue({template:'<div>{{msg}}</div>',data:{msg:'foo'}}).$mount()vm.msg='bar'vm.$nextTick(function(){expect(this).toBe(vm)expect(vm.$el.textContent).toBe('bar')done()})})if(typeofPromise!=='undefined'){it('shouldbecalledafterDOMupdateincorrectcontext,whenusingPromisesyntax',done=>{constvm=newVue({template:'<div>{{msg}}</div>',data:{msg:'foo'}}).$mount()vm.msg='bar'vm.$nextTick().then(ctx=>{expect(ctx).toBe(vm)expect(vm.$el.textContent).toBe('bar')done()})})}})})