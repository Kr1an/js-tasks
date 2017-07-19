var expect = require("chai").expect;
var operations = require("./fetchData.js").operations;

describe("fetchData.js", function() {
    describe("operations", function() {
        it("contains some operations", function() {
            expect(Object.keys(operations).indexOf('exec')).to.not.equal(-1);
            expect(Object.keys(operations).indexOf('aggregate')).to.not.equal(-1);
            expect(Object.keys(operations).indexOf('sortBy')).to.not.equal(-1);
        })
        it("should sortBy correctly", function() {
            let data = [
                {
                    id:0,
                    age: 12,
                },
                {
                    id:7,
                    age: 24,
                },
                {
                    id: 5,
                    age: 12,
                },
                {
                    id: 2,
                    age: 24,
                },

            ];
            var sortedData = [
                {
                    id:0,
                    age: 12,

                },
                {
                    id: 5,
                    age: 12,
                },
                {
                    id: 2,
                    age: 24,
                },
                {
                    id:7,
                    age: 24,
                },
            ];
            var orderBy = ['age', 'id'];
            var orderByWithFn = ['age', function(i) { return i.id; }]
            expect(operations.sortBy(data, orderBy)).to.be.deep.equal(sortedData);
            expect(operations.sortBy(data, orderByWithFn)).to.be.deep.equal(sortedData);
        });
        it("should aggregate correctly", function() {
            var data = [
                {
                    id:0,
                    age: 12,

                },
                {
                    id: 5,
                    age: 12,
                },
                {
                    id: 2,
                    age: 24,
                },
                {
                    id:7,
                    age: 24,
                },
            ];
            var afterAggregationData = [
                {
                    age: 12,
                    sumId: 5,
                },
                {
                    age: 24,
                    sumId: 9,
                },
            ];
            var groupBy = 'age';
            var groupByFn = function(i) { return i.age; }
            var initialState = {
                age: 0,
                sumId: 0,
            };
            var reducer = function(a, b) {
                return {
                    age: b.age,
                    sumId: a.sumId + b.id,
                }
            };
            expect(operations.aggregate(data, groupBy, reducer, initialState)).to.deep.equal(afterAggregationData);
            expect(operations.aggregate(data, groupByFn, reducer, initialState)).to.deep.equal(afterAggregationData);
        })
        it('should exec correctly with type="sortBy"', function() {
            let type = 'sortBy'
            let data = [
                {
                    id:0,
                    age: 12,
                },
                {
                    id:7,
                    age: 24,
                },
                {
                    id: 5,
                    age: 12,
                },
                {
                    id: 2,
                    age: 24,
                },

            ];
            var sortedData = [
                {
                    id:0,
                    age: 12,

                },
                {
                    id: 5,
                    age: 12,
                },
                {
                    id: 2,
                    age: 24,
                },
                {
                    id:7,
                    age: 24,
                },
            ];
            var orderBy = ['age', 'id'];
            let args = [orderBy]
            expect(operations.exec(data, type, args)).to.be.deep.equal(sortedData);
        });
        it('should exec correctly with type="aggregate"', function() {
            let type = 'aggregate'
            var data = [
                {
                    id:0,
                    age: 12,

                },
                {
                    id: 5,
                    age: 12,
                },
                {
                    id: 2,
                    age: 24,
                },
                {
                    id:7,
                    age: 24,
                },
            ];
            var afterAggregationData = [
                {
                    age: 12,
                    sumId: 5,
                },
                {
                    age: 24,
                    sumId: 9,
                },
            ];
            var groupBy = 'age';
            var initialState = {
                age: 0,
                sumId: 0,
            };
            var reducer = function(a, b) {
                return {
                    age: b.age,
                    sumId: a.sumId + b.id,
                }
            };
            let args = [groupBy, reducer, initialState];
            expect(operations.exec(data, type, args)).to.be.deep.equal(afterAggregationData);
        });
    });

});
