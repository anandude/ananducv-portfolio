export type CaseStudy = {
  slug: string
  name: string
  kind: string
  sector: string
  year: string
  youtubeId: string
  oneLiner: string
  problem: string[]
  solution: string
  features: { group: string; items: string[] }[]
  decisions: { title: string; why: string; tradeoff: string }[]
  scope: { label: string; value: string }[]
  stack: string[]
  // Real outcome figures supplied by the client engagement. Rendered only when present.
  impact?: string[]
  reflection: string[]
}

export const EMPLOYER = "Xagents (Twofold Digital Media)"

export const caseStudies: CaseStudy[] = [
  {
    slug: "ledgerdesk-erp",
    name: "LedgerDesk ERP",
    kind: "Accounting & sales ERP",
    sector: "Multi-branch trading business · UAE",
    year: "2026",
    youtubeId: "UXxCW-Byzuo",
    oneLiner:
      "A double-entry accounting and sales ERP that takes a deal from quotation to a paid, VAT-compliant invoice and keeps the books of every branch balanced on its own.",
    problem: [
      "Each branch kept its own sales documents, bank records and spreadsheets, so the owners had no single, trustworthy view of the business.",
      "Accounting was re-keyed by hand from invoices and bills, which made month-end slow and errors easy to miss.",
      "UAE VAT returns and the new 9% corporate tax had to be worked out manually every period, with no audit trail behind the numbers.",
    ],
    solution:
      "I designed and built a full ERP in which every commercial document is also an accounting event. Quotations convert to proformas and tax invoices, receipts and vendor payments post balanced journal entries automatically, and the general ledger, bank register, financial statements and tax returns are all derived from those entries rather than typed in separately. Each branch keeps its own books, numbering and bank accounts, and owners can switch between them at any time.",
    features: [
      {
        group: "Sales (order-to-cash)",
        items: [
          "Lead pipeline, quotations with approval, proforma and tax invoices, delivery notes, credit and debit notes",
          "Payment recording that creates the receipt, bank entry and journal entry in one step",
          "FTA-compliant tax invoice PDFs with company stamp and signature",
        ],
      },
      {
        group: "Purchases (procure-to-pay)",
        items: ["Purchase orders, vendor bills with an approval step, bill payments and expense claims"],
      },
      {
        group: "Accounting & banking",
        items: [
          "UAE IFRS chart of accounts with a drill-down general ledger for every account",
          "Profit & loss, trial balance and receivables ageing",
          "Bank register with running balance and period-by-period reconciliation",
          "Fixed assets with monthly depreciation, cost centres and multi-currency rates",
        ],
      },
      {
        group: "UAE tax & controls",
        items: [
          "VAT201 return boxes filled from the books for any quarter",
          "Corporate tax at 9% above AED 375,000 with small-business relief and free-zone settings",
          "One approvals queue across modules, an exportable audit trail and global search",
        ],
      },
    ],
    decisions: [
      {
        title: "Documents post their own journal entries",
        why: "If accountants re-enter invoices into a ledger, the two will drift. Making every invoice, receipt, bill and payment generate its double-entry posting means the ledger is a consequence of the business, not a second copy of it.",
        tradeoff: "Every document type needs a carefully defined posting rule, and correcting a mistake means issuing a credit note or reversing entry rather than editing history.",
      },
      {
        title: "Accounting invariants enforced in Postgres",
        why: "Journal lines are constrained so a line is either a debit or a credit, never both or negative, and a trigger refuses any posting into a locked fiscal period. These rules hold no matter which screen, script or future integration writes the data.",
        tradeoff: "Business rules live partly in SQL, which is harder to unit-test than TypeScript. I kept them small, named and versioned across 67 migrations.",
      },
      {
        title: "Branch isolation through row-level security",
        why: "Branches are separate legal books. 152 RLS policies scope every table to the user's branch and permissions, so least privilege is enforced by the database rather than by remembering a filter in each query.",
        tradeoff: "Policies add planning overhead to every new table and need to be indexed well to keep reports fast.",
      },
      {
        title: "Per-branch, per-document numbering in the database",
        why: "Tax invoices need unique, sequential numbers per branch. Generating them in database functions, rather than in the browser, keeps two users saving at the same moment from producing duplicates.",
        tradeoff: "Numbering formats are less flexible than free text, so I added a settings screen for prefixes instead.",
      },
    ],
    scope: [
      { label: "Database tables", value: "57" },
      { label: "RLS policies", value: "152" },
      { label: "DB functions", value: "69" },
      { label: "Triggers", value: "46" },
      { label: "Migrations", value: "67" },
      { label: "App screens", value: "90" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase / Postgres", "Clerk", "React-PDF", "pdf-lib", "Zod"],
    reflection: [
      "I would move journal posting into a single Postgres function per document type, so the document and its ledger entries are written in one transaction instead of two calls from the app.",
      "I would add property-based tests that generate random document sequences and assert the trial balance always nets to zero.",
    ],
  },
  {
    slug: "signaldesk-portal",
    name: "SignalDesk Portal",
    kind: "Membership & investment portal",
    sector: "Trading-signals and investment firm",
    year: "2026",
    youtubeId: "nzcQwAhAISM",
    oneLiner:
      "A members' portal and admin console for a trading-signals firm, built around an append-only financial ledger so that every deposit, payout and commission can be traced and nothing can be silently edited.",
    problem: [
      "Signals, memberships, investments and payouts were run across messaging groups and spreadsheets, so balances depended on whoever last edited a file.",
      "Deposits and withdrawals involved real money and crypto transfers with no enforced review steps.",
      "Members had no self-service view of their plan, returns or referral income, so support handled every question by hand.",
    ],
    solution:
      "I built a portal with two faces. Members get their plan, live signals, a personal trading journal, investments with their ROI schedule, a wallet, referrals and a learning centre, all gated by plan tier. Admins get a console to publish signals, review KYC, approve deposits against the on-chain transaction, move withdrawals through a controlled workflow, manage plans and export everything for finance. Every financial event lands in a ledger that can only be appended to.",
    features: [
      {
        group: "Members",
        items: [
          "Dashboard with plan, renewal, investments, ROI received, next payout and referral income",
          "Signals with direction, entry, stop loss, live price and status, locked by plan tier",
          "Personal trade journal with net P&L, win rate and average win/loss",
          "Investments with monthly ROI and full instalment schedule, wallet history and a locked withdrawal address",
          "Referral link with commission on each referred member's first investment, learning centre and copy-trading guide",
        ],
      },
      {
        group: "Admin console",
        items: [
          "Signal publisher that targets every member whose plan includes that signal category",
          "Deposit review against the on-chain transaction, KYC review and withdrawal processing",
          "Investment plans with ROI, duration, referral rate and deductions",
          "CSV and Excel exports of users, investments, deposits, withdrawals and the ledger",
          "Tamper-proof audit log of every sensitive admin action",
        ],
      },
    ],
    decisions: [
      {
        title: "An append-only ledger, with balances derived from it",
        why: "A trigger rejects any UPDATE or DELETE on the ledger table; corrections are posted as compensating entries. Balances are read from a view that aggregates the ledger, so a stored balance can never drift from its history.",
        tradeoff: "Reading a balance costs an aggregate query instead of a single field, and admins have to learn to correct with adjustments rather than edits.",
      },
      {
        title: "Withdrawals as an explicit state machine",
        why: "A Postgres function locks the request row (SELECT … FOR UPDATE) and only allows legal transitions, such as PENDING → APPROVED → PROCESSING → COMPLETED. Two admins clicking at once cannot pay a request twice.",
        tradeoff: "Adding a new status means changing the transition table and the function, not just the UI.",
      },
      {
        title: "Money handled with decimal arithmetic",
        why: "Binary floating point cannot represent values like 0.1 exactly. All money is computed with decimal.js in the app and NUMERIC in Postgres, so ROI and commission calculations round predictably.",
        tradeoff: "Slightly more verbose code and an extra dependency.",
      },
      {
        title: "Outbox pattern for publishing signals",
        why: "Publishing a signal enqueues one delivery per external channel inside the same transaction, and a worker claims deliveries from the queue. A failure on Telegram or X never loses or duplicates a signal inside the portal.",
        tradeoff: "Delivery is eventually consistent, so there can be a short delay between publishing and the external post.",
      },
    ],
    scope: [
      { label: "Database tables", value: "38" },
      { label: "DB functions", value: "44" },
      { label: "Triggers", value: "32" },
      { label: "Migrations", value: "31" },
      { label: "App screens", value: "59" },
      { label: "User roles", value: "Member · Admin · Super admin" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase / Postgres", "Clerk", "decimal.js", "ExcelJS", "Zod"],
    reflection: [
      "I would add a nightly reconciliation job that compares the ledger with the on-chain wallet and alerts on any difference.",
      "I would write the withdrawal state machine as a typed table shared by the database and the UI, so the allowed transitions are defined once.",
    ],
  },
  {
    slug: "agency-business-suite",
    name: "Agency Business Suite",
    kind: "Sales-to-delivery business suite",
    sector: "Digital marketing agency · UAE",
    year: "2026",
    youtubeId: "0ABRcr6sOjE",
    oneLiner:
      "One system for an agency's whole lifecycle: lead, quotation with real margin, signed agreement, invoice, payment and project delivery.",
    problem: [
      "Quotes were written in documents from memory, so pricing varied and nobody knew the real margin on a deal.",
      "Invoices, payments and receipts were tracked separately from the work, and projects lived in yet another tool.",
      "Management could not see the pipeline, revenue and delivery status in one place.",
    ],
    solution:
      "I built a suite in which each step hands its data to the next. A lead becomes a quotation built from a service catalog, the quotation becomes a service agreement PDF, the agreement becomes invoices, and recording a payment issues the receipt automatically. Approved work becomes a project on a kanban board linked back to its quotation and agreement.",
    features: [
      {
        group: "Sales",
        items: [
          "Lead table with industry, contacts, owner and deal value, with one-click stage changes",
          "Quotations built from the service catalog with a price-range slider per service",
          "Internal cost breakdown that shows the real margin on every quote, with 5% VAT and discounts",
        ],
      },
      {
        group: "Contracts & finance",
        items: [
          "Service agreements generated as PDFs and linked to their quotation",
          "Invoices with amount paid and status, payments that issue receipts automatically",
          "Configurable numbering for quotations, invoices and receipts",
        ],
      },
      {
        group: "Delivery",
        items: [
          "Projects on a drag-and-drop kanban or table view, with tasks, owners, due dates and comments",
          "Customers converted from leads, filterable by emirate, and a service catalog with features and revisions",
          "Admin, manager and viewer permissions",
        ],
      },
    ],
    decisions: [
      {
        title: "Totals and numbering computed by the database",
        why: "15 triggers keep document totals, payment status and numbering correct whenever a line item or payment changes, so a total on screen can never disagree with the saved record.",
        tradeoff: "Logic split between SQL and TypeScript needs clear naming and comments to stay understandable.",
      },
      {
        title: "Margin visible internally, never on the client PDF",
        why: "Each quotation carries an internal breakdown (consumables, net margin, and optional sales-commission and handling splits) shown only in the app. The client PDF component is built without those fields, so the margin cannot leak by accident.",
        tradeoff: "Two views of the same quote, client-facing and internal, which the UI has to keep clearly separate.",
      },
      {
        title: "Permissions enforced with row-level security",
        why: "54 RLS policies apply the admin, manager and viewer roles at the database, so a viewer cannot change data even by calling the API directly.",
        tradeoff: "Permission changes require a migration, not just a UI tweak.",
      },
    ],
    scope: [
      { label: "Database tables", value: "16" },
      { label: "RLS policies", value: "54" },
      { label: "DB functions", value: "16" },
      { label: "Triggers", value: "15" },
      { label: "App screens", value: "26" },
      { label: "User roles", value: "Admin · Manager · Viewer" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase / Postgres", "React-PDF", "dnd-kit", "Recharts", "Zod"],
    reflection: [
      "I would model the quote → agreement → invoice chain as an explicit document graph, so reporting on conversion rates becomes a single query.",
      "I would add email delivery and e-signature for agreements to close the loop with the client.",
    ],
  },
  {
    slug: "clinicflow-crm",
    name: "ClinicFlow CRM",
    kind: "Patient pipeline CRM",
    sector: "Multi-branch wellness clinic group · UAE",
    year: "2026",
    youtubeId: "GllyzkUTAlU",
    oneLiner:
      "A lead-to-treatment CRM where one patient record is handed between sales, front office and doctors across branches, with each role seeing exactly what it should.",
    problem: [
      "Enquiries arrived from Instagram, WhatsApp and phone calls and were passed between sales, reception and doctors in chat, so leads went cold with no clear owner.",
      "Each branch worked in isolation, and management had no reliable view of conversion or revenue.",
      "Medical notes and pricing needed tighter access control than a shared spreadsheet could offer.",
    ],
    solution:
      "I built a CRM around a single lead record that moves through five stages: Lead, Qualify, Appointment, Consultation and Close. Sales qualifies the lead, front office books it with a doctor, the doctor records a treatment plan that then locks, front office agrees the package and payment, and sales closes the deal. Every step is logged on the lead's timeline, and the pipeline board updates live for everyone.",
    features: [
      {
        group: "Pipeline",
        items: [
          "Five-stage drag-and-drop board, with new enquiries kept separate from patients in treatment",
          "Patient search from anywhere (Ctrl + K) and a full activity timeline per lead",
          "Doctor calendar with the day's consultations, and consultation notes that lock after saving",
        ],
      },
      {
        group: "Management",
        items: [
          "Dashboard with active leads, monthly revenue, win rate and days to close, filterable by branch",
          "Follow-ups per salesperson with overdue flags, and active clients with sessions and spend",
          "Reports on the funnel, lead sources and revenue, plus an audit log of every action",
          "Admins invite users and assign roles and branches",
        ],
      },
    ],
    decisions: [
      {
        title: "All authorization lives in Postgres row-level security",
        why: "The identity provider puts the user's role, branch and user ID into the JWT, and RLS policies read those claims. A doctor only ever receives the leads assigned to them at their branch, even if the frontend has a bug.",
        tradeoff: "Policies became complex as the client's rules evolved, so I refined them over 13 versioned migrations (branch isolation, doctor visibility, re-engaging lost leads) instead of patching them by hand.",
      },
      {
        title: "Handoffs modelled as stage transitions",
        why: "Each role can only edit leads in the stages it is responsible for (a doctor, for example, only their own consultations), which turns an informal chat-based process into an enforced workflow with a clear owner at every moment.",
        tradeoff: "Edge cases, such as cancelling and re-engaging a patient, had to be designed explicitly rather than handled ad hoc.",
      },
      {
        title: "Realtime instead of polling",
        why: "Front office and sales work on the same leads at the same time. Postgres realtime subscriptions keep every board current without refreshes.",
        tradeoff: "The UI has to handle updates arriving while a user is mid-edit.",
      },
    ],
    scope: [
      { label: "Pipeline stages", value: "5" },
      { label: "RLS policies (over time)", value: "36" },
      { label: "Migrations", value: "13" },
      { label: "App screens", value: "12" },
      { label: "User roles", value: "Admin · Ops · Sales · Front office · Doctor" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase / Postgres", "Clerk", "dnd-kit", "Recharts", "jsPDF"],
    reflection: [
      "I would write automated policy tests that sign in as each role and assert exactly which rows come back, so RLS changes can be refactored safely.",
      "I would split clinical notes into their own table with stricter access, rather than columns on the lead.",
    ],
  },
  {
    slug: "breezeline-erp",
    name: "Breezeline ERP",
    kind: "Quotation & sales ERP",
    sector: "Window screens & mosquito-net installer · UAE",
    year: "2026",
    youtubeId: "dg2uHz_7JUA",
    oneLiner:
      "A quotation system for an installation company: site measurements in, priced and branded quotation out, then tracked through to invoice, with reports by emirate and salesperson.",
    problem: [
      "Sales staff measured windows on site and priced each one by hand with a calculator, so quotes were slow and inconsistent.",
      "Quotes were written as separate documents, with no record of which were sent, accepted, ignored or invoiced.",
      "Management could not see performance by salesperson or emirate.",
    ],
    solution:
      "I built a quotation ERP where a salesperson picks the customer, enters each window by location, product, panel, colour, frame and size, and the system prices it with the company's rules, adds extras, discount and VAT, and produces a branded PDF. Quotes then move through a status pipeline, and reports break revenue down by month, emirate and staff member.",
    features: [
      {
        group: "Quoting",
        items: [
          "Quotation builder with measured line items, product rules, custom charges, discount and VAT",
          "Instant price calculator on the dashboard for quick answers on the phone",
          "Quote numbers built from the salesperson's initials, with an automatic 10-day expiry",
          "Branded PDF with company details, every window, totals, contacts and terms",
        ],
      },
      {
        group: "Pipeline & reporting",
        items: [
          "Draft → Sent → Accepted → Invoiced, with Rejected and No-response tracked so nothing slips",
          "Search by quote number, customer or phone and filter by salesperson",
          "Revenue analytics and reports by date range, status, emirate and staff, with exports",
        ],
      },
      {
        group: "Access",
        items: ["Director, marketing and staff roles; sales staff only see their own quotations"],
      },
    ],
    decisions: [
      {
        title: "Pricing rules in one module",
        why: "The same rules power the dashboard calculator, the quote builder and the PDF, so a price shown on the phone always matches the price on paper.",
        tradeoff: "Any change to the company's rates is a code change, which suits a business whose pricing rarely changes.",
      },
      {
        title: "Role-scoped data",
        why: "Sales staff see only their own pipeline, while the director sees everything and is the only one who can manage staff. Middleware guards the staff routes, and every quotation query is scoped to the signed-in salesperson on the server.",
        tradeoff: "Scoping lives in server code rather than the database, so each new query has to remember it. RLS would be the next step.",
      },
      {
        title: "Server-side document generation",
        why: "PDFs are generated through API routes from the saved quotation, so every copy of a quote is identical and reproducible.",
        tradeoff: "Layout changes need a deploy rather than a template edit.",
      },
    ],
    scope: [
      { label: "Database tables", value: "8" },
      { label: "RLS policies", value: "23" },
      { label: "API routes", value: "17" },
      { label: "App screens", value: "11" },
      { label: "User roles", value: "Director · Marketing · Staff" },
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Supabase / Postgres", "Clerk + passkeys", "jsPDF", "Tailwind CSS"],
    reflection: [
      "I would move pricing rules into a settings table with an effective date, so the business could change rates without a release.",
      "I would compute and store totals in one place only; having both app and database calculate totals is a source of subtle bugs.",
    ],
  },
  {
    slug: "studio-proposals-crm",
    name: "Studio Proposals CRM",
    kind: "Proposals & invoicing CRM",
    sector: "Art & mural studio · UAE",
    year: "2026",
    youtubeId: "VcrqvxqGrjE",
    oneLiner:
      "Proposals, quotations and milestone-based invoices for a creative studio, with branded PDFs and payment tracking per milestone.",
    problem: [
      "Proposals were assembled by hand in word processors for every commission, with inconsistent terms and layouts.",
      "Large artworks are paid in milestones, and tracking what had been paid against which stage was done on paper.",
    ],
    solution:
      "I built a private portal where the team picks a client, describes the artwork, size, quantity and rate, and gets a numbered proposal with the studio's default timeline, payment milestones, terms and warranty already filled in. Invoices follow the same milestones, and marking a milestone as paid records the payment and updates the balance due.",
    features: [
      {
        group: "Documents",
        items: [
          "Proposals and quotations with scope of work, rates and totals, editable or exportable",
          "Branded PDFs with logo, trade details, bank details and the total in words",
          "Defaults for notes, terms, timeline and milestones, and per-type numbering formats",
        ],
      },
      {
        group: "Payments & clients",
        items: [
          "Milestone invoices with draft, sent, partial and paid states",
          "Payment recording with amount, date, method and reference",
          "Customer directory with an activity timeline of every document",
          "Dashboard with document status charts and six months of revenue",
        ],
      },
    ],
    decisions: [
      {
        title: "Milestones as first-class records",
        why: "Storing each milestone as its own row with an amount and paid state lets the invoice status (partial or paid) and the balance be derived, rather than typed in.",
        tradeoff: "More tables and joins than storing a single 'amount paid' number.",
      },
      {
        title: "Defaults copied into each document",
        why: "Terms and milestones are copied from Settings when a proposal is created, so changing the defaults later never rewrites a document a client has already seen.",
        tradeoff: "Fixing a typo in old documents has to be done one by one.",
      },
    ],
    scope: [
      { label: "Database tables", value: "7" },
      { label: "Triggers", value: "10" },
      { label: "RLS policies", value: "11" },
      { label: "App screens", value: "14" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase / Postgres", "React-PDF", "Recharts", "Zod"],
    reflection: [
      "I would add a client-facing link where the customer can approve a proposal and pay a milestone online.",
    ],
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug)
}

export const sharedPatterns = [
  "Authorization enforced by the database (row-level security), not just the UI",
  "Workflows modelled as explicit state machines",
  "Money and document numbers computed server-side, never trusted from the client",
  "Audit trails and immutable records where money or medical data is involved",
  "Branded, reproducible PDFs generated from saved data",
]
