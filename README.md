# 💼 Ishaq Mohammed | Premium Job Portal & Interview Preparation Hub

An ultra-premium, dynamic glassmorphic job portal and comprehensive interview preparation platform. Designed with state-of-the-art CSS, interactive micro-animations, and modular JavaScript to deliver a seamless, high-performance career enhancement experience.

---

## 🌟 Key Features

*   **📊 Interactive Dashboard:** Track your career preparation journey, applied jobs, aptitude test accuracy, and DSA sheet completion in real-time.
*   **🔍 Job Portal:** Explore fully-featured job cards with filterable criteria, complete description pages, and an integrated premium resume submission/application system.
*   **🧠 Comprehensive Prep Center:** Dedicated training hubs for:
    *   **Aptitude Training:** Topic-wise modules with quick-practice cards.
    *   **Technical Core:** Detailed question & answer cards covering OS, DBMS, Networks, and OOPs.
    *   **HR Prep:** Curated common questions with structured mock answer frameworks.
*   **💻 DSA Sheets & Code Playground:** Track topic-wise DSA problems (Arrays, LinkedLists, Trees, Graphs) complete with direct links and status checkboxes.
*   **🏢 Company Interview Timelines:** Deep-dive into recruitment roadmaps for top-tier tech companies like Google, Amazon, Microsoft, and Meta.

---

## 🛠️ Technology Stack

*   **Structure:** HTML5 Semantic Markup
*   **Styling:** Modern Vanilla CSS3 featuring custom-tailored Glassmorphic properties, CSS variables, and fluid transitions.
*   **Logic:** Modern Modular Vanilla ES6 JavaScript (`app.js` & `data.js`).
*   **Icons:** [Boxicons v2.1.4](https://boxicons.com/)
*   **Typography:** Google Fonts (*Inter*, *Outfit*, and *Fira Code*).

---

## 🚀 Deployment Procedure

Since this is a high-performance, fully static client-side web application, it does not require any backend compilation or complex build systems. You can deploy it instantly across multiple modern hosting providers using the guides below:

### Option 1: GitHub Pages (Recommended & Easiest)

As your project is already hosted on GitHub, GitHub Pages is the most integrated way to deploy:

1.  Go to your repository on GitHub: `https://github.com/ishaq-md/job-portal`
2.  Click on the **Settings** tab at the top.
3.  On the left sidebar under "Code and automation", click on **Pages**.
4.  Under **Build and deployment**:
    *   **Source:** Select *Deploy from a branch*.
    *   **Branch:** Select `main` (and `/ (root)` folder), then click **Save**.
5.  Wait 1–2 minutes, then refresh the page. Your public deployment URL will appear at the top of the section (e.g., `https://ishaq-md.github.io/job-portal/`).

---

### Option 2: Netlify (Drag & Drop or Git Integration)

#### Via Git Connection (Automatic Deployments on Commit):
1.  Log in to [Netlify](https://www.netlify.com/).
2.  Click **Add new site** -> **Import from an existing project**.
3.  Choose **GitHub** and authorize Netlify.
4.  Select your `job-portal` repository.
5.  Under **Build settings**, keep the settings empty:
    *   **Build command:** *(Leave blank)*
    *   **Publish directory:** `.` (or leave blank)
6.  Click **Deploy site**. Netlify will host it and rebuild every time you commit code.

#### Via Drag & Drop:
1.  Log in to Netlify and go to the dashboard.
2.  Go to the **Sites** tab and scroll to the bottom.
3.  Drag and drop your local project folder containing `index.html` directly into the designated drop zone.

---

### Option 3: Vercel (CLI or Dashboard)

#### Via Dashboard:
1.  Log in to [Vercel](https://vercel.com/).
2.  Click **Add New...** -> **Project**.
3.  Import your `job-portal` repository from GitHub.
4.  On the Configure Project screen:
    *   **Framework Preset:** Select *Other*.
    *   **Build & Development Settings:** Leave default (blank).
5.  Click **Deploy**.

#### Via Vercel CLI (Local Terminal):
1.  Install Vercel globally: `npm i -g vercel`
2.  Run `vercel` in the root of your project directory.
3.  Follow the interactive prompts to link and deploy your site instantly.

---

### Option 4: Google Cloud Run (Containerized Nginx Server)

We have pre-configured a production-ready `Dockerfile` and custom `default.conf` Nginx server listening on port `8080`. To deploy to Google Cloud Run:

1.  **Setup Google Cloud SDK:** Install the [gcloud CLI](https://cloud.google.com/sdk/docs/install) and authenticate:
    ```bash
    gcloud auth login
    gcloud config set project [YOUR_GCP_PROJECT_ID]
    ```
2.  **Build and Deploy:**
    Deploy directly from the source code in one simple command:
    ```bash
    gcloud run deploy im-jobs --source . --platform managed --allow-unauthenticated --port 8080
    ```
3.  **Deploy Prompt Options:**
    *   Select your preferred deployment region (e.g., `us-central1`).
    *   Confirm `yes` to "allow unauthenticated invocations" so the site is publicly visible.
4.  **Live URL:** Once the container finishes building and deploying, the public URL will be printed directly in your terminal.

---

### Option 5: Local Deployment / Self-Hosting

To run the application locally on your machine with a fast, modern server:

#### Using Node.js `http-server` (Recommended):
```bash
# Install the server globally
npm install -g http-server

# Run the server in the project directory
http-server . -p 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

#### Using Python (Built-in):
```bash
# For Python 3.x
python -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 📂 Project Structure

```text
├── index.html       # Main application layout and modal views
├── styles.css       # Premium Dark/Light Glassmorphic Design System
├── app.js           # Dynamic view controller and UI state engines
├── data.js          # Core static database (Jobs, DSA sheets, Prep guides, Company processes)
└── .gitignore       # Standard version control ignore rules
```
