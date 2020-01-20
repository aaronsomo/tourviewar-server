const dbhelper = require('../database/dbhelpers');
const s3UploadHelper = require('../database/s3UploadHelper');

module.exports = {

  getUser: (req, res) => {
    console.log(`you're in controller.getUser`);
    dbhelper.getUser(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(`error in controller.getUser`);
      } else {
        console.log(`successful controller.getUser`);
        res.status(200).send(results);
      }
    });
  },

  createUser: (req, res) => {
    console.log(`you're in controller.createUser`);
    dbhelper.createUser(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(`error in controller.createUser`);
      } else {
        console.log(`successful controller.createUser`);
        res.status(200).send(results);
      }
    });
  },

  createNewTour: (req, res) => {
    console.log(`you're in controller.createNewTour`);
    console.log(req.body)
    dbhelper.createNewTour(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(`error in controller.createNewTour`);
      } else {
        console.log(`successful controller.createNewTour`);
        res.status(200).send(results);
      }
    });
  },

  getScenes: (req, res) => {
    console.log(`you're in controller.getScenes`);
    dbhelper.getScenes(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(`error in controller.getScenes`);
      } else {
        console.log(`successful controller.getScenes`);
        res.status(200).send(results);
      }
    });
  },

  addScene: (req, res) => {
    console.log(`you're in controller.addScene`);
    dbhelper.addScene(req, (err, results) => {
      if(err) {
        console.log(err);
        res.status(404).send(`error in controller.addScene`);
      } else {
        console.log(`successful controller.addScene`);
        res.status(200).send(results);
      }
    });
  },

  getTourById: (req, res) => {
    console.log(`you're in controller.getTourById`);
    dbhelper.getTourById(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(`error in controller.getTourById`);
      } else {
        console.log(`successful controller.getTourById`);
        res.status(200).send(results);
      }
    });
  },

  updateTourById: (req, res) => {
    console.log(`you're in controller.updateTourById`);
    dbhelper.updateTourById(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(`error in controller.updateTourById`);
      } else {
        console.log(`successful controller.updateTourById`);
        res.status(200).send(results);
      }
    });
  },

  deleteTourById: (req, res) => {
    console.log(`you're in controller.deleteTourById`);
    dbhelper.deleteTourById(req, (err, results) => {
      if (err) {
        console.log(err);
        res.status(404).send(`error in controller.deleteTourById`);
      } else {
        console.log(`successful controller.deleteTourById`);
        res.status(200).send(results);
      }
    });
  },

  // getPreSignedUrl: (req, res) => {
  //   console.log(`you're in controller.getPreSignedUrl`)
  //   s3UploadHelper.getPreSignedUrl(req, (err, results) => {
  //     if (err) {
  //       res.status(400).send(err);
  //     } else {
  //       res.status(200).send(results);
  //     }
  //   });
  // },

  getUrlInsertDb: (req, res) => {
    console.log(`you're in controller.getUrlInsertDb`);
    s3UploadHelper.getCountThenUrl(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },
  getUrlInsertDbForObject: (req, res) => {
    console.log(`you're in controller.getUrlInsertDbForObject`);
    s3UploadHelper.getCountThenUrlForObject(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  getToursByUser: (req, res) => {
    console.log(`you're in controller.getToursByUser`);
    dbhelper.getToursByUser(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  addObject: (req, res) => {
    console.log(`you're in controller.addObject`);
    dbhelper.addObject(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  updateObject: (req, res) => {
    console.log(`you're in controller.updateObject`);
    dbhelper.updateObject(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  getObjectsByScene: (req, res) => {
    console.log(`you're in controller.getObjectsByScene`);
    dbhelper.getObjectsByScene(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  searchTours: (req, res) => {
    console.log(`you're in controller.searchTours`);
    dbhelper.searchTours(req, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  }
}