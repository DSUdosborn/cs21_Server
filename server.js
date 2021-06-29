// This file is in charge of api endpoints and the
// api server stuff

// import express so you can use it
const express = require("express");
const Link  = require("./model");
// local file storage
const fs = require('fs');
const cors = require("cors");
// instantiate your app/server
const app = express();

app.use(cors());
app.use(express.static("static"));

// tell our app to use json (this is an example of a middleware but this one
// is implemented for us)
app.use(express.json({}));

// this is where we will do our own middleware
app.use((req, res, next) => {
  console.log(
    "Time: ",
    Date.now(),
    " - Method: ",
    req.method,
    " - Path: ",
    req.originalUrl,
    " - Body: ",
    req.body
  );
  next();
});

// Get - gets all of the links (does not have a URL param)
app.get("/link", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let findQuery = {};

  console.log(req.query);
  if (req.query.name !== null && req.query.name !== undefined) {
    findQuery.name = req.query.name;
  }

  if (
    req.query.afterexpired !== null &&
    req.query.afterexpired !== undefined
  ) {
    findQuery.$expired = { $gt: new ISODate(req.query.afterexpired) };
  }

  console.log("getting all links with find query", findQuery);
  // return all of the links in the store

  Link.find(findQuery, function (err, links) {
    // check if there was an error
    if (err) {
      console.log(`there was an error listing links`, err);
      // send back the error
      res.status(500).json({ message: `unable to list links`, error: err });
      return;
    }
    // success!!! return all the links
    res.status(200).json(links);
  });
});

// Get - gets the link with the given id
app.get("/link/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(`getting link with id: ${req.params.id}`);
  Link.findById(req.params.id, (err, link) => {
    // check if there was an error
    if (err) {
      console.log(
        `there was an error finding a link with id ${req.params.id}`,
        err
      );
      // send back the error
      res.status(500).json({
        message: `unable to find link with id ${req.params.id}`,
        error: err,
      });
    } else if (link === null) {
      console.log(`unable to find link with id ${req.params.id}`);
      res.status(404).json({
        message: `link with id ${req.params.id} not found`,
        error: err,
      });
    } else {
      // success!!!! return the link
      res.status(200).json(link);
    }
  });
});

let nextID = 0;

// Post - crates one link (does not have a URL param)
app.post("/link", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(`creating a link with body`, req.body);

  let creatingLink = {
    name: req.body.name || "",
    description: req.body.description || "",
    linkType: req.body.linkType || "",
    url: req.body.url || "",
    done: req.body.done || false,
    assigned: req.body.assigned || new Date(),
    updated: req.body.updated || new Date(),
    expired: req.body.expired || new Date(),
  };

  Link.create(creatingLink, (err, link) => {
    // check if there is an error
    if (err) {
      console.log(`unable to create link`);
      res.status(500).json({
        message: "unable to create link",
        error: err,
      });
      return;
    }
    // success!!! return the link
    res.status(201).json(link);
  });
});

// Delete - deletes the link with the given id
app.delete("/link/:id", function (req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log(`deleting link with id: ${req.params.id}`);

  Link.findByIdAndDelete(req.params.id, function (err, link) {
    if (err) {
      console.log(`unable to delete link`);
      res.status(500).json({
        message: "unable to delete link",
        error: err,
      });
      return;
    } else if (link === null) {
      console.log(`unable to delete link with id ${req.params.id}`);
      res.status(404).json({
        message: `link with id ${req.params.id} not found`,
        error: err,
      });
    } else {
      res.status(200).json(link);
    }
  });
});

// Patch - updates the link with the given id
app.patch("/link/:id", function (req, res) {
  console.log(`updating link with id: ${req.params.id} with body`, req.body);

  let updateLink = {};
  // name
  if (req.body.name !== null && req.body.name !== undefined) {
    updateLink.name = req.body.name;
  }
  // description
  if (req.body.description !== null && req.body.description !== undefined) {
    updateLink.description = req.body.description;
  }
  // expired
  if (req.body.expired !== null && req.body.expired !== undefined) {
    updateLink.expired = req.body.expired;
  }
  // done
  if (req.body.done !== null && req.body.done !== undefined) {
    updateLink.done = req.body.done;
  }

  Link.updateOne(
    { _id: req.params.id },
    {
      $set: updateLink,
    },
    function (err, updateOneResponse) {
      if (err) {
        console.log(`unable to patch link`);
        res.status(500).json({
          message: "unable to patch link",
          error: err,
        });
        return;
      } else if (updateOneResponse.n === 0) {
        console.log(`unable to patch link with id ${req.params.id}`);
        res.status(404).json({
          message: `link with id ${req.params.id} not found`,
          error: err,
        });
      } else {
        res.status(200).json(updateOneResponse);
      }
    }
  );
});

// Put - replaces the link with the given id`
app.put("/link/:id", function (req, res) {
  console.log(`replacing link with id: ${req.params.id} with body`, req.body);

  let updateLink = {
    name: req.body.name || "",
    description: req.body.description || "",
    done: req.body.done || false,
    expired: req.body.expired || new Date(),
  };

  Link.updateOne(
    { _id: req.params.id },
    { $set:  updatelink } ,
    function (err, updateOneResponse) {
    console.log(updateOneResponse);
      if (err) {
        console.log(`unable to replace link`);
        res.status(500).json({
          message: "unable to replace link",
          error: err,
        });
        return;

      } else if (updateOneResponse.n === 0) {

        console.log(`unable to replace link with id ${req.params.id}`);
        res.status(404).json({
          message: `link with id ${req.params.id} not found`,
          error: err,
        });
      } else {
        res.status(200).json(updateOneResponse);
      }
    }
  );
});

module.exports = app;
