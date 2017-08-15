/// <reference path="../../tools/manual_typings/project/jasmine.d.ts" />

beforeEach(function() {
  jasmine.addMatchers({
    toImplementIHandlerFactory: function() {
      return {
        compare: function(actualClass) {
          var instance = actualClass.prototype;
         const result:any = {
            pass: instance["setup"] !== undefined &&
              instance["createHandler"] !== undefined &&
              instance["getApp"] !== undefined
//              instance["test"] !== undefined,
          };

          if(result.pass){
            result.message =`This class implements IHandler`;
          }else{
            result.message =`This class does not implement IHandler`;
          }

          return result;
        }
      };
    }
  });
});
