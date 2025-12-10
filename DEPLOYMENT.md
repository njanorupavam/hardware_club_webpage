# How to Deploy Your Hardware Club Website

Since this is a static website (HTML, CSS, JS), you have several free and easy options to deploy it.

## Option 1: Netlify Drop (Easiest - Drag & Drop)
**Best for:** Quick hosting without setting up Git commands.

1.  Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2.  Sign up or Log in (you can use your GitHub/Google account).
3.  On your computer, open the folder:  
    `C:\Users\kaasi\Documents\Projects\Notes`
4.  **Drag and drop** the `hardware-club-site` folder directly onto the Netlify page box that says "Drag and drop your site output folder here".
5.  **Done!** Netlify will generate a URL for you (e.g., `coolexample-12345.netlify.app`).
6.  You can change the site name in "Site Settings" -> "Change site name" to something like `sahrdaya-hardware-club.netlify.app`.

---

## Option 2: GitHub Pages (Professional)
**Best for:** Long-term maintenance and collaboration.

1.  **Create a Repository on GitHub:**
    *   Go to [github.com/new](https://github.com/new).
    *   Name it `hardware-club-site`.
    *   Make sure "Public" is selected.
    *   Click "Create repository".

2.  **Push your code (Run these commands in your VS Code terminal):**
    ```bash
    # Initialize Git (if not already done)
    git init
    git add .
    git commit -m "Initial commit - Hardware Club Website"

    # Link to your new GitHub repo (Replace YOUR_USERNAME below)
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/hardware-club-site.git
    git push -u origin main
    ```

3.  **Activate GitHub Pages:**
    *   Go to your repository settings on GitHub.
    *   Click on **"Pages"** in the left sidebar.
    *   Under "Source", select `main` branch.
    *   Click "Save".
    *   Your site will be live at `https://YOUR_USERNAME.github.io/hardware-club-site/`.

---

## Option 3: Vercel (Fastest for Updates)
**Best for:** Automatic deployments when you push to GitHub.

1.  Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your `hardware-club-site` repository from the list.
4.  Click **"Deploy"**.
5.  Vercel gives you a very fast, professional URL (e.g., `hardware-club-site.vercel.app`).
