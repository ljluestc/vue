varapp=newVue({el:'#app',data:{databases:[]}})functionloadSamples(){app.databases=Object.freeze(ENV.generateData().toArray());Monitoring.renderRate.ping();setTimeout(loadSamples,ENV.timeout);}loadSamples()