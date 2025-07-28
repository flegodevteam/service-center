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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Vehicle.countDocuments();
    const vehicles = await Vehicle.find()
      .populate("owner", "name email phone")
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      vehicles,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

// Edit vehicle
exports.updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("owner", "name email phone");
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }
    res.json({ success: true, vehicle });
  } catch (err) {
    next(err);
  }
};

// Delete vehicle
exports.deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle not found" });
    }
    res.json({ success: true, message: "Vehicle deleted" });
  } catch (err) {
    next(err);
  }
};
