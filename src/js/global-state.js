/**
 * A list for storing product information globally.
 * @type {{id: number, sku: number, name: string, price: number, status: status, stock: number, min_stock: number}[]}
 */
export const product_list = [];

/**
 * A list for storing customer information globally.
 * @type {{name: string, email: string, phone: string, debt: number, status: string}[]}
 */
export const customer_list = [];

/**
 * A list for storing sales information globally.
 * @type {{date: Date, items: string, customer?: string, paymentMethod: string, total: number}[]}
 */
export const sales_list = [];

/**
 * A list for storing expenses information globally.
 *  @type {{date: Date, description: string, amount: number}[]}
 */
export const expenses_list = [];

/**
 * @type {{name: string, path: string, updatePath: () => void}}
 */
export const HTMLPath = {
    name: "",
    path: "",
    updatePath: () => {
        const originalPath = window.location.pathname;
        const path = originalPath.replace(/^\/src/, "");

        HTMLPath.name = path;
        HTMLPath.path = originalPath;
    },
};

/**
 * @type {{state: string, changeState: () => void}}
 */
export const activityState = {
    state: "reading", // default
    /**
     *
     * @param {string} newState
     */
    changeState: (newState) => {

        if (newState === "creating" || newState === "updating" || newState === "reading")
            activityState.state = newState;

        else throw new Error("Invalid argument");
    },
};

