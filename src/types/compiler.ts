import{BindingMetadata}from'sfc/types'exporttypeCompilerOptions={warn?:Functionallowcustomizingwarningindifferentenvironments;e.g.nodemodules?:Array<ModuleOptions>platformspecificmodules;e.g.style;classdirectives?:{[key:string]:Function}platformspecificdirectivesstaticKeys?:stringalistofASTpropertiestobeconsideredstatic;foroptimizationisUnaryTag?:(tag:string)=>boolean|undefinedcheckifatagisunaryfortheplatformcanBeLeftOpenTag?:(tag:string)=>boolean|undefinedcheckifatagcanbeleftopenedisReservedTag?:(tag:string)=>boolean|undefinedcheckifatagisanativefortheplatformpreserveWhitespace?:booleanpreservewhitespacebetweenelements?(Deprecated)whitespace?:'preserve'|'condense'whitespacehandlingstrategyoptimize?:booleanoptimizestaticcontent?webspecificmustUseProp?:(tag:string,type:string|null,name:string)=>booleancheckifanattributeshouldbeboundasapropertyisPreTag?:(attr:string)=>boolean|nullcheckifatagneedstopreservewhitespacegetTagNamespace?:(tag:string)=>string|undefinedcheckthenamespaceforatagexpectHTML?:booleanonlyfalsefornon-webbuildsisFromDOM?:booleanshouldDecodeTags?:booleanshouldDecodeNewlines?:booleanshouldDecodeNewlinesForHref?:booleanoutputSourceRange?:booleanshouldKeepComment?:booleanruntimeuser-configurabledelimiters?:[string,string]templatedelimiterscomments?:booleanpreservecommentsintemplateforssroptimizationcompilerscopeId?:stringSFCanalyzedscriptbindingsfrom`compileScript()`bindings?:BindingMetadata}exporttypeWarningMessage={msg:stringstart?:numberend?:number}exporttypeCompiledResult={ast:ASTElement|nullrender:stringstaticRenderFns:Array<string>stringRenderFns?:Array<string>errors?:Array<string|WarningMessage>tips?:Array<string|WarningMessage>}exporttypeModuleOptions={transformanASTnodebeforeanyattributesareprocessedreturninganASTElementfrompre/transformsreplacestheelementpreTransformNode?:(el:ASTElement)=>ASTElement|null|voidtransformanASTnodeafterbuilt-inslikev-if,v-forareprocessedtransformNode?:(el:ASTElement)=>ASTElement|null|voidtransformanASTnodeafteritschildrenhavebeenprocessedcannotreturnreplacementinpostTransformbecausetreeisalreadyfinalizedpostTransformNode?:(el:ASTElement)=>voidgenData?:(el:ASTElement)=>stringgenerateextradatastringforanelementtransformCode?:(el:ASTElement,code:string)=>stringfurthertransformgeneratedcodeforanelementstaticKeys?:Array<string>ASTpropertiestobeconsideredstatic}exporttypeASTModifiers={[key:string]:boolean}exporttypeASTIfCondition={exp:string|null;block:ASTElement}exporttypeASTIfConditions=Array<ASTIfCondition>exporttypeASTAttr={name:stringvalue:anydynamic?:booleanstart?:numberend?:number}exporttypeASTElementHandler={value:stringparams?:Array<any>modifiers:ASTModifiers|nulldynamic?:booleanstart?:numberend?:number}exporttypeASTElementHandlers={[key:string]:ASTElementHandler|Array<ASTElementHandler>}exporttypeASTDirective={name:stringrawName:stringvalue:stringarg:string|nullisDynamicArg:booleanmodifiers:ASTModifiers|nullstart?:numberend?:number}exporttypeASTNode=ASTElement|ASTText|ASTExpressionexporttypeASTElement={type:1tag:stringattrsList:Array<ASTAttr>attrsMap:{[key:string]:any}rawAttrsMap:{[key:string]:ASTAttr}parent:ASTElement|voidchildren:Array<ASTNode>start?:numberend?:numberprocessed?:truestatic?:booleanstaticRoot?:booleanstaticInFor?:booleanstaticProcessed?:booleanhasBindings?:booleantext?:stringattrs?:Array<ASTAttr>dynamicAttrs?:Array<ASTAttr>props?:Array<ASTAttr>plain?:booleanpre?:truens?:stringcomponent?:stringinlineTemplate?:truetransitionMode?:string|nullslotName?:string|nullslotTarget?:string|nullslotTargetDynamic?:booleanslotScope?:string|nullscopedSlots?:{[name:string]:ASTElement}ref?:stringrefInFor?:booleanif?:stringifProcessed?:booleanelseif?:stringelse?:trueifConditions?:ASTIfConditionsfor?:stringforProcessed?:booleankey?:stringalias?:stringiterator1?:stringiterator2?:stringstaticClass?:stringclassBinding?:stringstaticStyle?:stringstyleBinding?:stringevents?:ASTElementHandlersnativeEvents?:ASTElementHandlerstransition?:string|truetransitionOnAppear?:booleanmodel?:{value:stringcallback:stringexpression:string}directives?:Array<ASTDirective>forbidden?:trueonce?:trueonceProcessed?:booleanwrapData?:(code:string)=>stringwrapListeners?:(code:string)=>string2.4ssroptimizationssrOptimizability?:number}exporttypeASTExpression={type:2expression:stringtext:stringtokens:Array<string|Object>static?:boolean2.4ssroptimizationssrOptimizability?:numberstart?:numberend?:number}exporttypeASTText={type:3text:stringstatic?:booleanisComment?:boolean2.4ssroptimizationssrOptimizability?:numberstart?:numberend?:number}