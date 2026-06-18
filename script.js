const SUPABASE_URL = "https://souhlsvdolmbknmxwoop.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_xByuKUqc2D5oWjwzL7tK1A_Q1bHvx3l";

const supabase = typeof createClient !== 'undefined' ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// 2. Auth Page Interaction Flow Block
if (document.getElementById('auth-form')) {
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const submitBtn = document.getElementById('submit-btn');
    const switchAuthLink = document.getElementById('switch-auth');
    const messageBox = document.getElementById('message-box');

    let isLoginMode = true;

    // Toggle layouts when user clicks Sign Up / Log In switch
    switchAuthLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        messageBox.textContent = "";

        if (isLoginMode) {
            authTitle.textContent = "Welcome Back";
            authSubtitle.textContent = "Log in to manage your events and workshops.";
            submitBtn.textContent = "Log In";
            switchAuthLink.textContent = "Sign Up";
            document.getElementById('toggle-text').firstChild.textContent = "Don't have an account? ";
        } else {
            authTitle.textContent = "Create Account";
            authSubtitle.textContent = "Join Still Rooted to begin sharing community wisdom.";
            submitBtn.textContent = "Create Account";
            switchAuthLink.textContent = "Log In";
            document.getElementById('toggle-text').firstChild.textContent = "Already have an account? ";
        }
    });

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