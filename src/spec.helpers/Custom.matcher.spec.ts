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
    },
    toHaveExtended: function() {
      return {
        compare: function(inheritedClass, baseClass) {
         const result:any = {
            pass:  inheritedClass.prototype instanceof baseClass
          };


          if(result.pass){
            result.message =`${inheritedClass.name} class extends ${baseClass.name}`;
          }else{
            result.message =`${inheritedClass.name} class does not extend ${baseClass.name}`;
          }

          return result;
        }
      };
    },
    toHaveBeenCalledWithFunction: function() {
      return {
        compare: function(callerFunction, calleeFunction) {
         const result:any = {
            pass:  callerFunction.name instanceof calleeFunction
          };


          if(result.pass){
            result.message =`${callerFunction.name} class extends ${calleeFunction.name}`;
          }else{
            arguments[0].calls.all().forEach(call=>{
              console.log("HERE", call.args[0]);
            });
            // .any(c=>{
            //   c.args.any(a=>{
            //    a.name === calleeFunction.name;
            //   })
            // }));
            result.message =`${callerFunction.name} class does not extend ${calleeFunction.name}`;
          }

          return result;
        }
      };
    }
  });
});
