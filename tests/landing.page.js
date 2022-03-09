import { Selector } from 'testcafe';
import { navBar } from "./navbar.component";

class LandingPage {
    constructor() {
        this.pageId = '#landing-page';
        this.pageSelector = Selector(this.pageId);
    }

    async isDisplayed(testController) {
        await testController.wait(5000).expect(this.pageSelector.exists).ok();
    }

    async gotoSigninPage(testController) {
        await this.ensureLogout(testController);
        await navBar.gotoSigninPage(testController);
    }

    async gotoRegisterPage(testController) {
        await this.ensureLogout(testController);
        await navBar.gotoRegisterPage(testController);
    }

    async logout(testController) {
        await testController.expect(Selector('#navbar-current-user').exists).ok();
        await navBar.logout(testController);
    }

    async ensureLogout(testController) {
        const loggedInUser = await Selector('#navbar-current-user').exists;
        if (loggedInUser) {
            await navBar.logout(testController);
        }
    }
}

export const landingPage = new LandingPage();