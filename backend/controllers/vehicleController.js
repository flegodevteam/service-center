const Vehicle = require("../models/vehicleModel");

// Add new vehicle
exports.addVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    // Populate pannuvom add pannina appo
    const populatedVehicle = await Vehicle.findById(vehicle._id).populate(
      "owner",
      "name email phone"
    );
    res.status(201).json({ success: true, vehicle: populatedVehicle });
  } catch (err) {
    next(err);
  }
};

// Get all vehicles (with owner details)
exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find().populate("owner", "name email phone");
    res.json({ success: true, vehicles });
  } catch (err) {
    next(err);
  }
};
