importVuefrom'vue'helperforasyncassertions.Uselikethis:vm.a=123waitForUpdate(()=>{expect(vm.$el.textContent).toBe('123')vm.a=234}).then(()=>{moreassertions...}).then(done)interfaceJobextendsFunction{wait?:booleanfail?:(e:any)=>void}constwaitForUpdate=(initialCb:Job)=>{letendconstqueue:Job[]=initialCb?[initialCb]:[]functionshift(){constjob=queue.shift()if(queue.length){lethasError=falsetry{job!.wait?job!(shift):job!()}catch(e){hasError=trueconstdone=queue[queue.length-1]if(done&&done.fail){done.fail(e)}}if(!hasError&&!job!.wait){if(queue.length){Vue.nextTick(shift)}}}elseif(job&&(job.fail||job===end)){job()done}}Vue.nextTick(()=>{if(!queue.length||(!end&&!queue[queue.length-1]!.fail)){thrownewError('waitForUpdatechainismissing.then(done)')}shift()})constchainer={then:nextCb=>{queue.push(nextCb)returnchainer},thenWaitFor:wait=>{if(typeofwait==='number'){wait=timeout(wait)}wait.wait=truequeue.push(wait)returnchainer},end:endFn=>{queue.push(endFn)end=endFn}}returnchainer}functiontimeout(n){returnnext=>setTimeout(next,n)}export{waitForUpdate}