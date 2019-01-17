import { Selector, t } from 'testcafe';
import { Page } from './page';

export class Homepage extends Page {

    public static currentDate:string;
    constructor(){
        super();
        Homepage.currentDate= new Date().toLocaleDateString();
    }

    //header
    public mainTab = Selector('.navbar-brand.navbar-left').withAttribute('href', '#page-top');
    public navBar = Selector('.nav navbar-nav navbar-right');
    public galeriaTab = Selector('#bs-example-navbar-collapse-1 a').withAttribute('href', '#photo');
    public createButton = Selector("button").withText("Create");
    public oSklepieTab = Selector('#bs-example-navbar-collapse-1 a').withAttribute('href', '#about');
    public kontakTab = Selector('#bs-example-navbar-collapse-1 a').withAttribute('href', '#contact');
    public lokalizacjaTab = Selector('#bs-example-navbar-collapse-1 a').withAttribute('href', '#localization'); 
    public introText = Selector('.intro-text > span.name');
    public logoPupil = Selector('.img-rounded.img-responsive').withAttribute('src', 'img/logo_pupil.jpg');

    //galeria section
    public galeriaSection = Selector('#photo');
    public firstPhoto = Selector('#photo .img-responsive').withAttribute('src', 'img/1.JPG');

    //o sklepie section
    public oSklepieSection = Selector('#about');
    public phoneNumber = Selector('#about .container');
    
    //kontakt section
    public kontaktSection = Selector('#about');
    public contactForm = Selector('#contactForm');

    //lokalizacj section
    public lokalizacjaSection = Selector('#about');
    public googleMap = Selector('#GoogleMap');

    //footer
    public footerSection = Selector('div.footer-below > .container');
    public facebookLink = Selector('.footer-below .list-inline a').withAttribute('href', 'https://www.facebook.com/SklepPupilZarkiLetnisko');
    public facebookPupilPage = Selector('#js_5q');

async goToMainTab() {
    await t 
        .click(this.mainTab)
        .expect(this.navBar).ok
}

}