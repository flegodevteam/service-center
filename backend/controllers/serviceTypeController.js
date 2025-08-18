const ServiceType = require("../models/serviceTypeModel");

exports.addServiceType = async (req, res, next) => {
  try {
    const serviceTypeData = req.body;

    // Check if service already exists
    const exists = await ServiceType.findOne({ name: serviceTypeData.name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Service type already exists",
      });
    }

    const serviceType = await ServiceType.create(serviceTypeData);
    res.status(201).json({ success: true, serviceType });
  } catch (err) {
    next(err);
  }
};

exports.getServiceTypes = async (req, res, next) => {
  try {
    const serviceTypes = await ServiceType.find();
    res.json({ success: true, serviceTypes });
  } catch (err) {
    next(err);
  }
};

exports.updateServiceType = async (req, res, next) => {
  try {
    const serviceType = await ServiceType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!serviceType) {
      return res.status(404).json({
        success: false,
        message: "Service type not found",
      });
    }

    res.json({ success: true, serviceType });
  } catch (err) {
    next(err);
  }
};

exports.deleteServiceType = async (req, res, next) => {
  try {
    const serviceType = await ServiceType.findByIdAndDelete(req.params.id);
    if (!serviceType) {
      return res.status(404).json({
        success: false,
        message: "Service type not found",
      });
    }
    res.json({ success: true, message: "Service type deleted" });
  } catch (err) {
    next(err);
  }
};

// Get vehicle types list
exports.getVehicleTypes = async (req, res, next) => {
  try {
    const vehicleTypes = [
      "Bike",
      "Three-wheeler",
      "Car",
      "Van",
      "Lorry",
      "Bus",
      "Other",
    ];
    res.json({ success: true, vehicleTypes });
  } catch (err) {
    next(err);
  }
};
