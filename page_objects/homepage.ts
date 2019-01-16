import { Selector, t } from 'testcafe';
import { Page } from './page';

export class Homepage extends Page {

    public static currentDate:string;
    constructor(){
        super();
        Homepage.currentDate= new Date().toLocaleDateString();
    }

    public mainTab = Selector('a.navbar-brand navbar-left').withAttribute('href', '.*page-top*');
    //public mainTab = Selector('.a').withText('Sklep dla zwierzaka');
    public navBar = Selector('.nav navbar-nav navbar-right');
    //public galeriaTab = Selector('a').withAttribute('href', '.*photo.*');
    //public galeriaTab = Selector('.page-scroll').child('a').withAttribute('href', '.*photo.*');
    public galeriaTab = Selector('a').withText('Galeria');
    public createButton = Selector("button").withText("Create");
    public oSklepieTab = Selector('a').withAttribute('href', '.*about.*');
    public kontakTab = Selector('a').withAttribute('href', '.*contact.*');
    public lokalizacjaTab = Selector('a').withAttribute('href', '.*localization.*'); 




async goToMainTab() {
    await t 
        .click(this.mainTab)
        .expect(this.navBar).ok
}

}