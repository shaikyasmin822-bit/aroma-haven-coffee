
// ==========================================
// AROMA HAVEN - ADMIN DASHBOARD
// ==========================================

async function loadDashboard() {

    const ordersTable = document.getElementById("ordersTable");
    const reviewsTable = document.getElementById("reviewsTable");

    try {

        const ordersResponse = await fetch(
            "https://aroma-haven-coffee.onrender.com/api/orders",
            { credentials: "include" }
        );

        if (!ordersResponse.ok) {
            throw new Error("Unable to load orders. Please login again.");
        }

        const orders = await ordersResponse.json();

        const reviewsResponse = await fetch(
            "https://aroma-haven-coffee.onrender.com/api/reviews",
            { credentials: "include" }
        );

        if (!reviewsResponse.ok) {
            throw new Error("Unable to load reviews. Please login again.");
        }

        const reviews = await reviewsResponse.json();

        // Dashboard statistics
        const totalRevenue = orders.reduce(
            (sum, order) => sum + Number(order.total || 0), 0
        );

        document.getElementById("totalOrders").textContent = orders.length;
        document.getElementById("totalRevenue").textContent = "₹" + totalRevenue;
        document.getElementById("totalReviews").textContent = reviews.length;

        // Display orders
        if (orders.length === 0) {
            ordersTable.innerHTML =
                '<tr><td colspan="6">No orders found</td></tr>';
        } else {
            ordersTable.innerHTML = orders.map(order => `
                <tr>
                    <td>${escapeHTML(order.name)}</td>
                    <td>${escapeHTML(order.phone)}</td>
                    <td>${escapeHTML(order.product)}</td>
                    <td>${Number(order.quantity)}</td>
                    <td>₹${Number(order.total)}</td>
                    <td>${order.created_at ? new Date(order.created_at).toLocaleString("en-IN") : "N/A"}</td>
                </tr>
            `).join("");
        }

        // SEARCH ORDERS
        const orderSearch = document.getElementById("orderSearch");

        if (orderSearch) {
            orderSearch.addEventListener("input", function () {

                const searchText = this.value.toLowerCase();

                document.querySelectorAll("#ordersTable tr").forEach(row => {
                    row.style.display = row.textContent
                        .toLowerCase()
                        .includes(searchText) ? "" : "none";
                });

            });
        }

        // Display reviews
        if (reviews.length === 0) {
            reviewsTable.innerHTML =
                '<tr><td colspan="4">No reviews found</td></tr>';
        } else {
            reviewsTable.innerHTML = reviews.map(review => `
                <tr>
                    <td>${escapeHTML(review.name)}</td>
                    <td>${escapeHTML(review.emoji || "")}</td>
                    <td>${"⭐".repeat(Math.max(0, Math.min(5, Number(review.rating) || 0)))}</td>
                    <td>${escapeHTML(review.review)}</td>
                </tr>
            `).join("");
        }

    } catch (error) {

        ordersTable.innerHTML =
            `<tr><td colspan="6">${escapeHTML(error.message)}</td></tr>`;

        reviewsTable.innerHTML =
            `<tr><td colspan="4">${escapeHTML(error.message)}</td></tr>`;

        console.error("Dashboard error:", error);
    }
}

// Safely display customer text
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

// Check admin login
async function checkAdminAccess() {
    try {
        const response = await fetch(
            "https://aroma-haven-coffee.onrender.com/api/admin/check",
            { credentials: "include" }
        );

        if (!response.ok) {
            window.location.href = "admin-login.html";
            return;
        }

        await loadDashboard();

    } catch (error) {
        alert("Unable to verify admin login. Please check Flask backend.");
        window.location.href = "admin-login.html";
    }
}

// Logout
async function logoutAdmin() {
    try {
        const response = await fetch(
            "https://aroma-haven-coffee.onrender.com/api/admin/logout",
            {
                method: "POST",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        window.location.href = "admin-login.html";

    } catch (error) {
        alert("Unable to logout. Please check the backend.");
    }
}

checkAdminAccess();
