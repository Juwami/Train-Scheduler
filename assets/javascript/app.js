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

    database.ref().push(trainEntered)

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

    let minutesNeedWait = minutesTilTrain(firstTrain, trainFrequency)
    let NextTrainArrival = nextTrainArrival(firstTrain, trainFrequency)

    let newTrainRow = $('<tr>').append(
        $('<td>').text(trainName).addClass('text-center'),
        $('<td>').text(destination).addClass('text-center'),
        $('<td>').text(trainFrequency).addClass('text-center'),
        $('<td>').text(NextTrainArrival).addClass('text-center'),
        $('<td>').text(minutesNeedWait).addClass('text-center')
    )

    $('#trainScheduleBody').append(newTrainRow)
})

let updateTime = function () {
    $('#currentTime').html(moment().format('D/MMM/YYYY HH:mm:ss'))
}

let minutesTilTrain = function (train, frequency) {
    let firstTimeConverted = moment(train, 'HH:mm').subtract(1, 'years')
    // let currentTime = moment().format('HHmm')
    let diffTime = moment().diff(moment(firstTimeConverted), 'minutes')
    console.log('Difference In Time: ' + diffTime)

    let remainder = diffTime % frequency
    console.log('Remainder of DiffTime And Frequency: ' + remainder)

    let minutesTil = frequency - remainder
    return minutesTil
}

let nextTrainArrival = function (train, frequency) {
    let firstTimeConverted = moment(train, 'HH:mm').subtract(1, 'years')
    // let currentTime = moment().format('HHmm')
    let diffTime = moment().diff(moment(firstTimeConverted), 'minutes')
    console.log('Difference In Time: ' + diffTime)

    let remainder = diffTime % frequency
    console.log('Remainder of DiffTime And Frequency: ' + remainder)

    let minutesUntilTrain = frequency - remainder
    console.log(minutesUntilTrain)

    let nextTrain = moment().add(minutesUntilTrain, 'minutes').format('HH:mm')
    return nextTrain
}