'usestrict'process.env.NODE_ENV='production'constVue=require('../../dist/vue.runtime.common.js')constcreateRenderer=require('../../packages/server-renderer').createRendererconstrenderToString=createRenderer().renderToStringconstgridComponent=require('./common.js')console.log('---renderToString---')constself=(global||root)self.s=self.performance.now()renderToString(newVue(gridComponent),(err,res)=>{if(err)throwerr//console.log(res)console.log('Completetime:'+(self.performance.now()-self.s).toFixed(2)+'ms')console.log()})