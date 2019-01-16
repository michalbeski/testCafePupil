import { Homepage } from '../page_objects/homepage';

const homepage = new Homepage;

fixture `SmokeTest`.beforeEach(async t=> {
    await homepage.testInitialSetup(homepage.hompeageUrl);
});
    
    test ("Test navigation bar", async (t) => {
       // await homepage.goToMainTab();
        console.log('--------> PASSSSSSSSSS')
        await t
            //.click(homepage.mainTab)
        //     .debug();
        //     const count = await (homepage.galeriaTab).filter(node => { debugger; return true;}).count;
        //  await t    
        //     .click(homepage.galeriaTab)
        //     .click(homepage.oSklepieTab)
        //     .click(homepage.kontakTab)
        //     .click(homepage.lokalizacjaTab)
});


        