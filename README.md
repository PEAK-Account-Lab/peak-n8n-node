# 🧩 n8n-nodes-peak  
Official n8n community node for integrating with **PEAK Accounting Platform**.

PEAK is a cloud-based accounting and financial automation platform that helps businesses automate receipts, expenses, invoices, order synchronization, and workflow integrations with marketplaces.  

With this node, you can build automated workflows that interact directly with your PEAK business.

---
## 🚀 Features  
This node allows you to perform a variety of accounting operations, including:

- **Create Daily Journal** – Create daily journal documents via API  
- **Create Receipt** – Create receipt documents via API  
- **Create Invoice** – Create invoice documents via API  
- **Create Expense** – Create expense documents via API  
- **Get Master Data** – Retrieve contacts, products, payment methods, and other essential master data  

Additional operations may be added in future releases.

---

## 📦 Installation  
Follow the installation guide in the [**n8n Community Nodes documentation**](https://docs.n8n.io/integrations/community-nodes/installation/)

Once installed, you'll be able to use all PEAK-related operations.

---

## 🔐 Credentials (Required Before Use)

To use this node, you must obtain **PEAK API Credentials**.  
These credentials are issued **only** by the PEAK Sales / Partner team.

### Your credential will consist of four fields:

| Field | Description |
|-------|-------------|
| **Connect ID** | Used only for requesting a Client Token and identifying your integration |
| **Connect Key** | Secret used together with Connect ID when requesting a Client Token |
| **Application Code** | Code required for generate User Token |
| **User Token** | Access token linked to a specific user & merchant |

---

## 🧭 How to Obtain PEAK API Credentials

### 1️⃣ Contact PEAK Sales Team  
Request API integration access.  
You will receive:
- Connect ID  
- Connect Key  
- Application Code  

### 2️⃣ Generate the User Token inside PEAK  
1. Log in to the PEAK web app  
2. Open the merchant you want to connect  
3. Navigate to **Connect Apps Setting -> Connect Partner App -> Connect Non-Partner App** in Setting  
4. Enter your **Application Code**  
5. PEAK will generate a **User Token**  

Once you have all four values, create a new credential in n8n:

**Settings → Credentials → New → PEAK API**

After saving, all PEAK nodes will be ready to use.

---

## ⚙️ Authentication  
Every PEAK request requires:

- `Time-Stamp`  
- `Time-Signature`
- `User-Token`  
- `Client-Token`

The PEAK n8n node **automatically handles all signature generation**, timestamps, and headers — no manual work required.

---

## 🛠 Operations  
### **PEAK Node**
Available actions:

| Resource | Operation | Description |
|----------|-----------|-------------|
| Daily Journal | Create | Create a daily Journal document |
| Receipt | Create | Create a receipt document |
| Invoice | Create | Create a invoice document |
| Expense | Create | Create an expense document |

More resources will be added in future versions.

---

## 📘 Usage

### **Action Node (PEAK)**
1. Drag the **PEAK** node into your workflow  
2. Select the resource (e.g., Receipt, Expense)  
3. Choose an operation  
4. Fill in required fields  
5. Run the workflow

### Example Use Cases  
- **Shopee Webhook → PEAK Create Receipt**  
- **Google Sheets → PEAK Create Expense**  
- **Internal System → Automated Accounting Workflows**  
- **Marketplace Sync → PEAK Billing or Receipt Generation**
---

## 🔗 Resources  
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
- [PEAK API Documentation](https://developers.peakaccount.com/reference/peak-open-api)  
- [n8n Official Docs](https://docs.n8n.io/)

---

## 🧩 Version History

### **0.1.0**  
- Initial release  
- Added:
  - Create Receipt  
  - Create Expense  
  - Fetch Master Data

### **0.1.1**  
- Added:
  - Create Client Token

### **0.1.2**  
- Standardized HTTP request handling

### **0.1.3**  
- Fixed npm packaging issue

### **0.1.4**  
- Fixed npm packaging issue
---