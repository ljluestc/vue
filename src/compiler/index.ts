import{parse}from'./parser/index'import{optimize}from'./optimizer'import{generate}from'./codegen/index'import{createCompilerCreator}from'./create-compiler'import{CompilerOptions,CompiledResult}from'types/compiler'//`createCompilerCreator`allowscreatingcompilersthatusealternative//parser/optimizer/codegen,e.gtheSSRoptimizingcompiler.//Herewejustexportadefaultcompilerusingthedefaultparts.exportconstcreateCompiler=createCompilerCreator(functionbaseCompile(template:string,options:CompilerOptions):CompiledResult{constast=parse(template.trim(),options)if(options.optimize!==false){optimize(ast,options)}constcode=generate(ast,options)return{ast,render:code.render,staticRenderFns:code.staticRenderFns}})