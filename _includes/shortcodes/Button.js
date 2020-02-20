module.exports = (text="Button", href="#", outline=false, small=false) => {
    let classVal = "button";
    if(outline){classVal += " outline"}
    if(small){classVal += " small"}

    return `
        <a href="${ href }" class="${ classVal }">
            ${ text }
        </a>
    `;
}