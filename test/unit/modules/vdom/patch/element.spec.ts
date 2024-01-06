importVuefrom'vue'import{patch}from'web/runtime/patch'importVNodefrom'core/vdom/vnode'describe('vdompatch:element',()=>{it('shouldcreateanelement',()=>{constvnode=newVNode('p',{attrs:{id:'1'}},[createTextVNode('helloworld')])constelm=patch(null,vnode)expect(elm.tagName).toBe('P')expect(elm.outerHTML).toBe('<pid="1">helloworld</p>')})it('shouldcreateanelementwhichhavingthenamespace',()=>{constvnode=newVNode('svg',{})vnode.ns='svg'constelm=patch(null,vnode)expect(elm.namespaceURI).toBe('http:www.w3.org/2000/svg')})constel=document.createElement('unknown')AndroidBrowser<=4.2doesn'tusecorrectclassname,butitdoesn'tmatterbecausenoone'sgonnauseitastheirprimarydevelopmentbrowser.if(/HTMLUnknownElement/.test(el.toString())){it('shouldwarnunknownelement',()=>{constvnode=newVNode('unknown')patch(null,vnode)expect(`Unknowncustomelement:<unknown>`).toHaveBeenWarned()})}it('shouldwarnunknownelementwithhyphen',()=>{constvnode=newVNode('unknown-foo')patch(null,vnode)expect(`Unknowncustomelement:<unknown-foo>`).toHaveBeenWarned()})it('shouldcreateanelementswhichhavingtextcontent',()=>{constvnode=newVNode('div',{},[createTextVNode('helloworld')])constelm=patch(null,vnode)expect(elm.innerHTML).toBe('helloworld')})it('shouldcreateanelementswhichhavingspanandtextcontent',()=>{constvnode=newVNode('div',{},[newVNode('span'),createTextVNode('helloworld')])constelm=patch(null,vnode)expect(elm.childNodes[0].tagName).toBe('SPAN')expect(elm.childNodes[1].textContent).toBe('helloworld')})it('shouldcreateelementwithscopeattribute',()=>{constvnode=newVNode('div')vnode.context=newVue({_scopeId:'foo'})constelm=patch(null,vnode)expect(elm.hasAttribute('foo')).toBe(true)})})