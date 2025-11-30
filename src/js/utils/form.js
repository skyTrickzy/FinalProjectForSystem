import { convertToDateStringToLocalString } from "../script.js";

export const forms = {
    product: {
        /**
         *
         * @returns {{sku: string, name: string, price: string, quantity: string, min_stock: string}}
         */
        retrieve: () => {
            return {
                sku: document.getElementById("sku").value,
                name: document.getElementById("name").value,
                price: document.getElementById("price").value,
                quantity: document.getElementById("quantity").value,
                min_stock: document.getElementById("min-stock").value,
            };
        },
        /**
         *
         * @param {{id: number, sku: number, name: string, price: number, status: string, stock: number, min_stock: number}} object
         */
        set: (object) => {
            const sku = document.getElementById("sku");
            const name = document.getElementById("name");
            const price = document.getElementById("price");
            const quantity = document.getElementById("quantity");
            const min_stock = document.getElementById("min-stock");

            sku.value = object.sku;
            name.value = object.name;
            price.value = object.price;
            quantity.value = object.quantity;
            min_stock.value = object.min_stock;
        },
    },

    sales: {
        /**
         * @returns {{item: string, quantity: string, paymentMethod: string, customer: string}}
         */
        retrieve: () => {
            return {
                item: document.getElementById("product_select").value,
                quantity: document.getElementById("quantity").value,
                paymentMethod: document.getElementById("paymentMethod").value,
                customer: document.getElementById("customers").value,
            };
        },
        set: () => {},
    },

    expense: {
        retrieve: () => {
            const dateString = document.getElementById("calendar").value;
            const selectedDate = new Date(dateString);

            // 1. Get today's date at midnight (00:00:00) for a fair comparison
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // 2. Get the selected date at midnight for comparison
            const comparisonDate = new Date(dateString);
            comparisonDate.setHours(0, 0, 0, 0);

            // --- The constraint check: must be TODAY or in the PAST (<=) ---
            if (comparisonDate <= today) {
                // The date is today or in the past (valid)
                console.log(selectedDate.toDateString());
                // Proceed with your logic for a valid date
            } else {
                // The date is strictly in the future (invalid)
                console.error("Error: The selected date cannot be a future date.");
                return;
                // Display an error message to the user
            }

            return {
                date: selectedDate.toDateString(), // string
                category: document.getElementById("categories").value, // string
                description: document.getElementById("description").value,
                amount: document.getElementById("amount").value,
            };
        },

        set: (list) => {
            const dateString = document.getElementById("calendar");
            const category = document.getElementById("categories");
            const description = document.getElementById("description");
            const amount = document.getElementById("amount");

            dateString.value = convertToDateStringToLocalString(list.date);
            category.value = list.category;
            description.value = list.description;
            amount.value = list.amount;
        },
    },
    customers: {
        /**
         *
         * @returns {{name: string, phone: string, email: string, debt: string}}
         */
        retrieve: () => {
            // --- String Inputs ---

            const nameValue = document.getElementById("name").value;
            const phoneValue = document.getElementById("phone").value;
            const emailValue = document.getElementById("email").value;

            // --- Numeric Input ---

            // For number inputs, it's safer to use parseFloat() or parseInt()
            // to ensure the variable holds a number, not a string.
            const debtValue = parseFloat(document.getElementById("debt").value);

            return {
                name: nameValue,
                phone: phoneValue,
                email: emailValue,
                debt: debtValue,
            };
        },

        set: (list) => {
            const nameValue = document.getElementById("name");
            const phoneValue = document.getElementById("phone");
            const emailValue = document.getElementById("email");
            const debtValue = document.getElementById("debt");


            nameValue.value = list.name;
            phoneValue.value = list.phone;
            emailValue.value = list.email;
            debtValue.value = list.debt;
        },
    },
};
