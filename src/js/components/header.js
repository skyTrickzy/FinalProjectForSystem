export default class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="actions-bar">
            <div class="actions__searchBar">
                <div class="inputs">
                    <input
                        class="search-input"
                        type="text"
                        placeholder="Search for products, customers..." />
                    <button class="button-search">
                        <i class="fa-solid fa-magnifying-glass icons"></i>
                    </button>
                </div>

                <div class="search-results-tab"></div>
            </div>

            <div class="actions__notification-bar-and-profile-bar">
                <div class="notification-bar">
                    <i class="fa-solid fa-bell icons notification__bell"> </i>
                    <div class="notification__tab"></div>
                </div>

                <div class="profile-bar">
                    <div class="profile__picture"></div>
                    <div class="profile__tab"></div>
                </div>
            </div>
        </div>`;
    }
}

customElements.define("custom-header", CustomHeader);