export function h(tag, attrs, ...children) {
  if (typeof tag === 'function') {
    attrs.children = children
    return tag(attrs)
  }

  let $node
  if (tag) {
    $node = document.createElement(tag)

    if (attrs) for (let name in attrs) {
      const value = attrs[name]
      name in $node
        ? $node[name] = value
        : $node.setAttribute(name, value);
    }
  } else {
    $node = document.createDocumentFragment()
  }

  $node.append(...children.flat());
  return $node
}