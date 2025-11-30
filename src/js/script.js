import CustomAside from "./components/sidebar.js";
import CustomHeader from "./components/header.js";
import { idHandler } from "./global-state.js";
import { HTMLPath } from "./global-state.js";
import { activityState } from "./global-state.js";
import { items } from "./items.js";
import { forms } from "./utils/form.js";
import { updateUI } from "./utils/UI.js";
import { searchQuery } from "./utils/query.js";

document.addEventListener("DOMContentLoaded", () => {
    attachListeners();
    switch (HTMLPath.name) {
        case "/products.html":
            updateUI.product(items.products.list);
            break;
        case "/sales.html":
            loadOptions();
            updateUI.sales(items.sales.list);
            break;
        case "/expenses.html":
            updateUI.expense(items.expenses.list);
            break;
        case "/customers.html":
            updateUI.customers(items.customers.list);
            break;
    }

    if (HTMLPath.name === "/dashboard.html") initializeDashboard();
});
/**
 * attaches all addEventListeners to certain interactive components
 * @return {void}
 */
function attachListeners() {
    attachSearchListeners();
    attachNotificationListeners();
    attachProfileListeners();

    if (HTMLPath.name !== "/dashboard.html" && HTMLPath.name !== "/reports.html") {
        attachToggleFormCardListeners();
        attachSubmitListener();
        attachEventDelegationListener();
    }
}

function initializeDashboard() {
    const todayRevenue = getTodaysRevenue();
    const todayExpense = getTodaysExpenses();

    const todayProfit = document.getElementById("profit");
    todayProfit.innerText = "P" + formatNumber(todayRevenue - todayExpense);

    getLowStockItems();
    getTotalDebt();

    const totalCustomers = document.getElementById("totalCustomers");

    totalCustomers.innerText = items.customers.list.length;
}

function loadOptions() {


    const selectInput = document.getElementById("product_select");
    selectInput.innerHTML = '';

    const customerSelect = document.getElementById("customers");
    customerSelect.innerHTML = '';

    const productList = [...items.products.list];
    const customerList = [...items.customers.list];

    productList.forEach((item) => {
        const option = document.createElement("option");
        option.textContent =
            item.name + " - " + "₱" + item.price + " " + `(Stock: ${item.quantity})`;
        option.value = item.name;
        option.setAttribute("unique", String(item.id));
        selectInput.append(option);
    });

    customerList.forEach((person) => {
        const option = document.createElement("option");
        option.textContent = person.name;
        option.value = person.name;
        customerSelect.append(option);
    });
}

function attachEventDelegationListener() {
    document.querySelector("table").addEventListener("click", (e) => {
        if (e.target && e.target.tagName === "BUTTON") {
            if (e.target.innerHTML === "Update") {
                activityState.changeState("updating");
                toggleFormCards({ toggleState: true });
                const id = Number(e.target.getAttribute("unique"));
                idHandler.setID(id);
                let currentItem;
                /*
                 *
                 * a better version would be
                 * if (HTMLPath.name !== dashboard.html && sales.html && reports.html)
                 * then items[HTMLPath.name].retrieve(id);
                 * forms[HTMLPath.name].set(currentItem)
                 *
                 */
                switch (HTMLPath.name) {
                    case "/products.html":
                        currentItem = items.products.retrieve(id);
                        forms.product.set(currentItem);
                        break;
                    case "/expenses.html":
                        currentItem = items.expenses.retrieve(id);
                        forms.expense.set(currentItem);
                        break;

                    case "/customers.html":
                        currentItem = items.customers.retrieve(id);
                        forms.customers.set(currentItem);
                        break;
                }
            }
            if (e.target.innerHTML === "Delete") {
                const id = Number(e.target.getAttribute("unique"));
                // this too can be refactored to just items[HTMLPath.name].delete then updateUI[HTMLPath.name](items[HTMLPath.name].list)
                /*
                 *
                 *   if not dashboard or reports
                 * then items[HTMLPath.name].delete(id)
                 * updateUI[HTMLPath.name](items[HTMLPath.name].list)
                 *
                 *
                 */
                switch (HTMLPath.name) {
                    case "/products.html":
                        items.products.delete(id);
                        updateUI.product(items.products.list);
                        break;
                    case "/expenses.html":
                        items.expenses.delete(id);
                        updateUI.expense(items.expenses.list);
                        break;

                    case "/sales.html":
                        items.sales.delete(id);
                        updateUI.sales(items.sales.list);
                        break;

                    case "/customers.html":
                        items.customers.delete(id);
                        updateUI.customers(items.customers.list);
                        break;
                }
            }
        }
    });
}

