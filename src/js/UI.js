export const updateUI = {
    product: (product_list) => {
        const emptyIndicator = document.querySelector(".empty-result");
        const tableBody = document.querySelector("tbody");

        tableBody.innerHTML = '';

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
    },
};
