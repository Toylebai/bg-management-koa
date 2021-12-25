function testIpt(data) {
    let keys = Object.keys(data);
    let flag = false;
    keys.map(item => {
        let currentElement = $('#' + item);
        let currentVal = currentElement.val();
        let { size, errSize, errTip, errElement, reg } = data[item];
        if (currentElement.length) {
            if (currentVal.length >= size[0] && currentVal.length <= size[1]) {
                errElement[0].innerText = '';
                flag = true;
                if (reg.test(currentVal)) {
                    errElement[0].innerText = '';
                    flag = true;

                } else {
                    errElement[0].innerText = errTip;
                    flag = false;
                }
            } else {
                errElement[0].innerText = errSize;
                flag = false;
                console.log(errElement);

            }
        }

    })
    return flag;
}