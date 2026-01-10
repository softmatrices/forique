import { Download, Calendar, TrendingUp, Wallet, CreditCard as BankIcon, Clock } from "lucide-react";

const payouts = [
    { id: "PAY-001", amount: "₹45,230", orders: 23, status: "Settled", date: "Jan 10, 2026", utr: "UTR123456789" },
    { id: "PAY-002", amount: "₹38,750", orders: 19, status: "Processing", date: "Jan 9, 2026", utr: "-" },
    { id: "PAY-003", amount: "₹52,100", orders: 28, status: "Settled", date: "Jan 3, 2026", utr: "UTR987654321" },
    { id: "PAY-004", amount: "₹41,890", orders: 21, status: "Settled", date: "Dec 27, 2025", utr: "UTR456789123" },
];

const ledger = [
    { id: "ORD-2026-001", type: "Sale", amount: "+₹2,499", commission: "-₹375", net: "₹2,124", date: "Today" },
    { id: "ORD-2026-002", type: "Sale", amount: "+₹1,899", commission: "-₹285", net: "₹1,614", date: "Today" },
    { id: "ORD-2026-003", type: "Refund", amount: "-₹899", commission: "+₹135", net: "-₹764", date: "Yesterday" },
    { id: "ORD-2026-004", type: "Sale", amount: "+₹4,299", commission: "-₹645", net: "₹3,654", date: "Yesterday" },
];

const statusStyles: Record<string, string> = {
    Settled: "bg-success/10 text-success",
    Processing: "bg-warning/10 text-warning",
};

export default function PaymentsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Payments</h1>
                    <p className="text-sm text-muted mt-1">Track your earnings and settlements</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-surface border border-border rounded-lg text-sm font-medium text-foreground hover:bg-background transition-colors">
                    <Download className="w-4 h-4" />
                    Export Statement
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-surface rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-success/10 text-success">
                            <Wallet className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted">Available Balance</p>
                            <p className="text-xl font-semibold text-foreground">₹1,45,890</p>
                        </div>
                    </div>
                </div>
                <div className="bg-surface rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-warning/10 text-warning">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted">Pending Settlement</p>
                            <p className="text-xl font-semibold text-foreground">₹38,750</p>
                        </div>
                    </div>
                </div>
                <div className="bg-surface rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-info/10 text-info">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted">This Month</p>
                            <p className="text-xl font-semibold text-foreground">₹2,45,890</p>
                        </div>
                    </div>
                </div>
                <div className="bg-surface rounded-xl p-5 border border-border">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-lg bg-muted/10 text-muted">
                            <BankIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm text-muted">Commission Paid</p>
                            <p className="text-xl font-semibold text-foreground">₹36,883</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payouts */}
            <div className="bg-surface rounded-xl border border-border">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Recent Payouts</h2>
                    <button className="text-sm text-info hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-background/50">
                                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Payout ID</th>
                                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Amount</th>
                                <th className="text-center text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Orders</th>
                                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Status</th>
                                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Date</th>
                                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">UTR</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {payouts.map((payout) => (
                                <tr key={payout.id} className="hover:bg-background/50 transition-colors">
                                    <td className="px-5 py-4 font-medium text-foreground">{payout.id}</td>
                                    <td className="px-5 py-4 text-sm font-medium text-foreground">{payout.amount}</td>
                                    <td className="px-5 py-4 text-center text-sm text-muted">{payout.orders}</td>
                                    <td className="px-5 py-4">
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[payout.status]}`}>
                                            {payout.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-muted">{payout.date}</td>
                                    <td className="px-5 py-4 text-sm text-muted font-mono">{payout.utr}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Ledger */}
            <div className="bg-surface rounded-xl border border-border">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Transaction Ledger</h2>
                    <button className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground">
                        <Calendar className="w-4 h-4" />
                        Last 7 days
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-background/50">
                                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Order ID</th>
                                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Type</th>
                                <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Amount</th>
                                <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Commission</th>
                                <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Net</th>
                                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {ledger.map((entry, i) => (
                                <tr key={i} className="hover:bg-background/50 transition-colors">
                                    <td className="px-5 py-4 font-medium text-foreground">{entry.id}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-sm font-medium ${entry.type === "Sale" ? "text-success" : "text-danger"}`}>
                                            {entry.type}
                                        </span>
                                    </td>
                                    <td className={`px-5 py-4 text-right text-sm font-medium ${entry.type === "Sale" ? "text-success" : "text-danger"}`}>
                                        {entry.amount}
                                    </td>
                                    <td className="px-5 py-4 text-right text-sm text-muted">{entry.commission}</td>
                                    <td className="px-5 py-4 text-right text-sm font-medium text-foreground">{entry.net}</td>
                                    <td className="px-5 py-4 text-sm text-muted">{entry.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
