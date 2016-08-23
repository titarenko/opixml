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
		it('it should handle example from readme correctly', function (done) {
			opixml.toXml({ 
				root: { 
					attr: '10', 
					subnode: { attr: 'foo' },
					othernode: { _: 'value' },
					container: {
						item: [
							{ one: { _: '1' } },
							{ two: { value: '2' } }
						]
					},
					container2: {
						item: [
							{ _: 1 },
							{ _: 2 }
						]
					}
				}
			}).then(function (xml) {
				xml.should.eql('<root attr="10">\n\
	<subnode attr="foo"/>\n\
	<othernode>value</othernode>\n\
	<container>\n\
		<item>\n\
			<one>1</one>\n\
		</item>\n\
		<item>\n\
			<two value="2"/>\n\
		</item>\n\
	</container>\n\
	<container2>\n\
		<item>1</item>\n\
		<item>2</item>\n\
	</container2>\n\
</root>')
				done()
			}).catch(done)
		})
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
