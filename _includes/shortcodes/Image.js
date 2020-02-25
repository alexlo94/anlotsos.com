module.exports = (src, alt, square = false, outline = false, zoom = true, lazy = true,) => {
    let classVal = "frame image";
    if(square) {classVal += " square"}
    if(outline) {classVal += " outline"}
    if(zoom) {classVal += " zoom"}
    if(lazy) {classVal += " lazyload"}

    return `
<div class="${ classVal }">
  <img src="${ src }" alt="${ alt }">
</div>
    `;
}