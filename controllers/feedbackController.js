import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllFeedbacks = async (req, res) => {
  const { course, page = 1, limit = 5 } = req.query;
  const query = course ? { course: { $regex: course, $options: "i" } } : {};

  try {
    const feedbacks = await Feedback.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Feedback.countDocuments(query);
    res.json({ feedbacks, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
