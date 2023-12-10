// 入力文字のエスケープ処理関数
export function escapeSpecialChars(str){
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// htmlの文字列からhtml要素を作成して返す
export function htmlToElement(html){
    // templateタグを作成している
    const template = document.createElement("template");
    // 作成したtemplateタグのinnerHTMLプロパティに文字列のhtmlを入れる
    template.innerHTML = html
    // 作成したtemplateタグの最初の要素を取得する
    return template.content.firstElementChild
}

// 文字列の配列と可変長の変数からHTML要素を作成する関数
export function element(strings, ...values){
    const htmlString = strings.reduce((result, str, i) => {
        const value = values[i - 1];
        if(typeof value === "string"){
            return result + escapeSpecialChars(value) + str;
        }else{
            return result + String(value) + str;
        }
    });
    return htmlToElement(htmlString);
}

// 
export function render(bodyElement, containerElement){
    containerElement.innerHTML = "";
    containerElement.appendChild(bodyElement);
}