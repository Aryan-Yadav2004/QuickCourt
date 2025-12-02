import Court from "../models/courtModel.js"
import Slot from "../models/timeSlotModel.js";

const months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};


const createTimeSlot = async () => {
    let totalCourts = await Court.countDocuments(); 
    const now = new Date(Date.now());
    let page = 1;
    let skip = 0;
    const limit = 10;
    const dayAfterTomorrow = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000));
    const day = dayAfterTomorrow.toLocaleDateString("en-US",{weekday: 'long'}).toLocaleLowerCase();
    const date = dayAfterTomorrow.getDate();
    const month = dayAfterTomorrow.toLocaleDateString("en-US",{month: 'long'});
    const year = dayAfterTomorrow.getFullYear();
    
    while (totalCourts > 0){
        console.log(totalCourts);
        skip = (page - 1) * limit;
        let courts = await Court.find({}).skip(skip).limit(limit);
        totalCourts -= courts.length;
        for(let court of courts){
            console.log(day);
            if(!court.schedule.days.includes(day)){
                continue;
            }
            for(let t of court.schedule.time){
                let hour24 = t.hour;
                if(t.meridian === "PM" && t.hour < 12){
                    hour24 += t.hour;
                }
                if(t.meridian === "AM" && t.hour === 12){
                    hour24 = 0;
                }
                console.log(year, months[month], date, hour24, t.minute);
                const obj = new Slot({
                    time: new Date(year, months[month], date, hour24, t.minute, 0),
                    price: court.price,
                    court_id: court._id,
                });
                const slot = await obj.save();
                court.timeSlotBookingInfo.push(slot._id);
            }
            await court.save();
        }
        page++;
    }
}

export { createTimeSlot }