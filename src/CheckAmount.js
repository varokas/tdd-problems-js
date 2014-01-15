function CheckAmount(value) {
    this.value = value;
}

CheckAmount.prototype.toString = function () {

    if (this.value === '1')
       return "one dollar"
    else (this.value === '2')
       return "two dollars"
}