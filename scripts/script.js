// script.js

import { router } from './router.js';



const headerText = document.querySelector('header > h1');
const settings = document.querySelector('header > img');

// When the back button is hit, set the state with the new page
window.addEventListener('popstate', e => {
  if (e.state?.page && e.state.page.startsWith('entry')) {
    router.setState('entry', true, Number(e.state.page.substr(5, e.state.page.length)));
  } else {
    router.setState(e.state?.page, true);
  }
});

// Go to header page when header button is clicked
headerText.addEventListener('click', () => {
  router.setState('home', false);
});

// Go to settings page when settings button is clicked
settings.addEventListener('click', () => {
  router.setState('settings', false);
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.addEventListener('click', () => {
          let numEntry = Array.from(document.querySelector('main').childNodes).indexOf(newPost);
          router.setState('entry', false, numEntry + 1);
        });
        document.querySelector('main').appendChild(newPost);
      });
    });
});





// Instantiate the SDK. CDN will expose splitio globally 
var factory = splitio({ 
  core: {
    authorizationKey: 'YOUR_API_KEY',
    // your internal user id, or the account id that 
    // the user belongs to. 
    // This coudld also be a cookie you generate
    // for anonymous users
    key: 'key',
    // an OPTIONAL traffic type, if provided will be
    // used for event tracking with the SDK client.
    trafficType: 'A_TRAFFIC_TYPE'
  }
});
// And get the client instance you'll use
var client = factory.client();

client.on(client.Event.SDK_READY, function() {
  var attributes = {
    // date attributes are handled as `millis since epoch`
    registered_date: new Date('YYYY-MM-DDTHH:mm:ss.sssZ').getTime(),
    // this string will be compared against a list called `plan_type`
    plan_type: 'growth',
    // this number will be compared agains a const value called `deal_size`
    deal_size: 10000,
    // this boolean will be compared against a const value called `paying_customer`
    paying_customer: true,
    // this array will be compared against a set called `permissions`
    permissions: ["read", "write"]
  };
  
  var treatment = client.getTreatment('SPLIT_NAME', attributes);
  if (treatment == "on") {
      // insert code here to show on treatment
  } else if (treatment == "off") {
      // insert code here to show off treatment
  } else {
      // insert your control treatment code here
  }
});


// You can just destroy and remove the variable reference and move on:
user_client.destroy();
user_client = null;
// destroy() returns a promise, so if you want to, for example,
// navigate to another page without loosing impressions, you 
// can do that once the promise resolves.
user_client.destroy().then(function() {
     user_client = null;
  document.location.replace('another_page');
});