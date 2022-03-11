import { Selector } from 'testcafe';

class NavBar {

    async ensureLogout(testController) {
        const loggedInUser = await Selector('#navbar-current-user').exists;
        if (loggedInUser) {
            await testController.click('#navbar-current-user');
            await testController.click('#navbar-sign-out');
        }
    }

    async clickOnLogo(testController) {
        await testController.click('#logo');
    }

    async gotoSigninPage(testController) {
        await this.ensureLogout(testController);
        await testController.click('#signin-dropdown');
        await testController.click('#signin-dropdown-signin');
    }

    async gotoRegisterPage(testController) {
        await this.ensureLogout(testController);
        await testController.click('#signin-dropdown');
        await testController.click('#signin-dropdown-register');
    }

    async isLoggedIn(testController, username) {
        const loggedInUser = Selector('#navbar-current-user').innerText;
        await testController.expect(loggedInUser).eql(username);
    }

    async logout(testController) {
        await testController.expect(Selector('#navbar-current-user').exists).ok();
        await testController.click('#navbar-current-user');
        await testController.click('#navbar-sign-out');
    }

}

export const navBar = new NavBar();