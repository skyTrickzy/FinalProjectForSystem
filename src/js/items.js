import { checkDebtStatus, checkStockStatus } from "./utils/status-checker.js";

export const items = {
    customers: {
        /**
         * A list for storing customer information globally.
         * @type {{id: number, Date: string, name: string, email: string, phone: string, debt: string, status: string}[]}
         */
        list: JSON.parse(localStorage.getItem("customers")) || [],
        /**
         * Add a new customer to the list.
         * @param {{name: string, email: string, phone: string, debt: number}} customer
         */
        add: function (customer) {
            const newValues = {
                date: new Date().toDateString(),
                id: Date.now(),
                ...customer,
                status: checkDebtStatus(customer.debt),
            };

            this.list.unshift(newValues);

            localStorage.setItem("customers", JSON.stringify(this.list));
        },

        /**
         * Delete a customer from the list by ID.
         * @param {number} id
         */
        delete: function (id) {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id === id) {
                    this.list.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem("customers", JSON.stringify(this.list));
        },

        /**
         * Update customer information by ID.
         * @param {number} id
         * @param {{name: string, email: string, phone: string, debt: number, status: string}} customer
         */
        update: function (id, customer) {
            this.list.forEach((cur) => {
                if (cur.id === id) {
                    cur.name = customer.name;
                    cur.email = customer.email;
                    cur.phone = customer.phone;
                    cur.debt = customer.debt;
                    cur.status = checkDebtStatus(customer.debt);
                }
            });

            localStorage.setItem("customers", JSON.stringify(this.list));
        },

        retrieve: function (id) {
            return this.list.find((cur) => cur.id === id);
        },
    },

    sales: {
        /**
         * A list for storing sales information globally.
         * @type {{id: string, date: string, item: string, customer?: string, paymentMethod: string, quantity: string, total: string}[]}
         */
        list: JSON.parse(localStorage.getItem("sale")) || [],

        add: function (sale, id) {
            const currentItem = items.products.list.find((cur) => cur.id === Number(id));

            const quantity = Number(currentItem.quantity) - Number(sale.quantity);
            currentItem.quantity = String(quantity);

            items.products.update(id, currentItem);

            const newValues = {
                id: Date.now(),
                date: new Date().toDateString(),
                item: sale.item,
                customer: sale.customer || "-",
                paymentMethod: sale.paymentMethod,
                quantity: quantity,
                total: Number(sale.quantity) * Number(currentItem.price),
            };

            this.list.unshift(newValues);
            localStorage.setItem("sale", JSON.stringify(this.list));
        },

        /**
         * Delete a sale from the list by ID.
         * @param {number} id
         */
        delete: function (id) {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id === id) {
                    this.list.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem("sale", JSON.stringify(this.list));
        },

        /**
         * Update sale information by ID.
         * @param {number} id
         * @param {{date: Date, items: string, customer?: string, paymentMethod: string, total: number}} sale
         */
        update: (id, sale) => {},
    },

    expenses: {
        /**
         * A list for storing expenses information globally.
         *  @type {{id: number, date: string, category: string, description: string, amount: number}[]}
         */
        list: JSON.parse(localStorage.getItem("expenses")) || [],
        /**
         * Add a new expense to the list.
         * @param {{date: string, category: string, description: string, amount: number}} expense
         */
        add: function (expense) {
            const newExpense = { id: Date.now(), ...expense };
            this.list.unshift(newExpense);
            console.log(this.list);
            localStorage.setItem("expenses", JSON.stringify(this.list));
        },

        /**
         * Delete an expense from the list by ID.
         * @param {number} id
         */
        delete: function (id) {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id === id) {
                    this.list.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem("expenses", JSON.stringify(this.list));
        },

        /**
         * Update expense information by ID.
         * @param {number} id
         * @param {{date: string, description: string, category: string, amount: number}} expense
         */
        update: function (id, expense) {
            this.list.forEach((cur) => {
                if (cur.id === id) {
                    cur.date = expense.date;
                    cur.category = expense.category;
                    cur.amount = expense.amount;
                    cur.description = expense.description;
                }
            });
            localStorage.setItem("expenses", JSON.stringify(this.list));
        },

        retrieve: function (id) {
            return this.list.find((cur) => cur.id === id);
        },
    },

    products: {
        /**
         * A list for storing product information globally.
         * @type {{id: number, sku: number, name: string, price: number, status: status, quantity: number, min_stock: number}[]}
         */
        list: JSON.parse(localStorage.getItem("products")) || [],
        /**
         * Add a new product to the list.
         * @param {{id: number, sku: number, name: string, price: number, status: string, quantity: number, min_stock: number}} product
         */
        add: function (product) {
            const newProduct = {
                ...product,
                id: Date.now(),
                status: checkStockStatus(product.min_stock, product.quantity),
            };

            this.list.unshift(newProduct);

            localStorage.setItem("products", JSON.stringify(this.list));
        },

        /**
         * Delete a product from the list by ID.
         * @param {number} id
         */
        delete: function (id) {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id === id) {
                    this.list.splice(i, 1);
                    break;
                }
            }

            localStorage.setItem("products", JSON.stringify(this.list));
        },

        /**
         * Update product information by ID.
         * @param {number} id
         * @param {{id: number, sku: number, name: string, price: number, status: string, quantity: number, min_stock: number}} product
         */
        update: function (id, product) {
            this.list.forEach((element) => {
                if (element.id === id) {
                    element.name = product.name;
                    element.sku = product.sku;
                    element.price = product.price;
                    element.quantity = product.quantity;
                    element.min_stock = product.min_stock;
                    element.status = checkStockStatus(element.min_stock, element.quantity);
                }
            });

            localStorage.setItem("products", JSON.stringify(this.list));
        },

        /**
         *
         * @param {number} id
         */
        retrieve: function (id) {
            return this.list.find((cur) => cur.id === id);
        },
    },
};
