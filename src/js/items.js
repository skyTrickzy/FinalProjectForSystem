export const items = {
    customers: {
        /**
         * A list for storing customer information globally.
         * @type {{name: string, email: string, phone: string, debt: number, status: string}[]}
         */
        list: [],
        /**
         * Add a new customer to the list.
         * @param {{name: string, email: string, phone: string, debt: number, status: string}} customer
         */
        add: (customer) => {},

        /**
         * Delete a customer from the list by ID.
         * @param {number} id
         */
        delete: (id) => {},

        /**
         * Update customer information by ID.
         * @param {number} id
         * @param {{name: string, email: string, phone: string, debt: number, status: string}} customer
         */
        update: (id, customer) => {},
    },
    /**
     * A list for storing sales information globally.
     * @type {{date: Date, items: string, customer?: string, paymentMethod: string, total: number}[]}
     */
    sales: {
        /**
         * A list for storing sales information globally.
         * @type {{date: Date, items: string, customer?: string, paymentMethod: string, total: number}[]}
         */
        list: [],
        /**
         * Add a new sale to the list.
         * @param {{date: Date, items: string, customer?: string, paymentMethod: string, total: number}} sale
         */
        add: (sale) => {},

        /**
         * Delete a sale from the list by ID.
         * @param {number} id
         */
        delete: (id) => {},

        /**
         * Update sale information by ID.
         * @param {number} id
         * @param {{date: Date, items: string, customer?: string, paymentMethod: string, total: number}} sale
         */
        update: (id, sale) => {},
    },
    /**
     * A list for storing expenses information globally.
     *  @type {{date: Date, description: string, amount: number}[]}
     */
    expenses: {
        list: [],
        /**
         * Add a new expense to the list.
         * @param {{date: Date, description: string, amount: number}} expense
         */
        add: (expense) => {},

        /**
         * Delete an expense from the list by ID.
         * @param {number} id
         */
        delete: (id) => {},

        /**
         * Update expense information by ID.
         * @param {number} id
         * @param {{date: Date, description: string, amount: number}} expense
         */
        update: (id, expense) => {},
    },

    products: {
        /**
         * A list for storing product information globally.
         * @type {{id: number, sku: number, name: string, price: number, status: status, stock: number, min_stock: number}[]}
         */
        list: [],
        /**
         * Add a new product to the list.
         * @param {{id: number, sku: number, name: string, price: number, status: string, stock: number, min_stock: number}} product
         */
        add: function (product) {
            const newProduct = {
                ...product,
                id: Date.now(),
                status:
                    product.quantity >= product.min_stock
                        ? "Available"
                        : product.quantity < product.min_stock && product.quantity > 0
                        ? "low"
                        : "No stock",
            };

            this.list.unshift(newProduct);
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
                    element.status =
                        product.quantity >= product.min_stock
                            ? "Available"
                            : product.quantity < product.min_stock && product.quantity > 0
                            ? "low"
                            : "No stock";
                }
            });
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
