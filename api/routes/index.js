var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectID;

router.get('/reserved', (req, res, next) =>{
  console.log(req);
  // req.collection.find({})
  //   .toArray()
  //   .then(results => req.json(results))
  //   .catch(err => res.send(err));
})

router.post('/reserved',(req, res, next) => {
  const {machineId, machineType, temperature, time, name, email, phoneNumber, reservedDate} = req.body;
  // if(!reservedDate || !machineId || !name|| !email){
  //   return res.status(404).json({
  //     message: "Reserve Date and Name are required",
  //   });
  // }
  const payload = {machineId, machineType, temperature, time, name, email, phoneNumber, reservedDate};
  req.collection.insertOne(payload)
  .then(result => res.json(result))
  .catch(err => res.send(err));
})

router.delete('/reserved/:id', (req, res, next)=>{
  const {id } = req.params;
  const _id = ObjectID(id);

  req.collection.deleteOne({_id})
  .then(result =>res.json(result))
  .catch(err => res.send(err));
})
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
