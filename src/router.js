import { createRouter, createWebHistory } from "vue-router";
// import BaseMaster from "../src/components/BaseHeader.vue
import Account from "./views/pages/configuration/AccountPage.vue"
import Supplier from "./views/pages/stock/SupplierPage.vue"
import Customer from "./views/pages/configuration/CustomerPage.vue"
import Medicine from "./views/pages/configuration/MedicinePage.vue"
import Unit from "./views/pages/configuration/UnitPage.vue"
import Category from "./views/pages/configuration/CategoryPage.vue";
import Sales from "./views/pages/sales/salesPage.vue"
import DailySales from "./views/pages/sales/dailySales.vue"
import Report from "./views/pages/sales/report.vue";
import Dashboard from "../src/layout/dashboard.vue"
import StockPage from "./views/pages/stock/StockPage.vue";
import StockBalance from "./views/pages/stock/stockBalance.vue"
import StockPayment from "./views/pages/stock/stockPayment.vue"
import DailyPurchase from "./views/pages/stock/DailyPurchase.vue"
import Detail from "./views/pages/stock/Detail.vue"
const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [

        {
            children: [{
                path: '/:pathMatch(.*)*',
                component: Dashboard,
                meta: {
                    title: 'Page Not Found',
                    scope: false,
                },
            },

            {
                path: "/:configuration/account",
                name: "Account",
                component: Account,
            },
            {
                path: "/:stock/supplier",
                name: "Supplier",
                component: Supplier,
            },
            {
                path: "/:configuration/medicine/",
                name: "Medicine",
                component: Medicine
            },
            {
                path: "/:configuration/customer",
                name: "Customer",
                component: Customer,
            },
            {
                path: "/:configuration/unit/",
                name: "Unit",
                component: Unit
            },
            {
                path: "/:configuration/category/",
                name: "Category",
                component: Category
            },
            {
                path: "/:sales/report/",
                name: "Report",
                component: Report
            },
            {
                path: "/:sales/sales",
                name: "Sales",
                component: Sales,
            }, {
                path: "/:sales/daily-sales",
                name: "DailySales",
                component: DailySales,
            },
            {
                path: "/:stocks/daily-purchase",
                name: "DailyPurchases",
                component: DailyPurchase,
            },
            {
                path: "/:stocks/stock-page",
                name: "StockPage",
                component: StockPage,
            },
       
            {
                path: "/:stocks/stock-payment",
                name: "StockPayment",
                component: StockPayment,
            },
            {
                path: "/:stocks/stock-balance",
                name: "StockBalance",
                component: StockBalance,
            },
            {
                path: "/:stocks/stock-detail",
                name: "StockDetail",
                component: Detail,
            },
            ]
        }
    ],
});

export default router;