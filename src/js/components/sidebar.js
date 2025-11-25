export default class CustomAside extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="aside__logo">
                <img
                    src="/src/public/fictionalLogo.svg"
                    alt="" />
            </div>
            <div class="aside__title">
                <h2>Store Management</h2>
            </div>
            <div class="aside__nav">
                <nav>
                    <a
                        href="/src/dashboard.html"
                        aria-label="Dashboard">
                        <i class="fa fa-home icons"></i>
                        <span>Dashboard</span>
                    </a>

                    <a
                        href="/src/products.html"
                        aria-label="Products">
                        <i class="fa-solid fa-cube icons"></i>
                        <span>Products</span>
                    </a>

                    <a
                        href="/src/sales.html"
                        aria-label="Sales">
                        <i class="fas fa-shopping-cart icons"></i>
                        <span>Sales</span>
                    </a>

                    <a
                        href="/src/expenses.html"
                        aria-label="Expenses">
                        <i class="fa-solid fa-credit-card icons"></i>
                        <span>Expenses</span>
                    </a>

                    <a
                        href="/src/customers.html"
                        aria-label="Customers">
                        <i class="fa-solid fa-person icons"></i>
                        <span>Customers</span>
                    </a>

                    <a
                        href="/src/reports.html"
                        aria-label="Reports">
                        <i class="fa-solid fa-circle-exclamation icons"></i>
                        <span>Reports</span>
                    </a>
                </nav>
            </div>
            <div class="aside__logout">
                <button
                    id="logout"
                    class="btn">
                    Log Out
                </button>
            </div>`;
    }
}

customElements.define("custom-aside", CustomAside);