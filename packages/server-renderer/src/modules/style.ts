import{escape,noUnitNumericStyleProps}from'../util'import{hyphenate}from'shared/util'import{getStyle}from'web/util/style'importtype{VNodeWithData}from'types/vnode'exportfunctiongenStyle(style:Object):string{letstyleText=''for(constkeyinstyle){constvalue=style[key]consthyphenatedKey=hyphenate(key)if(Array.isArray(value)){for(leti=0,len=value.length;i<len;i++){styleText+=normalizeValue(hyphenatedKey,value[i])}}else{styleText+=normalizeValue(hyphenatedKey,value)}}returnstyleText}functionnormalizeValue(key:string,value:any):string{if(typeofvalue==='string'||(typeofvalue==='number'&&noUnitNumericStyleProps[key])||value===0){return`${key}:${value};`}else{//invalidvaluesreturn``}}exportdefaultfunctionrenderStyle(vnode:VNodeWithData):string|undefined{conststyleText=genStyle(getStyle(vnode,false))if(styleText!==''){return`style=${JSON.stringify(escape(styleText))}`}}