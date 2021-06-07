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

function getRandomString(length) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}
var rand = getRandomString(36);
// Instantiate the SDK. CDN will expose splitio globally 
var factory = splitio({ 
  core: {
    authorizationKey: 'kgbi1ccdefqdlesdpdfreub73j8mfd80pj0t',//prod client side
    // your internal user id, or the account id that 
    // the user belongs to. 
    // This coudld also be a cookie you generate
    // for anonymous users
    key: rand,
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
  
var splitNames = ['doubleColumn', 'secondSplit'];
  var treatments = client.getTreatments(splitNames);
  // console.log(treatments);
  var treatment_one = treatments.doubleColumn;
  var treatment_two = treatments.secondSplit;
  // var treatment_one = client.getTreatment('doubleColumn', attributes);//SPLIT_NAME
  if (treatment_one == "on") {
      // insert code here to show on treatment
      var v = document.getElementsByTagName('main')[0]
      v.className = "double-column";
  } else if (treatment_one == "off") {
      // insert code here to show off treatment
      var a = document.getElementsByTagName('main')[0]
      a.className = "";
  } else {
      // insert your control treatment code here
  }


//second split
  // var treatment_two = client.getTreatment('secondSplit', attributes);//SPLIT_NAME
  if (treatment_two == "on") {
      // insert code here to show on treatment
      var v2 = document.getElementsByTagName('h1')[0];
      v2.innerHTML = "Journal Entries";
  } else if (treatment_two == "off") {
      // insert code here to show off treatment
      var a2 = document.getElementsByTagName('h1')[0];
      a2.innerHTML = "";
  } else {
      // insert your control treatment code here
  }
});


// // You can just destroy and remove the variable reference and move on:
// client.destroy();
// client = null;
// // destroy() returns a promise, so if you want to, for example,
// // navigate to another page without loosing impressions, you 
// // can do that once the promise resolves.
// client.destroy().then(function() {
//      client = null;
//   document.location.replace('another_page');
// });