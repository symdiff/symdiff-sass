var extract = require('../index');

describe('symdiff-sass', function() {
    it('should work with an empty sass', function() {
        var result = extract('');
        expect(result.length).to.equal(0);
    });

    it('should work with invalid sass', function() {
        var result = extract('this is not the sass you are looking for');
        expect(result.length).to.equal(0);
    });

    it('should extract a class', function() {
        var testSASS = '.grid { display: flex; }',
            result = extract(testSASS);

        expect(result.length).to.equal(1);
        expect(result[0]).to.equal('grid');
    });

    it('should extract nested classes', function() {
        var testSASS = '.grid { display: flex; .grid-col { flex: 0 0 auto; }}',
            result = extract(testSASS);

        expect(result.length).to.equal(2);
    });

    it('should extract nothing when there are no classes', function() {
        var testSASS = '#grid { display: flex; }',
            result = extract(testSASS);

        expect(result.length).to.equal(0);
    });
});