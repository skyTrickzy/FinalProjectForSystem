export const forms = {
    product: {
        retrieve: () => {
            /**
             *
             * @returns {{sku: HTMLElement, name: HTMLElement, price: HTMLElement, quantity: HTMLElement, min_stock: HTMLElement}}
             */
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
};
