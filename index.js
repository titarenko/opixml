var _ = require('lodash');
var Promise = require('bluebird');
var xml2js = require('xml2js');
var js2xml = require('js2xmlparser');
var parseXml = Promise.promisify(xml2js.parseString);

module.exports = {
	toXml: toXml,
	fromXml: fromXml
};

function toXml (obj, opts) {
	var node = toXmlNode(obj);
	var key = _(node).keys().first();

	opts = _.extend({}, opts, {
		attributeString: '$'
	});
	opts = _.defaults(opts, {
		declaration: { include: false }
	});

	var xml = js2xml(key, node[key], opts);

	return Promise.resolve(xml);
}

function fromXml (xml, opts) {
	opts = _.defaults(opts || {}, {
		explicitArray: false
	});
	return parseXml(xml, opts).then(fromXmlNode);
}

function toXmlNode (obj) {
	var attrs = {};
	var body = _.transform(obj, function (result, value, name) {
		if (_.isArray(value) && !_.isString(value)) {
			result[name] = value.map(toXmlNode);
		} else if (_.isObject(value)) {
			var keys = _.keys(value);
			result[name] = keys.length == 1 && keys[0] == '_' ? value['_'] : toXmlNode(value);
		} else if (name == '_') {
			result['#'] = value
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
