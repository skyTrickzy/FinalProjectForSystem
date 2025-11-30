/**
 *
 * @param {number} debtAmount
 */
export function checkDebtStatus(debtAmount) {
    if (debtAmount === 0) return "Cleared";
    if (debtAmount > 0 && debtAmount < 500) return "Low"
    if (debtAmount > 500 && debtAmount < 1000) return "Moderate";
    if (debtAmount > 1000) return "High";
}

export function checkStockStatus(min_stock, stock) {
    const min = parseInt(min_stock);
    const quantity = parseInt(stock);

    if (quantity > 0 && quantity < min) return "Low Stock"
    if (quantity === 0) return "No Stock"
    if (quantity >= min) return "Available"
}