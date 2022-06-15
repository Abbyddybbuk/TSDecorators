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
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    //   return function (_: Function) {//the _ signals to TS is that yes there is a parameter expected but we do not need it
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("WithTemplate Decorator");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
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
  console.log("Property Name Printing...");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor Decorator...");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method Decorator...");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter Decorator...");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Value should be greater than 0");
    }
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;//descriptor.value gives existing method name
  const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
          const boundFn = originalMethod.bind(this);
          return boundFn;
      }
  };
  return adjDescriptor;
}


class Printer {
    message = 'Awesome Decorators!';
    
    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();
const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);