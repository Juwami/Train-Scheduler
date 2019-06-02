const firebaseConfig = {
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

$(document).ready(function () {
    $('#currentTime').html(moment().format('D/MMM/YYYY HH:mm:ss'))
    updateTime()
    setInterval(updateTime, 1000)

})

$('#submitBtn').on('click', function () {
    event.preventDefault()

    let $trainNameInput = $('.trainNameInput').val().trim()
    let $destinationInput = $('.destinationInput').val().trim()
    let $firstTrainTimeInput = $('.firstTrainTimeInput').val().trim()
    let $frequencyInput = $('.frequencyInput').val().trim()

    let trainEntered = {
        trainName: $trainNameInput,
        destination: $destinationInput,
        firstTrain: $firstTrainTimeInput,
        frequency: $frequencyInput
    }

    console.log(trainEntered)

    // database.ref().push(trainEntered)

    $('.trainNameInput').val('')
    $('.destinationInput').val('')
    $('.firstTrainTimeInput').val('')
    $('.frequencyInput').val('')
})

database.ref().on('child_added', function (snapshot) {
    console.log(snapshot.val())

    let destination = snapshot.val().destination
    let firstTrain = snapshot.val().firstTrain
    let trainFrequency = snapshot.val().frequency
    let trainName = snapshot.val().trainName

    console.log(destination)
    console.log(firstTrain)
    console.log(trainFrequency)
    console.log(trainName)

    let newTrainRow = $('<tr>').append(
        $('<td>').text(trainName).addClass('text-center'),
        $('<td>').text(destination).addClass('text-center'),
        $('<td>').text(trainFrequency).addClass('text-center'),
        $('<td>').text('next arrival: current time + fre').addClass('text-center'),
        $('<td>').text('minutes away').addClass('text-center')
    )
    $('#trainScheduleBody').append(newTrainRow)
})

let updateTime = function () {
    $('#currentTime').html(moment().format('D/MMM/YYYY HH:mm:ss'))
}