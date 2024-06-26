import Route from "@ioc:Adonis/Core/Route";
import User from "App/Models/User";

Route.on("/").render("welcome");

Route.resource("news", "ArticlesController")
  .paramFor("news", "slug")
  .middleware({
    edit: ["auth"],
    create: ["auth"],
    store: ["auth"],
    destroy: ["auth"],
  });

Route.on("/login").render("auth.login").as("auth.login");

Route.post("/login", async ({ auth, request, response }) => {
  debugger;
  const email = request.input("email");
  const password = request.input("password");

  await auth.use("web").attempt(email, password);
  return response.redirect("/");
});

Route.post("/logout", async ({ auth, response }) => {
  console.log(auth);
  console.log(response);
  await auth.use("web").logout();
  response.redirect("/login");
}).as("auth.logout");

Route.post("/register", async ({ request, response }) => {
  const email = request.input("email");
  const password = request.input("password");

  await User.create({ email, password });
});
