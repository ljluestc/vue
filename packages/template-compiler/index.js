try{varvueVersion=require('vue').version}catch(e){}varpackageName=require('./package.json').namevarpackageVersion=require('./package.json').versionif(vueVersion&&vueVersion!==packageVersion){varvuePath=require.resolve('vue')varpackagePath=require.resolve('./package.json')thrownewError('\n\nVuepackagesversionmismatch:\n\n'+'-vue@'+vueVersion+'('+vuePath+')\n'+'-'+packageName+'@'+packageVersion+'('+packagePath+')\n\n'+'Thismaycausethingstoworkincorrectly.Makesuretousethesameversionforboth.\n'+'Ifyouareusingvue-loader@>=10.0,simplyupdatevue-template-compiler.\n'+'Ifyouareusingvue-loader@<10.0orvueify,re-installingvue-loader/vueifyshouldbump'+packageName+'tothelatest.\n')}module.exports=require('./build')