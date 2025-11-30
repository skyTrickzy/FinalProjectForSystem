import { MAX_CAPACITY } from "../global-state.js";
import { items } from "../items.js";

/**
 *
 * @param {string} query
 */
export function searchQuery(query) {

    const results = {
        products: [],
        customers: [],
        expenses: [],
    };

    const listArr = ["products", "customers", "expenses"];

    for (let el of listArr) {
        for (let i = 0; i < items[el].list.length; i++) {
            if (results[el].length >= MAX_CAPACITY) break;
            const currentElement = items[el].list[i];

            if (el === "expenses") {
                if (currentElement.category.includes(query) || currentElement.description.includes(query)) 
                    results[el].push(currentElement);
                continue;
            }       

            if (currentElement.name.includes(query)) {
                results[el].push(currentElement);
            }
        }
    }
    
    return results;
}

// products
// name, sku, stock, status

// debt
//name, email, debt, status

// expense
// name date amount, status
