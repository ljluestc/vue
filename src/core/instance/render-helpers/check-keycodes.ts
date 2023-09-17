importconfigfrom'core/config'import{hyphenate,isArray}from'shared/util'functionisKeyNotMatch<T>(expect:T|Array<T>,actual:T):boolean{if(isArray(expect)){returnexpect.indexOf(actual)===-1}else{returnexpect!==actual}}/***RuntimehelperforcheckingkeyCodesfromconfig.*exposedasVue.prototype._k*passingineventKeyNameaslastargumentseparatelyforbackwardscompat*/exportfunctioncheckKeyCodes(eventKeyCode:number,key:string,builtInKeyCode?:number|Array<number>,eventKeyName?:string,builtInKeyName?:string|Array<string>):boolean|null|undefined{constmappedKeyCode=config.keyCodes[key]||builtInKeyCodeif(builtInKeyName&&eventKeyName&&!config.keyCodes[key]){returnisKeyNotMatch(builtInKeyName,eventKeyName)}elseif(mappedKeyCode){returnisKeyNotMatch(mappedKeyCode,eventKeyCode)}elseif(eventKeyName){returnhyphenate(eventKeyName)!==key}returneventKeyCode===undefined}