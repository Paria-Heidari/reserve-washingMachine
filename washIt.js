// router.post('/reserved', (req, res, next) => {
//   const { reservedDate, time, name, email } = req.body;
//   const payload = { reservedDate, time, name, email };
//   req.collection.insertOne(payload)
//     .then(result => res.json(result.ops[0]))
//     .catch(error => res.status(400).json(
//       {message: 'This machine is not available on this Date and Time'}
//     ));
// });

//Databsae
machines = []
waiting_list = [];


// The main system
WashIt = function () {

    this.init = function () {
      //id or QR =>
        machines.push(new WashingMachine(id = 1, machineId= 1, temperature = 30, time = 20, name = 'Håndvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(id = 2, machineId= 2, temperature = 30, time = 20, name = 'Håndvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(id = 3, machineId= 3, temperature = 30, time = 20, name = 'Håndvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(id = 4, machineId= 4, temperature = 30, time = 20, name = 'Håndvask', callback=this.on_washing_finished));

        machines.push(new WashingMachine(id = 5, machineId= 1, temperature = 40, time = 60, name = 'Tøyvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(id = 6, machineId= 5, temperature = 40, time = 60, name = 'Tøyvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(id = 7, machineId= 6, temperature = 40, time = 60, name = 'Tøyvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(id = 8, machineId= 7, temperature = 40, time = 60, name = 'Tøyvask', callback=this.on_washing_finished));

        machines.push(new WashingMachine(id = 9, machineId= 7, temperature = 60, time = 90, name = 'Kokvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(id = 10, machineId= 8, temperature = 60, time = 90, name = 'Kokvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(id = 11, machineId= 9, temperature = 60, time = 90, name = 'Kokvask', callback=this.on_washing_finished));
        machines.push(new WashingMachine(id = 12, machineId= 12, temperature = 60, time = 90, name = 'Kokvask', callback=this.on_washing_finished));
    }

    // if the machine is available for the spesific machine and washing Program  - id
    // users have 5m to start the machine after their reserved time
    this.reserve = function (user, washing_type) {
        reserved = false;
        for(var i =0; i< machines.length; i++){
            if (machines[i].washing_type == washing_type && machines[i].is_available) {
                machines[i].start();
                reserved = true;
                break;
            }
        }

        // When all machines are reserved
        if (!reserved) {
            // put user in the waiting list
            console.log('Adding user to the waiting list for', washing_type);
            waiting_list.push({'user': user, 'washing_type': washing_type})
        }
    }


    // waching machine
    WashingMachine = function (id, temperature = 30, time = 20, washing_type = 'Håndvask', callback=null) {
      this.id = id;
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
        if(this.callback) this.callback(this.id);
      }
    }
    // checking the waiting list when a machine is ready
    //{user, washing_type}
    this.on_washing_finished = function(id){

        // step 1. finding the machine
        machine = null;
        for(var i =0; i< machines.length; i++){
            if(machines[i].id == id){
                machine = machines[i];
                break;
            }
        }
        //  send a message to old user and new user
        console.log(machine.washing_type, 'finished washing.');
        for(var i =0; i< waiting_list.length; i++){
            if (waiting_list[i]['washing_type'] == machine.washing_type) {

                user = waiting_list[i]['user'];
                user.notify('Your reservation is available');
                // delet from DB
                waiting_list.pop(waiting_list[i]);
                break;
            }
        }
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
Jose = new User(name = 'Jose', id = 2);
Test = new User(name = 'Test', id = 2);


booking_system = new WashIt();
booking_system.init();

// normal machine usage
booking_system.reserve(user=paria, machine_type='Kokvask');
booking_system.reserve(user=paria, machine_type='Kokvask');
booking_system.reserve(user=paria, machine_type='Kokvask');
booking_system.reserve(user=Jose, machine_type='Kokvask');

booking_system.reserve(user=paria, machine_type='Tøyvask');
booking_system.reserve(user=paria, machine_type='Håndvask');
booking_system.reserve(user=Jose, machine_type='Kokvask');
booking_system.reserve(user=paria, machine_type='Håndvask');
booking_system.reserve(user=Jose, machine_type='Håndvask');
booking_system.reserve(user=paria, machine_type='Håndvask');

// goes to waiting list
booking_system.reserve(user=Test, machine_type='Håndvask');

booking_system.reserve(user=Jose, machine_type='Tøyvask');
booking_system.reserve(user=paria, machine_type='Tøyvask');

booking_system.reserve(user=Jose, machine_type='Kokvask');

// goes to waiting list
booking_system.reserve(user=Test, machine_type='Kokvask');

