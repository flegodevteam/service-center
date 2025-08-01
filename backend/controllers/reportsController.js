const Billing = require("../models/billingModel");
const JobCard = require("../models/jobCardModel");

exports.getMonthlyRevenue = async (req, res, next) => {
  try {
    // Last 6 months revenue
    const pipeline = [
      {
        $group: {
          _id: { $substr: ["$date", 0, 7] }, // "YYYY-MM"
          revenue: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ];
    const data = await Billing.aggregate(pipeline);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getServiceStats = async (req, res, next) => {
  try {
    // Count jobs & revenue per service
    const pipeline = [
      { $unwind: "$services" },
      {
        $group: {
          _id: "$services",
          jobs: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { jobs: -1 } },
    ];
    const data = await JobCard.aggregate(pipeline);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

