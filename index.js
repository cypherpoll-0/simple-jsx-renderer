/** @jsx h */

const ITEMS = 'hello there people'.split(' ')

function foo(items) {
    return items.map(p => <li> {p} </li>)
}

let vdom =(
    <div id="foo">
        <p>Simple Jsx renderer</p>
        <ul>{ foo(items) }</ul>
    </div>
)

let dom = render(vdom)

document.body.appendChild(dom)

let json = JSON.stringify(vdom, null, ' ')

document.body.appendChild( <pre>{json}</pre>)


function h(nodeName, attributes, ...args) {
    let children = args.length ? [].concat(...args) : null
    return {nodeName, attributes, children}
}

function render(vnode) {
    if (vnode.split) return document.createTextNode(vnode)

    let n = document.createElement(vnode.nodeName)

    let a = vnode.attributes || {}
    Object.keys(a).forEach(k => n.setAttribute(k, a[k]))

    (vnode.children || []).forEach(c => n.appendChild(render(c)))

    return n
}