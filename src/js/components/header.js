export default class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<div class="actions-bar">
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

                <div class="search-results-tab">
                    <div class="empty-results">
                        <div class="logo-section">
                            <div class="icon-container">
                                <i class="fa fa-solid fa-cube"></i>
                            </div>
                        </div>

                        <div class="title">
                            <span class="text">No results found</span>
                            <span class="smaller">We couldn't find anything matching</span>
                            <span class="smallest"
                                >try searching for products, customers or expenses</span
                            >
                        </div>
                    </div>

                    <div class="full-result">
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
                    </div>

                </div>
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
