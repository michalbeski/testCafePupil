import { Homepage } from '../page_objects/homepage';
import { ClientFunction } from 'testcafe';

const homepage = new Homepage;

fixture `SmokeTest`.beforeEach(async t=> {
    await homepage.testInitialSetup(homepage.hompeageUrl);
});
    
    test ("Test navigation bar", async (t) => {
        await t
        .click(homepage.mainTab)
        .expect(homepage.mainTab.textContent).eql('Sklep dla zwierzaka', 'Read value not equal to given name')
        .expect(homepage.galeriaTab.textContent).eql('Galeria', 'Read value not equal to given name')
        .expect(homepage.oSklepieTab.textContent).eql('O sklepie', 'Read value not equal to given name')
        .expect(homepage.kontakTab.textContent).eql('Kontakt', 'Read value not equal to given name')
        .expect(homepage.lokalizacjaTab.textContent).eql('Lokalizacja', 'Read value not equal to given name')
        .expect(homepage.logoPupil.visible).ok('Pupil logo not visible');
    });

    test ("Test 'Galeria' section", async (t) => {
        await t
        .click(homepage.galeriaTab)
        .expect(homepage.galeriaSection.visible).ok('Galeria section not visible')
        .expect(homepage.firstPhoto.visible).ok('First photo in galery section not visible');
    });
        

    test ("Test 'O Sklepie' section", async (t) => {
        await t
        .click(homepage.oSklepieTab)
        .expect(homepage.oSklepieSection.visible).ok('O Sklepie section not visible')
        .expect(homepage.phoneNumber.textContent).contains('666 926 419' ,'Phone number in "O Sklepie" section not visible');
    });


    test ("Test 'Kontakt' section", async (t) => {
        await t
        .click(homepage.kontakTab)
        .expect(homepage.kontaktSection.visible).ok('Kontakt section not visible')
        .expect(homepage.phoneNumber.visible).ok('Contact Form in "Kontakt" section not visible');
    });

    test ("Test 'Lokalizacja' section", async (t) => {
        await t
        .click(homepage.lokalizacjaTab)
        .expect(homepage.lokalizacjaSection.visible).ok('Lokalizacja section not visible')
        .expect(homepage.googleMap.visible).ok('Google Map in "Lokalizacja" section not visible');
    });
    
    test ("Test 'footer' section", async (t) => {
        await t
        .click(homepage.lokalizacjaTab)
        .expect(homepage.footerSection.visible).ok('Footer section not visible')
    });

    test ("Test 'Facebook' redirection", async (t) => {
      
        const getLocation = ClientFunction(() => document.location.href);
    
        await t
         .expect(homepage.facebookLink.visible).ok('Facebook link not visible')
         .click(homepage.facebookLink)
         //.debug()
         const facebookPupilPageElement = await homepage.facebookPupilPage.with({ visibilityCheck: true })();
        await t 
         .expect(getLocation()).contains('www.facebook.com/SklepPupilZarkiLetnisko', 'URL is invalid');
    });