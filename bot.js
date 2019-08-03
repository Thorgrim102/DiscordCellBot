var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');


const prefix = "!" //set bot prefix

let clockedInTimeH;
let clockedInTimeM;
let clockedInTimeS;
let clockedOutTimeH;
let clockedOutTimeM;
let clockedOutTimeS;
let ClockedInTotal;
let objToday;
let today;
let time;
let timeH;
let timeM;
let timeS;
let value
let valueThor;
let valueWeiner;
let valueVapor;
let valueSiamese;
let currentvalue;
var data = fs.readFileSync('users.json')
var users = JSON.parse(data);

function updateTime(){
	
	objToday = new Date(),
		weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
		dayOfWeek = weekday[objToday.getDay()],
		domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
		dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
		months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
		curMonth = months[objToday.getMonth()],
		curYear = objToday.getFullYear(),
		curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
		curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
		curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
		curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
	today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear + "\n__**LOCAL TIME**__";
	timeH = curHour;
	timeM = curMinute;
	timeS = curSeconds;
}
setInterval(updateTime, 1000);



function addUser(username, value) {
	var username = this.user;
	var value = Number(this.value);
	users[username] = value;
}


// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.startsWith(prefix)) { // Message starts with prefix
        let command = message.slice(prefix.length).split(" "); // Split message into words
        switch (command[0]) { // Execute code depending on first word
            // !clockin
            case 'clockin':
                bot.sendMessage({
                    to: channelID,
                    message: user + " has clocked in at \n" + today
                });
				
				clockedInTimeH = timeH;
				clockedInTimeM = timeM;
				clockedInTimeS = timeS;
            break;
			// !clockout
			case 'clockout':
				clockedOutTimeH = timeH;
				clockedOutTimeM = timeM;
				clockedOutTimeS = timeS;
				
				clockedInTotal = ((clockedOutTimeH - clockedInTimeH) < 10 ? "0" + (clockedOutTimeH - clockedInTimeH) : (clockedOutTimeH - clockedInTimeH)) + ":" + ((clockedOutTimeM - clockedInTimeM) < 10 ? "0" + (clockedOutTimeM - clockedInTimeM) : (clockedOutTimeM - clockedInTimeM)) + ":" + ((clockedOutTimeS - clockedInTimeS) < 10 ? "0" + (clockedOutTimeS - clockedInTimeS) : (clockedOutTimeS - clockedInTimeS));
				bot.sendMessage({
					to: channelID,
					message: user + " has clocked out at \n" + today + "\nClocked in for: " + clockedInTotal
				});
			break;
			// !addvalue
			case 'addvalue':
				value = parseInt(command[1]);
				//addUser(user, value);
				
				//WOULD BE NICE THIS WAY BUT JUST CHECK IF USER = NAME AND THEN MAKE SURE ITS ONLY THE 4 PEOPLE THAT ARE IN THE CELL. SIAMESE ME WEINER ND VAPOR.
				
				if(user == Thorgrim102) {
					valueThor = valueThor + value;
					currentvalue = valueThor;
					console.log(currentvalue);
					console.log(valueThor);
				} else if (user == "weinerdog102") {
					valueWeiner = valueWeiner + value;
					currentvalue = valueWeiner;
					console.log(currentvalue);
					console.log(valueWeiner);
				} else if (user == "Vaporizr243") {
					valueVapor = valueVapor + value;
					currentvalue = valueVapor;
					console.log(currentvalue);
					console.log(valueVapor);
				} else if (user == "MySiameseTwin") {
					valueSiamese = valueSiamese + value;
					currentvalue = valueSiamese;
					console.log(currentvalue);
					console.log(valueSiamese);
				}
				
				
				bot.sendMessage({
					to: channelID,
					message: user + " has added \n" + value + " Value \n" + user + " total value is now: " + currentvalue
				});
			break;
            // Just add any case commands if you want to..
         }
     }
});