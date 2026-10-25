export function analyze(code,language='javascript') {
 const issues=[];const lines=code.split('\n');
 const add=(line,severity,title,detail,fix)=>issues.push({line,severity,title,detail,fix});
 lines.forEach((line,i)=>{
  const n=i+1;
  if(/\b(eval|new Function)\s*\(/.test(line))add(n,'critical','Dynamic code execution','Avoid evaluating untrusted source.','Replace dynamic evaluation with explicit parsing.');
  if(/\bconsole\.log\s*\(/.test(line))add(n,'info','Console logging','Remove debug output before shipping.','Use a configurable logger.');
  if(/\b(var)\s+\w+/.test(line)&&language==='javascript')add(n,'warning','Legacy variable declaration','var is function scoped and can be surprising.','Prefer let or const.');
  if(/(password|api[_-]?key|secret)\s*[:=]\s*['"][^'"]{4,}['"]/i.test(line))add(n,'critical','Potential embedded secret','Credentials should not be committed to source.','Read secrets from environment variables.');
  if(/\bTODO\b|\bFIXME\b/.test(line))add(n,'info','Unresolved task marker','Track this task before release.','Resolve the TODO or link an issue.');
  if(line.length>120)add(n,'warning','Long line','Line exceeds 120 characters.','Split into readable expressions.');
  if(/\binnerHTML\s*=/.test(line))add(n,'warning','HTML injection surface','Untrusted HTML can lead to XSS.','Prefer textContent or sanitize trusted HTML.');
  if(/except\s*:\s*$/.test(line)&&language==='python')add(n,'warning','Bare except','Catches unexpected errors including interrupts.','Catch specific exception classes.');
 });
 if(language==='javascript'&&/\bfunction\s+\w+\s*\(/.test(code)&&!code.includes('try'))add(1,'info','Error handling review','Check whether external calls need error handling.','Handle failures at IO boundaries.');
 const counts={critical:0,warning:0,info:0};issues.forEach(x=>counts[x.severity]++);
 return {language,lines:lines.length,characters:code.length,issues,counts,score:Math.max(0,100-counts.critical*18-counts.warning*7-counts.info*2)};
}
export function validateCode(code){if(typeof code!=='string'||!code.trim())throw Error('Enter some code to analyze');if(code.length>60000)throw Error('Code exceeds 60,000 characters')}
