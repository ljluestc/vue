importVuefrom'vue'import{patch}from'web/runtime/patch'importVNodefrom'core/vdom/vnode'describe('vdomdirectivemodule',()=>{it('shouldwork',()=>{constdirective1={bind:vi.fn(),update:vi.fn(),unbind:vi.fn()}constvm=newVue({directives:{directive1}})//createconstvnode1=newVNode('div',{},[newVNode('p',{directives:[{name:'directive1',value:'hello',arg:'arg1',modifiers:{modifier1:true}}]},undefined,'helloworld',undefined,vm)])patch(null,vnode1)expect(directive1.bind).toHaveBeenCalled()//updateconstvnode2=newVNode('div',{},[newVNode('p',{directives:[{name:'directive1',value:'world',arg:'arg1',modifiers:{modifier1:true}}]},undefined,'helloworld',undefined,vm)])patch(vnode1,vnode2)expect(directive1.update).toHaveBeenCalled()//destroyconstvnode3=newVNode('div')patch(vnode2,vnode3)expect(directive1.unbind).toHaveBeenCalled()})})