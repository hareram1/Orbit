// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const mainGoal = document.getElementById('main-goal');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote');
    const timerDisplay = document.getElementById('timer-display');
    const startTimerBtn = document.getElementById('start-timer');
    const pauseTimerBtn = document.getElementById('pause-timer');
    const resetTimerBtn = document.getElementById('reset-timer');
    const bankBalanceInput = document.getElementById('bank-balance');
    const balanceDisplay = document.getElementById('balance-display');
    const updateBalanceBtn = document.getElementById('update-balance');
    const priorityInput = document.getElementById('priority-input');
    const addPriorityBtn = document.getElementById('add-priority');
    const priorityList = document.getElementById('priority-list');
    const notes = document.getElementById('notes');
    const savingsProgress = document.getElementById('savings-progress');
    const savingsAmount = document.getElementById('savings-amount');

    // Timer variables
    let timerInterval;
    let timerTime = 25 * 60; // 25 minutes in seconds
    let isTimerRunning = false;

    // Motivational quotes
    const quotes = [
        {
            text: "The future belongs to those who believe in the beauty of their dreams.",
            author: "Eleanor Roosevelt"
        },
        {
            text: "Don't watch the clock; do what it does. Keep going.",
            author: "Sam Levenson"
        },
        {
            text: "The secret of getting ahead is getting started.",
            author: "Mark Twain"
        },
        {
            text: "Success is the sum of small efforts, repeated day in and day out.",
            author: "Robert Collier"
        },
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Your time is limited, don't waste it living someone else's life.",
            author: "Steve Jobs"
        },
        {
            text: "The harder you work for something, the greater you'll feel when you achieve it.",
            author: "Unknown"
        },
        {
            text: "Every master was once a beginner. Every pro was once an amateur.",
            author: "Robin Sharma"
        },
        {
            text: "The expert in anything was once a beginner.",
            author: "Helen Hayes"
        },
        {
            text: "Dream big and dare to fail.",
            author: "Norman Vaughan"
        }
    ];

    // Initialize the dashboard
    function initDashboard() {
        // Set a random quote
        setRandomQuote();
        
        // Set up timer display
        updateTimerDisplay();
        
        // Load saved data if available
        loadSavedData();
        
        // Set up event listeners
        setupEventListeners();
        
        // Add some sample priorities
        if (priorityList.children.length === 0) {
            addSamplePriorities();
        }
        
        // Timer presets
        document.querySelectorAll('.timer-preset').forEach(preset => {
            preset.addEventListener('click', function() {
                const minutes = parseInt(this.getAttribute('data-minutes'));
                setTimer(minutes);
            });
        });
    }

    // Set timer duration
    function setTimer(minutes) {
        pauseTimer();
        timerTime = minutes * 60;
        updateTimerDisplay();
    }

    // Set a random quote
    function setRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.textContent = quotes[randomIndex].text;
        quoteAuthor.textContent = `— ${quotes[randomIndex].author}`;
    }

    // Update timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timerTime / 60);
        const seconds = timerTime % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Start the timer
    function startTimer() {
        if (isTimerRunning) return;
        
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerTime--;
            updateTimerDisplay();
            
            if (timerTime <= 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                timerDisplay.style.color = '#ff9f1c';
                setTimeout(() => {
                    timerDisplay.style.color = '';
                    alert('Timer completed! Take a short break.');
                }, 100);
            }
        }, 1000);
    }

    // Pause the timer
    function pauseTimer() {
        clearInterval(timerInterval);
        isTimerRunning = false;
    }

    // Reset the timer
    function resetTimer() {
        clearInterval(timerInterval);
        isTimerRunning = false;
        timerTime = 25 * 60;
        updateTimerDisplay();
        timerDisplay.style.color = '';
    }

    // Update balance display
    function updateBalance() {
        const balance = bankBalanceInput.value;
        if (balance) {
            balanceDisplay.textContent = balance;
            saveData();
            
            // Update savings progress
            updateSavingsProgress();
        }
    }

    // Update savings progress
    function updateSavingsProgress() {
        // This is a simplified example - in a real app you'd have actual savings data
        const savings = 450; // Example value
        const goal = 1000;
        const percentage = (savings / goal) * 100;
        
        savingsProgress.style.width = `${percentage}%`;
        savingsAmount.textContent = `$${savings}`;
    }

    // Add new priority
    function addPriority() {
        const priorityText = priorityInput.value.trim();
        if (!priorityText) return;
        
        const priorityItem = document.createElement('li');
        priorityItem.className = 'priority-item';
        priorityItem.innerHTML = `
            <input type="checkbox">
            <span class="priority-text">${priorityText}</span>
            <button class="delete-priority"><i class="fas fa-trash"></i></button>
        `;
        
        // Add event listeners
        const checkbox = priorityItem.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            priorityItem.classList.toggle('completed', this.checked);
            saveData();
        });
        
        const deleteBtn = priorityItem.querySelector('.delete-priority');
        deleteBtn.addEventListener('click', function() {
            priorityItem.remove();
            saveData();
        });
        
        priorityList.appendChild(priorityItem);
        priorityInput.value = '';
        
        // Keep only top 3 priorities
        if (priorityList.children.length > 3) {
            priorityList.removeChild(priorityList.firstChild);
        }
        
        saveData();
    }

    // Add sample priorities
    function addSamplePriorities() {
        const samplePriorities = [
            "Complete JavaScript course module",
            "Work on portfolio project",
            "Research job opportunities"
        ];
        
        samplePriorities.forEach(priority => {
            const priorityItem = document.createElement('li');
            priorityItem.className = 'priority-item';
            priorityItem.innerHTML = `
                <input type="checkbox">
                <span class="priority-text">${priority}</span>
                <button class="delete-priority"><i class="fas fa-trash"></i></button>
            `;
            
            const checkbox = priorityItem.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                priorityItem.classList.toggle('completed', this.checked);
                saveData();
            });
            
            const deleteBtn = priorityItem.querySelector('.delete-priority');
            deleteBtn.addEventListener('click', function() {
                priorityItem.remove();
                saveData();
            });
            
            priorityList.appendChild(priorityItem);
        });
    }

    // Save data to localStorage
    function saveData() {
        const data = {
            goal: mainGoal.value,
            balance: bankBalanceInput.value,
            notes: notes.value,
            priorities: []
        };
        
        // Save priorities
        const priorityItems = priorityList.querySelectorAll('.priority-item');
        priorityItems.forEach(item => {
            const text = item.querySelector('.priority-text').textContent;
            const completed = item.classList.contains('completed');
            data.priorities.push({ text, completed });
        });
        
        localStorage.setItem('dashboardData', JSON.stringify(data));
    }

    // Load saved data
    function loadSavedData() {
        const savedData = localStorage.getItem('dashboardData');
        if (!savedData) return;
        
        const data = JSON.parse(savedData);
        
        if (data.goal) mainGoal.value = data.goal;
        if (data.balance) {
            bankBalanceInput.value = data.balance;
            balanceDisplay.textContent = data.balance;
        }
        if (data.notes) notes.value = data.notes;
        
        if (data.priorities && data.priorities.length > 0) {
            priorityList.innerHTML = '';
            data.priorities.forEach(priority => {
                const priorityItem = document.createElement('li');
                priorityItem.className = 'priority-item';
                if (priority.completed) priorityItem.classList.add('completed');
                priorityItem.innerHTML = `
                    <input type="checkbox" ${priority.completed ? 'checked' : ''}>
                    <span class="priority-text">${priority.text}</span>
                    <button class="delete-priority"><i class="fas fa-trash"></i></button>
                `;
                
                const checkbox = priorityItem.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', function() {
                    priorityItem.classList.toggle('completed', this.checked);
                    saveData();
                });
                
                const deleteBtn = priorityItem.querySelector('.delete-priority');
                deleteBtn.addEventListener('click', function() {
                    priorityItem.remove();
                    saveData();
                });
                
                priorityList.appendChild(priorityItem);
            });
        }
        
        // Update savings progress on load
        updateSavingsProgress();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Goal
        mainGoal.addEventListener('input', saveData);
        
        // Quotes
        newQuoteBtn.addEventListener('click', setRandomQuote);
        
        // Timer
        startTimerBtn.addEventListener('click', startTimer);
        pauseTimerBtn.addEventListener('click', pauseTimer);
        resetTimerBtn.addEventListener('click', resetTimer);
        
        // Balance
        updateBalanceBtn.addEventListener('click', updateBalance);
        bankBalanceInput.addEventListener('input', saveData);
        
        // Priorities
        addPriorityBtn.addEventListener('click', addPriority);
        priorityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addPriority();
        });
        
        // Notes
        notes.addEventListener('input', saveData);
        
        // Auto-save every 10 seconds
        setInterval(saveData, 10000);
    }

    // Initialize the dashboard when the page loads
    initDashboard();
});