function attachSubmitListener() {
    const submitBtn = document.getElementById("submit-button");
    const form = document.querySelector("form");

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            throw new Error("invalid or incomplete fields");
        }

        let formValues;

        //this shit can be refactored by doing items[pathname].add() instead of doing this horrible switch case
        // but i would have to update how the HTMLPath.name where instead of doing "/dashboard.html" it would exactly need to be dashboard

        /*
         *
         *  if not dashboard and reports
         *   but if sales do some special instructions
         *   only then
         *   formValues = forms[HTMLPath.name].retrieve()
         *   activityState === "creating" ? items[HTMLPath.name].add(formValues) : items[HTMLPath.name].update(idHandler.id, formValues)
         *
         *
         *
         */
        switch (HTMLPath.name) {
            case "/products.html":
                formValues = forms.product.retrieve();

                activityState.state === "creating"
                    ? items.products.add(formValues)
                    : items.products.update(idHandler.id, formValues);

                updateUI.product(items.products.list);
                break;

            case "/expenses.html":
                formValues = forms.expense.retrieve();

                activityState.state === "creating"
                    ? items.expenses.add(formValues)
                    : items.expenses.update(idHandler.id, formValues);

                updateUI.expense(items.expenses.list);
                break;

            case "/sales.html":
                formValues = forms.sales.retrieve();

                const selectedProduct = document.getElementById("product_select");
                const selectedOption = selectedProduct.options[selectedProduct.selectedIndex];
                const id = selectedOption.getAttribute("unique");

                if (!id) return;

                items.sales.add(formValues, id);
                loadOptions();

                updateUI.sales(items.sales.list);
                break;

            case "/customers.html":
                formValues = forms.customers.retrieve();

                activityState.state === "creating"
                    ? items.customers.add(formValues)
                    : items.customers.update(idHandler.id, formValues);

                updateUI.customers(items.customers.list);

                break;
        }

        // TODO: toggling form to hidden when succesfully done creating
        activityState.changeState("reading");
    });
}

function attachSearchListeners() {
    const searchInput = document.querySelector(".search-input");
    const resultsTab = document.querySelector(".search-results-tab");

    resultsTab.style.display = 'none'

    searchInput.addEventListener("focus", function () {
        this.addEventListener("input", (e) => {
            if (e.target.value !== "") {

                const query = e.target.value;

                const results = searchQuery(query);

                setTimeout(() => {
                    updateUI.searchBar(results, query);
                    
                    resultsTab.style.display = "flex";
                }, 500);

            } else resultsTab.style.display = "none";

        });
    });

    searchInput.addEventListener("blur", () => {
        resultsTab.style.display = "none";
    });
}

function attachNotificationListeners() {
    const notifBell = document.querySelector(".notification__bell");
    const notifTab = document.querySelector(".notification__tab");

    let state = false;

    const closeOnBlur = (e) => {
        if (e.target.className !== "notification__tab") {
            state = false;
            notifTab.style.display = "none";
            document.removeEventListener("click", closeOnBlur);
        }
    };

    notifBell.addEventListener("click", () => {
        if (!state) {
            state = true;
            notifTab.style.display = "flex";
            setTimeout(() => {
                document.addEventListener("click", closeOnBlur);
            }, 200);
            return;
        }

        if (state) {
            state = false;
            notifTab.style.display = "none";
            document.removeEventListener("click", closeOnBlur);
            return;
        }
    });
}

