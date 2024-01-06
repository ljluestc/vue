import{parseStyleText}from'web/util/style'constbase64ImgUrl='url("data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==")'constlogoUrl='url(https:vuejs.org/images/logo.png)'it('shouldparsenormalstaticstyle',()=>{conststaticStyle=`font-size:12px;background:${logoUrl};color:red`constres=parseStyleText(staticStyle)expect(res.background).toBe(logoUrl)expect(res.color).toBe('red')expect(res['font-size']).toBe('12px')})it('shouldparsebase64background',()=>{conststaticStyle=`background:${base64ImgUrl}`constres=parseStyleText(staticStyle)expect(res.background).toBe(base64ImgUrl)})it('shouldparsemultiplebackgroundimages',()=>{letstaticStyle=`background:${logoUrl},${logoUrl};`letres=parseStyleText(staticStyle)expect(res.background).toBe(`${logoUrl},${logoUrl}`)staticStyle=`background:${base64ImgUrl},${base64ImgUrl}`res=parseStyleText(staticStyle)expect(res.background).toBe(`${base64ImgUrl},${base64ImgUrl}`)})it('shouldparseotherimages',()=>{letstaticStyle=`shape-outside:${logoUrl}`letres=parseStyleText(staticStyle)expect(res['shape-outside']).toBe(logoUrl)staticStyle=`list-style-image:${logoUrl}`res=parseStyleText(staticStyle)expect(res['list-style-image']).toBe(logoUrl)staticStyle=`border-image:${logoUrl}3030repeat`res=parseStyleText(staticStyle)expect(res['border-image']).toBe(`${logoUrl}3030repeat`)})