#OO.js

Website: <a href="http://jacobfriesen.com/oojs">jacobfriesen.com/oojs</a>

Welcome to version 0.5 of OO.js a tiny (~1kb minified) javascript OO library. OO.js provides a clean and consistent way to use classical inheritance in Javascript as opposed to the custom way, example. This library is pure JavaScript and will not interfere with any libraries except Prototype.js (I'm working on this issue).

##Installation

Just include oo.js before (or make it load before) any Javascript that needs to use it. Thats it, no dependencies. The other files are here if you want to test it using the exact same methods I do.

##How It Works
I believe it's better to explain in code than English when possible, so here's some code:

<pre><code>

Class.create(function SubClass(){
    // Private variables and functions
    var type = 'subclass';
	
    // Public variables and functions
    return{
        sayHello: function (){
    	    return 'Im a ' + type;
        }
    }
}, this);// the this is the scope you can assign this to anything you want.

// The subclass prints correctly
var subClass = SubClass();
console.log(subClass.sayHello());

// Also note the following produces undefined as the hello variable is private
console.log(subClass.type)

// You can instantiate an object and assign it to a variable at the same time if you want via function auto execution
var subClassB = Class.create(function SubClassB(){
    // Private variables and functions
    var type = 'subclassB';
	
    // Public variables and functions
    return{
        sayHello: function (){
    	    return 'Im a ' + type;
        }
    }
}, this)();// Notice the ();
console.log(subClassB.sayHello());

// The class is still regarded as created so the following is valid
var subClassB2 = SubClassB();
console.log(subClassB2.sayHello());

// Now for inheritance
SubClass.create(function SubSubClass(){
    // Public variables and functions
    return{
        sayHello: function (){
    	    return 'Method has been overridden';
        }
    }
}, this);

// The method was overridden
var subSubClass = SubSubClass();
console.log(subSubClass.sayHello());

/*
 * Variables are overridden just like functions. I should note if you use this.something = x it immediatly
 * makes something a public property. I would not recommend doing this as the variable is not accessable within
 * the actual class being created. Return the variable to make it public instead. This is how JavaScript normally
 * works. Without further ado here is some variable overriding:
 */

Class.create(function VarClass(){
    // Public variables and functions
    return{
        variable: 'A',
        sayVariable: function (){
    	    return 'var ' + this.variable;// Always use this when refering to public properties
        }
    }
}, this);

var varClass = VarClass();
console.log(varClass.sayVariable());

VarClass.create(function SubVarClass(){
    // Public variables and functions
    return{
        variable: 'B'
    }
}, this);

var subVarClass = SubVarClass();
console.log(subVarClass.sayVariable());

// Finally to show the parent function. Note before a child's contructor is called the parents is (this is recursive).
console.log(subVarClass.parent.sayVariable());
		

So just to review here is the structure for class instantion in OOS:


<Parent>.create(function <Child>(){
    // Private variables and functions
	
    // Public Variables and  functions
    return{
    }
}, <Scope>);

</code></pre>
		

##Response to Criticisms

If you're an experienced Javascripter you will probably have at least 4 main questions after reading this, they are addressed below:

###1. Javascript already has Prototypal OO why bother with implementing Class based OO?

There is nothing wrong with Prototypical OO and like most experienced JavaScripters believe it is the right way to go. Although I believe JavaScript should also provide intuitive Classical OO. This lessens the learning curve to people who almost exclusively code server side as they likely will have only seen Class based OO.

###2. Theres already Classical OO JavaScript libraries, why create another one?

Firstly most OO Javascript libraries are in big packages that come with a lot of other stuff you may not ever use, like Prototype or ExtJS. There is also other self contained libraries like mine e.g base.js, though there is none that allows the function subclass(){} notation I use. I personally prefer this notation, and this is the reason why this library exists at all. Note I think Prototype, ExtJS, base.js and many other libraries are great they just didn't provide the exact functionality I was looking for.

###3. Why use pure Javascript?

There are 2 reasons, 1 being that the way I implemented classical OO in JavaScript doesn't involve any DOM manipulations or major browser inconsitency issues. The second being that every popular JavaScript library has its rise and fall even JQuery will one day be replaced. Basing my library on other one means if that other library loses popularity it will completely obsolete mine unless I recode it.

###4. You realize this library will probably never become popular, given how much competition you have.

Thats not a question, but I'll still provide an answer. I built this library because I personally was unsastified with the current libraries so really if I am the only one who uses this library I have accomplished my goal. The only reason OO.js public and open source is to provide functionality to anyone who shares the same preferences as I do so that they do not have to code a library themselves. 
