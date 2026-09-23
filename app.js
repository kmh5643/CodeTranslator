const input=document.getElementById('input'), output=document.getElementById('output');
const direction=document.getElementById('direction');
document.getElementById('convert').onclick=()=>{
 const s=input.value;
 if(!s.trim()){output.value='코드를 입력해주세요.';return}
 output.value=direction.value==='py-js'?pyToJs(s):jsToPy(s);
};
document.getElementById('clear').onclick=()=>{input.value='';output.value='';};
document.getElementById('copy').onclick=async()=>{
 if(output.value) await navigator.clipboard.writeText(output.value);
};
function pyToJs(s){
 let x=s;
 x=x.replace(/print\((.*?)\)/g,'console.log($1);');
 x=x.replace(/input\((.*?)\)/g,'prompt($1)');
 x=x.replace(/\bTrue\b/g,'true').replace(/\bFalse\b/g,'false').replace(/\bNone\b/g,'null');
 x=x.replace(/^\s*([A-Za-z_$][\w$]*)\s*=\s*(.+)$/gm,'let $1 = $2;');
 x=x.replace(/for\s+(\w+)\s+in\s+range\((\d+)\):\s*\n\s+(.+)/g,'for (let $1 = 0; $1 < $2; $1++) {\n    $3\n}');
 return x;
}
function jsToPy(s){
 let x=s;
 x=x.replace(/console\.log\((.*?)\);?/g,'print($1)');
 x=x.replace(/prompt\((.*?)\)/g,'input($1)');
 x=x.replace(/\btrue\b/g,'True').replace(/\bfalse\b/g,'False').replace(/\bnull\b/g,'None');
 x=x.replace(/^\s*(?:const|let|var)\s+([A-Za-z_]\w*)\s*=\s*(.+);$/gm,'$1 = $2');
 return x;
}