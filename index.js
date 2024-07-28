//supplier - method=> id, name, phone

//medicine - method=>

//fumctiom addStock  , createStock
//add

var paymentWay = 'cash'
const medicines = [
    {
        medicineId: '46589',
        unit: 'kg',
        usage: '12'
    },
    {
        medicineId: '46589',
        unit: 'kg',
        usage: '12'
    }
]
const supplier = {
    supplierId: '12',
    fullName: 'tirhas',
    phone: '0914523698'
}
console.log(supplier.fullName, supplier.phone);
const medicine = {
    medicineId: '46589',
    unit: 'kg',
    usage: '12'
}
const addMedicineItem = () => {
    medicines.push(medicine)
    // medicine = {}
}
addMedicineItem()
console.log(medicines);

const createStock = () => {
    const formData = {
        supplierId: supplier.supplierId,
        products: medicines,
        paymentStatus: paymentWay
    }
    console.log(formData);
    addStock(formData).then(() => {
        console.log("object");
        formData = {}
        supplier = {}
    })




}
createStock()






