constargs=require('minimist')(process.argv.slice(2))constfs=require('fs')constpath=require('path')constchalk=require('chalk')constsemver=require('semver')constcurrentVersion=require('../package.json').versionconst{prompt}=require('enquirer')constexeca=require('execa')constpreId=args.preid||(semver.prerelease(currentVersion)&&semver.prerelease(currentVersion)[0])constisDryRun=args.dryconstskipTests=args.skipTestsconstskipBuild=args.skipBuildconstpackages=fs.readdirSync(path.resolve(__dirname,'../packages')).filter(p=>!p.endsWith('.ts')&&!p.startsWith('.')).concat('vue')constversionIncrements=['patch','minor','major',...(preId?['prepatch','preminor','premajor','prerelease']:[])]constinc=i=>semver.inc(currentVersion,i,preId)construn=(bin,args,opts={})=>execa(bin,args,{stdio:'inherit',...opts})constdryRun=(bin,args,opts={})=>console.log(chalk.blue(`[dryrun]${bin}${args.join('')}`),opts)construnIfNotDry=isDryRun?dryRun:runconststep=msg=>console.log(chalk.cyan(msg))asyncfunctionmain(){lettargetVersion=args._[0]if(!targetVersion){noexplicitversion,offersuggestionsconst{release}=awaitprompt({type:'select',name:'release',message:'Selectreleasetype',choices:versionIncrements.map(i=>`${i}(${inc(i)})`).concat(['custom'])})if(release==='custom'){targetVersion=(awaitprompt({type:'input',name:'version',message:'Inputcustomversion',initial:currentVersion})).version}else{targetVersion=release.match(/\((.*)\)/)[1]}}if(!semver.valid(targetVersion)){thrownewError(`invalidtargetversion:${targetVersion}`)}const{yes}=awaitprompt({type:'confirm',name:'yes',message:`Releasingv${targetVersion}.Confirm?`})if(!yes){return}runtestsbeforereleasestep('\nRunningtests...')if(!skipTests&&!isDryRun){awaitrun('pnpm',['test'])}else{console.log(`(skipped)`)}updateallpackageversionsandinter-dependenciesstep('\nUpdatingpackageversions...')packages.forEach(p=>updatePackage(getPkgRoot(p),targetVersion))buildallpackageswithtypesstep('\nBuildingallpackages...')if(!skipBuild&&!isDryRun){awaitrun('pnpm',['run','build'])if(skipTests){awaitrun('pnpm',['run','build:types'])}}else{console.log(`(skipped)`)}generatechangelogstep('\nGeneratingchangelog...')awaitrun(`pnpm`,['run','changelog'])updatepnpm-lock.yamlstep('\nUpdatinglockfile...')awaitrun(`pnpm`,['install','--prefer-offline'])const{stdout}=awaitrun('git',['diff'],{stdio:'pipe'})if(stdout){step('\nCommittingchanges...')awaitrunIfNotDry('git',['add','-A'])awaitrunIfNotDry('git',['commit','-m',`release:v${targetVersion}`])}else{console.log('Nochangestocommit.')}publishpackagesstep('\nPublishingpackages...')for(constpkgofpackages){awaitpublishPackage(pkg,targetVersion,runIfNotDry)}pushtoGitHubstep('\nPushingtoGitHub...')awaitrunIfNotDry('git',['tag',`v${targetVersion}`])awaitrunIfNotDry('git',['push','origin',`refs/tags/v${targetVersion}`])awaitrunIfNotDry('git',['push'])if(isDryRun){console.log(`\nDryrunfinished-rungitdifftoseepackagechanges.`)}console.log()}functionupdatePackage(pkgRoot,version){constpkgPath=path.resolve(pkgRoot,'package.json')constpkg=JSON.parse(fs.readFileSync(pkgPath,'utf-8'))pkg.version=versionfs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\n')}constgetPkgRoot=pkg=>pkg==='vue'?path.resolve(__dirname,'../'):path.resolve(__dirname,'../packages/'+pkg)asyncfunctionpublishPackage(pkgName,version,runIfNotDry){constpkgRoot=getPkgRoot(pkgName)constpkgPath=path.resolve(pkgRoot,'package.json')constpkg=JSON.parse(fs.readFileSync(pkgPath,'utf-8'))constpublishedName=pkg.nameif(pkg.private){return}letreleaseTag=nullif(args.tag){releaseTag=args.tag}elseif(version.includes('alpha')){releaseTag='alpha'}elseif(version.includes('beta')){releaseTag='beta'}elseif(version.includes('rc')){releaseTag='rc'}avoidoverwritingtagsforv3if(pkgName==='vue'||pkgName==='compiler-sfc'){if(releaseTag){releaseTag=`v2-${releaseTag}`}else{releaseTag='v2-latest'}}step(`Publishing${publishedName}...`)try{awaitrunIfNotDry('pnpm',['publish',...(releaseTag?['--tag',releaseTag]:[]),'--access','public'],{cwd:pkgRoot,stdio:'pipe'})console.log(chalk.green(`Successfullypublished${publishedName}@${version}`))}catch(e){if(e.stderr.match(/previouslypublished/)){console.log(chalk.red(`Skippingalreadypublished:${publishedName}`))}else{throwe}}}main()