import ServiceTypeConfig from "../models/serviceTypeModel.js";

// Get config
export const getConfig = async (req, res) => {
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
export const addVehicleType = async (req, res) => {
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
export const deleteVehicleType = async (req, res) => {
  const { type } = req.params;
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  config.vehicleTypes = config.vehicleTypes.filter((v) => v !== type);
  await config.save();
  res.json(config.vehicleTypes);
};

// Add service type
export const addServiceType = async (req, res) => {
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
export const deleteServiceType = async (req, res) => {
  const { type } = req.params;
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  config.serviceTypes = config.serviceTypes.filter((v) => v !== type);
  await config.save();
  res.json(config.serviceTypes);
};

// Add service level option
export const addServiceLevelOption = async (req, res) => {
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
export const deleteServiceLevelOption = async (req, res) => {
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
export const savePricingConfig = async (req, res) => {
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
export const getPricingConfig = async (req, res) => {
  const config = await ServiceTypeConfig.findOne();
  if (!config) return res.status(404).json({ message: "Config not found" });
  res.json(config.pricingConfig || {});
};
