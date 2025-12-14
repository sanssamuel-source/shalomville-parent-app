# 🚀 Deployment Instructions

## 1. Get Your Code on GitHub

1.  **Create a Repository**: Go to [GitHub.com/new](https://github.com/new) and name it `shalomville-parent-app`.
2.  **Upload Files**:
    - Open the `github_upload` folder I created for you.
    - Select **ALL** files inside it.
    - Drag and drop them onto the GitHub upload page.
    - Commit changes.

## 2. Go Live on Vercel

1.  Go to [Vercel.com/new](https://vercel.com/new).
2.  Select the `shalomville-parent-app` repository.
3.  Click **Deploy**.

## 3. Accessing the Admin Portal

Once deployed, your app has two sections:

- **Parent App**: `https://your-app-url.vercel.app`
- **Admin Portal**: `https://your-app-url.vercel.app/admin`

**Login Credentials (Staff Only):**

- **ID**: admin
- **Password**: admin123

> [!IMPORTANT] > **Data Synchronization Note**
> Currently, this app runs in "Standalone Mode". This means:
>
> - If you test it on **one device** (e.g., your laptop), changes in the Parent App will show in the Admin Portal immediately.
> - However, if Parents use their phones and you use your laptop, **you will not see their data yet** because there is no shared Cloud Database connected.
>
> To enable real-time sync across all devices, a specialist needs to connect **Firebase** or **Supabase** to this code. The code is ready for this integration.
