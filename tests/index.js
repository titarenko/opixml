var opixml = require('../');
var should = require('should');

var xmlSample = '<root attr="10">\n\
	<subnode subattr="foo"/>\n\
</root>';

var objSample = {
	root: {
		attr: '10',
		subnode: { subattr: 'foo' }
	}
};

describe('opixml', function () {
	describe('toXml', function () {
		it('should convert JS object to XML', function (done) {
			opixml.toXml(objSample).then(function (xml) {
				xml.should.eql(xmlSample);
				done();
			}).catch(done);
		});
	});
	describe('fromXml', function () {
		it('should convert XML to JS object', function (done) {
			opixml.fromXml(xmlSample).then(function (obj) {
				obj.should.eql(objSample);
				done();
			}).catch(done);
		});
	});
});
