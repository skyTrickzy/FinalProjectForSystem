import CustomAside from "./components/sidebar.js";
import CustomHeader from "./components/header.js";
import { customer_list } from "./global-state.js";
import { product_list } from "./global-state.js";
import { HTMLPath } from "./global-state.js";
import { activityState } from "./global-state.js";

document.addEventListener("DOMContentLoaded", () => {
    HTMLPath.updatePath();
    attachListeners();
    updateUI();
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
/**
 *
 * @param {{}[]} list
 * @param {number} id
 */
function deleteItem(id) {
    for (let i = 0; i < product_list.length; i++) {
        if (product_list[i].id === id) {
            product_list.splice(i, 1);
            break;
        }
    }
    updateUI();
}

function addNewProduct() {
    const fieldsValues = returnProductFields();
    const newProduct = {
        ...fieldsValues,
        id: Date.now(),
        status:
            fieldsValues.quantity > 0
                ? fieldsValues.quantity > fieldsValues.min_stock
                    ? "Available"
                    : "low"
                : "No stock",
    };

    product_list.unshift(newProduct);
    updateUI();
}
/**
 * 
 * @param {number} curID 
 */
function retrieveItem(curID) {
    const {id, sku, name, price, status, stock, min_stock} = product_list.find(cur => cur.id === curID);
}

/**
 * Gets all the input's values
 * @returns {{sku: string, name: string, price: number, quantity: number, min_stock: number}}
 */
function returnProductFields() {
    return {
        sku: document.getElementById("sku").value,
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
        min_stock: document.getElementById("min-stock").value,
    };
}

function attachEventDelegationListener() {
    document.querySelector("table").addEventListener("click", (e) => {
        if (e.target && e.target.tagName === "BUTTON") {
            if (e.target.innerHTML === "Update") {
                activityState.changeState("updating");
                toggleFormCards({ toggleState: true });
                const id = Number(e.target.getAttribute("unique"));
                retrieveItem(id);
            }
            if (e.target.innerHTML === "Delete") {
                const id = Number(e.target.getAttribute("unique"));
                deleteItem(id);
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

        switch (HTMLPath.name) {
            case "/products.html":
                addNewProduct();
                break;

            case "/expense.html":
                break;

            case "/sales.html":
                break;

            case "/customers.html":
                break;
        }
    });
}

function attachSearchListeners() {
    const searchInput = document.querySelector(".search-input");
    const resultsTab = document.querySelector(".search-results-tab");

    searchInput.addEventListener("focus", function () {
        this.addEventListener("input", (e) => {
            if (e.target.value !== "") resultsTab.style.display = "flex";
            else resultsTab.style.display = "none";
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

function updateUI() {
    const emptyIndicator = document.querySelector(".empty-result");
    const tableBody = document.querySelector("tbody");

    tableBody.innerHTML = "";

    switch (HTMLPath.name) {
        case "/products.html":
            updateProduct();
            break;

        case "/expense.html":
            break;

        case "/sales.html":
            break;

        case "/customers.html":
            break;
    }

    function updateProduct() {
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
                td.innerText = value;

                tr.appendChild(td);
            }

            const td = document.createElement("td");
            td.innerHTML = `<button id="update" unique="${String(el.id)}">Update</button>
            <button id="delete" unique="${String(el.id)}">Delete</button>`;

            tr.appendChild(td);
        }
    }
}
