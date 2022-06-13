function Logger(logString: string) {
  console.log("Logger Function");
  return function (constructor: Function) {
    console.log("Logger Decorator");
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("WithTemplate Function");
  return function (constructor: any) {
    //   return function (_: Function) {//the _ signals to TS is that yes there is a parameter expected but we do not need it
    console.log("WithTemplate Decorator");
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = p.name;
    }
  };
}

//Decorator Factory: Advantage of passing values in function and calling function within function is that you can pass values inside your decorators
@Logger("Logging - Person Name") // This annotation is a decorator which will print the class constructor based on function above
@WithTemplate("<h1>My Person Object</h1>", "app")
class Person {
  name = "Abhijeet Kulshreshtha";

  constructor() {
    console.log("Creating Person Object....");
  }
}

const pers = new Person(); //Logger will get printed irrespective whether object has been created or not
console.log(pers);

//////////////////////////////////////////************************////////////////////////////////////////////////////////// */
function Log(target: any, propertyName: string) {
    console.log('Property Name Printing...');
    console.log(target, propertyName);
}

class Product {
    @Log
    title: string;
    private _price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this._price= price;
    }

    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Value should be greater than 0')
        }
    }

    getPriceWithTax(tax: number) {
        return this._price * (1 + tax);
    }
}