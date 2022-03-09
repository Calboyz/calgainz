import { Selector } from 'testcafe';

class SignoutPage {
    constructor() {
        this.pageId = '#signout-page';
        this.pageSelector = Selector(this.pageId);
    }

    async isDisplayed(testController) {
        await testController.expect(this.pageSelector.exists).ok();
    }
}

export const signoutPage = new SignoutPage();