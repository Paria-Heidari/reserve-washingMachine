//Databsae
machines = []
waiting_list = [];


// The main system
WashIt = function () {

    this.init = function () {
        machines.push(new WashingMachine(code = 1, temperature = 30, time = 20, name = 'Håndvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(code = 2, temperature = 30, time = 20, name = 'Håndvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(code = 3, temperature = 30, time = 20, name = 'Håndvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(code = 4, temperature = 30, time = 20, name = 'Håndvask', callback=this.on_washing_finished));

        machines.push(new WashingMachine(code = 5, temperature = 40, time = 60, name = 'Tøyvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(code = 6, temperature = 40, time = 60, name = 'Tøyvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(code = 7, temperature = 40, time = 60, name = 'Tøyvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(code = 8, temperature = 40, time = 60, name = 'Tøyvask', callback=this.on_washing_finished));

        machines.push(new WashingMachine(code = 9, temperature = 60, time = 90, name = 'Kokvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(code = 10, temperature = 60, time = 90, name = 'Kokvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(code = 11, temperature = 60, time = 90, name = 'Kokvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(code = 12, temperature = 60, time = 90, name = 'Kokvask', callback=this.on_washing_finished));
    }

    this.reserve = function (user, washing_type) {
        reserved = false;
        for(var i =0; i< machines.length; i++){
            if (machines[i].washing_type == washing_type && machines[i].is_available) {
                machines[i].start();
                reserved = true;
                break;
            }
        }

        if (!reserved) {
            // put user in the waiting list
            console.log('Adding user to the waiting list for', washing_type);
            waiting_list.push({'user': user, 'washing_type': washing_type})
        }
    }

    // checking the waiting list when a machine is ready
    //{user, washing_type}
    this.on_washing_finished = function(code){

        // step 1. finding the machine
        machine = null;
        for(var i =0; i< machines.length; i++){
            if(machines[i].code == code){
                machine = machines[i];
                break;
            }
        }

        console.log(machine.washing_type, 'finished washing.');
        for(var i =0; i< waiting_list.length; i++){
            if (waiting_list[i]['washing_type'] == machine.washing_type) {

                user = waiting_list[i]['user'];
                user.notify('Your reservation is available');
                waiting_list.pop(waiting_list[i]);
                break;
            }
        }
    }
}

// waching machine
WashingMachine = function (code, temperature = 30, time = 20, washing_type = 'Håndvask', callback=null) {
    this.code = code;
    this.washing_type = washing_type;
    this.temperature = temperature;
    this.time = time;
    this.is_available = true;
    this.callback = callback

    this.start = function () {
        console.log(this.washing_type, 'started');
        this.is_available = false;
        var that = this;

        setTimeout(function(){that.stop();},time*100);
    }

    this.stop = function () {
        this.is_available = true;

        //raise an event
        if(this.callback) this.callback(this.code);
    }
}

// a normal user
// paria = new User('paria', 1);

User = function (name = '', id = 1) {
    this.name = name;
    this.id = id;

    this.notify = function(message){
        console.log(this.name, 'received a notification. message=', message);
    }
};

paria = new User(name = 'Paria', id = 1);
ahmad = new User(name = 'ahmad', id = 2);

booking_system = new WashIt();
booking_system.init();

// normal machine usage
booking_system.reserve(user=paria, machine_type='Kokvask');
booking_system.reserve(user=paria, machine_type='Kokvask');
booking_system.reserve(user=ahmad, machine_type='Kokvask');
booking_system.reserve(user=paria, machine_type='Kokvask');

booking_system.reserve(user=paria, machine_type='Tøyvask');
booking_system.reserve(user=paria, machine_type='Tøyvask');

booking_system.reserve(user=paria, machine_type='Håndvask');
booking_system.reserve(user=paria, machine_type='Håndvask');
booking_system.reserve(user=paria, machine_type='Håndvask');
booking_system.reserve(user=paria, machine_type='Håndvask');

booking_system.reserve(user=ahmad, machine_type='Tøyvask');
booking_system.reserve(user=paria, machine_type='Tøyvask');

booking_system.reserve(user=ahmad, machine_type='Håndvask');

// goes to waiting list
booking_system.reserve(user=paria, machine_type='Kokvask');

