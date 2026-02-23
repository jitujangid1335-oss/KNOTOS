// js/main.js
const supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
let userEmail;

function toggleView(h, s) { 
    document.getElementById(h).classList.add('hidden'); 
    document.getElementById(s).classList.remove('hidden'); 
}

function handleInitialContinue() {
    userEmail = document.getElementById('main-email').value;
    if(userEmail === 'admin') {
        toggleView('screen-start', 'screen-otp');
        document.getElementById('otp-status').innerText = 'DEBUG MODE: Use 123';
    } else {
        alert('Use admin for testing!');
    }
}

function verifyOTP() {
    if(document.getElementById('otp-input').value === '123') toggleView('screen-otp', 'screen-setup');
    else alert('Wrong OTP (123)');
}

async function createKnotAccount() {
    const kid = 'lovebee-' + Math.floor(1000 + Math.random() * 9000);
    const pass = document.getElementById('reg-pass').value;
    const names = document.getElementById('user-name').value + ' & ' + document.getElementById('partner-name').value;

    // SIMPLIFIED INSERT: Removed dates to stop the NetworkError/Validation errors
    const { error } = await supabaseClient.from('users').insert([{ 
        knot_id: kid, 
        email: userEmail, 
        password: pass, 
        partner_names: names
        // official_date and secret_date are omitted for now
    }]);

    if(error) {
        console.error("Supabase Error:", error);
        alert('Database Error: ' + error.message);
    } else {
        document.getElementById('final-id').innerText = kid;
        toggleView('screen-setup', 'screen-bees');
    }
}