import { Selector } from 'testcafe';

class SigninPage {
    constructor() {
        this.pageId = '#signin-page';
        this.pageSelector = Selector(this.pageId);
    }

    async isDisplayed(testController) {
        await testController.expect(this.pageSelector.exists).ok();
    }

    async signin(testController, username, password) {
        await this.isDisplayed(testController);
        await testController.typeText('#signin-form-username', username);
        await testController.typeText('#signin-form-password', password);
        await testController.click('#signin-form-submit');
    }
}

export const signinPage = new SigninPage();
