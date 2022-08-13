// 把attrsString变为数组返回
export default function (attrsString) {
    if(attrsString == undefined) return [];
    let isQuote = false, point = 0, result = [];
    for(let i = 0; i < attrsString.length; i++) {
        let ch = attrsString[i];
        if(ch == '"') {
            isQuote = !isQuote;
        }else if( /^\s$/.test(ch) && !isQuote) {
            if(!/^\s*$/.test(attrsString.substring(point, i))) {
                result.push(attrsString.substring(point, i).trim());
                point = i;
            }
        }
    }
    result.push(attrsString.substring(point));
    result = result.map(item => {
        let pair = item.match(/^(.+)="(.+)"$/);
        return {
            name: pair[1],
            value: pair[2]
        } 
    });
    return result;
}