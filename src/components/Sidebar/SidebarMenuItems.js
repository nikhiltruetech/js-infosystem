export const MenuList = [
  {
    name: "Customer Module",
    url: "/admin/customer_module",
    role: ["role_branch_manager", "role_head_manager"],
  },
  {
    name: "Maker Module",
    role: ["role_head_manager"],
    children: [
      {
        name: "Receipts & Payments",
        role: ["role_head_manager"],
        children: [
          {
            name: "Receipt",
            url: "/admin/branches",
            role: ["role_head_manager"],
          },
          {
            name: "Deposit Receipt",
            url: "/admin/pincodes",
            role: ["role_head_manager"],
          },
          {
            name: "Realize / Bounce",
            url: "/admin/user-roles",
            role: ["role_head_manager"],
          },
          {
            name: "Pay-In slip Tagging",
            url: "/admin/user-roles",
            role: ["role_head_manager"],
          },
          {
            name: "Bounce Receipt",
            url: "/admin/user-roles",
            role: ["role_head_manager"],
          },
          {
            name: "Cancel Receipt",
            url: "/admin/user-roles",
            role: ["role_head_manager"],
          },
          {
            name: "Bounce Reversal",
            url: "/admin/bounce-reversal",
            role: ["role_head_manager"],
          },
          {
            name: "Payment",
            url: "/admin/user-roles",
            role: ["role_head_manager"],
          },
        ],
      },
      {
        name: "Miscellaneous",
        role: ["role_head_manager"],
        children: [
          {
            name: "Waive off",
            url: "/admin/branches",
            role: ["role_head_manager"],
          },
          {
            name: "Suspense Allocation",
            url: "/admin/pincodes",
            role: ["role_head_manager"],
          },
          {
            name: "Communication Block/Unblock",
            url: "/admin/user-roles",
            role: ["role_head_manager"],
          },
          {
            name: "PDD Maintenance",
            url: "/admin/user-roles",
            role: ["role_head_manager"],
          },
          {
            name: "Loan Transfer",
            url: "/admin/user-roles",
            role: ["role_head_manager"],
          },
        ],
      },
      {
        name: "Asset",
        url: "/admin/pincodes",
        role: ["role_head_manager"],
      },
      {
        name: "Cancellation",
        url: "/admin/user-roles",
        role: ["role_head_manager"],
      },
      {
        name: "Loan Marking",
        url: "/admin/user-roles",
        role: ["role_head_manager"],
      },
      {
        name: "Closure",
        url: "/admin/user-roles",
        role: ["role_head_manager"],
      },
      {
        name: "Post Disbursal Edit",
        url: "/admin/user-roles",
        role: ["role_head_manager"],
      },
    ],
  },
  {
    name: "Checker Module",
    url: "/admin/live-tracking",
    role: ["role_branch_manager", "role_head_manager"],
  },
  {
    name: "Bulk Operations",
    url: "/admin/fieldagent",
    role: ["role_branch_manager", "role_head_manager"],
  },
  {
    name: "Process Interfaces",
    url: "/admin/reports",
    role: ["role_branch_manager", "role_head_manager"],
  },
  {
    name: "Reports",
    url: "/admin/fieldagent",
    role: ["role_branch_manager", "role_head_manager"],
  },
  {
    name: "LMS Masters",
    url: "/admin/reports",
    role: ["role_branch_manager", "role_head_manager"],
  },
  {
    name: "Asset Classifications",
    url: "/admin/fieldagent",
    role: ["role_branch_manager", "role_head_manager"],
  },
  {
    name: "Audit Module",
    url: "/admin/reports",
    role: ["role_branch_manager", "role_head_manager"],
  },
];
