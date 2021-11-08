var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;
let statusCounter = 0;

// This index function needs to make two different calls as using 'JSON.stringify' on the response.json() does not format correctly via console.
async function index() {
    const response = await fetch("https://mustang-index.azurewebsites.net/index.json");
    const contactIndex = await response.text(); // fetches a text version of the index 

    console.log("Index JSON:\n\n" + contactIndex);
    document.getElementById("index").innerHTML = contactIndex;
    

    const response2 = await fetch("https://mustang-index.azurewebsites.net/index.json");
    const contactIndexJ = await response2.json(); // fetches a json version of the index

    for (i=0; i<contactIndexJ.length; i++) {
        contactURLArray.push(contactIndexJ[i].ContactURL);
    }
    console.log("ContactURLArray: " + JSON.stringify(contactURLArray));
}

// This contactR function follows the same layout as mustang-lite
function contactR(){
     contactArray.length = 0;
     loadingContact = 0;

     if (contactURLArray.length > loadingContact) {
         nextContact(contactURLArray[loadingContact]);
     }
}

// This nextContact function stores contact objects into a contactArray and logs it to the DOM
async function nextContact(URL) {
    console.log("URL: " + URL);
    const response = await fetch(URL);
    const contactResponse = await response.text();;
    
    contact = JSON.parse(contactResponse);
    console.log(contactResponse);
    console.log("Contact: " + contact.firstName);

    contactArray.push(contact);


    document.getElementById("status").innerHTML = "status bar : " + statusCounter + "%";
    statusCounter = statusCounter + 6;
    if(statusCounter > 100){
        statusCounter = 100;
    }

    document.getElementById("contacts").innerHTML = JSON.stringify(contactArray);
    console.log(contactArray);

    loadingContact++;

    if (contactURLArray.length > loadingContact) {
        nextContact(contactURLArray[loadingContact]);
    }

}
 
// Logs contactArray into console
function logContacts() {
    console.log(contactArray);
}