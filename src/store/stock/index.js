





const supplierId = {
    supplierId: supplierId
}

const products = [{
    medicineId: medicineId,
    batchNo: batchNo,
    produceDate: produceDate,
    expiryDate: expiryDate,
    quantity: quantity,
    unitPrice: unitPrice,
    shelf: shelf,
    paymentStatus: paymentStatus,
    paidAmount: paidAmount
}]
const createStock = async () => {

    const formData = {
        supplierId: supplierId.value,
        products: products.value,
    }
    await addStock(formData).then(() => {

    }).catch((err) => {

    });
}