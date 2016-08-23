# OpiXML

Opinionated XML generator and parser.

[![Build Status](https://travis-ci.org/titarenko/opixml.svg?branch=master)](https://travis-ci.org/titarenko/opixml)
[![Coverage Status](https://coveralls.io/repos/github/titarenko/opixml/badge.svg?branch=master)](https://coveralls.io/github/titarenko/opixml?branch=master)

## Installation

```sh
npm i opixml --save
```

## Description

Under the hood it's built on top of `xml2js` and `js2xmlparser`, but has unified interface and certain rules of mapping JS to XML and vice versa. You can pass options object for each library in appropriate method as second argument.

Mapping rules:
- everything that is scalar is interperted as attribute
- everything that is non-scalar is interpreted as node

## Example

```js
var obj = { 
	root: { 
		attr: '10', 
		subnode: { attr: 'foo' },
		othernode: { _: 'value' },
		container: {
			item: [
				{ one: { _: '1' } },
				{ two: { value: '2' } }
			]
		}
	}
};
opixml.toXml(obj).then(console.log);
```

```xml
<root attr="10">
	<subnode attr="foo"/>
	<othernode>value</othernode>
	<container>
		<item>
			<one>1</one>
		</item>
		<item>
			<two value="2"/>
		</item>
	</container>
</root>
```

```js
opixml.fromXml(xml).then(console.log); // you'd see obj deserialized from XML
```

## License

MIT
