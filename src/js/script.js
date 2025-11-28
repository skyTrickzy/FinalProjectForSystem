import CustomAside from "./components/sidebar.js";
import CustomHeader from "./components/header.js";
import { idHandler } from "./global-state.js";
import { HTMLPath } from "./global-state.js";
import { activityState } from "./global-state.js";
import { items } from "./items.js";
import { forms } from "./form.js";
import { updateUI } from "./UI.js";

document.addEventListener("DOMContentLoaded", () => {   
    HTMLPath.updatePath();
    attachListeners();
    updateUI.product(items.products.list);
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

function attachEventDelegationListener() {
    document.querySelector("table").addEventListener("click", (e) => {
        if (e.target && e.target.tagName === "BUTTON") {
            if (e.target.innerHTML === "Update") {
                activityState.changeState("updating");
                toggleFormCards({ toggleState: true });
                const id = Number(e.target.getAttribute("unique"));
                idHandler.setID(id);

                switch (HTMLPath.name) {
                    case "/products.html":
                        const currentItem = items.products.retrieve(id);
                        forms.product.set(currentItem);
                    case "/expense.html":
                        break;

                    case "/sales.html":
                        break;

                    case "/customers.html":
                        break;
                }
            }
            if (e.target.innerHTML === "Delete") {
                const id = Number(e.target.getAttribute("unique"));

                switch (HTMLPath.name) {
                    case "/products.html":
                        items.products.delete(id);
                        updateUI.product(items.products.list);
                        break;
                    case "/expense.html":
                        break;

                    case "/sales.html":
                        break;

                    case "/customers.html":
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

        switch (HTMLPath.name) {
            case "/products.html":
                formValues = forms.product.retrieve();

                activityState.state === "creating"
                    ? items.products.add(formValues)
                    : items.products.update(idHandler.id, formValues);

                updateUI.product(items.products.list);
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
