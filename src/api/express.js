const express = require("express");
const moment = require("moment");
const app = express();
const port = process.env.PORT || 3000;

let [associatedId, enteredTime, result, timeofTest, type] = "";
let [lebIds, lastName, suffix, firstName, middleName] = "";


//test-endpoint
app.get("/else/current/:id", (req, res) => {
  patientBatch(req.params.id)
  res.send({
    lebIds,
    firstName,
    middleName,
    lastName,
    suffix,
    details
  });
});

//Test JSON as it stands. TODO: Move to external File; Make Dynamic.
let patientBatch = function checkIdAndParse(id) {
  if (id == 456) {
    lebIds = [1234, 3256, 8297];
    //Uses units of Unix epoch [Seconds since Jan 1 1970]
    lastName = "Suvak";
    suffix = "JR";
    firstName = "Robert";
    middleName = "Joseph";
    details = {
      gender: "attack helicopter",
      dob : "01/01/1970"
    }
  } else {
    lebIds = [1234, 3256, 8297];
    //Uses units of Unix epoch [Seconds since Jan 1 1970]
    lastName = "Suvak";
    suffix = "Sr";
    firstName = "Robert";
    middleName = "Joseph";
    details = {
      gender: "attack helicopter",
      dob : "02/14/1976"
    }
  }
};

app.get("/patients/:id", (req, res) => {
  //TODO: Add all the info for the patient based on this id.
  patientBatch(req.params.id)
  res.send({
    lebIds,
    firstName,
    middleName,
    lastName,
    suffix,
    details
  });
  res.send(req.params.id);
  if (!req.params.id) res.status(404);
});



//Test JSON as it stands. TODO: Move to external File; Make Dynamic.
let testBatch = function checkIdAndParse(id) {
  if (id == 456) {
    associatedId = [1234, 3256, 8297];
    //Uses units of Unix epoch [Seconds since Jan 1 1970]
    enteredTime = moment().unix(Date.now());
    result = "positive";
    timeofTest = 1540631752;
    type = "urinalysis";
  } else {
    associatedId = [8901, 1256, 8970];
    //Uses units of Unix epoch [Seconds since Jan 1 1970]
    enteredTime = moment().unix(Date.now());
    result = "negative";
    timeofTest = 1540631687;
    type = "blood count";
  }
};

app.get("/lab-test/:testId/", (req, res) => {
  //Uses Batch to display the lab tests object.
  testBatch(req.params.id);
  /*TODO: Add all the info relating to the testId
  returns [Placeholder: Returns all Lab Tests and their attributes from Firebase: [object Object]] */
  res.send(
    `Placeholder: Returns all Lab Tests and their attributes from Firebase: ${req.query}`
  );
  if (!req.params.testId)
    res
      .status(404)
      .send("There is no paramater matching this critereon. Please try again.");
  if (!req.query) res.status(500).send("Please retry your request");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