function attachProfileListeners() {
    const profilePic = document.querySelector(".profile__picture");
    const profileTab = document.querySelector(".profile__tab");

    let state = false;

    const closeOnBlur = function (e) {
        if (e.target.className !== "notification__tab") {
            state = false;
            profileTab.style.display = "none";
            document.removeEventListener("click", closeOnBlur);
        }
    };

    profilePic.addEventListener("click", function () {
        if (!state) {
            state = true;
            profileTab.style.display = "flex";
            setTimeout(() => {
                document.addEventListener("click", closeOnBlur);
            }, 200);
            return;
        }

        if (state) {
            state = false;
            profileTab.style.display = "none";
            document.removeEventListener("click", closeOnBlur);
            return;
        }
    });
}

function attachToggleFormCardListeners() {
    document.querySelector(".header__button").addEventListener("click", () => {
        activityState.changeState("creating");
        toggleFormCards({ toggleState: true });
    });

    document.querySelector(".close-button").addEventListener("click", () => {
        activityState.changeState("reading");
        toggleFormCards({ toggleState: false });
    });
}

/**
 * toggles the form container
 * true for visible false for none
 * @param {{toggleState: boolean}}
 */
function toggleFormCards({ toggleState }) {
    if (toggleState) {
        document.querySelector(".form-wrapper").style.display = "flex";
        if (activityState.state === "updating") {
            document.getElementById("submit-button").innerText = "Update";
        }
    } else {
        document.querySelector(".form-wrapper").style.display = "none";
    }
}

/**
 * Converts a date string in the toDateString() format (e.g., "Sat Nov 29 2025")
 * into a local date string formatted as YYYY-MM-DD.
 * @param {string} dateString - The string output from Date.prototype.toDateString().
 * @returns {string} The local date formatted as YYYY-MM-DD.
 */
export function convertToDateStringToLocalString(dateString) {
    // 1. Convert the toDateString format back into a Date object.
    // The Date constructor can usually parse this format reliably.
    const date = new Date(dateString);

    // 2. Extract local components.
    // These methods automatically use the local time zone of the user's system.
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();

    // 3. Pad month and day with a leading zero (e.g., '01' instead of '1').
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");

    // 4. Combine and return the formatted string.
    return `${year}-${formattedMonth}-${formattedDay}`;
}

export function formatNumber(num) {
    let fixedNumber = num.toFixed(2);
    let formattedNumber = fixedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedNumber;
}

console.log(formatNumber(230));

function getTodaysRevenue() {
    const revenue = document.getElementById("revenue");
    let total = 0;
    items.sales.list.forEach((cur) => {
        if (new Date().toDateString() === cur.date) {
            total += cur.total;
        }
    });
    revenue.innerText = "P" + formatNumber(total);
    return total;
}

function getTodaysExpenses() {
    const expense = document.getElementById("expenses");
    let total = 0;
    items.expenses.list.forEach((cur) => {
        if (new Date().toDateString() === cur.date) {
            const amount = parseFloat(cur.amount);
            total += amount;
        }
    });
    expense.innerText = "P" + formatNumber(total);
    return total;
}

function getLowStockItems() {
    const stock = document.getElementById("stock");

    let lowStockItems = 0;
    items.products.list.forEach((cur) => {
        if (cur.status === "Low Stock" || cur.status === "No Stock") {
            lowStockItems++;
        }
    });
    stock.innerText = lowStockItems;
}

function getTotalDebt() {
    const customer = document.getElementById("customer");

    let totalDebt = 0;
    items.customers.list.forEach((cur) => {
        totalDebt += parseFloat(cur.debt);
    });

    customer.innerText = "P" + formatNumber(totalDebt);
}

function attachSearchItemsListener() {
    const changeHTMLPath = () => {

    }

    document.querySelector('.search-results-tab').addEventListener('click', changeHTMLPath)
}