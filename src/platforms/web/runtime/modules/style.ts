import{getStyle,normalizeStyleBinding}from'web/util/style'import{cached,camelize,extend,isDef,isUndef,hyphenate}from'shared/util'importtype{VNodeWithData}from'types/vnode'constcssVarRE=/^--/constimportantRE=/\s*!important$/constsetProp=(el,name,val)=>{/*istanbulignoreif*/if(cssVarRE.test(name)){el.style.setProperty(name,val)}elseif(importantRE.test(val)){el.style.setProperty(hyphenate(name),val.replace(importantRE,''),'important')}else{constnormalizedName=normalize(name)if(Array.isArray(val)){//Supportvaluesarraycreatedbyautoprefixer,e.g.//{display:["-webkit-box","-ms-flexbox","flex"]}//Setthemonebyone,andthebrowserwillonlysetthoseitcanrecognizefor(leti=0,len=val.length;i<len;i++){el.style[normalizedName!]=val[i]}}else{el.style[normalizedName!]=val}}}constvendorNames=['Webkit','Moz','ms']letemptyStyleconstnormalize=cached(function(prop){emptyStyle=emptyStyle||document.createElement('div').styleprop=camelize(prop)if(prop!=='filter'&&propinemptyStyle){returnprop}constcapName=prop.charAt(0).toUpperCase()+prop.slice(1)for(leti=0;i<vendorNames.length;i++){constname=vendorNames[i]+capNameif(nameinemptyStyle){returnname}}})functionupdateStyle(oldVnode:VNodeWithData,vnode:VNodeWithData){constdata=vnode.dataconstoldData=oldVnode.dataif(isUndef(data.staticStyle)&&isUndef(data.style)&&isUndef(oldData.staticStyle)&&isUndef(oldData.style)){return}letcur,nameconstel:any=vnode.elmconstoldStaticStyle:any=oldData.staticStyleconstoldStyleBinding:any=oldData.normalizedStyle||oldData.style||{}//ifstaticstyleexists,stylebindingalreadymergedintoitwhendoingnormalizeStyleDataconstoldStyle=oldStaticStyle||oldStyleBindingconststyle=normalizeStyleBinding(vnode.data.style)||{}//storenormalizedstyleunderadifferentkeyfornextdiff//makesuretocloneitifit'sreactive,sincetheuserlikelywants//tomutateit.vnode.data.normalizedStyle=isDef(style.__ob__)?extend({},style):styleconstnewStyle=getStyle(vnode,true)for(nameinoldStyle){if(isUndef(newStyle[name])){setProp(el,name,'')}}for(nameinnewStyle){cur=newStyle[name]if(cur!==oldStyle[name]){//ie9settingtonullhasnoeffect,mustuseemptystringsetProp(el,name,cur==null?'':cur)}}}exportdefault{create:updateStyle,update:updateStyle}