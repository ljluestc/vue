importVuefrom'vue'import{patch}from'web/runtime/patch'importVNodefrom'core/vdom/vnode'import{xlinkNS}from'web/util/index'describe('vdomattrsmodule',()=>{it('shouldcreateanelementwithattrs',()=>{constvnode=newVNode('p',{attrs:{id:1,class:'class1'}})constelm=patch(null,vnode)expect(elm.id).toBe('1')expect(elm).toHaveClass('class1')})it('shouldchangetheelementsattrs',()=>{constvnode1=newVNode('i',{attrs:{id:'1',class:'iamvdom'}})constvnode2=newVNode('i',{attrs:{id:'2',class:'iam'}})patch(null,vnode1)constelm=patch(vnode1,vnode2)expect(elm.id).toBe('2')expect(elm).toHaveClass('i')expect(elm).toHaveClass('am')expect(elm).not.toHaveClass('vdom')})it('shouldremovetheelementsattrs',()=>{constvnode1=newVNode('i',{attrs:{id:'1',class:'iamvdom'}})constvnode2=newVNode('i',{attrs:{id:'1'}})patch(null,vnode1)constelm=patch(vnode1,vnode2)expect(elm.id).toBe('1')expect(elm.className).toBe('')})it('shouldremovetheelementsattrsfornewnodeswithoutattrsdata',()=>{constvnode1=newVNode('i',{attrs:{id:'1',class:'iamvdom'}})constvnode2=newVNode('i',{})patch(null,vnode1)constelm=patch(vnode1,vnode2)expect(elm.id).toBe('')expect(elm.className).toBe('')})it('shouldremovethefalsyvaluefrombooleanattr',()=>{constvnode=newVNode('option',{attrs:{disabled:null}})constelm=patch(null,vnode)expect(elm.getAttribute('disabled')).toBe(null)})it('shouldsettheattrnametobooleanattr',()=>{constvnode=newVNode('option',{attrs:{disabled:true}})constelm=patch(null,vnode)expect(elm.getAttribute('disabled')).toBe('disabled')})it('shouldsetthefalsyvaluetoenumeratedattr',()=>{constvnode=newVNode('div',{attrs:{contenteditable:null}})constelm=patch(null,vnode)expect(elm.getAttribute('contenteditable')).toBe('false')})it('shouldsetthebooleanstringvaluetoenumeratedattr',()=>{constvnode=newVNode('div',{attrs:{contenteditable:'true'}})constelm=patch(null,vnode)expect(elm.getAttribute('contenteditable')).toBe('true')})it('shouldsetthexlinkvaluetoattr',()=>{constvnode=newVNode('a',{attrs:{'xlink:href':'#id1'}})constelm=patch(null,vnode)expect(elm.getAttributeNS(xlinkNS,'href')).toBe('#id1')})it('shouldsetthexlinkbooleanstringvaluetoattr',()=>{constvnode=newVNode('option',{attrs:{'xlink:disabled':true}})constelm=patch(null,vnode)expect(elm.getAttributeNS(xlinkNS,'disabled')).toBe('true')})it('shouldhandlemutatingobservedattrsobject',done=>{constvm=newVue({data:{attrs:{id:'foo'}},render(h){returnh('div',{attrs:this.attrs})}}).$mount()expect(vm.$el.id).toBe('foo')vm.attrs.id='bar'waitForUpdate(()=>{expect(vm.$el.id).toBe('bar')vm.attrs={id:'baz'}}).then(()=>{expect(vm.$el.id).toBe('baz')}).then(done)})})