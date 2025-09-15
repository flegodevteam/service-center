const ServiceTypeConfig = require("../models/serviceTypeModel");

// Get config
exports.getConfig = async (req, res) => {
  const config = await ServiceTypeConfig.findOne();
  if (!config) {
    // If not exists, create default
    const newConfig = await ServiceTypeConfig.create({
      vehicleTypes: [],
      serviceTypes: [],
      serviceLevels: ["normal", "hard", "heavy"],
      serviceLevelOptions: [],
    });
    return res.json(newConfig);
  }
  res.json(config);
};

// Add vehicle type
exports.addVehicleType = async (req, res) => {
  const { type } = req.body;
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  if (!config.vehicleTypes.includes(type)) {
    config.vehicleTypes.push(type);
    await config.save();
  }
  res.json(config.vehicleTypes);
};

// Delete vehicle type
exports.deleteVehicleType = async (req, res) => {
  const { type } = req.params;
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  config.vehicleTypes = config.vehicleTypes.filter((v) => v !== type);
  await config.save();
  res.json(config.vehicleTypes);
};

// Add service type
exports.addServiceType = async (req, res) => {
  const { type } = req.body;
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  if (!config.serviceTypes.includes(type)) {
    config.serviceTypes.push(type);
    await config.save();
  }
  res.json(config.serviceTypes);
};

// Delete service type
exports.deleteServiceType = async (req, res) => {
  const { type } = req.params;
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  config.serviceTypes = config.serviceTypes.filter((v) => v !== type);
  await config.save();
  res.json(config.serviceTypes);
};

// Add service level option
exports.addServiceLevelOption = async (req, res) => {
  const { option } = req.body;
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  if (!config.serviceLevelOptions.includes(option)) {
    config.serviceLevelOptions.push(option);
    await config.save();
  }
  res.json(config.serviceLevelOptions);
};

// Delete service level option
exports.deleteServiceLevelOption = async (req, res) => {
  const { option } = req.params;
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  config.serviceLevelOptions = config.serviceLevelOptions.filter(
    (v) => v !== option
  );
  await config.save();
  res.json(config.serviceLevelOptions);
};

// Save pricing config
exports.savePricingConfig = async (req, res) => {
  const { basePrice, hardIncrease, heavyIncrease } = req.body;
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  config.pricingConfig = {
    basePrice: Number(basePrice) || 0,
    hardIncrease: Number(hardIncrease) || 0,
    heavyIncrease: Number(heavyIncrease) || 0,
  };
  await config.save();
  res.json({ success: true, pricingConfig: config.pricingConfig });
};

// Get pricing config (optional)
exports.getPricingConfig = async (req, res) => {
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  res.json(config.pricingConfig || {});
};
