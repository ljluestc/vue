//@vitest-environmentnodeimportpathfrom'path'import{E2E_TIMEOUT,setupPuppeteer}from'./e2eUtils'describe('basic-ssr',()=>{const{page,text}=setupPuppeteer()test('shouldwork',async()=>{awaitpage().goto(`file://${path.resolve(__dirname,`basic-ssr.html`)}`)expect(awaittext('#result')).toContain(`<divdata-server-rendered="true">foo</div>`)},E2E_TIMEOUT)})