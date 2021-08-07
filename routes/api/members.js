const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

// Gets all members
router.get("/", (req, res) => {
  res.json(members);
});

// Get Single member
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ message: `${req.params.id} Member not found` });
  }
});

// Create Member or POST request
router.post("/", (req, res) => {
  const newMmember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };
  if (!newMmember.name || !newMmember.email) {
    return res
      .status(404)
      .json({ message: "Please enter name or email address" });
  } else {
    // members.save(newMembers) /*For real database */
    members.push(newMmember);
    return res.status(200).json({ members });
  }
});

//Update a member
router.put("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        (member.name = updateMember.name ? updateMember.name : member.name),
          (member.email = updateMember.email
            ? updateMember.email
            : member.email),
          res.status(200).json({ message: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ message: `${req.params.id} Member not found` });
  }
});

//Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      message: `Member ${req.params.id} deleted`,
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ message: `${req.params.id} Member not found` });
  }
});
module.exports = router;
