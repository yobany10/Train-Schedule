//firebase is being initialized//
var config = {
    apiKey: "AIzaSyAlHz6B62w_kZy9IrBnIM7V1RV6gmbXlqE",
    authDomain: "train-schedule-f9ded.firebaseapp.com",
    databaseURL: "https://train-schedule-f9ded.firebaseio.com",
    projectId: "train-schedule-f9ded",
    storageBucket: "train-schedule-f9ded.appspot.com",
    messagingSenderId: "234105666979"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  //button for adding trains//
  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      //user input is grabbed//
      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
      var trainFrequency = $("#frequency-input").val().trim();

      //local "temporary" object is created for holding data//
      var newTrain = {
          name: trainName,
          destination: trainDest,
          start: trainStart,
          frequency: trainFrequency
      };

      //uploads train data to the database//
      database.ref().push(newTrain);

      //logs everyting to console
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.start);
      console.log(newTrain.frequency);

  })