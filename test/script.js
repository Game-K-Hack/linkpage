var hasHtml = false
var hasCss = false
var visible = false
window.addEventListener('message', (e) => {
    if (typeof e.data.clear !== 'undefined') {
        setHtml()
        setCss()
        checkVisibility()
        return
    }
    if (typeof e.data.css !== 'undefined') {
        setCss(e.data.css)
    }
    if (typeof e.data.html !== 'undefined') {
        setHtml(e.data.html)
    }
    checkVisibility()
})
function checkVisibility() {
    if (!visible && hasHtml && hasCss) {
        visible = true
        document.body.style.display = ''
    } else if (visible && (!hasHtml || !hasCss)) {
        visible = false
        document.body.style.display = 'none'
    }
}
function setHtml(html) {
    if (typeof html === 'undefined') {
        document.body.innerHTML = ''
        hasHtml = false
    } else {
        document.body.innerHTML = html
        hasHtml = true
    }
}
function setCss(css) {
    const style = document.getElementById('_style')
    const newStyle = document.createElement('style')
    newStyle.id = '_style'
    newStyle.innerHTML = typeof css === 'undefined' ? '' : css
    style.parentNode.replaceChild(newStyle, style)
    hasCss = typeof css === 'undefined' ? false : true
}