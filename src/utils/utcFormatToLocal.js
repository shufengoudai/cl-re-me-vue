import moment from 'moment-timezone'
export function utcFormatToLocal(date){
    switch(moment.tz.guess()){
        //china
        case "Asia/Shanghai":
            return moment.tz(date, "Asia/Shanghai").format();
            break;
        //japan
        case "Asia/Tokyo":
            return moment.tz(date, "Asia/Tokyo").format();
            break;
        //amera
        case "America/New_York":
            return moment.tz(date, "America/New_York").format();
            break;
    }
};
