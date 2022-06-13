function Logger(constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
}

@Logger// This annotation is a decorator which will print the class constructor based on function above
class Person {
    name = 'Abhijeet';

    constructor() {
        console.log('Creating Person Object....')
    }
}

// const pers = new Person();
// console.log(pers);