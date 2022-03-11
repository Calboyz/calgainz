import { Selector } from 'testcafe';

class RegisterPage {
    constructor() {
        this.pageId = '#register-page';
        this.pageSelector = Selector(this.pageId);
    }

    async isDisplayed(testController) {
        await testController.expect(this.pageSelector.exists).ok();
    }

    async registerUser(testController, username, email, password) {
        await this.isDisplayed(testController);
        await testController.typeText('#register-form-username', username);
        await testController.typeText('#register-form-email', email);
        await testController.typeText('#register-form-password', password);
        await testController.typeText('#register-form-confirm', password);
        await testController.click('#register-form-submit');
    }
}

export const registerPage = new RegisterPage();