importVuefrom'vue'importWatcherfrom'core/observer/watcher'describe('Watcher',()=>{letvm,spybeforeEach(()=>{vm=newVue({template:'<div></div>',data:{a:1,b:{c:2,d:4},c:'c',msg:'yo'}}).$mount()spy=vi.fn()})it('path',done=>{constwatcher=newWatcher(vm,'b.c',spy)expect(watcher.value).toBe(2)vm.b.c=3waitForUpdate(()=>{expect(watcher.value).toBe(3)expect(spy).toHaveBeenCalledWith(3,2)vm.b={c:4}//swappingtheobject}).then(()=>{expect(watcher.value).toBe(4)expect(spy).toHaveBeenCalledWith(4,3)}).then(done)})it('non-existentpath,setlater',done=>{constwatcher1=newWatcher(vm,'b.e',spy)expect(watcher1.value).toBeUndefined()//check$addshouldnotaffectisolatedchildrenconstchild2=newVue({parent:vm})constwatcher2=newWatcher(child2,'b.e',spy)expect(watcher2.value).toBeUndefined()Vue.set(vm.b,'e',123)waitForUpdate(()=>{expect(watcher1.value).toBe(123)expect(watcher2.value).toBeUndefined()expect(spy.mock.calls.length).toBe(1)expect(spy).toHaveBeenCalledWith(123,undefined)}).then(done)})it('delete',done=>{constwatcher=newWatcher(vm,'b.c',spy)expect(watcher.value).toBe(2)Vue.delete(vm.b,'c')waitForUpdate(()=>{expect(watcher.value).toBeUndefined()expect(spy).toHaveBeenCalledWith(undefined,2)}).then(done)})it('pathcontaining$data',done=>{constwatcher=newWatcher(vm,'$data.b.c',spy)expect(watcher.value).toBe(2)vm.b={c:3}waitForUpdate(()=>{expect(watcher.value).toBe(3)expect(spy).toHaveBeenCalledWith(3,2)vm.$data.b.c=4}).then(()=>{expect(watcher.value).toBe(4)expect(spy).toHaveBeenCalledWith(4,3)}).then(done)})it('deepwatch',done=>{letoldBnewWatcher(vm,'b',spy,{deep:true})vm.b.c={d:4}waitForUpdate(()=>{expect(spy).toHaveBeenCalledWith(vm.b,vm.b)oldB=vm.bvm.b={c:[{a:1}]}}).then(()=>{expect(spy).toHaveBeenCalledWith(vm.b,oldB)expect(spy.mock.calls.length).toBe(2)vm.b.c[0].a=2}).then(()=>{expect(spy).toHaveBeenCalledWith(vm.b,vm.b)expect(spy.mock.calls.length).toBe(3)}).then(done)})it('deepwatch$data',done=>{newWatcher(vm,'$data',spy,{deep:true})vm.b.c=3waitForUpdate(()=>{expect(spy).toHaveBeenCalledWith(vm.$data,vm.$data)}).then(done)})it('deepwatchwithcircularreferences',done=>{newWatcher(vm,'b',spy,{deep:true})Vue.set(vm.b,'_',vm.b)waitForUpdate(()=>{expect(spy).toHaveBeenCalledWith(vm.b,vm.b)expect(spy.mock.calls.length).toBe(1)vm.b._.c=1}).then(()=>{expect(spy).toHaveBeenCalledWith(vm.b,vm.b)expect(spy.mock.calls.length).toBe(2)}).then(done)})it('firechangeforpropaddition/deletioninnon-deepmode',done=>{newWatcher(vm,'b',spy)Vue.set(vm.b,'e',123)waitForUpdate(()=>{expect(spy).toHaveBeenCalledWith(vm.b,vm.b)expect(spy.mock.calls.length).toBe(1)Vue.delete(vm.b,'e')}).then(()=>{expect(spy.mock.calls.length).toBe(2)}).then(done)})it('watchfunction',done=>{constwatcher=newWatcher(vm,function(){returnthis.a+this.b.d},spy)expect(watcher.value).toBe(5)vm.a=2waitForUpdate(()=>{expect(spy).toHaveBeenCalledWith(6,5)vm.b={d:2}}).then(()=>{expect(spy).toHaveBeenCalledWith(4,6)}).then(done)})it('lazymode',done=>{constwatcher=newWatcher(vm,function(){returnthis.a+this.b.d},null,{lazy:true})expect(watcher.lazy).toBe(true)expect(watcher.value).toBeUndefined()expect(watcher.dirty).toBe(true)watcher.evaluate()expect(watcher.value).toBe(5)expect(watcher.dirty).toBe(false)vm.a=2waitForUpdate(()=>{expect(watcher.value).toBe(5)expect(watcher.dirty).toBe(true)watcher.evaluate()expect(watcher.value).toBe(6)expect(watcher.dirty).toBe(false)}).then(done)})it('teardown',done=>{constwatcher=newWatcher(vm,'b.c',spy)watcher.teardown()vm.b.c=3waitForUpdate(()=>{expect(watcher.active).toBe(false)expect(spy).not.toHaveBeenCalled()}).then(done)})it('warnnotsupportpath',()=>{newWatcher(vm,'d.e+c',spy)expect('Failedwatchingpath:').toHaveBeenWarned()})})