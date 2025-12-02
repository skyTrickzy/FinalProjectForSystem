export const HTMLPath = (() => {
    const originalPath = window.location.pathname;
    const path = originalPath.replace(/^\/src/, "");

    return {
        name: path,
        path: originalPath,
    };
})();

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

        console.log(newState);
    },
};

export const idHandler = {
    id: null,
    setID: function (id) {
        this.id = id;
    },
};

export const MAX_CAPACITY = 10;

