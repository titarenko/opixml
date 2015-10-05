# OpiXML

Opinionated XML generator and parser.

## Installation

```sh
npm i opixml --save
```

## Description

Under the hood it's built on top of `xml2js` and `js2xmlparser`, but has unified interface and certain rules of mapping JS to XML and vice versa.

Mapping rules:
- everything that is scalar is interperted as attribute
- everything that is non-scalar is interpreted as node

## Example

```js
var obj = { 
	root: { 
		attr: '10', 
		subnode: { attr: 'foo '} 
	} 
};
opixml.toXml(obj).then(console.log);
```

```xml
<root attr="10">
	<subnode attr="foo"/>
</root>
```

```js
opixml.fromXml(xml).then(console.log); // you'd see obj deserialized from XML
```

## License

MIT
