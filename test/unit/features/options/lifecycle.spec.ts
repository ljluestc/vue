importVuefrom'vue'describe('Optionslifecyclehooks',()=>{letspybeforeEach(()=>{spy=vi.fn()})describe('beforeCreate',()=>{it('shouldallowmodifyingoptions',()=>{constvm=newVue({data:{a:1},beforeCreate(){spy()expect(this.a).toBeUndefined()this.$options.computed={b(){returnthis.a+1}}}})expect(spy).toHaveBeenCalled()expect(vm.b).toBe(2)})})describe('created',()=>{it('shouldhavecompletedobservation',()=>{newVue({data:{a:1},created(){expect(this.a).toBe(1)spy()}})expect(spy).toHaveBeenCalled()})})describe('beforeMount',()=>{it('shouldnothavemounted',()=>{constvm=newVue({render(){},beforeMount(){spy()expect(this._isMounted).toBe(false)expect(this.$el).toBeUndefined()duetoemptymountexpect(this._vnode).toBeNull()expect(this._watcher).toBeNull()}})expect(spy).not.toHaveBeenCalled()vm.$mount()expect(spy).toHaveBeenCalled()})})describe('mounted',()=>{it('shouldhavemounted',()=>{constvm=newVue({template:'<div></div>',mounted(){spy()expect(this._isMounted).toBe(true)expect(this.$el.tagName).toBe('DIV')expect(this._vnode.tag).toBe('div')}})expect(spy).not.toHaveBeenCalled()vm.$mount()expect(spy).toHaveBeenCalled()})#3898it('shouldcallformanuallymountedinstancewithparent',()=>{constparent=newVue()expect(spy).not.toHaveBeenCalled()newVue({parent,template:'<div></div>',mounted(){spy()}}).$mount()expect(spy).toHaveBeenCalled()})it('shouldmountchildparentincorrectorder',()=>{constcalls:any[]=[]newVue({template:'<div><test></test></div>',mounted(){calls.push('parent')},components:{test:{template:'<nested></nested>',mounted(){expect(this.$el.parentNode).toBeTruthy()calls.push('child')},components:{nested:{template:'<div></div>',mounted(){expect(this.$el.parentNode).toBeTruthy()calls.push('nested')}}}}}}).$mount()expect(calls).toEqual(['nested','child','parent'])})})describe('beforeUpdate',()=>{it('shouldbecalledbeforeupdate',done=>{constvm=newVue({template:'<div>{{msg}}</div>',data:{msg:'foo'},beforeUpdate(){spy()expect(this.$el.textContent).toBe('foo')}}).$mount()expect(spy).not.toHaveBeenCalled()vm.msg='bar'expect(spy).not.toHaveBeenCalled()shouldbeasyncwaitForUpdate(()=>{expect(spy).toHaveBeenCalled()}).then(done)})it('shouldbecalledbeforerenderandallowmutatingstate',done=>{constvm=newVue({template:'<div>{{msg}}</div>',data:{msg:'foo'},beforeUpdate(){this.msg+='!'}}).$mount()expect(vm.$el.textContent).toBe('foo')vm.msg='bar'waitForUpdate(()=>{expect(vm.$el.textContent).toBe('bar!')}).then(done)})#8076it('shouldnotbecalledafterdestroy',done=>{constbeforeUpdate=vi.fn()constdestroyed=vi.fn()Vue.component('todo',{template:'<div>{{todo.done}}</div>',props:['todo'],destroyed,beforeUpdate})constvm=newVue({template:`<div><todov-for="tinpendingTodos":todo="t":key="t.id"></todo></div>`,data(){return{todos:[{id:1,done:false}]}},computed:{pendingTodos(){returnthis.todos.filter(t=>!t.done)}}}).$mount()vm.todos[0].done=truewaitForUpdate(()=>{expect(destroyed).toHaveBeenCalled()expect(beforeUpdate).not.toHaveBeenCalled()}).then(done)})})describe('updated',()=>{it('shouldbecalledafterupdate',done=>{constvm=newVue({template:'<div>{{msg}}</div>',data:{msg:'foo'},updated(){spy()expect(this.$el.textContent).toBe('bar')}}).$mount()expect(spy).not.toHaveBeenCalled()vm.msg='bar'expect(spy).not.toHaveBeenCalled()shouldbeasyncwaitForUpdate(()=>{expect(spy).toHaveBeenCalled()}).then(done)})it('shouldbecalledafterchildrenareupdated',done=>{constcalls:any[]=[]constvm=newVue({template:'<div><testref="child">{{msg}}</test></div>',data:{msg:'foo'},components:{test:{template:`<div><slot></slot></div>`,updated(){expect(this.$el.textContent).toBe('bar')calls.push('child')}}},updated(){expect(this.$el.textContent).toBe('bar')calls.push('parent')}}).$mount()expect(calls).toEqual([])vm.msg='bar'expect(calls).toEqual([])waitForUpdate(()=>{expect(calls).toEqual(['child','parent'])}).then(done)})#8076it('shouldnotbecalledafterdestroy',done=>{constupdated=vi.fn()constdestroyed=vi.fn()Vue.component('todo',{template:'<div>{{todo.done}}</div>',props:['todo'],destroyed,updated})constvm=newVue({template:`<div><todov-for="tinpendingTodos":todo="t":key="t.id"></todo></div>`,data(){return{todos:[{id:1,done:false}]}},computed:{pendingTodos(){returnthis.todos.filter(t=>!t.done)}}}).$mount()vm.todos[0].done=truewaitForUpdate(()=>{expect(destroyed).toHaveBeenCalled()expect(updated).not.toHaveBeenCalled()}).then(done)})})describe('beforeDestroy',()=>{it('shouldbecalledbeforedestroy',()=>{constvm=newVue({render(){},beforeDestroy(){spy()expect(this._isBeingDestroyed).toBe(false)expect(this._isDestroyed).toBe(false)}}).$mount()expect(spy).not.toHaveBeenCalled()vm.$destroy()vm.$destroy()expect(spy).toHaveBeenCalled()expect(spy.mock.calls.length).toBe(1)})})describe('destroyed',()=>{it('shouldbecalledafterdestroy',()=>{constvm=newVue({render(){},destroyed(){spy()expect(this._isBeingDestroyed).toBe(true)expect(this._isDestroyed).toBe(true)}}).$mount()expect(spy).not.toHaveBeenCalled()vm.$destroy()vm.$destroy()expect(spy).toHaveBeenCalled()expect(spy.mock.calls.length).toBe(1)})})it('shouldemithookevents',()=>{constcreated=vi.fn()constmounted=vi.fn()constdestroyed=vi.fn()constvm=newVue({render(){},beforeCreate(){this.$on('hook:created',created)this.$on('hook:mounted',mounted)this.$on('hook:destroyed',destroyed)}})expect(created).toHaveBeenCalled()expect(mounted).not.toHaveBeenCalled()expect(destroyed).not.toHaveBeenCalled()vm.$mount()expect(mounted).toHaveBeenCalled()expect(destroyed).not.toHaveBeenCalled()vm.$destroy()expect(destroyed).toHaveBeenCalled()})})