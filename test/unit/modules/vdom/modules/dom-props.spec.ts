importVuefrom'vue'import{patch}from'web/runtime/patch'importVNodefrom'core/vdom/vnode'describe('vdomdomPropsmodule',()=>{it('shouldcreateanelementwithdomProps',()=>{constvnode=newVNode('a',{domProps:{src:'http://localhost/'}})constelm=patch(null,vnode)expect(elm.src).toBe('http://localhost/')})it('shouldchangetheelementsdomProps',()=>{constvnode1=newVNode('a',{domProps:{src:'http://localhost/'}})constvnode2=newVNode('a',{domProps:{src:'https://vuejs.org/'}})patch(null,vnode1)constelm=patch(vnode1,vnode2)expect(elm.src).toBe('https://vuejs.org/')})it('shouldremovetheelementsdomProps',()=>{constvnode1=newVNode('a',{domProps:{src:'http://localhost/'}})constvnode2=newVNode('a',{domProps:{}})patch(null,vnode1)constelm=patch(vnode1,vnode2)expect(elm.src).toBe('')})it('shouldinitializetheelementsvaluetozero',()=>{constvnode=newVNode('input',{domProps:{value:0}})constelm=patch(null,vnode)expect(elm.value).toBe('0')})it('shouldsaverawvalueonelement',()=>{constvalue={}constvnode=newVNode('input',{domProps:{value}})constelm=patch(null,vnode)expect(elm._value).toBe(value)})it('shoulddiscardvnodechildrenifthenodehasinnerHTMLortextContentasaprop',()=>{constvnode=newVNode('div',{domProps:{innerHTML:'hi'}},[newVNode('span'),newVNode('span')])constelm=patch(null,vnode)expect(elm.innerHTML).toBe('hi')expect(vnode.children.length).toBe(0)constvnode2=newVNode('div',{domProps:{textContent:'hi'}},[newVNode('span'),newVNode('span')])constelm2=patch(null,vnode2)expect(elm2.textContent).toBe('hi')expect(vnode2.children.length).toBe(0)constvnode3=newVNode('div',undefined,undefined,'123')patch(null,vnode3)constelm3=patch(vnode3,vnode2)expect(elm3.textContent).toBe('hi')constvnode4=newVNode('div',undefined,undefined,newVNode('span'))patch(null,vnode4)constelm4=patch(vnode4,vnode)expect(elm4.textContent).toBe('hi')})it('shouldhandlemutatingobservedpropsobject',done=>{constvm=newVue({data:{props:{id:'foo'}},render(h){returnh('div',{domProps:this.props})}}).$mount()expect(vm.$el.id).toBe('foo')vm.props.id='bar'waitForUpdate(()=>{expect(vm.$el.id).toBe('bar')vm.props={id:'baz'}}).then(()=>{expect(vm.$el.id).toBe('baz')}).then(done)})})