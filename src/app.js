import page from "./lib/page.mjs";
import { hasUser, isOwner } from "./middlewares/guards.js";
import { preload } from "./middlewares/preloader.js";
import { addRender } from "./middlewares/render.js";
import { addSession } from "./middlewares/session.js";
import { addUserNav } from "./middlewares/userNav.js";

import { getUserData } from "./util.js";

import { catalogView } from "./views/catalog.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { logoutAction } from "./views/logout.js";
import { navTemplate } from "./views/nav.js";
import { registerView } from "./views/register.js";

page(
    addRender(document.querySelector("main"), document.querySelector("header"))
);
page(addSession(getUserData));
page(addUserNav(navTemplate));

page("/", homeView);
page("/rooms", catalogView);
page("/rooms/:id", preload("id", "rooms"), detailsView);
page("/host", hasUser(), createView);
page("/edit/:id", preload("id", "rooms"), isOwner(), editView);

page("/register", registerView);
page("/login", loginView);
page("/logout", logoutAction);
page.start();
