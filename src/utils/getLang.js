export function getLang(lang){
    if(lang==='zh-CN'){
        return 0
    }else if(lang==='en-US'){
        return 2
    }else if(lang==='ja-JP'){
        return 1
    }else{
        switch (navigator.language) {
            case "en":
                return 2;
            case "zh-CN":
                return 0;
            case "ja":
                return 1;
        }
    }
};
