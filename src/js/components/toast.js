/**
 *
 * @param {string} title title of the toast
 * @param {string} message message of the toast
 */
export function toast(title, message) {
    if (!isToastWrapperCreated()) createToastWrapper();
    const toastWrapper = getToastWrapper();
    const toastID = `toast-${Date.now()}`;

    const content = `<div class="toast-container default" id="${toastID}">
            <div class="toast">
                <div class="indicator-icon">
                    <i class="fa-solid fa-exclamation"></i>
                </div>
                <div class="toast__description">
                    <span>${title}</span>
                    <span>${message}</span>
                </div>
                <div class="close-icon">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
        </div>`;

    toastWrapper.insertAdjacentHTML("afterbegin", content);

    const toastItem = document.getElementById(toastID);

    toastTimeOutOnClick(toastItem);

    startToastTimeOut(toastItem);
}

toast.error = (message, title) => {
    if (!isToastWrapperCreated()) createToastWrapper();
    const toastWrapper = getToastWrapper();
    const toastID = `toast-${Date.now()}`;

    const content = `<div class="toast-container error" id="${toastID}">
            <div class="toast">
                <div class="indicator-icon">
                    <i class="fa-solid fa-exclamation"></i>
                </div>
                <div class="toast__description">
                    <span>${title}</span>
                    <span>${message}</span>
                </div>
                <div class="close-icon">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
        </div>`;

    toastWrapper.insertAdjacentHTML("afterbegin", content);

    const toastItem = document.getElementById(toastID);

    toastTimeOutOnClick(toastItem);

    startToastTimeOut(toastItem);
};

toast.success = (title, message) => {
    if (!isToastWrapperCreated()) createToastWrapper();
    const toastWrapper = getToastWrapper();
    const toastID = `toast-${Date.now()}`;

    const content = `<div class="toast-container success" id="${toastID}">
            <div class="toast">
                <div class="indicator-icon">
                    <i class="fa-solid fa-exclamation"></i>
                </div>
                <div class="toast__description">
                    <span>${title}</span>
                    <span>${message}</span>
                </div>
                <div class="close-icon">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
        </div>`;

    toastWrapper.insertAdjacentHTML("afterbegin", content);

    const toastItem = document.getElementById(toastID);

    toastTimeOutOnClick(toastItem);

    startToastTimeOut(toastItem);
};

toast.warning = (title, message) => {
    if (!isToastWrapperCreated()) createToastWrapper();
    const toastWrapper = getToastWrapper();
    const toastID = `toast-${Date.now()}`;

    const content = `<div class="toast-container warning" id="${toastID}">
            <div class="toast">
                <div class="indicator-icon">
                    <i class="fa-solid fa-exclamation"></i>
                </div>
                <div class="toast__description">
                    <span>${title}</span>
                    <span>${message}</span>
                </div>
                <div class="close-icon">
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
        </div>`;

    toastWrapper.insertAdjacentHTML("afterbegin", content);

    const toastItem = document.getElementById(toastID);

    toastTimeOutOnClick(toastItem);

    startToastTimeOut(toastItem);
};

function startToastTimeOut(toastItem) {
    setTimeout(() => {
        toastItem.style.animation = "fadeOut .5s cubic-bezier(.17,.67,.71,.82) forwards";
        setTimeout(() => {
            toastItem.remove();
        }, 500);
    }, 3000);
}

function toastTimeOutOnClick(toastItem) {
    toastItem.addEventListener("click", function () {
        this.style.animation = "fadeOut .5s cubic-bezier(.17,.67,.71,.82) forwards";

        setTimeout(() => {
            this.remove();
        }, 500);
    });
}

function isToastWrapperCreated() {
    const toastWrapper = document.querySelector(".toast-wrapper");
    return toastWrapper ? true : false;
}
function createToastWrapper() {
    const htmlWrapper = document.querySelector(".wrapper");
    const toastWrapper = `<div class="toast-wrapper"></div>`;
    htmlWrapper.insertAdjacentHTML("afterbegin", toastWrapper);
}

function getToastWrapper() {
    return document.querySelector(".toast-wrapper");
}

{
    /* <div class="toast-wrapper">
    <div class="toast-container default">
        <div class="toast">
            <div class="indicator-icon">
                <i class="fa-solid fa-exclamation"></i>
            </div>
            <div class="toast__description">
                <span>HINT</span>
                <span>The products form has been submitted successfully</span>
            </div>
            <div class="close-icon">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
    </div>

    <div class="toast-container error">
        <div class="toast">
            <div class="indicator-icon">
                <i class="fa-solid fa-close"></i>
            </div>
            <div class="toast__description">
                <span>ERROR</span>
                <span>The products form has been submitted successfully</span>
            </div>
            <div class="close-icon">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
    </div>

    <div class="toast-container success">
        <div class="toast">
            <div class="indicator-icon">
                <i class="fa-solid fa-check"></i>
            </div>
            <div class="toast__description">
                <span>SUCCESS</span>
                <span>The products form has been submitted successfully</span>
            </div>
            <div class="close-icon">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
    </div>

    <div class="toast-container warning">
        <div class="toast">
            <div class="indicator-icon">
                <i class="fa-solid fa-exclamation"></i>
            </div>
            <div class="toast__description">
                <span>WARNING</span>
                <span>The products form has been submitted successfully</span>
            </div>
            <div class="close-icon">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
    </div>
</div>; */
}
