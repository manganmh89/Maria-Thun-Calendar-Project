
// ELEMENTS REF'D
const $results = $('#results')
const $resultsZ = $('#resultsZ')
const $formM = $('.formM')
const $formZ = $('.formZ')
const $input = $( 'input[type="text"]' )
const $inputZ = $('.date')

// EVENT LISTENERS
$formM.on('submit', handleGetData)
$formZ.on('submit', function(event){
    event.preventDefault();
    handleGetZodiac(event);
})

// FUNCTIONS
function handleGetData(event) {
    console.log($input.val())
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${($input.val())}?key=K4CKEF7AFMK69N9VWWMWYDTPG`;
    event.preventDefault();
    userInput = ($input.val())
    if(userInput === '') return;

    $input.val('')

    $.ajax( URL ).then( ( data ) => {
        console.log( data );
        $results.text(phaseName(data.currentConditions.moonphase));
    });
}
//try to convert into a switch statement!
function phaseName (inp) {

        if (inp === 0) {
            return "New Moon"
        }
        else if (inp < 0.25){
            return "Waxing Crescent"	
        } 
        else if (inp === 0.25){
            return "First Quarter"
        }
        else if (inp < 0.5){
            return "Waxing Gibbous"
        }
        else if (inp === 0.5){
            return "Full Moon"
        }
        else if (inp < 0.75){
            return "Waning Gibbous"
        }
        else if (inp ===0.75){
            return "Last Quarter"
        }
        else if (inp < 1){
            return "Waning Crescent"
        }
        else if (inp === 1){
            return "Full Moon"
        }
};

function handleGetZodiac (event) {
    event.preventDefault();
    var test = $inputZ.val().split(" ")
    console.log(test)
    var month = test[0]
    var day = test[1]
    console.log(month,day)

    for (let zodiac in zodiacObject) {
        zodiacObject[zodiac].month.forEach(montheElement => {
            if (month == montheElement.month && day >= montheElement.dayStart && day <= montheElement.dayEnd) {
                console.log('This Current Zodiac Month is ' + zodiac + "!");
                $resultsZ.text(zodiac);
                return;
            } else {
                console.log('This is not an accurate date!');
            }
        })
    }
};

function loadZodiacData () {
    $.ajax({
        url: './zodiac-data.json',
        dataType:'json',
        async: false,
        success: data => {
            zodiacObject = data;
        }
    })
};
loadZodiacData();
