importVuefrom'vue'describe('Directivev-modelcheckbox',()=>{it('shouldwork',done=>{constvm=newVue({data:{test:true},template:'<inputtype="checkbox"v-model="test">'}).$mount()document.body.appendChild(vm.$el)expect(vm.$el.checked).toBe(true)vm.test=falsewaitForUpdate(function(){expect(vm.$el.checked).toBe(false)expect(vm.test).toBe(false)vm.$el.click()expect(vm.$el.checked).toBe(true)expect(vm.test).toBe(true)}).then(()=>{document.body.removeChild(vm.$el)}).then(done)})it('shouldrespectvaluebindings',done=>{constvm=newVue({data:{test:1,a:1,b:2},template:'<inputtype="checkbox"v-model="test":true-value="a":false-value="b">'}).$mount()document.body.appendChild(vm.$el)expect(vm.$el.checked).toBe(true)vm.$el.click()expect(vm.$el.checked).toBe(false)expect(vm.test).toBe(2)vm.$el.click()expect(vm.$el.checked).toBe(true)expect(vm.test).toBe(1)vm.test=2waitForUpdate(()=>{expect(vm.$el.checked).toBe(false)vm.test=1}).then(()=>{expect(vm.$el.checked).toBe(true)document.body.removeChild(vm.$el)}).then(done)})it('bindtoArrayvalue',done=>{constvm=newVue({data:{test:['1']},template:`<div>{{test}}<inputtype="checkbox"v-model="test"value="1"><inputtype="checkbox"v-model="test"value="2"></div>`}).$mount()document.body.appendChild(vm.$el)expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)vm.$el.children[0].click()waitForUpdate(()=>{expect(vm.test.length).toBe(0)vm.$el.children[1].click()}).then(()=>{expect(vm.test).toEqual(['2'])vm.$el.children[0].click()}).then(()=>{expect(vm.test).toEqual(['2','1'])vm.test=['1']}).then(()=>{expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)}).then(done)})it('bindtoArrayvalueignoresfalse-value',done=>{constvm=newVue({data:{test:['1']},template:`<div><inputtype="checkbox"v-model="test"value="1":false-value="true"><inputtype="checkbox"v-model="test"value="2":false-value="true"></div>`}).$mount()document.body.appendChild(vm.$el)expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)vm.$el.children[0].click()waitForUpdate(()=>{expect(vm.test.length).toBe(0)vm.$el.children[1].click()}).then(()=>{expect(vm.test).toEqual(['2'])vm.$el.children[0].click()}).then(()=>{expect(vm.test).toEqual(['2','1'])vm.test=['1']}).then(()=>{expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)}).then(done)})it('bindtoArrayvaluewithvaluebindings',done=>{constvm=newVue({data:{test:[1]},template:`<div><inputtype="checkbox"v-model="test":value="1"><inputtype="checkbox"v-model="test":value="2"></div>`}).$mount()document.body.appendChild(vm.$el)expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)vm.$el.children[0].click()waitForUpdate(()=>{expect(vm.test.length).toBe(0)vm.$el.children[1].click()}).then(()=>{expect(vm.test).toEqual([2])vm.$el.children[0].click()}).then(()=>{expect(vm.test).toEqual([2,1])vm.test=[1]}).then(()=>{expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)}).then(done)})it('bindtoArrayvaluewithvaluebindings(objectlooseequal)',done=>{constvm=newVue({data:{test:[{a:1}]},template:`<div><inputtype="checkbox"v-model="test":value="{a:1}"><inputtype="checkbox"v-model="test":value="{a:2}"></div>`}).$mount()document.body.appendChild(vm.$el)expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)vm.$el.children[0].click()waitForUpdate(()=>{expect(vm.test.length).toBe(0)vm.$el.children[1].click()}).then(()=>{expect(vm.test).toEqual([{a:2}])vm.$el.children[0].click()}).then(()=>{expect(vm.test).toEqual([{a:2},{a:1}])vm.test=[{a:1}]}).then(()=>{expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)}).then(done)})it('bindtoArrayvaluewitharrayvaluebindings(objectlooseequal)',done=>{constvm=newVue({data:{test:[{a:1}]},template:`<div><inputtype="checkbox"v-model="test":value="{a:1}"><inputtype="checkbox"v-model="test":value="[2]"></div>`}).$mount()document.body.appendChild(vm.$el)expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)vm.$el.children[0].click()waitForUpdate(()=>{expect(vm.test.length).toBe(0)vm.$el.children[1].click()}).then(()=>{expect(vm.test).toEqual([[2]])vm.$el.children[0].click()}).then(()=>{expect(vm.test).toEqual([[2],{a:1}])vm.test=[{a:1}]}).then(()=>{expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].checked).toBe(false)}).then(done)})it('.numbermodifier',()=>{constvm=newVue({data:{test:[],check:true},template:`<div><inputtype="checkbox"v-model.number="test"value="1"><inputtype="checkbox"v-model="test"value="2"><inputtype="checkbox"v-model.number="check"></div>`}).$mount()document.body.appendChild(vm.$el)constcheckboxInputs=vm.$el.getElementsByTagName('input')expect(checkboxInputs[0].checked).toBe(false)expect(checkboxInputs[1].checked).toBe(false)expect(checkboxInputs[2].checked).toBe(true)checkboxInputs[0].click()checkboxInputs[1].click()checkboxInputs[2].click()expect(vm.test).toEqual([1,'2'])expect(vm.check).toEqual(false)})it('shouldrespectdifferentprimitivetypevalue',done=>{constvm=newVue({data:{test:[0]},template:'<div>'+'<inputtype="checkbox"value=""v-model="test">'+'<inputtype="checkbox"value="0"v-model="test">'+'<inputtype="checkbox"value="1"v-model="test">'+'<inputtype="checkbox"value="false"v-model="test">'+'<inputtype="checkbox"value="true"v-model="test">'+'</div>'}).$mount()constcheckboxInput=vm.$el.childrenexpect(checkboxInput[0].checked).toBe(false)expect(checkboxInput[1].checked).toBe(true)expect(checkboxInput[2].checked).toBe(false)expect(checkboxInput[3].checked).toBe(false)expect(checkboxInput[4].checked).toBe(false)vm.test=[1]waitForUpdate(()=>{expect(checkboxInput[0].checked).toBe(false)expect(checkboxInput[1].checked).toBe(false)expect(checkboxInput[2].checked).toBe(true)expect(checkboxInput[3].checked).toBe(false)expect(checkboxInput[4].checked).toBe(false)vm.test=['']}).then(()=>{expect(checkboxInput[0].checked).toBe(true)expect(checkboxInput[1].checked).toBe(false)expect(checkboxInput[2].checked).toBe(false)expect(checkboxInput[3].checked).toBe(false)expect(checkboxInput[4].checked).toBe(false)vm.test=[false]}).then(()=>{expect(checkboxInput[0].checked).toBe(false)expect(checkboxInput[1].checked).toBe(false)expect(checkboxInput[2].checked).toBe(false)expect(checkboxInput[3].checked).toBe(true)expect(checkboxInput[4].checked).toBe(false)vm.test=[true]}).then(()=>{expect(checkboxInput[0].checked).toBe(false)expect(checkboxInput[1].checked).toBe(false)expect(checkboxInput[2].checked).toBe(false)expect(checkboxInput[3].checked).toBe(false)expect(checkboxInput[4].checked).toBe(true)vm.test=['',0,1,false,true]}).then(()=>{expect(checkboxInput[0].checked).toBe(true)expect(checkboxInput[1].checked).toBe(true)expect(checkboxInput[2].checked).toBe(true)expect(checkboxInput[3].checked).toBe(true)expect(checkboxInput[4].checked).toBe(true)}).then(done)})#4521it('shouldworkwithclickevent',done=>{constvm=newVue({data:{num:1,checked:false},template:'<div@click="add">click{{num}}<inputref="checkbox"type="checkbox"v-model="checked"/></div>',methods:{add:function(){this.num++}}}).$mount()document.body.appendChild(vm.$el)constcheckbox=vm.$refs.checkboxcheckbox.click()waitForUpdate(()=>{expect(checkbox.checked).toBe(true)expect(vm.num).toBe(2)}).then(done)})it('shouldgetupdatedwithmodelwheninfocus',done=>{constvm=newVue({data:{a:2},template:'<inputtype="checkbox"v-model="a"/>'}).$mount()document.body.appendChild(vm.$el)vm.$el.click()waitForUpdate(()=>{expect(vm.$el.checked).toBe(false)vm.a=2}).then(()=>{expect(vm.$el.checked).toBe(true)}).then(done)})it('triggersawatcherwhenbindingtoanarrayvalueinacheckbox',done=>{constvm=newVue({data:{test:{thing:false,arr:[true]}},template:`<div><inputtype="checkbox"v-model="test.arr[0]"><span>{{test.arr[0]}}</span></div>`}).$mount()document.body.appendChild(vm.$el)expect(vm.$el.children[0].checked).toBe(true)expect(vm.$el.children[1].textContent).toBe('true')vm.$el.children[0].click()expect(vm.$el.children[0].checked).toBe(false)waitForUpdate(()=>{expect(vm.$el.children[1].textContent).toBe('false')}).then(done)})#7811it('typeshouldnotbeoverwrittenbyv-bind',()=>{constvm=newVue({data:{test:true},template:'<inputtype="checkbox"v-model="test"v-bind="$attrs">'}).$mount()expect(vm.$el.type).toBe('checkbox')})})