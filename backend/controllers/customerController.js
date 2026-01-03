import Customer from "../models/customerModel.js";

// Add new customer
export const addCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({ success: true, customer });
  } catch (err) {
    next(err);
  }
};

// Get all customers
export const getCustomers = async (req, res, next) => {
  try {
    // Query params-ல் page, limit எடுத்துக்கொள்
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const total = await Customer.countDocuments();
    const customers = await Customer.find().skip(skip).limit(limit);

    res.json({
      success: true,
      customers,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

// Update customer
export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.json({ success: true, customer });
  } catch (err) {
    next(err);
  }
};

// Delete customer
export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.json({ success: true, message: "Customer deleted" });
  } catch (err) {
    next(err);
  }
};
