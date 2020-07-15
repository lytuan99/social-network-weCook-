
const getPeriodTimeBefore = (createDate) => {
    let da = new Date(createDate);
    let epochCreateTime = da.getTime();
    let now = new Date(Date.now())
    let epochNow = now.getTime();
    let period = (epochNow - epochCreateTime)/1000;
    let tyle = period/86400;
    if(tyle > 7){   // nếu khoảng time lớn hơn 1 tuần
        let result = Math.trunc(tyle/7) + " tuần trước";
        return result;
    }
    else if(tyle > 1 && tyle < 7){  // nếu thời gian lớn hơn 1 ngày và nhỏ hơn 1 tuần
        let result = Math.trunc(tyle) + " ngày trước";
        return result;
    }
    else{
        let tyle2 = period/3600;
        if(tyle2 > 1){
            let result = Math.trunc(tyle2) + " giờ trước";
            return result;
        }
        else{
            let tyle3 = period/60;
            if(tyle3 > 1){      // nếu thời gian tính trong khoảng phút
                let result = Math.trunc(tyle3) + " phút trước";
                return result;
            }
            else{
                return (Math.trunc(period) + " giây trước");
            }
        }
    }

}

export default {
    getPeriodTimeBefore
}