import { Selector, t, ClientFunction } from 'testcafe';

export class Page {
   public logo:Selector = Selector("#fa fa-trophy");
   public hompeageUrl: string = "http://pupil-zarkiletnisko.pl/";

    async testInitialSetup(url) {
        await t
            .maximizeWindow()
            .navigateTo(url);
    }

    public getAllCookies = ClientFunction(() => {
        return document.cookie;
    });

}