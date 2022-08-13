import parseAttrsString from './parseAttrsString.js';

// parse函数，主函数
export default function (templateString) {
    let index = 0, startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/, endRegExp = /^\<\/([a-z]+[1-6]?)\>/, wordRegExp = /^([^\<])\<\/[a-z]+[1-6]?\>/,
    tagStack = [], contentStack = [{"children": []}];    
    while(index < templateString.length) {
        let restStr = templateString.substring(index);
        if(startRegExp.test(restStr)) {
            let tag = restStr.match(startRegExp)[1];
            let attr = restStr.match(startRegExp)[2]
            tagStack.push(tag);
            contentStack.push({"tag": tag, "attrs": parseAttrsString(attr), children: []});
            let length = attr != undefined? attr.length : 0;
            index += tag.length + 2 + length;
        }else if (endRegExp.test(restStr)) {
            let tag = restStr.match(endRegExp)[1];
            let tag_pop = tagStack.pop();
            if(tag == tag_pop) {
                let arr = contentStack.pop();
                if( contentStack.length > 0) {
                    contentStack[contentStack.length - 1].children.push(arr);
                }             
            }else {
                throw Error(tagStack[tagStack.length - 1] + "标签没有封闭")
            }
            index += tag.length + 3;
        }else if (wordRegExp.test(restStr)) {
            let text = restStr.match(wordRegExp)[1];
           if(!/^\s+$/.test(text)) {
                contentStack[contentStack.length -1].children.push({"text": text, "type": "3"});
           }
            index += text.length;
        }else {
            index++
        }
        
    }
    return contentStack[0].children[0];
};