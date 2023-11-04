const validation = (req, res, next) => {
  let nameError = true;
  let emailError = true;
  let passwordError = true;
  let usernameError = true;

  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.json("All the fields are mandatory");
  }

  // --------------Name validation

  if (req.body.username) {
    const currentName = req.body.username;
    if (currentName === " ") {
      return res.json("*Cannot be blank");
    } else if (!currentName.match(/^[A-Z]/)) {
      return res.json("*First character should be a Capital Letter");
    }
    if (currentName.length > 35) {
      return res.json({
        error: "*Name is too long,shouldn't be more than 35 characters",
      });
    }
    if (currentName.startsWith(" ")) {
      return res.json({ error: "*First character cannot be blank" });
    } else if (currentName.endsWith(" ")) {
      return res.json({ error: "*Last character cannot be blank" });
    }
  }

  // ---------Email Validation----------->>
  if (req.body.email) {
    const currentEmail = req.body.email;
    if (currentEmail.startsWith(" ")) {
      return res.json({ error: "*Email cannot be blank" });
    } else if (!currentEmail.match(/[@]/)) {
      return res.json({ error: "*Please include an @ in email address" });
    } else if (!currentEmail.match(/^[A-Za-z0-9]/)) {
      return res.json("*Please include a prefix before @, eg: abc@");
    }
    if (req.body.email.split("@").length > 2) {
      return res.json({ error: "You can only use one @ in your email" });
    } else if (currentEmail.match(/\s/)) {
      return res.json({ error: "*No whitespace allowed" });
    } else if (!currentEmail.match(/@([a-zA-Z0-9]+)\.{1}([a-zA-Z]){2,4}$/)) {
      return res.json({ error: "*Please provide a valid domain" });
    }
    if (req.body.email.split(".").length > 2) {
      return res.json({ error: "You can only use one . in your email" });
    }
    if (currentEmail.length > 40) {
      return res.json({
        error: "*Email is too long,shouldn't exceed 50 characters",
      });
    }
  }
  //////////////////-------------------------password validation----------------------------------------
  if (req.body.password) {
    const currentPassword = req.body.password;
    if (currentPassword === "") {
      return res.json("*Password field cannot be blank");
    } else if (currentPassword.match(/\s/)) {
      return res.json("*No whitespace allowed");
    } else if (!currentPassword.match(/[A-Z]/)) {
      return res.json("*Password should contain atleast one Uppercase");
    } else if (!currentPassword.match(/[a-z]/)) {
      return res.json("*Password should contain atleast one smallcase");
    } else if (!currentPassword.match(/[0-9]/)) {
      return res.json("*Password should contain atleast one Number");
    } else if (!currentPassword.match(/[!@#%&]/)) {
      return res.json(
        "Password should contain atleast one of this special characters: ! @ # % & ) "
      );
    }

    if (currentPassword.length > 10) {
      return res.json("*Password cannot have more than 10 characters");
    }
    next();
  }
};

module.exports = { validation };
