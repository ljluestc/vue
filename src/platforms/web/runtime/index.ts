importVuefrom'core/index'importconfigfrom'core/config'import{extend,noop}from'shared/util'import{mountComponent}from'core/instance/lifecycle'import{devtools,inBrowser}from'core/util/index'import{query,mustUseProp,isReservedTag,isReservedAttr,getTagNamespace,isUnknownElement}from'web/util/index'import{patch}from'./patch'importplatformDirectivesfrom'./directives/index'importplatformComponentsfrom'./components/index'importtype{Component}from'types/component'//installplatformspecificutilsVue.config.mustUseProp=mustUsePropVue.config.isReservedTag=isReservedTagVue.config.isReservedAttr=isReservedAttrVue.config.getTagNamespace=getTagNamespaceVue.config.isUnknownElement=isUnknownElement//installplatformruntimedirectives&componentsextend(Vue.options.directives,platformDirectives)extend(Vue.options.components,platformComponents)//installplatformpatchfunctionVue.prototype.__patch__=inBrowser?patch:noop//publicmountmethodVue.prototype.$mount=function(el?:string|Element,hydrating?:boolean):Component{el=el&&inBrowser?query(el):undefinedreturnmountComponent(this,el,hydrating)}//devtoolsglobalhook/*istanbulignorenext*/if(inBrowser){setTimeout(()=>{if(config.devtools){if(devtools){devtools.emit('init',Vue)}elseif(__DEV__&&process.env.NODE_ENV!=='test'){//@ts-expect-errorconsole[console.info?'info':'log']('DownloadtheVueDevtoolsextensionforabetterdevelopmentexperience:\n'+'https://github.com/vuejs/vue-devtools')}}if(__DEV__&&process.env.NODE_ENV!=='test'&&config.productionTip!==false&&typeofconsole!=='undefined'){//@ts-expect-errorconsole[console.info?'info':'log'](`YouarerunningVueindevelopmentmode.\n`+`Makesuretoturnonproductionmodewhendeployingforproduction.\n`+`Seemoretipsathttps://vuejs.org/guide/deployment.html`)}},0)}exportdefaultVue