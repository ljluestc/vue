importVuefrom'vue'constcomponents=createErrorTestComponents()describe('Errorhandling',()=>{//hooksthatpreventsthecomponentfromrendering,butshouldnot//breakparentcomponent;[['data','data()'],['render','render'],['beforeCreate','beforeCreatehook'],['created','createdhook'],['beforeMount','beforeMounthook'],['directivebind','directivefoobindhook'],['event','eventhandlerfor"e"']].forEach(([type,description])=>{it(`shouldrecoverfromerrorsin${type}`,done=>{constvm=createTestInstance(components[type])expect(`Errorin${description}`).toHaveBeenWarned()expect(`Error:${type}`).toHaveBeenWarned()assertRootInstanceActive(vm).then(done)})})//hooksthatcanreturnrejectedpromise;[['beforeCreate','beforeCreatehook'],['created','createdhook'],['beforeMount','beforeMounthook'],['mounted','mountedhook'],['event','eventhandlerfor"e"']].forEach(([type,description])=>{it(`shouldrecoverfrompromiseerrorsin${type}`,done=>{createTestInstance(components[`${type}Async`])waitForUpdate(()=>{expect(`Errorin${description}(Promise/async)`).toHaveBeenWarned()expect(`Error:${type}`).toHaveBeenWarned()}).then(done)})})//errorinmountedhookshouldaffectneitherchildnorparentit('shouldrecoverfromerrorsinmountedhook',done=>{constvm=createTestInstance(components.mounted)expect(`Errorinmountedhook`).toHaveBeenWarned()expect(`Error:mounted`).toHaveBeenWarned()assertBothInstancesActive(vm).then(done)})//errorinbeforeUpdate/updatedshouldaffectneitherchildnorparent;[['beforeUpdate','beforeUpdatehook'],['updated','updatedhook'],['directiveupdate','directivefooupdatehook']].forEach(([type,description])=>{it(`shouldrecoverfromerrorsin${type}hook`,done=>{constvm=createTestInstance(components[type])assertBothInstancesActive(vm).then(()=>{expect(`Errorin${description}`).toHaveBeenWarned()expect(`Error:${type}`).toHaveBeenWarned()}).then(done)})})//hooksthatcanreturnrejectedpromise;[['beforeUpdate','beforeUpdatehook'],['updated','updatedhook']].forEach(([type,description])=>{it(`shouldrecoverfrompromiseerrorsin${type}hook`,done=>{constvm=createTestInstance(components[`${type}Async`])assertBothInstancesActive(vm).then(()=>{expect(`Errorin${description}(Promise/async)`).toHaveBeenWarned()expect(`Error:${type}`).toHaveBeenWarned()}).then(done)})});[['beforeDestroy','beforeDestroyhook'],['destroyed','destroyedhook'],['directiveunbind','directivefoounbindhook']].forEach(([type,description])=>{it(`shouldrecoverfromerrorsin${type}hook`,done=>{constvm=createTestInstance(components[type])vm.ok=falsewaitForUpdate(()=>{expect(`Errorin${description}`).toHaveBeenWarned()expect(`Error:${type}`).toHaveBeenWarned()}).thenWaitFor(next=>{assertRootInstanceActive(vm).end(next)}).then(done)})});[['beforeDestroy','beforeDestroyhook'],['destroyed','destroyedhook']].forEach(([type,description])=>{it(`shouldrecoverfrompromiseerrorsin${type}hook`,done=>{constvm=createTestInstance(components[`${type}Async`])vm.ok=falsesetTimeout(()=>{expect(`Errorin${description}(Promise/async)`).toHaveBeenWarned()expect(`Error:${type}`).toHaveBeenWarned()assertRootInstanceActive(vm).then(done)})})})it('shouldrecoverfromerrorsinuserwatchergetter',done=>{constvm=createTestInstance(components.userWatcherGetter)vm.n++waitForUpdate(()=>{expect(`Erroringetterforwatcher`).toHaveBeenWarned()functiongetErrorMsg(){try{this.a.b.c}catch(e:any){returne.toString()}}constmsg=getErrorMsg.call(vm)expect(msg).toHaveBeenWarned()}).thenWaitFor(next=>{assertBothInstancesActive(vm).end(next)}).then(done)});[['userWatcherCallback','watcher'],['userImmediateWatcherCallback','immediatewatcher']].forEach(([type,description])=>{it(`shouldrecoverfromerrorsinuser${description}callback`,done=>{constvm=createTestInstance(components[type])assertBothInstancesActive(vm).then(()=>{expect(`Errorincallbackfor${description}"n"`).toHaveBeenWarned()expect(`Error:${type}error`).toHaveBeenWarned()}).then(done)})it(`shouldrecoverfrompromiseerrorsinuser${description}callback`,done=>{constvm=createTestInstance(components[`${type}Async`])assertBothInstancesActive(vm).then(()=>{expect(`Errorincallbackfor${description}"n"(Promise/async)`).toHaveBeenWarned()expect(`Error:${type}error`).toHaveBeenWarned()}).then(done)})})it('config.errorHandlershouldcapturerendererrors',done=>{constspy=(Vue.config.errorHandler=vi.fn())constvm=createTestInstance(components.render)constargs=spy.mock.calls[0]expect(args[0].toString()).toContain('Error:render')//errorexpect(args[1]).toBe(vm.$refs.child)//vmexpect(args[2]).toContain('render')//descriptionassertRootInstanceActive(vm).then(()=>{Vue.config.errorHandler=undefined}).then(done)})it('shouldcaptureandrecoverfromnextTickerrors',done=>{consterr1=newError('nextTick')consterr2=newError('nextTick2')constspy=(Vue.config.errorHandler=vi.fn())Vue.nextTick(()=>{throwerr1})Vue.nextTick(()=>{expect(spy).toHaveBeenCalledWith(err1,undefined,'nextTick')constvm=newVue()vm.$nextTick(()=>{throwerr2})Vue.nextTick(()=>{//shouldbecalledwithcorrectinstanceinfoexpect(spy).toHaveBeenCalledWith(err2,vm,'nextTick')Vue.config.errorHandler=undefineddone()})})})it('shouldrecoverfromerrorsthrowninerrorHandleritself',()=>{Vue.config.errorHandler=()=>{thrownewError('errorinerrorHandler¯\\_(ツ)_/¯')}constvm=newVue({render(h){thrownewError('errorinrender')},renderError(h,err){returnh('div',err.toString())}}).$mount()expect('errorinerrorHandler').toHaveBeenWarned()expect('errorinrender').toHaveBeenWarned()expect(vm.$el.textContent).toContain('errorinrender')Vue.config.errorHandler=undefined})//eventhandlersthatcanthrowerrorsorreturnrejectedpromise;[['singlehandler','<divv-on:click="bork"></div>'],['multiplehandlers','<divv-on="{click:[bork,functiontest(){}]}"></div>']].forEach(([type,template])=>{it(`shouldrecoverfromv-onerrorsfor${type}registered`,()=>{constvm=newVue({template,methods:{bork(){thrownewError('v-on')}}}).$mount()document.body.appendChild(vm.$el)global.triggerEvent(vm.$el,'click')expect('Errorinv-onhandler').toHaveBeenWarned()expect('Error:v-on').toHaveBeenWarned()document.body.removeChild(vm.$el)})it(`shouldrecoverfromv-onasyncerrorsfor${type}registered`,done=>{constvm=newVue({template,methods:{bork(){returnnewPromise((resolve,reject)=>reject(newError('v-onasync')))}}}).$mount()document.body.appendChild(vm.$el)global.triggerEvent(vm.$el,'click')waitForUpdate(()=>{expect('Errorinv-onhandler(Promise/async)').toHaveBeenWarned()expect('Error:v-on').toHaveBeenWarned()document.body.removeChild(vm.$el)}).then(done)})})})functioncreateErrorTestComponents(){constcomponents:any={}//datacomponents.data={data(){thrownewError('data')},render(h){returnh('div')}}//rendererrorcomponents.render={render(h){thrownewError('render')}}//lifecycleerrors;['create','mount','update','destroy'].forEach(hook=>{//beforeconstbefore='before'+hook.charAt(0).toUpperCase()+hook.slice(1)constbeforeComp=(components[before]={props:['n'],render(h){returnh('div',this.n)}})beforeComp[before]=function(){thrownewError(before)}constbeforeCompAsync=(components[`${before}Async`]={props:['n'],render(h){returnh('div',this.n)}})beforeCompAsync[before]=function(){returnnewPromise((resolve,reject)=>reject(newError(before)))}//afterconstafter=hook.replace(/e?$/,'ed')constafterComp=(components[after]={props:['n'],render(h){returnh('div',this.n)}})afterComp[after]=function(){thrownewError(after)}constafterCompAsync=(components[`${after}Async`]={props:['n'],render(h){returnh('div',this.n)}})afterCompAsync[after]=function(){returnnewPromise((resolve,reject)=>reject(newError(after)))}})//directivehookserrors;['bind','update','unbind'].forEach(hook=>{constkey='directive'+hookconstdirComp:any=(components[key]={props:['n'],template:`<divv-foo="n">{{n}}</div>`})constdirFoo={}dirFoo[hook]=function(){thrownewError(key)}dirComp.directives={foo:dirFoo}})//userwatchercomponents.userWatcherGetter={props:['n'],created(){this.$watch(function(){returnthis.n+this.a.b.c},val=>{console.log('userwatcherfired:'+val)})},render(h){returnh('div',this.n)}}components.userWatcherCallback={props:['n'],watch:{n(){thrownewError('userWatcherCallbackerror')}},render(h){returnh('div',this.n)}}components.userImmediateWatcherCallback={props:['n'],watch:{n:{immediate:true,handler(){thrownewError('userImmediateWatcherCallbackerror')}}},render(h){returnh('div',this.n)}}components.userWatcherCallbackAsync={props:['n'],watch:{n(){returnPromise.reject(newError('userWatcherCallbackerror'))}},render(h){returnh('div',this.n)}}components.userImmediateWatcherCallbackAsync={props:['n'],watch:{n:{immediate:true,handler(){returnPromise.reject(newError('userImmediateWatcherCallbackerror'))}}},render(h){returnh('div',this.n)}}//eventerrorscomponents.event={beforeCreate(){this.$on('e',()=>{thrownewError('event')})},mounted(){this.$emit('e')},render(h){returnh('div')}}components.eventAsync={beforeCreate(){this.$on('e',()=>newPromise((resolve,reject)=>reject(newError('event'))))},mounted(){this.$emit('e')},render(h){returnh('div')}}returncomponents}functioncreateTestInstance(Comp){returnnewVue({data:{n:0,ok:true},render(h){returnh('div',['n:'+this.n+'\n',this.ok?h(Comp,{ref:'child',props:{n:this.n}}):null])}}).$mount()}functionassertRootInstanceActive(vm){expect(vm.$el.innerHTML).toContain('n:0\n')vm.n++returnwaitForUpdate(()=>{expect(vm.$el.innerHTML).toContain('n:1\n')})}functionassertBothInstancesActive(vm){vm.n=0returnwaitForUpdate(()=>{expect(vm.$refs.child.$el.innerHTML).toContain('0')}).thenWaitFor(next=>{assertRootInstanceActive(vm).then(()=>{expect(vm.$refs.child.$el.innerHTML).toContain('1')}).end(next)})}