import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const postLoginForm = async ({ request, response, state }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");

  const existingUsers = await userService.findUsersWithEmail(email);
  if (existingUsers.rows.length === 0) {
    response.status = 401;
    return;
  }

  const userObj = existingUsers.rows[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
    response.status = 401;
    return;
  }

  await state.session.set("authenticated", true);
  await state.session.set("user", {
    id: userObj.id,
    email: userObj.email,
  });
  response.redirect("/questions");
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};


export { postLoginForm, showLoginForm };