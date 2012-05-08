/** oojs version 0.5
 * 
 * By Jacob Friesen, F.Jacob.J@gmail.com, http://jacobfriesen.com/
 * MIT Licensed.
 *
 * NOTE: instanceof deosn't function with this class inheritance style
 **/

// Just calls oojs's add_class, here to make class instantiation look better. Also note that
// the this is passed so context is the same in the method as if it was in Class.
Class = {
    name: 'Class',
    
    add_class: function add_class(C, parent){
        
        // Register the object to the scope if it has a name
        if (C.name){
            
            // Get the parent classes functions and parent (Do a deep copy so when this class is updated parent isn't)
            C.prototype = {};
            for (obj in parent)
                C.prototype[obj] = parent[obj];
            C.prototype.name = C.name;
            C.prototype.parent = parent;
            C.parent = parent;
            C.p_constr = this[parent.name].constr;
            
            this[C.name] = function () {
                var ret = {};
                
                // Add all functions from the prototype
                // Note function could have a return that makes it an object making all previously declared prototypes useless
                for (obj in C.prototype)
                    ret[obj] = C.prototype[obj];
                    
                // Call the parent constructor if not null
                if (C.p_constr != null){
                    var p_constr = C.p_constr(arguments[0]);
                    for (obj in p_constr)
                    ret[obj] = p_constr[obj];
                }
                    
                // Now add all functions from the constructor to the object and prototype
                var constr = C.apply({}, arguments);
                for (obj in constr){
                    ret[obj] = constr[obj];
                    if (!C.prototype[obj])
                        C.prototype[obj] = constr[obj];
                }
                    
                return ret;
            }
            this[C.name].prototype = C.prototype;
            this[C.name].name = C.name;
            this[C.name].create = Class.create; // So A() deosn't have to be used instead of A
            this[C.name].constr = C;
            
            return this[C.name];
        }
        
        // For object literals add each of the parents object to the current
        for (obj in parent){
            if (!C[obj])
            C[obj] = parent[obj];
        }
        
        return C;
    },
    
    create: function create(){
        var objs = [];
        
        // If this is a function and not a class (so its creating a subclass)
        if (this.prototype && this.prototype != null){
            var new_c = new this();
            return new_c.create(arguments);
        }
        else{
            // Get the arguments list sometimes the list is in the first argument in arguments
            if (arguments.length == 1)
                arguments = arguments[0];
            
            // Last argument is always the scope unless
            var scope = arguments[arguments.length - 1];
            
            // Add every "object" specified
            for (var i = 0; i < create.arguments.length - 1; i++)
                objs.push(this.add_class.call(scope, arguments[i], this));
        
            if (objs.length == 1)
                return objs[0];
            return objs;
        }
    }
}

