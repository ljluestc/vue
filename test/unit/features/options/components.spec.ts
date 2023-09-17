importVuefrom'vue'import{UA}from'core/util/env'importtestObjectOptionfrom'../../../helpers/test-object-option'describe('Optionscomponents',()=>{testObjectOption('components')it('shouldacceptplainobject',()=>{constvm=newVue({template:'<test></test>',components:{test:{template:'<div>hi</div>'}}}).$mount()expect(vm.$el.tagName).toBe('DIV')expect(vm.$el.textContent).toBe('hi')})it('shouldacceptextendedconstructor',()=>{constTest=Vue.extend({template:'<div>hi</div>'})constvm=newVue({template:'<test></test>',components:{test:Test}}).$mount()expect(vm.$el.tagName).toBe('DIV')expect(vm.$el.textContent).toBe('hi')})it('shouldacceptcamelCase',()=>{constmyComp={template:'<div>hi</div>'}constvm=newVue({template:'<my-comp></my-comp>',components:{myComp}}).$mount()expect(vm.$el.tagName).toBe('DIV')expect(vm.$el.textContent).toBe('hi')})it('shouldacceptPascalCase',()=>{constMyComp={template:'<div>hi</div>'}constvm=newVue({template:'<my-comp></my-comp>',components:{MyComp}}).$mount()expect(vm.$el.tagName).toBe('DIV')expect(vm.$el.textContent).toBe('hi')})it('shouldwarnnativeHTMLelements',()=>{newVue({components:{div:{template:'<div></div>'}}})expect('Donotusebuilt-inorreservedHTMLelementsascomponent').toHaveBeenWarned()})it('shouldwarnbuilt-inelements',()=>{newVue({components:{component:{template:'<div></div>'}}})expect('Donotusebuilt-inorreservedHTMLelementsascomponent').toHaveBeenWarned()})//theHTMLUnknownElementcheckdoesn'tworkinAndroid4.2//butsinceitdoesn'tsupportcustomelementsnorwillanydevuseit//astheirprimarydebuggingbrowser,itdoesn'treallymatter.if(!(UA&&/android4\.2/.test(UA))){it('warnnon-existent',()=>{newVue({template:'<test></test>'}).$mount()expect('Unknowncustomelement:<test>').toHaveBeenWarned()})}})