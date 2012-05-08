/**
 * the main function
 */
jQuery(document).ready(function() 
{
    //Useful for debugging
    console.log(window);
    
    var test = new C();
    test.extra();
	
    Test_Closure_Funcs();
	
    Test_Object_Literal();
});

/**
 * Test movement of boxes.
 */
function Test_Closure_Funcs()
{	
    module("Closure Style Functions");

    var INIT_NUM = 5;
    
    test("multiple same init base", function(){
	var tests = [];
        for (var i = 0; i < INIT_NUM; i++){
	    tests[i] = new A();
	    
	    // Test if the class was instantiated with its methods
	    equal(tests[i].a1(), 'a1:' + tests[i].hello);
	    equal(tests[i].a2(), 'a2:' + tests[i].hello);
	    
	    // Test if the class was instantiated with custom methods (not testing if the method works here)
	    notEqual(tests[i].add_class, undefined);
	}
    });
    
    test("multiple same init derived", function(){
	var tests = [];
        for (var i = 0; i < INIT_NUM; i++){
	    tests[i] = new A_derived();
	    
	    // Test if the class was instantiated with its methods
	    equal(tests[i].a1(), 'a1:' + tests[i].hello);
	    equal(tests[i].a2(), 'a2:' + tests[i].hello);
	    
	    // Test if the class was instantiated with custom methods (not testing if the method works here)
	    notEqual(tests[i].add_class, undefined);
	}
    });
    
    test("Inheritance", function(){
	// Test if the class was instantiated with its methods
	var test = B();
	
	equal(test.b1(), 'b1:' + test.hello);
	
	// Test if the class was instantiated with custom methods (not testing if the base methods work here)
	equal(test.a1(), 'a1:' + test.hello);
	equal(test.a2(), 'a2:' + test.hello);
	equal(test.add_class, Class.add_class);
	
	// Test tripple inheritance
	var test = C();
	
	// Test if the class was instantiated with its methods
	equal(test.c1(), 'c1:' + test.hello);
	
	// Test if the class was instantiated with custom methods (not testing if the base methods work here)
	equal(test.b1(), 'b1:' + test.hello);
	equal(test.a1(), 'a1:' + test.hello);
	equal(test.a2(), 'a2:' + test.hello);
	equal(test.add_class, Class.add_class);
    });
    
    test('Overrides', function(){
	// test base class overriding
	var test_reg = A();
	var test_ovr = class_override();
	
	notEqual(test_reg.add_class, test_ovr.add_class);
	notEqual(test_reg.add_class, test_ovr.add_class);
	
	// test regular class overriding
	var test_reg = B();
	var test_inh = BB();
	
	equal(test_reg.a1(), test_inh.a1());
	notEqual(test_reg.b1(), test_inh.b1());
	
	// Test variable overrides
	var test_var = var_override();
	
	notEqual(test_var.hello,test_reg.hello);
	notEqual(test_var.b1(),test_reg.b1());

	// Test 2 special cases
	var test_cust1 = check_override();
	equal(test_cust1.a1(), test_reg.a1());
	equal(test_cust1.a2(), test_reg.a2());
	equal(test_cust1.b1(), test_reg.b1());
	
	var test_cust2 = check_override2();
	notEqual(test_cust2.a1(), test_reg.a1());
	notEqual(test_cust2.a2(), test_reg.a2());
	notEqual(test_cust2.b1(), test_reg.b1());
    });
    
    // This is testing parent calls, parent is intended to allow calling parent
    // methods instead of calling the current classes methods.
    test('Parent Call', function(){
	// Calling to the base parent
	var test_reg = A();
	
	notEqual(test_reg, Class);
	equal(test_reg.parent, Class);
	
	// Regular function parent calls
	var test_ovr = B();
	var test_ovr2 = check_override2();
	
	notEqual(test_ovr2.a1(), test_ovr.a1());
	equal(test_ovr2.parent.a1(), test_ovr.a1());
	equal(test_ovr2.parent.parent.a1(), test_reg.a1());
    });
};

function Test_Object_Literal(){
	
    module("Object Literal Style Functions");
	
    test('basic override test', function(){
	var test = Class.create({
	    add_class: function add_class(){
		return 'add_class overridden';
	    }
	}, this);
	    
	notEqual(test.add_class, Class.add_class);
	equal(test.get_object, Class.get_object);
	
	var test_reg = B();
	var test2 = B.create({
	    unique: function unique(){
		return 'unique';
	    },
	    
	    b1: function b1(){
		return 'b overrided by literal';
	    }
	}, this);
	
	equal(test2.unique(), 'unique');
	notEqual(test2.b1(), test_reg.b1());
	equal(test2.a1(), test_reg.a1());
    });
}

/*TEST CLASSES------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
Class.create(function A(){
    // Private variables and functions
    var hello = 'hello';
    
    function a1(){
	return 'a1:' + this.hello;
    };
    
    function a2(){
	return 'a2:' + this.hello;
    };
    
    // Make them public here
    return{
	a1: a1,
	a2: a2,
	hello: hello
    }
}, this);
// represents dynamically adding functions to class constructors
A.prototype.extra = function (){
    console.log('running extra function');
};

A.create(function A_derived(){
}, this);

A.create(function B(){
    
    function b1(){
	return 'b1:' + this.hello;
    }
    
    return{
	b1: b1
    }
}, this);

B.create(function C(){
    function c1(){
	return 'c1:' + this.hello;
    }
    
    return{
	c1: c1
    }
}, this);

B.create(function BB(){
    
    function b1(){
	return 'Overridden by ' + BB.name;
    }
    
    return{
	b1: b1
    }
}, this);

// Since add_class now returns a string this class cannot create subclasses
Class.create(function class_override(){
    // Private variables and functions
    function add_class(){
	return 'parents overridden';
    };
    
    // Make them public here
    return{
	add_class: add_class
    }
}, this);

// For variable overriding
B.create(function var_override(){
    return{
	hello: 'olleh'
    }
}, this);

// Check that prev_parent is actually working (Order check)
B.create(function check_override(){}, this);
B.create(function check_override2(){
    return{
	hello: 'check'
    }
}, this);