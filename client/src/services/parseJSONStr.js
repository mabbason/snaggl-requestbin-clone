function parseJSONStr(str) {
  let output = str.replace(/\\/g, "");  
  output = JSON.parse(output);
  return output;  
}

export default parseJSONStr;