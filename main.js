// main.js

// --- Dashboard logic for your web app ---

function initDashboard() {
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

  // Timer variables
  let timerInterval;
  let timerTime = 25 * 60; // 25 minutes in seconds
  let isTimerRunning = false;

  // Motivational quotes
  const quotes = [

{
  text: "कड़ी मेहनत का कोई विकल्प नहीं होता।",
  author: "अज्ञात"
},
{
  text: "अगर आप अपने बीते हुए कल की पढ़ाई से संतुष्ट नहीं हैं तो आज इतना पढ़िए कि आने वाला कल आप ज़रूर संतुष्ट रहें।",
  author: "हरेराम"
},
{
  text: "क्या आप आज उतनी मेहनत कर रहे हो जितनी करने का कल सोचा था?",
  author: "हरेराम"
},
{
  text: "सपने वो नहीं जो हम सोते वक्त देखते हैं, सपने वो हैं जो हमें सोने नहीं देते।",
  author: "डॉ. ए.पी.जे. अब्दुल कलाम"
},
{
  text: "सफलता हमेशा कठिन परिश्रम से मिलती है।",
  author: "स्वामी विवेकानंद"
},
{
  text: "जिसे जीतना हो उसे संघर्ष करना ही पड़ता है।",
  author: "अज्ञात"
},
{
  text: "एक समय में एक काम करो, और ऐसा करते समय अपनी पूरी आत्मा उसमें डाल दो।",
  author: "स्वामी विवेकानंद"
},
{
  text: "परिश्रम ही सफलता की कुंजी है।",
  author: "महात्मा गांधी"
},
{
  text: "जो व्यक्ति अपने लक्ष्य के लिए जी-जान से मेहनत करता है, वही विजेता होता है।",
  author: "अज्ञात"
},
{
  text: "अगर मेहनत आदत बन जाए तो कामयाबी मुकद्दर बन जाती है।",
  author: "अज्ञात"
},
{
  text: "जो पढ़ाई आज आपको मुश्किल लग रही है, वही कल आपकी सबसे बड़ी ताकत बनेगी।",
  author: "अज्ञात"
},
{
  text: "सपनों को हकीकत में बदलने से पहले आपको सपनों का पीछा करना होगा।",
  author: "अज्ञात"
},
{
  text: "तुम्हारा सबसे बड़ा शिक्षक तुम्हारी आखिरी गलती होती है।",
  author: "अज्ञात"
},
{
  text: "समय का सही उपयोग ही सफलता की सीढ़ी है।",
  author: "अज्ञात"
},
{
  text: "छात्र की सबसे बड़ी शक्ति उसकी एकाग्रता है।",
  author: "अज्ञात"
},
{
  text: "जो आज पढ़ाई में समय नहीं देते, कल उन्हें पछतावे में समय देना पड़ता है।",
  author: "अज्ञात"
},
{
  text: "एक सफल छात्र वही होता है जो असफलताओं से सीखता है।",
  author: "अज्ञात"
},
{
  text: "कामयाबी एक दिन में नहीं मिलती, लेकिन एक दिन जरूर मिलती है।",
  author: "अज्ञात"
},
{
  text: "जब तक आप खुद पर विश्वास नहीं करते, तब तक आप भगवान पर भी विश्वास नहीं कर सकते।",
  author: "स्वामी विवेकानंद"
},
{
  text: "जिस चीज़ में आपका मन नहीं लगता, वही चीज़ एक दिन आपका भाग्य तय करेगी।",
  author: "अज्ञात"
},
{
  text: "अगर इरादे बुलंद हों, तो रास्ते खुद बन जाते हैं।",
  author: "अज्ञात"
},
{
  text: "हर कठिनाई आपको कुछ न कुछ सिखाने आती है।",
  author: "अज्ञात"
},
{
  text: "जिन्हें अपने काम से प्यार होता है, उन्हें कभी काम नहीं करना पड़ता।",
  author: "कन्फ्यूशियस"
},
{
  text: "रातों की नींद छोड़नी पड़ती है, तभी सपने हकीकत बनते हैं।",
  author: "अज्ञात"
},
{
  text: "असफलता सिर्फ यह सिद्ध करती है कि सफलता का प्रयास पूरे मन से नहीं हुआ।",
  author: "अज्ञात"
},
{
  text: "हर दिन एक नई शुरुआत है, मेहनत करते रहो।",
  author: "अज्ञात"
}
  ];

  // Set a random quote
  function setRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex].text;
    quoteAuthor.textContent = `— ${quotes[randomIndex].author}`;
  }

  // Timer display
  function updateTimerDisplay() {
    const minutes = Math.floor(timerTime / 60);
    const seconds = timerTime % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  }

  // Timer logic
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

  function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerTime = 25 * 60;
    updateTimerDisplay();
    timerDisplay.style.color = '';
  }

  function setTimer(minutes) {
    pauseTimer();
    timerTime = minutes * 60;
    updateTimerDisplay();
  }

  // Timer presets
  document.querySelectorAll('.timer-preset').forEach(preset => {
    preset.addEventListener('click', function () {
      const minutes = parseInt(this.getAttribute('data-minutes'));
      setTimer(minutes);
    });
  });

  // Update balance display
  function updateBalance() {
    const balance = bankBalanceInput.value;
    if (balance) {
      balanceDisplay.textContent = balance;
      saveData();
    }
  }

  // Add a new priority
  function addPriority() {
    const priorityTextValue = priorityInput.value.trim();
    if (!priorityTextValue) return;
    const priorityItem = document.createElement('li');
    priorityItem.className = 'priority-item';
    priorityItem.innerHTML = `
      <input type="checkbox" />
      <span class="priority-text">${priorityTextValue}</span>
      <button class="delete-priority" title="Delete">&#128465;</button>
    `;

    const checkbox = priorityItem.querySelector('input[type="checkbox"]');
    const deleteBtn = priorityItem.querySelector('.delete-priority');

    checkbox.addEventListener('change', function () {
      priorityItem.classList.toggle('completed', this.checked);
      saveData();
    });
    deleteBtn.addEventListener('click', function () {
      priorityItem.remove();
      saveData();
    });

    priorityList.appendChild(priorityItem);
    priorityInput.value = '';
    if (priorityList.children.length > 3) {
      priorityList.removeChild(priorityList.firstChild);
    }
    saveData();
  }

  // Add sample priorities
  function addSamplePriorities() {
    const samplePriorities = [
      "Add Your Priority Here"
    ];
    samplePriorities.forEach(priority => {
      const priorityItem = document.createElement('li');
      priorityItem.className = 'priority-item';
      priorityItem.innerHTML = `
        <input type="checkbox" />
        <span class="priority-text">${priority}</span>
        <button class="delete-priority" title="Delete">&#128465;</button>
      `;
      const checkbox = priorityItem.querySelector('input[type="checkbox"]');
      const deleteBtn = priorityItem.querySelector('.delete-priority');
      checkbox.addEventListener('change', function () {
        priorityItem.classList.toggle('completed', this.checked);
        saveData();
      });
      deleteBtn.addEventListener('click', function () {
        priorityItem.remove();
        saveData();
      });
      priorityList.appendChild(priorityItem);
    });
  }

  // Save to localStorage
  function saveData() {
    const data = {
      goal: mainGoal.value,
      balance: bankBalanceInput.value,
      notes: notes.value,
      priorities: []
    };
    priorityList.querySelectorAll('.priority-item').forEach(item => {
      const text = item.querySelector('.priority-text').textContent;
      const completed = item.classList.contains('completed');
      data.priorities.push({ text, completed });
    });
    localStorage.setItem('dashboardData', JSON.stringify(data));
  }

  // Load from localStorage
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
          <input type="checkbox" ${priority.completed ? 'checked' : ''}/>
          <span class="priority-text">${priority.text}</span>
          <button class="delete-priority" title="Delete">&#128465;</button>
        `;
        const checkbox = priorityItem.querySelector('input[type="checkbox"]');
        const deleteBtn = priorityItem.querySelector('.delete-priority');
        checkbox.addEventListener('change', function () {
          priorityItem.classList.toggle('completed', this.checked);
          saveData();
        });
        deleteBtn.addEventListener('click', function () {
          priorityItem.remove();
          saveData();
        });
        priorityList.appendChild(priorityItem);
      });
    }
  }

  // Event listeners
  function setupEventListeners() {
    // Goal
    mainGoal.addEventListener('input', saveData);

    // Quotes
    if (newQuoteBtn) newQuoteBtn.addEventListener('click', setRandomQuote);

    // Timer
    if (startTimerBtn) startTimerBtn.addEventListener('click', startTimer);
    if (pauseTimerBtn) pauseTimerBtn.addEventListener('click', pauseTimer);
    if (resetTimerBtn) resetTimerBtn.addEventListener('click', resetTimer);

    // Balance
    if (updateBalanceBtn) updateBalanceBtn.addEventListener('click', updateBalance);
    if (bankBalanceInput) bankBalanceInput.addEventListener('input', saveData);

    // Priorities
    if (addPriorityBtn) addPriorityBtn.addEventListener('click', addPriority);
    if (priorityInput) priorityInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') addPriority();
    });

    // Notes
    if (notes) notes.addEventListener('input', saveData);

    // Auto-save every 10 seconds
    setInterval(saveData, 10000);
  }

  // Initialize dashboard
  setRandomQuote();
  updateTimerDisplay();
  loadSavedData();
  setupEventListeners();
  if (priorityList.children.length === 0) {
    addSamplePriorities();
  }
}

// --------- Ensure Dashboard is ALWAYS initialized correctly -----------

function onReady() {
  if (!window.dashboardInitialized) {
    initDashboard();
    window.dashboardInitialized = true;
  }
}

document.addEventListener('DOMContentLoaded', onReady);

// Handle back/forward navigation and browser bfcache
window.addEventListener('pageshow', function (event) {
  if (event.persisted) {
    window.dashboardInitialized = false; // Allow re-init
    onReady();
  }
});
