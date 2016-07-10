function formatUTCTime(date) {
	var hours;
	var minutes;
	var seconds;
	var timeString;
	
	hours = date.getUTCHours();
 	minutes = date.getUTCMinutes();
	seconds = date.getUTCSeconds();
		
	timeString = zeroPad(hours) + ":" + zeroPad(minutes) + ":" + zeroPad(seconds);
	return timeString;
}
	
function formatTime(date) {
	var hours;
	var minutes;
	var seconds;
	var timeString;
	
	hours = date.getHours();
 	minutes = date.getMinutes();
	seconds = date.getSeconds();
		
	timeString = zeroPad(hours) + ":" + zeroPad(minutes) + ":" + zeroPad(seconds);
	return timeString;
}

function timeDecimalToHMS(inputTime){
	hours = Math.floor(inputTime);
	inputTime-=hours;
	minutes = Math.floor(inputTime*60);
	inputTime = inputTime*60 - minutes;
	seconds = Math.floor(inputTime*60);
	timeString = zeroPad(hours) + ":" + zeroPad(minutes) + ":" + zeroPad(seconds);
	return timeString;
}

function decimalPlacesFloat(value, places) {
	multiplier = Math.pow(10, places);
	return Math.round(value*multiplier) / multiplier;
}

function decimalPlacesString(value, places) {
	floatValue = decimalPlacesFloat(value, places);
	numberString = floatValue.toString();
	trailingZeros = places - numberString.split('.')[1].length;
	for (var i=0; i<trailingZeros; i++) numberString = numberString + "0";
	return numberString;
}


function julianDate(now) {
   return (now.valueOf()/86400000) + 2440587.5;
}

function frac(X) {
   var X = X - Math.floor(X);
   if ( X < 0 ) X += 1.0;
   return X;		
}

function GM_Sidereal_Time(jd) {	
   MJD = jd - 2400000.5;		
   MJD0 = Math.floor(MJD);
   ut = (MJD - MJD0)*24.0;		
   t_eph = (MJD0-51544.5)/36525.0;			
   gmst =  6.697374558 + 1.0027379093*ut
            + (8640184.812866 + (0.093104 - 0.0000062*t_eph)*t_eph)*t_eph/3600.0;		
   while ( gmst > 24 ) { gmst -= 24 }
   return gmst;
}

function LM_Sidereal_Time(jd, longitude) {
   return 24.0*frac((GM_Sidereal_Time(jd) + longitude/15.0)/24.0);
}
