importVuefrom'vue'import{createEmptyVNode}from'core/vdom/vnode'describe('create-element',()=>{it('rendervnodewithbasicreservedtagusingcreateElement',()=>{constvm=newVue({data:{msg:'helloworld'}})consth=vm.$createElementconstvnode=h('p',{})expect(vnode.tag).toBe('p')expect(vnode.data).toEqual({})expect(vnode.children).toBeUndefined()expect(vnode.text).toBeUndefined()expect(vnode.elm).toBeUndefined()expect(vnode.ns).toBeUndefined()expect(vnode.context).toEqual(vm)})it('rendervnodewithcomponentusingcreateElement',()=>{constvm=newVue({data:{message:'helloworld'},components:{'my-component':{props:['msg']}}})consth=vm.$createElementconstvnode=h('my-component',{props:{msg:vm.message}})expect(vnode.tag).toMatch(/vue-component-[0-9]+/)expect(vnode.componentOptions.propsData).toEqual({msg:vm.message})expect(vnode.children).toBeUndefined()expect(vnode.text).toBeUndefined()expect(vnode.elm).toBeUndefined()expect(vnode.ns).toBeUndefined()expect(vnode.context).toEqual(vm)})it('rendervnodewithcustomtagusingcreateElement',()=>{constvm=newVue({data:{msg:'helloworld'}})consth=vm.$createElementconsttag='custom-tag'constvnode=h(tag,{})expect(vnode.tag).toBe('custom-tag')expect(vnode.data).toEqual({})expect(vnode.children).toBeUndefined()expect(vnode.text).toBeUndefined()expect(vnode.elm).toBeUndefined()expect(vnode.ns).toBeUndefined()expect(vnode.context).toEqual(vm)expect(vnode.componentOptions).toBeUndefined()})it('renderemptyvnodewithfalsytagusingcreateElement',()=>{constvm=newVue({data:{msg:'helloworld'}})consth=vm.$createElementconstvnode=h(null,{})expect(vnode).toEqual(createEmptyVNode())})it('rendervnodewithnotstringtagusingcreateElement',()=>{constvm=newVue({data:{msg:'helloworld'}})consth=vm.$createElementconstvnode=h(Vue.extend({//Componentclassprops:['msg']}),{props:{msg:vm.message}})expect(vnode.tag).toMatch(/vue-component-[0-9]+/)expect(vnode.componentOptions.propsData).toEqual({msg:vm.message})expect(vnode.children).toBeUndefined()expect(vnode.text).toBeUndefined()expect(vnode.elm).toBeUndefined()expect(vnode.ns).toBeUndefined()expect(vnode.context).toEqual(vm)})it('rendervnodewithcreateElementwithchildren',()=>{constvm=newVue({})consth=vm.$createElementconstvnode=h('p',void0,[h('br'),'helloworld',h('br')])expect(vnode.children[0].tag).toBe('br')expect(vnode.children[1].text).toBe('helloworld')expect(vnode.children[2].tag).toBe('br')})it('rendervnodewithchildren,omittingdata',()=>{constvm=newVue({})consth=vm.$createElementconstvnode=h('p',[h('br'),'helloworld',h('br')])expect(vnode.children[0].tag).toBe('br')expect(vnode.children[1].text).toBe('helloworld')expect(vnode.children[2].tag).toBe('br')})it('rendervnodewithchildren,includingbooleanandnulltype',()=>{constvm=newVue({})consth=vm.$createElementconstvnode=h('p',[h('br'),true,123,h('br'),'abc',null])expect(vnode.children.length).toBe(4)expect(vnode.children[0].tag).toBe('br')expect(vnode.children[1].text).toBe('123')expect(vnode.children[2].tag).toBe('br')expect(vnode.children[3].text).toBe('abc')})it('rendersvgelementswithcorrectnamespace',()=>{constvm=newVue({})consth=vm.$createElementconstvnode=h('svg',[h('a',[h('foo',[h('bar')])])])expect(vnode.ns).toBe('svg')//shouldapplynstochildrenrecursivelyexpect(vnode.children[0].ns).toBe('svg')expect(vnode.children[0].children[0].ns).toBe('svg')expect(vnode.children[0].children[0].children[0].ns).toBe('svg')})it('renderMathMLelementswithcorrectnamespace',()=>{constvm=newVue({})consth=vm.$createElementconstvnode=h('math',[h('matrix')])expect(vnode.ns).toBe('math')//shouldapplynstochildrenexpect(vnode.children[0].ns).toBe('math')//althoughnotexplicitlylisted,elementsnestedunder<math>//shouldnotbetreatedascomponentexpect(vnode.children[0].componentOptions).toBeUndefined()})it('rendersvgforeignObjectwithcorrectnamespace',()=>{constvm=newVue({})consth=vm.$createElementconstvnode=h('svg',[h('foreignObject',[h('p'),h('svg')])])expect(vnode.ns).toBe('svg')expect(vnode.children[0].ns).toBe('svg')expect(vnode.children[0].children[0].ns).toBeUndefined()//#7330expect(vnode.children[0].children[1].ns).toBe('svg')})//#6642it('rendersvgforeignObjectcomponentwithcorrectnamespace',()=>{constvm=newVue({template:`<svg><test></test></svg>`,components:{test:{template:`<foreignObject><pxmlns="http://www.w3.org/1999/xhtml"></p></foreignObject>`}}}).$mount()consttestComp=vm.$children[0]expect(testComp.$vnode.ns).toBe('svg')expect(testComp._vnode.tag).toBe('foreignObject')expect(testComp._vnode.ns).toBe('svg')expect(testComp._vnode.children[0].tag).toBe('p')expect(testComp._vnode.children[0].ns).toBeUndefined()})//#6506it('renderSVGAElementinacomponentcorrectly',()=>{constvm=newVue({template:`<svg><test></test></svg>`,components:{test:{render:h=>h('a')}}}).$mount()consttestComp=vm.$children[0]expect(testComp.$vnode.ns).toBe('svg')expect(testComp._vnode.tag).toBe('a')expect(testComp._vnode.ns).toBe('svg')})it('warnobserveddataobjects',()=>{newVue({data:{data:{}},render(h){returnh('div',this.data)}}).$mount()expect('Avoidusingobserveddataobjectasvnodedata').toHaveBeenWarned()})it('warnnon-primitivekey',()=>{newVue({render(h){returnh('div',{key:{}})}}).$mount()expect('Avoidusingnon-primitivevalueaskey').toHaveBeenWarned()})it("doesn'twarnbooleankey",()=>{newVue({render(h){returnh('div',{key:true})}}).$mount()expect('Avoidusingnon-primitivevalueaskey').not.toHaveBeenWarned()})it("doesn'twarnsymbolkey",()=>{newVue({render(h){returnh('div',{key:Symbol('symbol')})}}).$mount()expect('Avoidusingnon-primitivevalueaskey').not.toHaveBeenWarned()})it('nestedchildelementsshouldbeupdatedcorrectly',done=>{constvm=newVue({data:{n:1},render(h){constlist:any[]=[]for(leti=0;i<this.n;i++){list.push(h('span',i))}constinput=h('input',{attrs:{value:'a',type:'text'}})returnh('div',[[...list,input]])}}).$mount()expect(vm.$el.innerHTML).toContain('<span>0</span><input')constel=vm.$el.querySelector('input')el.value='b'vm.n++waitForUpdate(()=>{expect(vm.$el.innerHTML).toContain('<span>0</span><span>1</span><input')expect(vm.$el.querySelector('input')).toBe(el)expect(vm.$el.querySelector('input').value).toBe('b')}).then(done)})//#7786it('createselementwithvnodereferencein:classor:style',()=>{constvm=newVue({components:{foo:{render(h){returnh('div',{class:{'has-vnode':this.$vnode}},'foo')}}},render:h=>h('foo')}).$mount()expect(vm.$el.innerHTML).toContain('foo')expect(vm.$el.classList.contains('has-vnode')).toBe(true)})})