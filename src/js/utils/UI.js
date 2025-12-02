import { convertToDateStringToLocalString, formatNumber } from "../script.js";

export const updateUI = {
    product: (product_list) => {
        const emptyIndicator = document.querySelector(".empty-result");
        const tableBody = document.querySelector("tbody");
        const labelCounter = document.querySelector(".label__counter");
        labelCounter.innerText = product_list.length + " Products in Catalog";

        tableBody.innerHTML = "";

        if (product_list.length === 0) {
            emptyIndicator.style.display = "block";
            return;
        }

        if (product_list.length > 0) emptyIndicator.style.display = "none";

        for (let el of product_list) {
            const tr = document.createElement("tr");
            tableBody.appendChild(tr);

            for (const [key, value] of Object.entries(el)) {
                if (key === "id" || key === "min_stock") {
                    continue;
                }

                const td = document.createElement("td");

                if (key === "price") td.innerText = "P" + formatNumber(parseFloat(el.price));
                else td.innerText = value;

                tr.appendChild(td);
            }

            const td = document.createElement("td");
            td.innerHTML = `<button id="update" unique="${String(el.id)}">Update</button>
                    <button id="delete" unique="${String(el.id)}">Delete</button>`;

            tr.appendChild(td);
        }
    },

    sales: (sales_list) => {
        const emptyIndicator = document.querySelector(".empty-result");
        const tableBody = document.querySelector("tbody");
        const labelCounter = document.querySelector(".label__counter");
        labelCounter.innerText = sales_list.length + " Total Transactions";

        tableBody.innerHTML = "";

        if (sales_list.length === 0) {
            emptyIndicator.style.display = "block";
            return;
        }

        if (sales_list.length > 0) emptyIndicator.style.display = "none";

        for (let el of sales_list) {
            const tr = document.createElement("tr");
            tableBody.append(tr);

            const td = `<td>${convertToDateStringToLocalString(el.date)}</td>
                <td>${el.item}</td>
                <td>${el.customer}</td>
                <td>${el.paymentMethod}</td>
                <td>P${formatNumber(parseFloat(el.total))}</td>
                <td><button id="delete" unique="${String(el.id)}">Delete</button></td>`;

            tr.insertAdjacentHTML("beforebegin", td);
        }
    },

    expense: (expense_list) => {
        const emptyIndicator = document.querySelector(".empty-result");
        const tableBody = document.querySelector("tbody");
        const expenseTotal = document.querySelector(".expenses-total");

        expenseTotal.innerText = (() => {
            let total = 0;
            expense_list.forEach((cur) => {
                const amount = parseFloat(cur.amount);
                total += amount;
            });
            return "P" + formatNumber(total);
        })();

        tableBody.innerHTML = "";

        if (expense_list.length === 0) {
            emptyIndicator.style.display = "block";
            return;
        }

        if (expense_list.length > 0) emptyIndicator.style.display = "none";

        for (let el of expense_list) {
            const tr = document.createElement("tr");
            tableBody.append(tr);

            const td = `<td>${convertToDateStringToLocalString(el.date)}</td>
                <td>${el.category}</td>
                <td>${el.description}</td>
                <td>P${formatNumber(parseFloat(el.amount))}</td>
                <td><button id="update" unique="${String(
                    el.id
                )}">Update</button><button id="delete" unique="${String(
                el.id
            )}">Delete</button></td>`;

            tr.insertAdjacentHTML("beforebegin", td);
        }
    },

    customers: (customer_list) => {
        const emptyIndicator = document.querySelector(".empty-result");
        const tableBody = document.querySelector("tbody");
        const debtTotal = document.querySelector(".debt-total");

        debtTotal.innerText = (() => {
            let total = 0;
            customer_list.forEach((cur) => {
                const amount = parseFloat(cur.debt);
                total += amount;
            });
            return "P" + formatNumber(total);
        })();

        tableBody.innerHTML = "";

        if (customer_list.length === 0) {
            emptyIndicator.style.display = "block";
            return;
        }

        if (customer_list.length > 0) emptyIndicator.style.display = "none";

        for (let el of customer_list) {
            const tr = document.createElement("tr");
            tableBody.append(tr);
            console.log(el);

            const td = `<td>${el.name}</td>
                <td>${el.phone}</td>
                <td>${el.email}</td>
                <td>P${formatNumber(parseFloat(el.debt))}</td>
                <td>${el.status}</td>
                <td><button id="update" unique="${String(
                    el.id
                )}">Update</button><button id="delete" unique="${String(
                el.id
            )}">Delete</button></td>`;

            tr.insertAdjacentHTML("beforebegin", td);
        }
    },
    /**
     *
     * @param {{products: [], expenses: [], customers: [], query: string}} results
     */
    searchBar: ({ products, expenses, customers }, query) => {
        if (products.length === 0 && expenses.length === 0 && customers.length === 0) {
            document.querySelector(".full-result").style.display = "none";
            document.querySelector(".empty-results").style.display = "flex";
            const text = document.querySelector(".smaller");
            text.innerText = "We couldn't find anything matching " + "'" + query + "'";
            return;
        }

        document.querySelector(".empty-results").style.display = "none";
        document.querySelector(".full-result").style.display = "block";

        const totalResults = products.length + expenses.length + customers.length;

        const resultsSub = document.querySelector(".results__sub");
        resultsSub.innerText = "Found " + totalResults + " results for " + query;

        const listContainer = document.querySelectorAll(".categorized_result");
        listContainer.forEach((el) => {
            el.remove();
        });

        if (products.length > 0) {
            const container = `<div class="categorized_result" id="product-list"></div>`;

            const fullResult = document.querySelector(".full-result");

            fullResult.insertAdjacentHTML("beforeend", container);

            const productCategory = createResultCategory("Products", products.length);
            const listContainer = document.getElementById("product-list");
            listContainer.insertAdjacentHTML("afterbegin", productCategory);

            const ta = `<div class="category-list"></div>`;
            listContainer.insertAdjacentHTML("beforeend", ta);
            for (let i = 0; i < products.length; i++) {
                const item = createProductItem(products[i]);
                const list = listContainer.querySelector(".category-list");
                list.insertAdjacentHTML("afterbegin", item);
            }
        }

        if (expenses.length > 0) {
            const container = `<div class="categorized_result"  id="expense-list"></div>`;

            const fullResult = document.querySelector(".full-result");

            fullResult.insertAdjacentHTML("beforeend", container);

            // insert headers
            const listContainer = document.getElementById("expense-list");
            const expenseCategory = createResultCategory("Expenses", expenses.length);
            listContainer.insertAdjacentHTML("afterbegin", expenseCategory);

            const ta = `<div class="category-list"></div>`;
            listContainer.insertAdjacentHTML("beforeend", ta);
            for (let i = 0; i < expenses.length; i++) {
                const item = createExpenseItem(expenses[i]);
                const list = listContainer.querySelector(".category-list");
                list.insertAdjacentHTML("afterbegin", item);
            }
        }

        if (customers.length > 0) {
            const container = `<div class="categorized_result"  id="customers-list"></div>`;

            const fullResult = document.querySelector(".full-result");

            fullResult.insertAdjacentHTML("beforeend", container);

            // insert headers
            const listContainer = document.getElementById("customers-list");
            const customerCategory = createResultCategory("Customers", customers.length);
            listContainer.insertAdjacentHTML("afterbegin", customerCategory);

            const ta = `<div class="category-list"></div>`;
            listContainer.insertAdjacentHTML("beforeend", ta);
            for (let i = 0; i < customers.length; i++) {
                const item = createCustomerItem(customers[i]);
                const list = listContainer.querySelector(".category-list");
                list.insertAdjacentHTML("afterbegin", item);
            }
        }
    },
};

