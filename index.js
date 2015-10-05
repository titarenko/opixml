var _ = require('lodash');
var Promise = require('bluebird');
var xml2js = require('xml2js');
var js2xml = require('js2xmlparser');
var parseXml = Promise.promisify(xml2js.parseString);

module.exports = {
	toXml: toXml,
	fromXml: fromXml
};

function toXml (obj) {
	var node = toXmlNode(obj);
	var key = _(node).keys().first();

	var xml = js2xml(key, node[key], {
		declaration: { include: false },
		attributeString: '$'
	});

	return Promise.resolve(xml);
}

function fromXml (xml) {
	return parseXml(xml, {
		explicitArray: false
	}).then(fromXmlNode);
}

function toXmlNode (obj) {
	var attrs = {};
	var body = _.transform(obj, function (result, value, name) {
		if (_.isArray(value) && !_.isString(value)) {
			result[name] = value.map(toXmlNode);
		} else if (_.isObject(value)) {
			result[name] = toXmlNode(value);
		} else {
			attrs[name] = value;
		}
	});
	return _.extend(body, { $: attrs });
}

function fromXmlNode (node) {
	var attrs = _.clone(node.$);
	var body = _.omit(node, ['$']);

	return _.transform(body, function (result, value, name) {
		if (_.isArray(value) && !_.isString(value)) {
			value = value.map(fromXmlNode);
		} else if (_.isObject(value)) {
			value = fromXmlNode(value);
		}
		result[name] = value;
	}, attrs);
}
