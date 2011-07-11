(function(tinymce){tinymce.makeMap=tinymce.makeMap||function(items,delim,map){var i;items=items||[];delim=delim||',';if(typeof(items)=="string")items=items.split(delim);map=map||{};i=items.length;while(i--)map[items[i]]={};return map}})(tinymce);

// add tinymce.html
(function(tinymce){var namedEntities,baseEntities,reverseEntities,attrsCharsRegExp=/[&<>\"\u007E-\uD7FF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,textCharsRegExp=/[<>&\u007E-\uD7FF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,rawCharsRegExp=/[<>&\"\']/g,entityRegExp=/&(#x|#)?([\w]+);/g,asciiMap={128:"\u20AC",130:"\u201A",131:"\u0192",132:"\u201E",133:"\u2026",134:"\u2020",135:"\u2021",136:"\u02C6",137:"\u2030",138:"\u0160",139:"\u2039",140:"\u0152",142:"\u017D",145:"\u2018",146:"\u2019",147:"\u201C",148:"\u201D",149:"\u2022",150:"\u2013",151:"\u2014",152:"\u02DC",153:"\u2122",154:"\u0161",155:"\u203A",156:"\u0153",158:"\u017E",159:"\u0178"};baseEntities={'"':'&quot;',"'":'&#39;','<':'&lt;','>':'&gt;','&':'&amp;'};reverseEntities={'&lt;':'<','&gt;':'>','&amp;':'&','&quot;':'"','&apos;':"'"};function nativeDecode(text){var elm;elm=document.createElement("div");elm.innerHTML=text;return elm.textContent||elm.innerText||text};function buildEntitiesLookup(items,radix){var i,chr,entity,lookup={};if(items){items=items.split(',');radix=radix||10;for(i=0;i<items.length;i+=2){chr=String.fromCharCode(parseInt(items[i],radix));if(!baseEntities[chr]){entity='&'+items[i+1]+';';lookup[chr]=entity;lookup[entity]=chr}}return lookup}};namedEntities=buildEntitiesLookup('50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,'+'5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,'+'5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,'+'5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,'+'68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,'+'6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,'+'6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,'+'75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,'+'7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,'+'7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,'+'sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,'+'st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,'+'t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,'+'tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,'+'u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,'+'81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,'+'8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,'+'8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,'+'8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,'+'8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,'+'nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,'+'rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,'+'Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,'+'80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,'+'811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro',32);tinymce.html=tinymce.html||{};tinymce.html.Entities={encodeRaw:function(text,attr){return text.replace(attr?attrsCharsRegExp:textCharsRegExp,function(chr){return baseEntities[chr]||chr})},encodeAllRaw:function(text){return(''+text).replace(rawCharsRegExp,function(chr){return baseEntities[chr]||chr})},encodeNumeric:function(text,attr){return text.replace(attr?attrsCharsRegExp:textCharsRegExp,function(chr){if(chr.length>1)return'&#'+(((chr.charCodeAt(0)-0xD800)*0x400)+(chr.charCodeAt(1)-0xDC00)+0x10000)+';';return baseEntities[chr]||'&#'+chr.charCodeAt(0)+';'})},encodeNamed:function(text,attr,entities){entities=entities||namedEntities;return text.replace(attr?attrsCharsRegExp:textCharsRegExp,function(chr){return baseEntities[chr]||entities[chr]||chr})},getEncodeFunc:function(name,entities){var Entities=tinymce.html.Entities;entities=buildEntitiesLookup(entities)||namedEntities;function encodeNamedAndNumeric(text,attr){return text.replace(attr?attrsCharsRegExp:textCharsRegExp,function(chr){return baseEntities[chr]||entities[chr]||'&#'+chr.charCodeAt(0)+';'||chr})};function encodeCustomNamed(text,attr){return Entities.encodeNamed(text,attr,entities)};name=tinymce.makeMap(name.replace(/\+/g,','));if(name.named&&name.numeric)return encodeNamedAndNumeric;if(name.named){if(entities)return encodeCustomNamed;return Entities.encodeNamed}if(name.numeric)return Entities.encodeNumeric;return Entities.encodeRaw},decode:function(text){return text.replace(entityRegExp,function(all,numeric,value){if(numeric){value=parseInt(value,numeric.length===2?16:10);if(value>0xFFFF){value-=0x10000;return String.fromCharCode(0xD800+(value>>10),0xDC00+(value&0x3FF))}else return asciiMap[value]||String.fromCharCode(value)}return reverseEntities[all]||namedEntities[all]||nativeDecode(all)})}}})(tinymce);tinymce.html.Styles=function(settings,schema){var rgbRegExp=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,urlOrStrRegExp=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,styleRegExp=/\s*([^:]+):\s*([^;]+);?/g,trimRightRegExp=/\s+$/,urlColorRegExp=/rgb/,undef,i,encodingLookup={},encodingItems;settings=settings||{};encodingItems='\\" \\\' \\; \\: ; : \uFEFF'.split(' ');for(i=0;i<encodingItems.length;i++){encodingLookup[encodingItems[i]]='\uFEFF'+i;encodingLookup['\uFEFF'+i]=encodingItems[i]}function toHex(match,r,g,b){function hex(val){val=parseInt(val).toString(16);return val.length>1?val:'0'+val};return'#'+hex(r)+hex(g)+hex(b)};return{toHex:function(color){return color.replace(rgbRegExp,toHex)},parse:function(css){var styles={},matches,name,value,isEncoded,urlConverter=settings.url_converter,urlConverterScope=settings.url_converter_scope||this;function compress(prefix,suffix){var top,right,bottom,left;top=styles[prefix+'-top'+suffix];if(!top)return;right=styles[prefix+'-right'+suffix];if(top!=right)return;bottom=styles[prefix+'-bottom'+suffix];if(right!=bottom)return;left=styles[prefix+'-left'+suffix];if(bottom!=left)return;styles[prefix+suffix]=left;delete styles[prefix+'-top'+suffix];delete styles[prefix+'-right'+suffix];delete styles[prefix+'-bottom'+suffix];delete styles[prefix+'-left'+suffix]};function canCompress(key){var value=styles[key],i;if(!value||value.indexOf(' ')<0)return;value=value.split(' ');i=value.length;while(i--){if(value[i]!==value[0])return false}styles[key]=value[0];return true};function compress2(target,a,b,c){if(!canCompress(a))return;if(!canCompress(b))return;if(!canCompress(c))return;styles[target]=styles[a]+' '+styles[b]+' '+styles[c];delete styles[a];delete styles[b];delete styles[c]};function encode(str){isEncoded=true;return encodingLookup[str]};function decode(str,keep_slashes){if(isEncoded){str=str.replace(/\uFEFF[0-9]/g,function(str){return encodingLookup[str]})}if(!keep_slashes)str=str.replace(/\\([\'\";:])/g,"$1");return str}if(css){css=css.replace(/\\[\"\';:\uFEFF]/g,encode).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(str){return str.replace(/[;:]/g,encode)});while(matches=styleRegExp.exec(css)){name=matches[1].replace(trimRightRegExp,'').toLowerCase();value=matches[2].replace(trimRightRegExp,'');if(name&&value.length>0){if(name==='font-weight'&&value==='700')value='bold';else if(name==='color'||name==='background-color')value=value.toLowerCase();value=value.replace(rgbRegExp,toHex);value=value.replace(urlOrStrRegExp,function(match,url,url2,url3,str,str2){str=str||str2;if(str){str=decode(str);return"'"+str.replace(/\'/g,"\\'")+"'"}url=decode(url||url2||url3);if(urlConverter)url=urlConverter.call(urlConverterScope,url,'style');return"url('"+url.replace(/\'/g,"\\'")+"')"});styles[name]=isEncoded?decode(value,true):value}styleRegExp.lastIndex=matches.index+matches[0].length}compress("border","");compress("border","-width");compress("border","-color");compress("border","-style");compress("padding","");compress("margin","");compress2('border','border-width','border-style','border-color');if(styles.border==='medium none')delete styles.border}return styles},serialize:function(styles,element_name){var css='',name,value;function serializeStyles(name){var styleList,i,l,value;styleList=schema.styles[name];if(styleList){for(i=0,l=styleList.length;i<l;i++){name=styleList[i];value=styles[name];if(value!==undef&&value.length>0)css+=(css.length>0?' ':'')+name+': '+value+';'}}};if(element_name&&schema&&schema.styles){serializeStyles('*');serializeStyles(element_name)}else{for(name in styles){value=styles[name];if(value!==undef&&value.length>0)css+=(css.length>0?' ':'')+name+': '+value+';'}}return css}}};(function(tinymce){var transitional={},boolAttrMap,blockElementsMap,shortEndedElementsMap,nonEmptyElementsMap,customElementsMap={},whiteSpaceElementsMap,selfClosingElementsMap,makeMap=tinymce.makeMap,each=tinymce.each;function split(str,delim){return str.split(delim||',')};function unpack(lookup,data){var key,elements={};function replace(value){return value.replace(/[A-Z]+/g,function(key){return replace(lookup[key])})};for(key in lookup){if(lookup.hasOwnProperty(key))lookup[key]=replace(lookup[key])}replace(data).replace(/#/g,'#text').replace(/(\w+)\[([^\]]+)\]\[([^\]]*)\]/g,function(str,name,attributes,children){attributes=split(attributes,'|');elements[name]={attributes:makeMap(attributes),attributesOrder:attributes,children:makeMap(children,'|',{'#comment':{}})}});return elements};blockElementsMap='h1,h2,h3,h4,h5,h6,hr,p,div,address,pre,form,table,tbody,thead,tfoot,'+'th,tr,td,li,ol,ul,caption,blockquote,center,dl,dt,dd,dir,fieldset,'+'noscript,menu,isindex,samp,header,footer,article,section,hgroup';blockElementsMap=makeMap(blockElementsMap,',',makeMap(blockElementsMap.toUpperCase()));transitional=unpack({Z:'H|K|N|O|P',Y:'X|form|R|Q',ZG:'E|span|width|align|char|charoff|valign',X:'p|T|div|U|W|isindex|fieldset|table',ZF:'E|align|char|charoff|valign',W:'pre|hr|blockquote|address|center|noframes',ZE:'abbr|axis|headers|scope|rowspan|colspan|align|char|charoff|valign|nowrap|bgcolor|width|height',ZD:'[E][S]',U:'ul|ol|dl|menu|dir',ZC:'p|Y|div|U|W|table|br|span|bdo|object|applet|img|map|K|N|Q',T:'h1|h2|h3|h4|h5|h6',ZB:'X|S|Q',S:'R|P',ZA:'a|G|J|M|O|P',R:'a|H|K|N|O',Q:'noscript|P',P:'ins|del|script',O:'input|select|textarea|label|button',N:'M|L',M:'em|strong|dfn|code|q|samp|kbd|var|cite|abbr|acronym',L:'sub|sup',K:'J|I',J:'tt|i|b|u|s|strike',I:'big|small|font|basefont',H:'G|F',G:'br|span|bdo',F:'object|applet|img|map|iframe',E:'A|B|C',D:'accesskey|tabindex|onfocus|onblur',C:'onclick|ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup',B:'lang|xml:lang|dir',A:'id|class|style|title'},'script[id|charset|type|language|src|defer|xml:space][]'+'style[B|id|type|media|title|xml:space][]'+'object[E|declare|classid|codebase|data|type|codetype|archive|standby|width|height|usemap|name|tabindex|align|border|hspace|vspace][#|param|Y]'+'param[id|name|value|valuetype|type][]'+'p[E|align][#|S]'+'a[E|D|charset|type|name|href|hreflang|rel|rev|shape|coords|target][#|Z]'+'br[A|clear][]'+'span[E][#|S]'+'bdo[A|C|B][#|S]'+'applet[A|codebase|archive|code|object|alt|name|width|height|align|hspace|vspace][#|param|Y]'+'h1[E|align][#|S]'+'img[E|src|alt|name|longdesc|width|height|usemap|ismap|align|border|hspace|vspace][]'+'map[B|C|A|name][X|form|Q|area]'+'h2[E|align][#|S]'+'iframe[A|longdesc|name|src|frameborder|marginwidth|marginheight|scrolling|align|width|height][#|Y]'+'h3[E|align][#|S]'+'tt[E][#|S]'+'i[E][#|S]'+'b[E][#|S]'+'u[E][#|S]'+'s[E][#|S]'+'strike[E][#|S]'+'big[E][#|S]'+'small[E][#|S]'+'font[A|B|size|color|face][#|S]'+'basefont[id|size|color|face][]'+'em[E][#|S]'+'strong[E][#|S]'+'dfn[E][#|S]'+'code[E][#|S]'+'q[E|cite][#|S]'+'samp[E][#|S]'+'kbd[E][#|S]'+'var[E][#|S]'+'cite[E][#|S]'+'abbr[E][#|S]'+'acronym[E][#|S]'+'sub[E][#|S]'+'sup[E][#|S]'+'input[E|D|type|name|value|checked|disabled|readonly|size|maxlength|src|alt|usemap|onselect|onchange|accept|align][]'+'select[E|name|size|multiple|disabled|tabindex|onfocus|onblur|onchange][optgroup|option]'+'optgroup[E|disabled|label][option]'+'option[E|selected|disabled|label|value][]'+'textarea[E|D|name|rows|cols|disabled|readonly|onselect|onchange][]'+'label[E|for|accesskey|onfocus|onblur][#|S]'+'button[E|D|name|value|type|disabled][#|p|T|div|U|W|table|G|object|applet|img|map|K|N|Q]'+'h4[E|align][#|S]'+'ins[E|cite|datetime][#|Y]'+'h5[E|align][#|S]'+'del[E|cite|datetime][#|Y]'+'h6[E|align][#|S]'+'div[E|align][#|Y]'+'ul[E|type|compact][li]'+'li[E|type|value][#|Y]'+'ol[E|type|compact|start][li]'+'dl[E|compact][dt|dd]'+'dt[E][#|S]'+'dd[E][#|Y]'+'menu[E|compact][li]'+'dir[E|compact][li]'+'pre[E|width|xml:space][#|ZA]'+'hr[E|align|noshade|size|width][]'+'blockquote[E|cite][#|Y]'+'address[E][#|S|p]'+'center[E][#|Y]'+'noframes[E][#|Y]'+'isindex[A|B|prompt][]'+'fieldset[E][#|legend|Y]'+'legend[E|accesskey|align][#|S]'+'table[E|summary|width|border|frame|rules|cellspacing|cellpadding|align|bgcolor][caption|col|colgroup|thead|tfoot|tbody|tr]'+'caption[E|align][#|S]'+'col[ZG][]'+'colgroup[ZG][col]'+'thead[ZF][tr]'+'tr[ZF|bgcolor][th|td]'+'th[E|ZE][#|Y]'+'form[E|action|method|name|enctype|onsubmit|onreset|accept|accept-charset|target][#|X|R|Q]'+'noscript[E][#|Y]'+'td[E|ZE][#|Y]'+'tfoot[ZF][tr]'+'tbody[ZF][tr]'+'area[E|D|shape|coords|href|nohref|alt|target][]'+'base[id|href|target][]'+'body[E|onload|onunload|background|bgcolor|text|link|vlink|alink][#|Y]');boolAttrMap=makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected,preload,autoplay,loop,controls');shortEndedElementsMap=makeMap('area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,source');nonEmptyElementsMap=tinymce.extend(makeMap('td,th,iframe,video,object'),shortEndedElementsMap);whiteSpaceElementsMap=makeMap('pre,script,style');selfClosingElementsMap=makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');tinymce.html.Schema=function(settings){var self=this,elements={},children={},patternElements=[],validStyles;settings=settings||{};if(settings.verify_html===false)settings.valid_elements='*[*]';if(settings.valid_styles){validStyles={};each(settings.valid_styles,function(value,key){validStyles[key]=tinymce.explode(value)})}function patternToRegExp(str){return new RegExp('^'+str.replace(/([?+*])/g,'.$1')+'$')};function addValidElements(valid_elements){var ei,el,ai,al,yl,matches,element,attr,attrData,elementName,attrName,attrType,attributes,attributesOrder,prefix,outputName,globalAttributes,globalAttributesOrder,transElement,key,childKey,value,elementRuleRegExp=/^([#+-])?([^\[\/]+)(?:\/([^\[]+))?(?:\[([^\]]+)\])?$/,attrRuleRegExp=/^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,hasPatternsRegExp=/[*?+]/;if(valid_elements){valid_elements=split(valid_elements);if(elements['@']){globalAttributes=elements['@'].attributes;globalAttributesOrder=elements['@'].attributesOrder}for(ei=0,el=valid_elements.length;ei<el;ei++){matches=elementRuleRegExp.exec(valid_elements[ei]);if(matches){prefix=matches[1];elementName=matches[2];outputName=matches[3];attrData=matches[4];attributes={};attributesOrder=[];element={attributes:attributes,attributesOrder:attributesOrder};if(prefix==='#')element.paddEmpty=true;if(prefix==='-')element.removeEmpty=true;if(globalAttributes){for(key in globalAttributes)attributes[key]=globalAttributes[key];attributesOrder.push.apply(attributesOrder,globalAttributesOrder)}if(attrData){attrData=split(attrData,'|');for(ai=0,al=attrData.length;ai<al;ai++){matches=attrRuleRegExp.exec(attrData[ai]);if(matches){attr={};attrType=matches[1];attrName=matches[2].replace(/::/g,':');prefix=matches[3];value=matches[4];if(attrType==='!'){element.attributesRequired=element.attributesRequired||[];element.attributesRequired.push(attrName);attr.required=true}if(attrType==='-'){delete attributes[attrName];attributesOrder.splice(tinymce.inArray(attributesOrder,attrName),1);continue}if(prefix){if(prefix==='='){element.attributesDefault=element.attributesDefault||[];element.attributesDefault.push({name:attrName,value:value});attr.defaultValue=value}if(prefix===':'){element.attributesForced=element.attributesForced||[];element.attributesForced.push({name:attrName,value:value});attr.forcedValue=value}if(prefix==='<')attr.validValues=makeMap(value,'?')}if(hasPatternsRegExp.test(attrName)){element.attributePatterns=element.attributePatterns||[];attr.pattern=patternToRegExp(attrName);element.attributePatterns.push(attr)}else{if(!attributes[attrName])attributesOrder.push(attrName);attributes[attrName]=attr}}}}if(!globalAttributes&&elementName=='@'){globalAttributes=attributes;globalAttributesOrder=attributesOrder}if(outputName){element.outputName=elementName;elements[outputName]=element}if(hasPatternsRegExp.test(elementName)){element.pattern=patternToRegExp(elementName);patternElements.push(element)}else elements[elementName]=element}}}};function setValidElements(valid_elements){elements={};patternElements=[];addValidElements(valid_elements);each(transitional,function(element,name){children[name]=element.children})};function addCustomElements(custom_elements){var customElementRegExp=/^(~)?(.+)$/;if(custom_elements){each(split(custom_elements),function(rule){var matches=customElementRegExp.exec(rule),inline=matches[1]==='~',cloneName=inline?'span':'div',name=matches[2];children[name]=children[cloneName];customElementsMap[name]=cloneName;if(!inline)blockElementsMap[name]={};each(children,function(element,child){if(element[cloneName])element[name]=element[cloneName]})})}};function addValidChildren(valid_children){var childRuleRegExp=/^([+\-]?)(\w+)\[([^\]]+)\]$/;if(valid_children){each(split(valid_children),function(rule){var matches=childRuleRegExp.exec(rule),parent,prefix;if(matches){prefix=matches[1];if(prefix)parent=children[matches[2]];else parent=children[matches[2]]={'#comment':{}};parent=children[matches[2]];each(split(matches[3],'|'),function(child){if(prefix==='-')delete parent[child];else parent[child]={}})}})}}if(!settings.valid_elements){each(transitional,function(element,name){elements[name]={attributes:element.attributes,attributesOrder:element.attributesOrder};children[name]=element.children});each(split('strong/b,em/i'),function(item){item=split(item,'/');elements[item[1]].outputName=item[0]});elements.img.attributesDefault=[{name:'alt',value:''}];each(split('ol,ul,sub,sup,blockquote,span,font,a,table,tbody,tr'),function(name){elements[name].removeEmpty=true});each(split('p,h1,h2,h3,h4,h5,h6,th,td,pre,div,address,caption'),function(name){elements[name].paddEmpty=true})}else setValidElements(settings.valid_elements);addCustomElements(settings.custom_elements);addValidChildren(settings.valid_children);addValidElements(settings.extended_valid_elements);addValidChildren('+ol[ul|ol],+ul[ul|ol]');if(settings.invalid_elements){tinymce.each(tinymce.explode(settings.invalid_elements),function(item){if(elements[item])delete elements[item]})}self.children=children;self.styles=validStyles;self.getBoolAttrs=function(){return boolAttrMap};self.getBlockElements=function(){return blockElementsMap};self.getShortEndedElements=function(){return shortEndedElementsMap};self.getSelfClosingElements=function(){return selfClosingElementsMap};self.getNonEmptyElements=function(){return nonEmptyElementsMap};self.getWhiteSpaceElements=function(){return whiteSpaceElementsMap};self.isValidChild=function(name,child){var parent=children[name];return!!(parent&&parent[child])};self.getElementRule=function(name){var element=elements[name],i;if(element)return element;i=patternElements.length;while(i--){element=patternElements[i];if(element.pattern.test(name))return element}};self.getCustomElements=function(){return customElementsMap};self.addValidElements=addValidElements;self.setValidElements=setValidElements;self.addCustomElements=addCustomElements;self.addValidChildren=addValidChildren};tinymce.html.Schema.boolAttrMap=boolAttrMap;tinymce.html.Schema.blockElementsMap=blockElementsMap})(tinymce);(function(tinymce){tinymce.html.SaxParser=function(settings,schema){var self=this,noop=function(){};settings=settings||{};self.schema=schema=schema||new tinymce.html.Schema();if(settings.fix_self_closing!==false)settings.fix_self_closing=true;tinymce.each('comment cdata text start end pi doctype'.split(' '),function(name){if(name)self[name]=settings[name]||noop});self.parse=function(html){var self=this,matches,index=0,value,endRegExp,stack=[],attrList,i,text,name,shortEndedElements,fillAttrsMap,isShortEnded,validate,elementRule,isValidElement,attr,attribsValue,validAttributesMap,validAttributePatterns,attributesRequired,attributesDefault,attributesForced,selfClosing,tokenRegExp,attrRegExp,specialElements,attrValue,idCount=0,decode=tinymce.html.Entities.decode,fixSelfClosing;function processEndTag(name){var pos,i;pos=stack.length;while(pos--){if(stack[pos].name===name)break}if(pos>=0){for(i=stack.length-1;i>=pos;i--){name=stack[i];if(name.valid)self.end(name.name)}stack.length=pos}};tokenRegExp=new RegExp('<(?:'+'(?:!--([\\w\\W]*?)-->)|'+'(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|'+'(?:!DOCTYPE([\\w\\W]*?)>)|'+'(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|'+'(?:\\/([^>]+)>)|'+'(?:([^\\s\\/<>]+)\\s*((?:[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*)>)'+')','g');attrRegExp=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:\\.|[^\"])*)\")|(?:\'((?:\\.|[^\'])*)\')|([^>\s]+)))?/g;specialElements={'script':/<\/script[^>]*>/gi,'style':/<\/style[^>]*>/gi,'noscript':/<\/noscript[^>]*>/gi};shortEndedElements=schema.getShortEndedElements();selfClosing=schema.getSelfClosingElements();fillAttrsMap=schema.getBoolAttrs();validate=settings.validate;fixSelfClosing=settings.fix_self_closing;while(matches=tokenRegExp.exec(html)){if(index<matches.index)self.text(decode(html.substr(index,matches.index-index)));if(value=matches[6]){processEndTag(value.toLowerCase())}else if(value=matches[7]){value=value.toLowerCase();isShortEnded=value in shortEndedElements;if(fixSelfClosing&&selfClosing[value]&&stack.length>0&&stack[stack.length-1].name===value)processEndTag(value);if(!validate||(elementRule=schema.getElementRule(value))){isValidElement=true;if(validate){validAttributesMap=elementRule.attributes;validAttributePatterns=elementRule.attributePatterns}if(attribsValue=matches[8]){attrList=[];attrList.map={};attribsValue.replace(attrRegExp,function(match,name,value,val2,val3){var attrRule,i;name=name.toLowerCase();value=name in fillAttrsMap?name:decode(value||val2||val3||'');if(validate&&name.indexOf('data-')!==0){attrRule=validAttributesMap[name];if(!attrRule&&validAttributePatterns){i=validAttributePatterns.length;while(i--){attrRule=validAttributePatterns[i];if(attrRule.pattern.test(name))break}if(i===-1)attrRule=null}if(!attrRule)return;if(attrRule.validValues&&!(value in attrRule.validValues))return}attrList.map[name]=value;attrList.push({name:name,value:value})})}else{attrList=[];attrList.map={}}if(validate){attributesRequired=elementRule.attributesRequired;attributesDefault=elementRule.attributesDefault;attributesForced=elementRule.attributesForced;if(attributesForced){i=attributesForced.length;while(i--){attr=attributesForced[i];name=attr.name;attrValue=attr.value;if(attrValue==='{$uid}')attrValue='mce_'+idCount++;attrList.map[name]=attrValue;attrList.push({name:name,value:attrValue})}}if(attributesDefault){i=attributesDefault.length;while(i--){attr=attributesDefault[i];name=attr.name;if(!(name in attrList.map)){attrValue=attr.value;if(attrValue==='{$uid}')attrValue='mce_'+idCount++;attrList.map[name]=attrValue;attrList.push({name:name,value:attrValue})}}}if(attributesRequired){i=attributesRequired.length;while(i--){if(attributesRequired[i]in attrList.map)break}if(i===-1)isValidElement=false}if(attrList.map['data-mce-bogus'])isValidElement=false}if(isValidElement)self.start(value,attrList,isShortEnded)}else isValidElement=false;if(endRegExp=specialElements[value]){endRegExp.lastIndex=index=matches.index+matches[0].length;if(matches=endRegExp.exec(html)){if(isValidElement)text=html.substr(index,matches.index-index);index=matches.index+matches[0].length}else{text=html.substr(index);index=html.length}if(isValidElement&&text.length>0)self.text(text,true);if(isValidElement)self.end(value);tokenRegExp.lastIndex=index;continue}if(!isShortEnded){if(!attribsValue||attribsValue.indexOf('/')!=attribsValue.length-1)stack.push({name:value,valid:isValidElement});else if(isValidElement)self.end(value)}}else if(value=matches[1]){self.comment(value)}else if(value=matches[2]){self.cdata(value)}else if(value=matches[3]){self.doctype(value)}else if(value=matches[4]){self.pi(value,matches[5])}index=matches.index+matches[0].length}if(index<html.length)self.text(decode(html.substr(index)));for(i=stack.length-1;i>=0;i--){value=stack[i];if(value.valid)self.end(value.name)}}}})(tinymce);(function(tinymce){var whiteSpaceRegExp=/^[ \t\r\n]*$/,typeLookup={'#text':3,'#comment':8,'#cdata':4,'#pi':7,'#doctype':10,'#document-fragment':11};function walk(node,root_node,prev){var sibling,parent,startName=prev?'lastChild':'firstChild',siblingName=prev?'prev':'next';if(node[startName])return node[startName];if(node!==root_node){sibling=node[siblingName];if(sibling)return sibling;for(parent=node.parent;parent&&parent!==root_node;parent=parent.parent){sibling=parent[siblingName];if(sibling)return sibling}}};function Node(name,type){this.name=name;this.type=type;if(type===1){this.attributes=[];this.attributes.map={}}}tinymce.extend(Node.prototype,{replace:function(node){var self=this;if(node.parent)node.remove();self.insert(node,self);self.remove();return self},attr:function(name,value){var self=this,attrs,i,undef;if(typeof name!=="string"){for(i in name)self.attr(i,name[i]);return self}if(attrs=self.attributes){if(value!==undef){if(value===null){if(name in attrs.map){delete attrs.map[name];i=attrs.length;while(i--){if(attrs[i].name===name){attrs=attrs.splice(i,1);return self}}}return self}if(name in attrs.map){i=attrs.length;while(i--){if(attrs[i].name===name){attrs[i].value=value;break}}}else attrs.push({name:name,value:value});attrs.map[name]=value;return self}else{return attrs.map[name]}}},clone:function(){var self=this,clone=new Node(self.name,self.type),i,l,selfAttrs,selfAttr,cloneAttrs;if(selfAttrs=self.attributes){cloneAttrs=[];cloneAttrs.map={};for(i=0,l=selfAttrs.length;i<l;i++){selfAttr=selfAttrs[i];if(selfAttr.name!=='id'){cloneAttrs[cloneAttrs.length]={name:selfAttr.name,value:selfAttr.value};cloneAttrs.map[selfAttr.name]=selfAttr.value}}clone.attributes=cloneAttrs}clone.value=self.value;clone.shortEnded=self.shortEnded;return clone},wrap:function(wrapper){var self=this;self.parent.insert(wrapper,self);wrapper.append(self);return self},unwrap:function(){var self=this,node,next;for(node=self.firstChild;node;){next=node.next;self.insert(node,self,true);node=next}self.remove()},remove:function(){var self=this,parent=self.parent,next=self.next,prev=self.prev;if(parent){if(parent.firstChild===self){parent.firstChild=next;if(next)next.prev=null}else{prev.next=next}if(parent.lastChild===self){parent.lastChild=prev;if(prev)prev.next=null}else{next.prev=prev}self.parent=self.next=self.prev=null}return self},append:function(node){var self=this,last;if(node.parent)node.remove();last=self.lastChild;if(last){last.next=node;node.prev=last;self.lastChild=node}else self.lastChild=self.firstChild=node;node.parent=self;return node},insert:function(node,ref_node,before){var parent;if(node.parent)node.remove();parent=ref_node.parent||this;if(before){if(ref_node===parent.firstChild)parent.firstChild=node;else ref_node.prev.next=node;node.prev=ref_node.prev;node.next=ref_node;ref_node.prev=node}else{if(ref_node===parent.lastChild)parent.lastChild=node;else ref_node.next.prev=node;node.next=ref_node.next;node.prev=ref_node;ref_node.next=node}node.parent=parent;return node},getAll:function(name){var self=this,node,collection=[];for(node=self.firstChild;node;node=walk(node,self)){if(node.name===name)collection.push(node)}return collection},empty:function(){var self=this,nodes,i,node;if(self.firstChild){nodes=[];for(node=self.firstChild;node;node=walk(node,self))nodes.push(node);i=nodes.length;while(i--){node=nodes[i];node.parent=node.firstChild=node.lastChild=node.next=node.prev=null}}self.firstChild=self.lastChild=null;return self},isEmpty:function(elements){var self=this,node=self.firstChild,i,name;if(node){do{if(node.type===1){if(node.attributes.map['data-mce-bogus'])continue;if(elements[node.name])return false;i=node.attributes.length;while(i--){name=node.attributes[i].name;if(name==="name"||name.indexOf('data-')===0)return false}}if((node.type===3&&!whiteSpaceRegExp.test(node.value)))return false}while(node=walk(node,self))}return true},walk:function(prev){return walk(this,null,prev)}});tinymce.extend(Node,{create:function(name,attrs){var node,attrName;node=new Node(name,typeLookup[name]||1);if(attrs){for(attrName in attrs)node.attr(attrName,attrs[attrName])}return node}});tinymce.html.Node=Node})(tinymce);(function(tinymce){var Node=tinymce.html.Node;tinymce.html.DomParser=function(settings,schema){var self=this,nodeFilters={},attributeFilters=[],matchedNodes={},matchedAttributes={};settings=settings||{};settings.validate="validate"in settings?settings.validate:true;settings.root_name=settings.root_name||'body';self.schema=schema=schema||new tinymce.html.Schema();function fixInvalidChildren(nodes){var ni,node,parent,parents,newParent,currentNode,tempNode,childNode,i,childClone,nonEmptyElements,nonSplitableElements,sibling,nextNode;nonSplitableElements=tinymce.makeMap('tr,td,th,tbody,thead,tfoot,table');nonEmptyElements=schema.getNonEmptyElements();for(ni=0;ni<nodes.length;ni++){node=nodes[ni];if(!node.parent)continue;parents=[node];for(parent=node.parent;parent&&!schema.isValidChild(parent.name,node.name)&&!nonSplitableElements[parent.name];parent=parent.parent)parents.push(parent);if(parent&&parents.length>1){parents.reverse();newParent=currentNode=self.filterNode(parents[0].clone());for(i=0;i<parents.length-1;i++){if(schema.isValidChild(currentNode.name,parents[i].name)){tempNode=self.filterNode(parents[i].clone());currentNode.append(tempNode)}else tempNode=currentNode;for(childNode=parents[i].firstChild;childNode&&childNode!=parents[i+1];){nextNode=childNode.next;tempNode.append(childNode);childNode=nextNode}currentNode=tempNode}if(!newParent.isEmpty(nonEmptyElements)){parent.insert(newParent,parents[0],true);parent.insert(node,newParent)}else{parent.insert(node,parents[0],true)}parent=parents[0];if(parent.isEmpty(nonEmptyElements)||parent.firstChild===parent.lastChild&&parent.firstChild.name==='br'){parent.empty().remove()}}else if(node.parent){if(node.name==='li'){sibling=node.prev;if(sibling&&(sibling.name==='ul'||sibling.name==='ul')){sibling.append(node);continue}sibling=node.next;if(sibling&&(sibling.name==='ul'||sibling.name==='ul')){sibling.insert(node,sibling.firstChild,true);continue}node.wrap(self.filterNode(new Node('ul',1)));continue}if(schema.isValidChild(node.parent.name,'div')&&schema.isValidChild('div',node.name)){node.wrap(self.filterNode(new Node('div',1)))}else{if(node.name==='style'||node.name==='script')node.empty().remove();else node.unwrap()}}}};self.filterNode=function(node){var i,name,list;if(name in nodeFilters){list=matchedNodes[name];if(list)list.push(node);else matchedNodes[name]=[node]}i=attributeFilters.length;while(i--){name=attributeFilters[i].name;if(name in node.attributes.map){list=matchedAttributes[name];if(list)list.push(node);else matchedAttributes[name]=[node]}}return node};self.addNodeFilter=function(name,callback){tinymce.each(tinymce.explode(name),function(name){var list=nodeFilters[name];if(!list)nodeFilters[name]=list=[];list.push(callback)})};self.addAttributeFilter=function(name,callback){tinymce.each(tinymce.explode(name),function(name){var i;for(i=0;i<attributeFilters.length;i++){if(attributeFilters[i].name===name){attributeFilters[i].callbacks.push(callback);return}}attributeFilters.push({name:name,callbacks:[callback]})})};self.parse=function(html,args){var parser,rootNode,node,nodes,i,l,fi,fl,list,name,validate,blockElements,startWhiteSpaceRegExp,invalidChildren=[],endWhiteSpaceRegExp,allWhiteSpaceRegExp,whiteSpaceElements,children,nonEmptyElements,rootBlockName;args=args||{};matchedNodes={};matchedAttributes={};blockElements=tinymce.extend(tinymce.makeMap('script,style,head,html,body,title,meta,param'),schema.getBlockElements());nonEmptyElements=schema.getNonEmptyElements();children=schema.children;validate=settings.validate;rootBlockName="forced_root_block"in args?args.forced_root_block:settings.forced_root_block;whiteSpaceElements=schema.getWhiteSpaceElements();startWhiteSpaceRegExp=/^[ \t\r\n]+/;endWhiteSpaceRegExp=/[ \t\r\n]+$/;allWhiteSpaceRegExp=/[ \t\r\n]+/g;function addRootBlocks(){var node=rootNode.firstChild,next,rootBlockNode;while(node){next=node.next;if(node.type==3||(node.type==1&&node.name!=='p'&&!blockElements[node.name]&&!node.attr('data-mce-type'))){if(!rootBlockNode){rootBlockNode=createNode(rootBlockName,1);rootNode.insert(rootBlockNode,node);rootBlockNode.append(node)}else rootBlockNode.append(node)}else{rootBlockNode=null}node=next}};function createNode(name,type){var node=new Node(name,type),list;if(name in nodeFilters){list=matchedNodes[name];if(list)list.push(node);else matchedNodes[name]=[node]}return node};function removeWhitespaceBefore(node){var textNode,textVal,sibling;for(textNode=node.prev;textNode&&textNode.type===3;){textVal=textNode.value.replace(endWhiteSpaceRegExp,'');if(textVal.length>0){textNode.value=textVal;textNode=textNode.prev}else{sibling=textNode.prev;textNode.remove();textNode=sibling}}};parser=new tinymce.html.SaxParser({validate:validate,fix_self_closing:!validate,cdata:function(text){node.append(createNode('#cdata',4)).value=text},text:function(text,raw){var textNode;if(!whiteSpaceElements[node.name]){text=text.replace(allWhiteSpaceRegExp,' ');if(node.lastChild&&blockElements[node.lastChild.name])text=text.replace(startWhiteSpaceRegExp,'')}if(text.length!==0){textNode=createNode('#text',3);textNode.raw=!!raw;node.append(textNode).value=text}},comment:function(text){node.append(createNode('#comment',8)).value=text},pi:function(name,text){node.append(createNode(name,7)).value=text;removeWhitespaceBefore(node)},doctype:function(text){var newNode;newNode=node.append(createNode('#doctype',10));newNode.value=text;removeWhitespaceBefore(node)},start:function(name,attrs,empty){var newNode,attrFiltersLen,elementRule,textNode,attrName,text,sibling,parent;elementRule=validate?schema.getElementRule(name):{};if(elementRule){newNode=createNode(elementRule.outputName||name,1);newNode.attributes=attrs;newNode.shortEnded=empty;node.append(newNode);parent=children[node.name];if(parent&&children[newNode.name]&&!parent[newNode.name])invalidChildren.push(newNode);attrFiltersLen=attributeFilters.length;while(attrFiltersLen--){attrName=attributeFilters[attrFiltersLen].name;if(attrName in attrs.map){list=matchedAttributes[attrName];if(list)list.push(newNode);else matchedAttributes[attrName]=[newNode]}}if(blockElements[name])removeWhitespaceBefore(newNode);if(!empty)node=newNode}},end:function(name){var textNode,elementRule,text,sibling,tempNode;elementRule=validate?schema.getElementRule(name):{};if(elementRule){if(blockElements[name]){if(!whiteSpaceElements[node.name]){for(textNode=node.firstChild;textNode&&textNode.type===3;){text=textNode.value.replace(startWhiteSpaceRegExp,'');if(text.length>0){textNode.value=text;textNode=textNode.next}else{sibling=textNode.next;textNode.remove();textNode=sibling}}for(textNode=node.lastChild;textNode&&textNode.type===3;){text=textNode.value.replace(endWhiteSpaceRegExp,'');if(text.length>0){textNode.value=text;textNode=textNode.prev}else{sibling=textNode.prev;textNode.remove();textNode=sibling}}}textNode=node.prev;if(textNode&&textNode.type===3){text=textNode.value.replace(startWhiteSpaceRegExp,'');if(text.length>0)textNode.value=text;else textNode.remove()}}if(elementRule.removeEmpty||elementRule.paddEmpty){if(node.isEmpty(nonEmptyElements)){if(elementRule.paddEmpty)node.empty().append(new Node('#text','3')).value='\u00a0';else{if(!node.attributes.map.name){tempNode=node.parent;node.empty().remove();node=tempNode;return}}}}node=node.parent}}},schema);rootNode=node=new Node(args.context||settings.root_name,11);parser.parse(html);if(validate&&invalidChildren.length){if(!args.context)fixInvalidChildren(invalidChildren);else args.invalid=true}if(rootBlockName&&rootNode.name=='body')addRootBlocks();if(!args.invalid){for(name in matchedNodes){list=nodeFilters[name];nodes=matchedNodes[name];fi=nodes.length;while(fi--){if(!nodes[fi].parent)nodes.splice(fi,1)}for(i=0,l=list.length;i<l;i++)list[i](nodes,name,args)}for(i=0,l=attributeFilters.length;i<l;i++){list=attributeFilters[i];if(list.name in matchedAttributes){nodes=matchedAttributes[list.name];fi=nodes.length;while(fi--){if(!nodes[fi].parent)nodes.splice(fi,1)}for(fi=0,fl=list.callbacks.length;fi<fl;fi++)list.callbacks[fi](nodes,list.name,args)}}}return rootNode};if(settings.remove_trailing_brs){self.addNodeFilter('br',function(nodes,name){var i,l=nodes.length,node,blockElements=schema.getBlockElements(),nonEmptyElements=schema.getNonEmptyElements(),parent,prev,prevName;blockElements.body=1;for(i=0;i<l;i++){node=nodes[i];parent=node.parent;if(blockElements[node.parent.name]&&node===parent.lastChild){prev=node.prev;while(prev){prevName=prev.name;if(prevName!=="span"||prev.attr('data-mce-type')!=='bookmark'){if(prevName!=="br")break;if(prevName==='br'){node=null;break}}prev=prev.prev}if(node){node.remove();if(parent.isEmpty(nonEmptyElements)){elementRule=schema.getElementRule(parent.name);if(elementRule.removeEmpty)parent.remove();else if(elementRule.paddEmpty)parent.empty().append(new tinymce.html.Node('#text',3)).value='\u00a0'}}}}})}}})(tinymce);tinymce.html.Writer=function(settings){var html=[],indent,indentBefore,indentAfter,encode,htmlOutput;settings=settings||{};indent=settings.indent;indentBefore=tinymce.makeMap(settings.indent_before||'');indentAfter=tinymce.makeMap(settings.indent_after||'');encode=tinymce.html.Entities.getEncodeFunc(settings.entity_encoding||'raw',settings.entities);htmlOutput=settings.element_format=="html";return{start:function(name,attrs,empty){var i,l,attr,value;if(indent&&indentBefore[name]&&html.length>0){value=html[html.length-1];if(value.length>0&&value!=='\n')html.push('\n')}html.push('<',name);if(attrs){for(i=0,l=attrs.length;i<l;i++){attr=attrs[i];html.push(' ',attr.name,'="',encode(attr.value,true),'"')}}if(!empty||htmlOutput)html[html.length]='>';else html[html.length]=' />';if(empty&&indent&&indentAfter[name]&&html.length>0){value=html[html.length-1];if(value.length>0&&value!=='\n')html.push('\n')}},end:function(name){var value;html.push('</',name,'>');if(indent&&indentAfter[name]&&html.length>0){value=html[html.length-1];if(value.length>0&&value!=='\n')html.push('\n')}},text:function(text,raw){if(text.length>0)html[html.length]=raw?text:encode(text)},cdata:function(text){html.push('<![CDATA[',text,']]>')},comment:function(text){html.push('<!--',text,'-->')},pi:function(name,text){if(text)html.push('<?',name,' ',text,'?>');else html.push('<?',name,'?>');if(indent)html.push('\n')},doctype:function(text){html.push('<!DOCTYPE',text,'>',indent?'\n':'')},reset:function(){html.length=0},getContent:function(){return html.join('').replace(/\n$/,'')}}};(function(tinymce){tinymce.html.Serializer=function(settings,schema){var self=this,writer=new tinymce.html.Writer(settings);settings=settings||{};settings.validate="validate"in settings?settings.validate:true;self.schema=schema=schema||new tinymce.html.Schema();self.writer=writer;self.serialize=function(node){var handlers,validate;validate=settings.validate;handlers={3:function(node,raw){writer.text(node.value,node.raw)},8:function(node){writer.comment(node.value)},7:function(node){writer.pi(node.name,node.value)},10:function(node){writer.doctype(node.value)},4:function(node){writer.cdata(node.value)},11:function(node){if((node=node.firstChild)){do{walk(node)}while(node=node.next)}}};writer.reset();function walk(node){var handler=handlers[node.type],name,isEmpty,attrs,attrName,attrValue,sortedAttrs,i,l,elementRule;if(!handler){name=node.name;isEmpty=node.shortEnded;attrs=node.attributes;if(validate&&attrs&&attrs.length>1){sortedAttrs=[];sortedAttrs.map={};elementRule=schema.getElementRule(node.name);for(i=0,l=elementRule.attributesOrder.length;i<l;i++){attrName=elementRule.attributesOrder[i];if(attrName in attrs.map){attrValue=attrs.map[attrName];sortedAttrs.map[attrName]=attrValue;sortedAttrs.push({name:attrName,value:attrValue})}}for(i=0,l=attrs.length;i<l;i++){attrName=attrs[i].name;if(!(attrName in sortedAttrs.map)){attrValue=attrs.map[attrName];sortedAttrs.map[attrName]=attrValue;sortedAttrs.push({name:attrName,value:attrValue})}}attrs=sortedAttrs}writer.start(node.name,attrs,isEmpty);if(!isEmpty){if((node=node.firstChild)){do{walk(node)}while(node=node.next)}writer.end(name)}}else handler(node)}if(node.type==1&&!settings.inner)walk(node);else handlers[11](node);return writer.getContent()}}})(tinymce);

// override tinymce.dom.Serializer
(function(tinymce){tinymce.dom.Serializer=function(settings,dom,schema){var onPreProcess,onPostProcess,isIE=tinymce.isIE,each=tinymce.each,htmlParser;if(!settings.apply_source_formatting)settings.indent=false;settings.remove_trailing_brs=true;dom=dom||tinymce.DOM;schema=schema||new tinymce.html.Schema(settings);settings.entity_encoding=settings.entity_encoding||'named';onPreProcess=new tinymce.util.Dispatcher(self);onPostProcess=new tinymce.util.Dispatcher(self);htmlParser=new tinymce.html.DomParser(settings,schema);htmlParser.addAttributeFilter('src,href,style',function(nodes,name){var i=nodes.length,node,value,internalName='data-mce-'+name,urlConverter=settings.url_converter,urlConverterScope=settings.url_converter_scope,undef;while(i--){node=nodes[i];value=node.attributes.map[internalName];if(value!==undef){node.attr(name,value.length>0?value:null);node.attr(internalName,null)}else{value=node.attributes.map[name];if(name==="style")value=dom.serializeStyle(dom.parseStyle(value),node.name);else if(urlConverter)value=urlConverter.call(urlConverterScope,value,name,node.name);node.attr(name,value.length>0?value:null)}}});htmlParser.addAttributeFilter('class',function(nodes,name){var i=nodes.length,node,value;while(i--){node=nodes[i];value=node.attr('class').replace(/\s*mce(Item\w+|Selected)\s*/g,'');node.attr('class',value.length>0?value:null)}});htmlParser.addAttributeFilter('data-mce-type',function(nodes,name,args){var i=nodes.length,node;while(i--){node=nodes[i];if(node.attributes.map['data-mce-type']==='bookmark'&&!args.cleanup)node.remove()}});htmlParser.addNodeFilter('script,style',function(nodes,name){var i=nodes.length,node,value;function trim(value){return value.replace(/(<!--\[CDATA\[|\]\]-->)/g,'\n').replace(/^[\r\n]*|[\r\n]*$/g,'').replace(/^\s*(\/\/\s*<!--|\/\/\s*<!\[CDATA\[|<!--|<!\[CDATA\[)[\r\n]*/g,'').replace(/\s*(\/\/\s*\]\]>|\/\/\s*-->|\]\]>|-->|\]\]-->)\s*$/g,'')};while(i--){node=nodes[i];value=node.firstChild?node.firstChild.value:'';if(name==="script"){node.attr('type',(node.attr('type')||'text/javascript').replace(/^mce\-/,''));if(value.length>0)node.firstChild.value='// <![CDATA[\n'+trim(value)+'\n// ]]>'}else{if(value.length>0)node.firstChild.value='<!--\n'+trim(value)+'\n-->'}}});htmlParser.addNodeFilter('#comment',function(nodes,name){var i=nodes.length,node;while(i--){node=nodes[i];if(node.value.indexOf('[CDATA[')===0){node.name='#cdata';node.type=4;node.value=node.value.replace(/^\[CDATA\[|\]\]$/g,'')}else if(node.value.indexOf('mce:protected ')===0){node.name="#text";node.type=3;node.raw=true;node.value=unescape(node.value).substr(14)}}});htmlParser.addNodeFilter('xml:namespace,input',function(nodes,name){var i=nodes.length,node;while(i--){node=nodes[i];if(node.type===7)node.remove();else if(node.type===1){if(name==="input"&&!("type"in node.attributes.map))node.attr('type','text')}}});if(settings.fix_list_elements){htmlParser.addNodeFilter('ul,ol',function(nodes,name){var i=nodes.length,node,parentNode;while(i--){node=nodes[i];parentNode=node.parent;if(parentNode.name==='ul'||parentNode.name==='ol'){if(node.prev&&node.prev.name==='li'){node.prev.append(node)}}}})}htmlParser.addAttributeFilter('data-mce-src,data-mce-href,data-mce-style',function(nodes,name){var i=nodes.length;while(i--){nodes[i].attr(name,null)}});return{schema:schema,addNodeFilter:htmlParser.addNodeFilter,addAttributeFilter:htmlParser.addAttributeFilter,onPreProcess:onPreProcess,onPostProcess:onPostProcess,serialize:function(node,args){var impl,doc,oldDoc,htmlSerializer,content;if(isIE&&dom.select('script,style,select').length>0){content=node.innerHTML;node=node.cloneNode(false);dom.setHTML(node,content)}else node=node.cloneNode(true);impl=node.ownerDocument.implementation;if(impl.createHTMLDocument){doc=impl.createHTMLDocument("");each(node.nodeName=='BODY'?node.childNodes:[node],function(node){doc.body.appendChild(doc.importNode(node,true))});if(node.nodeName!='BODY')node=doc.body.firstChild;else node=doc.body;oldDoc=dom.doc;dom.doc=doc}args=args||{};args.format=args.format||'html';if(!args.no_events){args.node=node;onPreProcess.dispatch(self,args)}htmlSerializer=new tinymce.html.Serializer(settings,schema);args.content=htmlSerializer.serialize(htmlParser.parse(args.getInner?node.innerHTML:tinymce.trim(dom.getOuterHTML(node),args),args));if(!args.cleanup)args.content=args.content.replace(/\uFEFF/g,'');if(!args.no_events)onPostProcess.dispatch(self,args);if(oldDoc)dom.doc=oldDoc;args.node=null;return args.content},addRules:function(rules){schema.addValidElements(rules)},setRules:function(rules){schema.setValidElements(rules)}}}})(tinymce);

function embedly(){
  return "[embedly]";
}

(function(){
  var JSON = tinymce.util.JSON;
  var Node = tinymce.html.Node;
  var s = tinymce.settings;
  var t = this;
  
  function toArray(obj){
    var un, arr, i;
    if(obj && !obj.splice){
      arr = [];
      for(i in obj){
        if(obj[i])
          arr[i] = obj[i];
      }
      return arr;
    }
    return obj;
  };
  
  tinymce.create('tinymce.plugins.embedly', {
    init: function(ed, url){
      var self = this;
      self.editor = t.editor = ed;
      self.schema = new tinymce.html.Schema(s);
      
      function isEmbedlyImg(node){
        return node && node.nodeName === 'IMG' && ed.dom.hasClass(node, 'mceItemEmbedly');
      }
      
      ed.parser = ed.parser || new tinymce.html.DomParser(s, self.schema);
      
      self.url = url;
      if(typeof embedly_key != "undefined")
        self.key = embedly_key;
      else
        self.key = '';
      self.endpoint = typeof embedly_endpoint != "undefined" ? embedly_endpoint : 'oembed';
      ed.onPreInit.add(function(){
        // in case embeds have videos or audio tags
        // convert our embed to an Image tag for manipulation
        self.schema.addValidElements('img[src|class|*],div[id|class|*],iframe[src|*],object[id|style|width|height|classid|codebase|*],param[name|value],embed[id|style|width|height|type|src|*],video[*],audio[*],source[*]');
        ed.parser = ed.parser || new tinymce.html.DomParser(s, self.schema);
        ed.parser.addNodeFilter('div', function(nodes, name){
          var i = nodes.length;
          while(i--){
            if(nodes[i].attr('data-ajax'))
              self.embedToImg(nodes[i]);
          }
        });
        ed.serializer = ed.serializer || new tinymce.dom.Serializer(s, ed.dom, self.schema);
        ed.serializer.addNodeFilter('img', function(nodes, name, args){
          var i = nodes.length, node;
          while(i--){
            node = nodes[i];
            if ((node.attr('class') || '').indexOf('mceItemEmbedly') !== -1)
              self.imgToEmbed(node, args);
          }
        });
      });
      
      
      
      ed.onInit.add(function(){
        // add embedly css file to TinyMCE editor window
        ed.dom.loadCSS(EMBEDLY_TINYMCE+'/css/embedly_editor.css');
        // Display "embedly" instead of "img" in element path
        if (ed.theme && ed.theme.onResolveName) {
          ed.theme.onResolveName.add(function(theme, path_object){
            if(path_object.name === 'img' && ed.dom.hasClass(path_object.node, 'mceItemEmbedly'))
              path_object.name = 'embedly';
          });
        }
        
        // context menu
        if(ed && ed.plugins.contextmenu){
          ed.plugins.contextmenu.onContextMenu.add(function(plugin, menu, element) {
            if (element.nodName === 'IMG' && element.className.indexOf('mceItemEmbedly') !== -1)
              menu.add({title: 'embedly.edit', icon : 'embedly', cmd : 'mceEmbedly'});
          });
        }
        
      });
      
      ed.addCommand('mceEmbedly', function(){
        var data, img;
        // data should follow format:
        // { url: 'url to embed', width: 500, height:500, words: 250, thumbnail: 0, embed: 'html' }
        img = ed.selection.getNode();
        if(isEmbedlyImg(img)) {
          data = ed.dom.getAttrib(img, 'data-ajax');
          if(data){
            data = JSON.parse(data);
          }
        } if(!data){
          data = {
          }
        }
        
        data['key'] = self.key;
        data['endpoint'] = self.endpoint
        
        ed.windowManager.open({
          file : url + '/embed.htm',
          width : 500 + parseInt(ed.getLang('embedly.delta_width', 0)),
          height: 450 + parseInt(ed.getLang('embedly.delta_height', 0)),
          inline:1
        }, {
          plugin_url:url,
          data:data
        });
      });
          
      // Register Buttons
      ed.addButton('embedly', 
                     {title : 'embedly.embedly_desc', 
                      image : EMBEDLY_TINYMCE+'/img/icon.gif',
                        cmd : 'mceEmbedly'});
          
      ed.onNodeChange.add(function(ed, cm, node){
        cm.setActive('embedly', isEmbedlyImg(node));
      });  
    },
    
    getInfo: function(){
      return {
        longname : 'Embedly',
        author : 'Embed.ly, Inc.',
        authorurl: 'http://embed.ly',
        infourl: 'http://embed.ly/docs/libraries',
        version: tinymce.majorVersion + '.' + tinymce.minorVersion
      };
    },
    
    /*
     * Convert JSON data object to an img node
     */
    dataToImg: function(data){
      var self = this, editor = self.editor, settings = editor.settings, img;
      
      img = self.editor.dom.create('img', {
                     id : data.id,
                  style : data.style,
                  align : data.align || 'left',
                    src : EMBEDLY_TINYMCE + '/img/trans.gif',
                'class' : 'mceItemEmbedly',
        'data-ajax' : JSON.serialize(data, "'")
      });
      img.width = data.width || 320;
      img.height = data.height || 241;
      
      return img;
    },
    
    dataToHtml : function(data) {
      return this.editor.serializer.serialize(this.dataToImg(data), {forced_root_block : ''});
    },
    
    htmlToData : function(html) {
      var fragment, img, imgs, data;
      fragment = this.editor.parser.parse(html);
      imgs = fragment.getAll('img');
      for(img in imgs){
        data = JSON.parse(img.attr('data-ajax'));
        if(data)
          return data;
      }
      return false;
    },
    
    imgToEmbed : function(node, args) {
      var self = this, editor = self.editor, embed, data, style;
      data = node.attr('data-ajax');
      if (!data)
        return;
      data = JSON.parse(data);
      
      style = node.attr('data-mce-style');
      if (!style) {
        style = node.attr('style');
        if (style)
          style = editor.dom.serializeStyle(editor.dom.parseStyle(style, 'img'));
        else
          style = '';
      }
      style += 'max-width:'+ node.attr('width') + 'px;';
      if(node.attr('height') != 241)
        style += 'max-height:'+ node.attr('height') + 'px;';
      
      
      console.log(style);
      if(data.embed){
        var ser = JSON.serialize(data, "'");
        embed = new Node('div', 1);
        value = new Node('#text', 3);
        value.raw = true;
        value.value = data.embed;
        embed.append(value);
        embed.attr('class', 'mceItemEmbedly' );
        embed.attr('style', style);
        embed.attr('data-ajax', ser);
      }
      if(embed)
        node.replace(embed);
      else
        node.remove();
    },
    
    embedToImg : function(node) {
      console.log('fired');
      var embed, img, width, height, style, words, url, data;
      function getInnerHTML(node) {
        return new tinymce.html.Serializer({
          inner: true,
          validate: false
        }).serialize(node);
      };
      
      // if node isn't in the document
      if (!node.parent)
        return;
        
      if ( node.attr('data-ajax') != ''){
        data = node.attr('data-ajax');
      } else {
        return;
      }
        
      data = JSON.parse(data) || {
        url: null,
        width: null,
        height: null,
        words: null,
        embed: null,
        thumbnail: 0
      }
      
      img = new Node('img', 1);
      img.attr({
        src : EMBEDLY_TINYMCE + '/img/trans.gif'
      });
      
      //console.log(node);
      node.replace(img);
      //node.remove();
      
      id = node.attr('id');
      style = node.attr('style');
      
      img.attr({
        id : id,
        'class' : 'mceItemEmbedly',
        style : style,
        width : data.width || "320",
        height : data.height || "240",
        "data-ajax" : JSON.serialize(data, "'")
      });
    }
    
    
  });
  tinymce.PluginManager.add('embedly', tinymce.plugins.embedly);
})();