function createProductItem(product) {
    const item = ` 
        <div class="item-container" data-category="products" unique=${product.id}>
            <div class="category-icon-container">
                <i class="fa fa-cube"></i>
            </div>
            <div class="item">
                <div class="item__header">
                    <span class="item__name">${product.name}</span>
                    <span class="item__status">in Stock</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <div class="item__sub">
                    <span class="item__details">SKU: ${product.sku} | Stock: ${product.quantity} units</span>
                </div>
            </div>
        </div>`;

    return item;
}

function createExpenseItem(expense) {
    const item = ` 
        <div class="item-container" data-category="expenses" unique=${expense.id}>
            <div class="category-icon-container">
                <i class="fa-solid fa-credit-card"></i>
            </div>
            <div class="item">
                <div class="item__header">
                    <span class="item__name">${expense.description}</span>
                    <span class="item__status">Paid</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <div class="item__sub">
                    <span class="item__details">Category: ${
                        expense.category
                    } | Amount: P${formatNumber(parseFloat(expense.amount))}</span>
                </div>
            </div>
        </div>`;

    return item;
}

function createCustomerItem(customer) {
    const item = ` 
        <div class="item-container" data-category="customers" unique=${customer.id}> 
            <div class="category-icon-container">
                <i class="fa-solid fa-credit-card"></i>
            </div>
            <div class="item">
                <div class="item__header">
                    <span class="item__name">${customer.name}</span>
                    <span class="item__status">${customer.status}</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <div class="item__sub">
                    <span class="item__details">Email: ${customer.email} | Amount: P${formatNumber(
        parseFloat(customer.debt)
    )}</span>
                </div>
            </div>
        </div>`;

    return item;
}

/**
 *
 * @param {string} type
 * @param {number} length
 */
function createResultCategory(type, length) {
    console.log(type);
    const a = `<div class="result__category">
        <div class="left-header">
            <i class="${getIcons(type)}"></i>
            <span class="category-name">${type}</span>
        </div>
        <div class="right-header">
            <span class="category-length">${length} results</span>
        </div>
    </div>`;

    return a;
}

function getIcons(type) {
    switch (type) {
        case "Products":
            return "fa-solid fa-cube";
        case "Expenses":
            return "fa-solid fa-credit-card";
        case "Customers":
            return "fa-solid fa-person";
    }
}

/* <div class="full-result">
    <div class="results__header">
        <span class="results__title"> Search Results </span>
        <span class="results__sub"> Found 5 results for slsl </span>
    </div>

    <div class="categorized_result">
        <div class="result__category">
            <div class="left-header">
                <i class="fa fa-cube"></i>
                <span class="category-name">Products</span>
            </div>
            <div class="right-header">
                <span class="category-length">5 results</span>
            </div>
        </div>
        <div class="category-list">
            <div class="category-icon-container">
                <i class="fa fa-cube"></i>
            </div>
            <div class="item">
                <div class="item__header">
                    <span class="item__name">Wireless headphone</span>
                    <span class="item__status">in Stock</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
                <div class="item__sub">
                    <span class="item__details">SKU: WH | Stock: 45 units</span>
                </div>
            </div>
        </div>
    </div>
</div>; */
