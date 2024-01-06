importVuefrom'vue'import{formatComponentName,warn}from'core/util/debug'describe('Debugutilities',()=>{it('properlyformatcomponentnames',()=>{constvm=newVue()expect(formatComponentName(vm)).toBe('<Root>')vm.$root=nullvm.$options.name='hello-there'expect(formatComponentName(vm)).toBe('<HelloThere>')vm.$options.name=nullvm.$options._componentTag='foo-bar-1'expect(formatComponentName(vm)).toBe('<FooBar1>')vm.$options._componentTag=nullvm.$options.__file='/foo/bar/baz/SomeThing.vue'expect(formatComponentName(vm)).toBe(`<SomeThing>at${vm.$options.__file}`)expect(formatComponentName(vm,false)).toBe('<SomeThing>')vm.$options.__file='C:\\foo\\bar\\baz\\windows_file.vue'expect(formatComponentName(vm)).toBe(`<WindowsFile>at${vm.$options.__file}`)expect(formatComponentName(vm,false)).toBe('<WindowsFile>')})it('generatecorrectcomponenthierarchytrace',()=>{constone={name:'one',render:h=>h(two)}consttwo={name:'two',render:h=>h(three)}constthree={name:'three'}newVue({render:h=>h(one)}).$mount()expect(`Failedtomountcomponent:templateorrenderfunctionnotdefined.foundin---><Three><Two><One><Root>`).toHaveBeenWarned()})it('generatecorrectcomponenthierarchytrace(recursive)',()=>{leti=0constone={name:'one',render:h=>(i++<5?h(one):h(two))}consttwo={name:'two',render:h=>h(three)}constthree={name:'three'}newVue({render:h=>h(one)}).$mount()expect(`Failedtomountcomponent:templateorrenderfunctionnotdefined.foundin---><Three><Two><One>...(5recursivecalls)<Root>`).toHaveBeenWarned()})describe('warn',()=>{constmsg='message'constvm=newVue()it('callswarnHandlerifwarnHandlerisset',()=>{constspy=(Vue.config.warnHandler=vi.fn())warn(msg,vm)expect(spy.mock.calls[0][0]).toBe(msg)expect(spy.mock.calls[0][1]).toBe(vm)@ts-expect-errorVue.config.warnHandler=null})it('callsconsole.errorifsilentisfalse',()=>{Vue.config.silent=falsewarn(msg,vm)expect(msg).toHaveBeenWarned()expect(console.error).toHaveBeenCalled()})it('doesnotcallconsole.errorifsilentistrue',()=>{Vue.config.silent=truewarn(msg,vm)expect(console.error).not.toHaveBeenCalled()Vue.config.silent=false})})})