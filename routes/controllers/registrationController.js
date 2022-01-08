import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";

const registerUser = async ({ request, response }) => {
    const body = request.body();
    const params = await body.value;
  
    const email = params.get("email");
    const password = params.get("password");
  
    const existingUsers = await userService.findUsersWithEmail(email);
    if (existingUsers.rows.length > 0) {
      response.body = "The email is already reserved.";
      return;
    }
  
    const hash = await bcrypt.hash(password);
    await userService.addUser(email, hash);
    response.redirect("/auth/login");
  };


const showRegistrationForm = ({ render }) => {
  render("registration.eta");
};

export { registerUser, showRegistrationForm };