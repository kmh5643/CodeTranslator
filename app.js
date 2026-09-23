const API_BASE = "http://localhost:8000";
const input=document.getElementById("input"), output=document.getElementById("output");
const direction=document.getElementById("direction"), status=document.getElementById("status"), message=document.getElementById("message");
document.getElementById("convert").onclick=async()=>{
 const code=input.value.trim(); if(!code){output.value="";message.textContent="코드를 입력해주세요.";return}
 output.value="AI가 코드를 분석하고 있습니다..."; message.textContent="";
 try{
  const res=await fetch(`${API_BASE}/api/convert`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code,direction:direction.value})});
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const data=await res.json(); output.value=data.code||""; status.textContent="AI connected"; message.textContent=`모델: ${data.model||"AI"}`;
 }catch(e){output.value=demoConvert(code,direction.value);status.textContent="Demo mode";message.textContent="AI 서버에 연결되지 않아 데모 변환 결과를 표시했습니다."}
};
document.getElementById("clear").onclick=()=>{input.value="";output.value="";message.textContent=""};
document.getElementById("copy").onclick=async()=>{if(!output.value)return;await navigator.clipboard.writeText(output.value);message.textContent="변환 결과를 복사했습니다."};
function demoConvert(code,dir){let x=code;if(dir==="python_to_javascript"){x=x.replace(/print\((.*?)\)/g,"console.log($1);").replace(/input\((.*?)\)/g,"prompt($1)").replace(/\bTrue\b/g,"true").replace(/\bFalse\b/g,"false").replace(/\bNone\b/g,"null");return x}return x.replace(/console\.log\((.*?)\);?/g,"print($1)").replace(/prompt\((.*?)\)/g,"input($1)").replace(/\btrue\b/g,"True").replace(/\bfalse\b/g,"False").replace(/\bnull\b/g,"None")}
