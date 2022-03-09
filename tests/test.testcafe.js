import { landingPage } from "./landing.page";
import { registerPage } from "./register.page";
import { navBar } from "./navbar.component";
import {signoutPage} from "./signout.page";
import {signinPage} from "./signin.page";

const credentials = { username:'john', password: 'changeme' };

fixture('Calgainz localhost test with default db').page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
    await landingPage.isDisplayed(testController);
})

test('Test that register works', async (testController) => {
    const newUser = `user-${new Date().getTime()}`;
    const newEmail = `${newUser}@gmail.com`;
    const securePassword = 'Th!s1s$uprh@rd';
    await landingPage.gotoRegisterPage(testController);
    await registerPage.registerUser(testController, newUser, newEmail, securePassword);
    await landingPage.isDisplayed(testController);
    await navBar.isLoggedIn(testController, newUser);
    await navBar.logout(testController);
    await signoutPage.isDisplayed(testController);
});

test('Test that signin and logout works', async (testController) => {
    await landingPage.gotoSigninPage(testController);
    await signinPage.signin(testController, credentials.username, credentials.password);
    await landingPage.isDisplayed(testController);
    await navBar.isLoggedIn(testController, credentials.username);
    await navBar.logout(testController);
    await signoutPage.isDisplayed(testController);
})