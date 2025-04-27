function toggleLogin() {
    const dropdown = document.querySelector('.login-dropdown');
    
    if (!dropdown) {
        createLoginDropdown();
    } else {
        dropdown.classList.toggle('active');
    }
    
    document.addEventListener('click', function(event) {
        const isClickInside = event.target.closest('.user-account') || 
                             event.target.closest('.login-dropdown');
        
        if (!isClickInside) {
            const dropdown = document.querySelector('.login-dropdown');
            if (dropdown) dropdown.classList.remove('active');
        }
    });
}

function createLoginDropdown() {
    const dropdownHTML = `
        <div class="login-dropdown">
            <h3>Sign in</h3>
            <input type="text" placeholder="Email or phone number">
            <input type="password" placeholder="password">
            <button>sign in</button>
            <p>don't have an account <a href="#">Sign up</a></p>
        </div>
    `;
    
    const header = document.querySelector('.main-header');
    header.insertAdjacentHTML('beforeend', dropdownHTML);
}
