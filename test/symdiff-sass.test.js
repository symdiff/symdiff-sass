var extract = require('../index');

describe('symdiff-sass', function() {
    describe('SCSS', function() {
        it('should work with an empty scss', function() {
            var result = extract('');
            expect(result.length).to.equal(0);
        });

        it('should work with invalid scss', function() {
            var result = extract('.grid {');
            expect(result.length).to.equal(0);
        });

        it('should extract a class', function() {
            var testSCSS = '.grid { display: flex; }',
                result = extract(testSCSS);

            expect(result.length).to.equal(1);
            expect(result[0]).to.equal('grid');
        });

        it('should extract two classes', function() {
            var testSCSS = '.grid.gird { display: flex; }',
                result = extract(testSCSS);

            expect(result.length).to.equal(2);
        });

        it('should extract nested classes', function() {
            var testSCSS = '.grid { display: flex; .grid-col { flex: 0 0 auto; }}',
                result = extract(testSCSS);

            expect(result.length).to.equal(2);
        });

        it('should extract nothing when there are no classes', function() {
            var testSCSS = '#grid { display: flex; }',
                result = extract(testSCSS);

            expect(result.length).to.equal(0);
        });
    });

    describe('SASS', function() {
        it('should work with an empty sass', function() {
            var result = extract('');
            expect(result.length).to.equal(0);
        });

        it('should work with invalid sass', function() {
            var result = extract('.grid {');
            expect(result.length).to.equal(0);
        });

        it('should extract a class', function() {
            var testSASS = '.grid\n  display: flex',
                result = extract(testSASS);

            expect(result.length).to.equal(1);
            expect(result[0]).to.equal('grid');
        });

        it('should extract two classes', function() {
            var testSASS = '.grid.gird\n  display: flex',
                result = extract(testSASS);

            expect(result.length).to.equal(2);
        });

        it('should extract nested classes', function() {
            var testSASS = '.grid\n'+
                           '  display: flex\n'+
                           '  .grid-col\n'+
                           '    flex: 0 0 auto',
                result = extract(testSASS);

            expect(result.length).to.equal(2);
        });

        it('should extract nothing when there are no classes', function() {
            var testSASS = '#grid\n  display: flex',
                result = extract(testSASS);

            expect(result.length).to.equal(0);
        });
    });
});