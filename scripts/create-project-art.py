from pathlib import Path
from html import escape
OUT=Path(__file__).resolve().parents[1]/'public/images/projects'
OUT.mkdir(parents=True,exist_ok=True)
def rect(x,y,w,h,fill,rx=0,extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" {extra}/>'
def text(x,y,value,size=16,color='#f0f0ed',weight=400,extra=''):
    return f'<text x="{x}" y="{y}" fill="{color}" font-size="{size}" font-weight="{weight}" font-family="Arial, sans-serif" {extra}>{escape(value)}</text>'
def start(bg):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><filter id="shadow" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="25" stdDeviation="25" flood-opacity=".23"/></filter><pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse"><path d="M35 0H0V35" fill="none" stroke="#ffffff" stroke-opacity=".05"/></pattern></defs>'+rect(0,0,1200,800,bg)+rect(0,0,1200,800,'url(#grid)')
def chrome(label,dark=False):
    a='#11171e' if dark else '#f8f8f5'
    b='#29313b' if dark else '#e2e4e3'
    s=rect(70,80,1060,640,a,18,'filter="url(#shadow)"')+rect(70,80,1060,48,b,18)+rect(70,108,1060,20,b)
    for i,c in enumerate(['#f17d78','#f3cc68','#81c998']): s+=f'<circle cx="{96+i*18}" cy="104" r="5" fill="{c}"/>'
    return s+rect(400,91,400,26,'#ffffff' if not dark else '#171f28',6)+text(600,109,label,11,'#7d848b',extra='text-anchor="middle"')
def write(name,s): (OUT/(name+'.svg')).write_text(s+'</svg>',encoding='utf-8')

s=start('#b6b0e6')+chrome('sharecollectibles.com')
s+=rect(70,128,190,592,'#f0f1eb')+text(94,174,'share',24,'#333f32',700)+text(157,174,'collectibles',15,'#333f32',600)
for i,label in enumerate(['My collections','Discover','Saved','Settings']):
    s+=rect(87,208+i*48,154,36,'#dbe4ca' if i==0 else 'transparent',7)+text(105,231+i*48,label,13,'#555f51',600 if i==0 else 400)
s+=text(296,181,'YOUR SPACE. YOUR COLLECTIONS.',11,'#7a8074',700)+text(294,223,'The collection keeps growing.',30,'#263323',700)+text(296,254,'Organize the things you love. Share them your way.',14,'#818877')
for i,(color,title,kind) in enumerate([('#e5bfb1','The sneaker shelf','PERSONAL COLLECTION'),('#d5dcbd','Trading card favorites','PERSONAL COLLECTION'),('#d2c9e0','Objects worth keeping','PERSONAL COLLECTION')]):
    x=294+i*264
    s+=rect(x,289,242,333,'#ffffff',12)+rect(x+10,299,222,220,color,8)+text(x+17,551,title,16,'#273328',600)+text(x+17,577,kind,9,'#8c9383',700)+text(x+17,605,'View collection  ↗',11,'#647654')
    if i==0:
        s+=f'<path d="M{x+43} 432q40 3 55-67l38 13 18 40 39 17q18 5 16 24H{x+38}Z" fill="#f7f4e7" stroke="#4e4744" stroke-width="3"/>'+f'<path d="M{x+42} 448h161m-97-59 37 9m-42 2 47 9m-52 2 55 9" stroke="#796b63" stroke-width="3"/>'
    elif i==1:
        s+=f'<g transform="rotate(-12 {x+120} 411)">'+rect(x+61,332,127,163,'#3f5d4d',10)+rect(x+69,341,111,121,'#e3d5a9',5)+f'<path d="M{x+122} 364l15 28 32 5-24 24 5 33-28-15-30 15 6-33-24-24 33-5Z" fill="#9b7751"/>'+text(x+80,482,'A FAVORITE FIND',8,'#f2edda',700)+'</g>'
    else:
        s+=f'<circle cx="{x+120}" cy="404" r="69" fill="#303740"/><circle cx="{x+120}" cy="404" r="52" fill="none" stroke="#596170" stroke-width="2"/><circle cx="{x+120}" cy="404" r="25" fill="#e4b393"/><circle cx="{x+120}" cy="404" r="6" fill="#303740"/>'
s+=text(294,670,'PRIVATE BY DEFAULT. SHARED BY YOU.',10,'#89927d',700)
write('collectibles',s)

s=start('#f16d40')+chrome('p1withmattandtommyfanpredictions.com',True)
s+=text(104,180,'P1',37,'#f56d42',700)+text(164,177,'PREDICTIONS PLAY-ALONG',14,'#eef0ed',700)+text(933,176,'THE FAN GRID',11,'#9caaa9',600)
s+=rect(103,210,994,1,'#2e3840')+text(104,269,'YOUR RACE. YOUR CALL.',42,'#f2f0e5',700)+text(106,302,'Make your picks. Follow the race. See where you stand.',15,'#99a6ac')
s+=rect(103,342,560,321,'#1c252e',10)+text(128,379,'NEXT ON THE CALENDAR',10,'#96a4ab',700)+text(128,417,'The prediction grid',24,'#f2eee4',700)
for i,label in enumerate(['Race winner','Podium finishers','Fastest lap']):
    s+=rect(128,439+i*61,509,48,'#26323b',6)+text(145,469+i*61,f'0{i+1}',12,'#f16d40',700)+text(184,469+i*61,label,14,'#d9dfdb')+text(598,469+i*61,'+',21,'#9fadb0')
s+=rect(687,342,410,321,'#252e35',10)+text(715,379,'THE CIRCUIT',10,'#a2adb2',700)+f'<path d="M740 546l36-71 51 10 26-47 71 8 44 55 73 8 8 57-72 4-17 37-68-11-7-39-58 8-44-19Z" fill="none" stroke="#f16d40" stroke-width="9" stroke-linejoin="round"/>'+text(714,636,'STRATEGY STARTS BEFORE LIGHTS OUT.',9,'#a3b0b5',700)
write('p1',s)

s=start('#bedbd0')+chrome('paintflow / workspace')
s+=rect(70,128,195,592,'#172a2d')+text(95,177,'paintflow',25,'#e9f3e5',700)
for i,label in enumerate(['Overview','Inventory','Invoices','Customers','Reports']):
    s+=rect(85,213+i*49,164,37,'#2f4c4a' if i==0 else 'transparent',6)+text(104,237+i*49,label,13,'#bdd0c4')
s+=text(300,180,'WORKSPACE / OVERVIEW',10,'#8b9996',700)+text(299,225,'Everything in order.',31,'#203937',700)+text(300,254,'A clearer view of the shop, from inventory to invoices.',14,'#84918a')
for i,(label,color) in enumerate([('PRODUCTS','#f0d6a8'),('INVENTORY','#c5d9cc'),('INVOICES','#d2d5ee')]):
    x=299+i*264
    s+=rect(x,284,242,114,color,10)+text(x+20,313,label,10,'#52665a',700)+text(x+20,356,['Product catalog','Stock overview','Billing workspace'][i],18,'#24413a',600)+text(x+20,380,'Open workspace  ↗',11,'#63756a')
s+=rect(299,425,771,236,'#ffffff',10)+text(323,463,'The inventory shelf',18,'#304b42',600)
for i,(label,color) in enumerate([('Interior finishes','#cfbaa3'),('Exterior collection','#a8b9c2'),('Primer & preparation','#c8cdb5')]):
    y=487+i*51
    s+=rect(322,y,30,30,color,5)+text(371,y+20,label,13,'#56685c')+text(832,y+20,'View products',11,'#7d8e83')+rect(980,y+3,60,23,'#e8f0e7',4)+text(989,y+19,'Catalog',10,'#496c53')
write('paintflow',s)

s=start('#75a4ed')+chrome('figma / accessibility checker',True)
s+=rect(70,128,164,592,'#1d222a')+text(89,170,'DESIGN FILE',10,'#a0aaba',700)
for i,label in enumerate(['Pages','Landing page','Components','Library']): s+=text(88,214+i*37,label,12,'#a4acb7')
s+=rect(234,128,590,592,'#303844')+rect(234,128,590,592,'url(#grid)')
s+=rect(312,220,431,378,'#f4f0e7',5,'filter="url(#shadow)"')+text(340,260,'EXAMPLE DESIGN',10,'#848b8b',700)+text(340,318,'Good design',34,'#252f3f',700)+text(340,357,'includes everyone.',32,'#7375ac',700)+text(340,401,'A closer look at contrast, type, and targets.',12,'#979ca3')+rect(340,438,180,45,'#8a82d5',7)+text(364,466,'Explore the design',12,'#ffffff',600)
s+='<path d="M303 210h451v401H303Z" fill="none" stroke="#9a85f0" stroke-width="2" stroke-dasharray="5 5"/>'
s+=rect(814,168,279,486,'#f8f8f5',12,'filter="url(#shadow)"')+text(835,207,'Accessibility Checker',18,'#263242',700)+text(835,235,'Check before you ship.',12,'#7c8793')+rect(834,259,238,43,'#263344',6)+text(894,286,'Run checks',13,'#ffffff',700)
for i,(title,desc,color) in enumerate([('Color contrast','Review text / background pairs','#edb675'),('Text size','Check smaller type styles','#a3d0a9'),('Touch targets','Review interactive areas','#b2b1e5'),('Alt text','Check image descriptions','#edb675')]):
    y=332+i*70
    s+=rect(834,y,238,60,'#eff1ee',6)+f'<circle cx="851" cy="{y+22}" r="5" fill="{color}"/>'+text(867,y+26,title,12,'#3b4857',600)+text(849,y+45,desc,10,'#84909a')
write('accessibility',s)
