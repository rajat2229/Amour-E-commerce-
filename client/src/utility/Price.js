

export const Price = ()=>{
    const data = JSON.parse(localStorage.getItem('cart')) || [];
    var price = 0;
    data.map((item)=> price += (item.price*item.quantity))
    return price;
}