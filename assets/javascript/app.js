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
    event.preventDefault()

    let $trainNameInput = $('.trainNameInput').val().trim()
    let $destinationInput = $('.destinationInput').val().trim()
    let $firstTrainTimeInput = $('.firstTrainTimeInput').val().trim()
    let $frequencyInput = $('.frequencyInput').val().trim()

    console.log($trainNameInput)
    console.log($destinationInput)
    console.log($firstTrainTimeInput)
    console.log($frequencyInput)
})