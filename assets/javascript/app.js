let firebaseConfig = {
    apiKey: "AIzaSyDFZpUTsrZDFLc4fzswF7_2zilHSiqObwU",
    authDomain: "train-scheduler-a30e5.firebaseapp.com",
    databaseURL: "https://train-scheduler-a30e5.firebaseio.com",
    projectId: "train-scheduler-a30e5",
    storageBucket: "train-scheduler-a30e5.appspot.com",
    messagingSenderId: "457857000350",
    appId: "1:457857000350:web:4649510b9b490eba"
};

firebase.initializeApp(firebaseConfig)

let database = firebase.database()

$('#submitBtn').on('click', function() {
    let $trainNameInput = $('.trainNameInput').value().trim()
    let $destinationInput = $('.destinationInput').value().trim()
    let $firstTrainTimeInput = $('.firstTrainTimeInput').value().trim()
    let $frequencyInput = $('.frequencyInput').value().trim()
})