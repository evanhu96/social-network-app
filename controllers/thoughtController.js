const Thought = require("../models/Thought");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thuoght) =>
        !thuoght
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thuoght)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : Application.deleteMany({ _id: { $in: thought.applications } })
      )
      .then(() => res.json({ message: "Thought and associated apps deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res) {
    console.log("You are adding an reaction");
    console.log({ _id: req.params.thoughtId });
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeReaction(req, res) {
    console.log("You are removing an reaction");
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body} },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
