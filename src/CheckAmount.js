function CheckAmount(value) {
    this.value = value;
}

CheckAmount.prototype.toString = function () {
    if (this.value === '1')
       return "one dollar";
    else if (this.value === '2')
       return "two dollars";
    else 
       return "three dollars";
}