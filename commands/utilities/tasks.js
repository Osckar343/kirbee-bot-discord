module.exports = {
    name: 'tasks',
    description: 'This command allows you to list your tasks',
    cooldown: 5,
    execute(message, args) {

      console.log(`The args are: ${args}`);

        let content = args;
        console.log(content);
        
        //let arrayTask = content.split(",");
        let response = "";
    
        for (let i = 0; i < args.length; i++) {
          response += (i + 1) + " - " + args[i] + "\n";
        }

      message.channel.send(createDate());
      message.channel.send(response);
    } 
}

function createDate() {
    Date.now(); // 185219058902159028 -> 2022-12-03
    let date = new Date();
    date.toString();
  
    //const d = new Date('2019-10-04T08:55:48.972Z');
  
    let currentMonth = date.getMonth(); //0 - 11
    let currentDate = date.getDate(); //0 - 30
    let currentDay = date.getDay(); //0 - 6
  
    console.log(`Month: ${currentMonth}\n Date: ${currentDate}\n Day: ${currentDay}`)
  
    let textDay = "";
  
    textDay = convertDayToText(currentDay);
  
    return dayResult = (currentMonth + 1) + "월 " + (currentDate) + "일 " + textDay;
  }
  
  function convertDayToText(currentDay) {
    let stringDay = "";
    
    if(currentDay === 0) stringDay = "일요일"; //Sunday
    else if(currentDay === 1) stringDay = "월요일"; //Monday
    else if(currentDay === 2) stringDay = "화요일";
    else if(currentDay === 3) stringDay = "수요일";
    else if(currentDay === 4) stringDay = "목요일";
    else if(currentDay === 5) stringDay = "금요일";
    else if(currentDay === 6) stringDay = "토요일"; //Saturday
  
    return stringDay;
  }


