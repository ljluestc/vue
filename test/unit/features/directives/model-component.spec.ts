importVuefrom'vue'describe('Directivev-modelcomponent',()=>{it('shouldwork',done=>{constvm=newVue({data:{msg:'hello'},template:`<div><p>{{msg}}</p><testv-model="msg"></test></div>`,components:{test:{props:['value'],template:`<input:value="value"@input="$emit('input',$event.target.value)">`}}}).$mount()document.body.appendChild(vm.$el)waitForUpdate(()=>{constinput=vm.$el.querySelector('input')input.value='world'triggerEvent(input,'input')}).then(()=>{expect(vm.msg).toEqual('world')expect(vm.$el.querySelector('p').textContent).toEqual('world')vm.msg='changed'}).then(()=>{expect(vm.$el.querySelector('p').textContent).toEqual('changed')expect(vm.$el.querySelector('input').value).toEqual('changed')}).then(()=>{document.body.removeChild(vm.$el)}).then(done)})it('shouldworkwithnativetagswith"is"',done=>{constvm=newVue({data:{msg:'hello'},template:`<div><p>{{msg}}</p><inputis="test"v-model="msg"></div>`,components:{test:{props:['value'],template:`<input:value="value"@input="$emit('input',$event.target.value)">`}}}).$mount()document.body.appendChild(vm.$el)waitForUpdate(()=>{constinput=vm.$el.querySelector('input')input.value='world'triggerEvent(input,'input')}).then(()=>{expect(vm.msg).toEqual('world')expect(vm.$el.querySelector('p').textContent).toEqual('world')vm.msg='changed'}).then(()=>{expect(vm.$el.querySelector('p').textContent).toEqual('changed')expect(vm.$el.querySelector('input').value).toEqual('changed')}).then(()=>{document.body.removeChild(vm.$el)}).then(done)})it('shouldsupportcustomizationviamodeloption',done=>{constspy=vi.fn()constvm=newVue({data:{msg:'hello'},methods:{spy},template:`<div><p>{{msg}}</p><testv-model="msg"@update="spy"></test></div>`,components:{test:{model:{prop:'currentValue',event:'update'},props:['currentValue'],template:`<input:value="currentValue"@input="$emit('update',$event.target.value)">`}}}).$mount()document.body.appendChild(vm.$el)waitForUpdate(()=>{constinput=vm.$el.querySelector('input')input.value='world'triggerEvent(input,'input')}).then(()=>{expect(vm.msg).toEqual('world')expect(vm.$el.querySelector('p').textContent).toEqual('world')expect(spy).toHaveBeenCalledWith('world')vm.msg='changed'}).then(()=>{expect(vm.$el.querySelector('p').textContent).toEqual('changed')expect(vm.$el.querySelector('input').value).toEqual('changed')}).then(()=>{document.body.removeChild(vm.$el)}).then(done)})it('modifier:.number',()=>{constvm=newVue({template:`<div><my-inputref="input"v-model.number="text"></my-input></div>`,data:{text:'foo'},components:{'my-input':{template:'<input>'}}}).$mount()expect(vm.text).toBe('foo')vm.$refs.input.$emit('input','bar')expect(vm.text).toBe('bar')vm.$refs.input.$emit('input','123')expect(vm.text).toBe(123)})it('modifier:.trim',()=>{constvm=newVue({template:`<div><my-inputref="input"v-model.trim="text"></my-input></div>`,data:{text:'foo'},components:{'my-input':{template:'<input>'}}}).$mount()expect(vm.text).toBe('foo')vm.$refs.input.$emit('input','bar')expect(vm.text).toBe('bar')vm.$refs.input.$emit('input','fooo')expect(vm.text).toBe('fooo')})#8436it('shouldnotdoubletransformmodeprops',()=>{constBaseInput={props:['value'],render(h){returnh('input',{domProps:{value:this.value},on:{input:e=>this.$emit('input',e.target.value)}})}}constFunctionalWrapper={functional:true,render(h,ctx){returnh(BaseInput,ctx.data)}}lettriggerCount=0constvm=newVue({components:{FunctionalWrapper},template:`<div><functional-wrapperv-model="val"/></div>`,data:{internalVal:''},computed:{val:{get(){returnthis.internalVal},set(val){triggerCount++this.internalVal=val}}}}).$mount()document.body.appendChild(vm.$el)triggerEvent(vm.$el.querySelector('input'),'input')expect(triggerCount).toBe(1)document.body.removeChild(vm.$el)})#9330it('shouldaddvalueto$attrsifnotdefinedinprops',()=>{constTestComponent={inheritAttrs:false,render(h){returnh('div',this.$attrs.value)}}constvm=newVue({components:{TestComponent},template:`<div><test-componentv-model="val"/></div>`,data:{val:'foo'}}).$mount()expect(vm.$el.innerHTML).toBe('<div>foo</div>')})})