// 1. Initialize Supabase Client Connection
const SUPABASE_URL = "https://souhlsvdolmbknmxwoop.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_xByuKUqc2D5oWjwzL7tK1A_Q1bHvx3l";

const supabase = typeof createClient !== 'undefined' ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// 2. Auth Page Interaction Flow Block
if (document.getElementById('auth-form')) {
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const submitBtn = document.getElementById('submit-btn');
    const messageBox = document.getElementById('message-box');

    // Grab tab elements
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');

    let isLoginMode = true;

    // Function handling interface state switching layout modifications
    function switchMode(toLogin) {
        isLoginMode = toLogin;
        messageBox.textContent = "";

        if (isLoginMode) {
            tabLogin.classList.add('active');
            tabSignup.classList.remove('active');

            authTitle.textContent = "Welcome Back";
            authSubtitle.textContent = "Log in to manage your events and workshops.";
            submitBtn.textContent = "Log In";
        } else {
            tabSignup.classList.add('active');
            tabLogin.classList.remove('active');

            authTitle.textContent = "Create Account";
            authSubtitle.textContent = "Join Still Rooted to begin sharing community wisdom.";
            submitBtn.textContent = "Create Account";
        }
    }

    // Tab Listeners
    tabLogin.addEventListener('click', () => switchMode(true));
    tabSignup.addEventListener('click', () => switchMode(false));

    // Form Submissions
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        messageBox.textContent = "Processing details...";
        messageBox.className = "message-box";

        if (!supabase) {
            messageBox.textContent = "Configuration error: Connection failed.";
            messageBox.classList.add('error-msg');
            return;
        }

        if (isLoginMode) {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });

            if (error) {
                messageBox.textContent = error.message;
                messageBox.classList.add('error-msg');
            } else {
                messageBox.textContent = "Login Successful! Welcome back.";
                messageBox.classList.add('success-msg');
            }
        } else {
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                messageBox.textContent = error.message;
                messageBox.classList.add('error-msg');
            } else {
                messageBox.textContent = "Success! Account created.";
                messageBox.classList.add('success-msg');
            }
        }
    });
}