
  var database = firebase.database();

  //button for adding trains//
  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      //user input is grabbed//
      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainStart = moment($("#start-input").val().trim(), "HH:mm A").format("X");
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

      alert("Train successfully added");

      //clears all of the text boxes//
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#start-input").val("");
      $("#frequency-input").val("");
  });

  //creates Firebase event for adding trains to the database//
  //and a row in the html when a user adds an entry//
  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      //store data into a variable//
      var trainName = childSnapshot.val().name;
      var trainDest = childSnapshot.val().destination;
      var trainStart = childSnapshot.val().start;
      var trainFrequency = childSnapshot.val().frequency;

      //train data//
      console.log(trainName);
      console.log(trainDest);
      console.log(trainStart);
      console.log(trainFrequency);

      //prettify the train start//
      var trainStartPretty = moment.unix(trainStart).format("hh:mm A");

      //calculate time//
      var tRemainder = moment().diff(moment.unix(trainStart), "minutes") %trainFrequency;
      var tMinutes = trainFrequency - tRemainder;

      var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

      //create new row//
      var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(trainDest),
          $("<td>").text(trainFrequency),
          $("<td>").text(tArrival),
          $("<td>").text(tMinutes),
      );

      //append the new row to the table//
      $("#train-table > tbody").append(newRow);
  });