class AppShell extends HTMLElement {
  constructor() {
    super();
    this.navConfig = null;
  }

  async connectedCallback() {
    await this.loadConfig();
    this.render();
    this.initLucide();
    this.attachEvents();
  }

  async loadConfig() {
    // Default Config (Fallback)
    const defaultConfig = {
      "gnb": [
        { "id": "home", "label": "홈", "link": "dashboard.html", "active": true },
        { "id": "hr", "label": "인사", "link": "#" },
        { "id": "asset", "label": "자산", "link": "#" },
        { "id": "accounting", "label": "회계", "link": "#" },
        { "id": "supplies", "label": "소모품", "link": "#" }
      ],
      "lnb": {
        "title": "Menu",
        "items": [
          { "id": "dashboard", "label": "전체 현황", "icon": "layout-dashboard", "link": "dashboard.html" },
          { "id": "dept", "label": "부서별 조회", "icon": "users", "link": "department_employee_inquiry.html" },
          { "id": "mail", "label": "메일함", "icon": "mail", "link": "#" }
        ],
        "notice": {
          "title": "시스템 공지",
          "content": "서버 점검 안내",
          "link": "#"
        }
      }
    };

    try {
      // Try relative path first (for pages/ folder)
      const response = await fetch('../config/nav.json');
      if (!response.ok) throw new Error('Network response was not ok');
      this.navConfig = await response.json();
    } catch (error) {
      console.warn('Failed to load nav config, using default:', error);
      this.navConfig = defaultConfig;
    }
  }

  initLucide() {
    if (window.lucide) {
      window.lucide.createIcons({ root: this });
    }
  }

  attachEvents() {
    // 1. GNB Search Toggle
    const searchBtn = this.querySelector('#btn-gnb-search');
    const searchContainer = this.querySelector('#gnb-search-container');
    const searchInput = this.querySelector('#gnb-search-input');

    if (searchBtn && searchContainer && searchInput) {
      searchBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (searchContainer.classList.contains('w-10')) {
          searchContainer.classList.remove('w-10');
          searchContainer.classList.add('gnb-search-expand');
          searchInput.classList.add('gnb-search-input-show');
          searchInput.focus();
        } else {
          searchContainer.classList.add('w-10');
          searchContainer.classList.remove('gnb-search-expand');
          searchInput.classList.remove('gnb-search-input-show');
        }
      });

      searchInput.addEventListener('click', (e) => e.stopPropagation());
    }

    // 2. Notifications Toggle
    const notiBtn = this.querySelector('#btn-gnb-noti');
    const notiDropdown = this.querySelector('#gnb-noti-dropdown');
    if (notiBtn && notiDropdown) {
      notiBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notiDropdown.classList.toggle('hidden');
        // Close others
        this.querySelector('#gnb-profile-dropdown')?.classList.add('hidden');
      });
    }

    // 3. Profile Toggle
    const profileBtn = this.querySelector('#btn-gnb-profile');
    const profileDropdown = this.querySelector('#gnb-profile-dropdown');
    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('hidden');
        // Close others
        this.querySelector('#gnb-noti-dropdown')?.classList.add('hidden');
      });
      this.querySelector('#gnb-profile-dropdown').addEventListener('click', (e) => e.stopPropagation());
    }

    // Global Click to close
    document.addEventListener('click', () => {
      if (searchContainer && !searchContainer.classList.contains('w-10') && searchInput.value === '') {
        searchContainer.classList.add('w-10');
        searchContainer.classList.remove('gnb-search-expand');
        searchInput.classList.remove('gnb-search-input-show');
      }
      if (notiDropdown) notiDropdown.classList.add('hidden');
      if (profileDropdown) profileDropdown.classList.add('hidden');
    });
  }

  render() {
    if (!this.navConfig) return;

    const { gnb, lnb } = this.navConfig;
    const hideLnb = this.hasAttribute('hide-lnb');
    const hideGnb = this.hasAttribute('hide-gnb');
    const isFullScreen = this.hasAttribute('full-screen');

    // Conditional classes for layout
    const containerClasses = isFullScreen
      ? 'flex flex-1 overflow-hidden p-0 gap-0 bg-transparent'
      : 'app-container';

    const mainClasses = isFullScreen
      ? 'flex flex-1 overflow-hidden relative flex-col' // No Border, No Shadow, No BG
      : 'app-main';

    const scrollClasses = isFullScreen
      ? 'flex-1 overflow-y-auto custom-scrollbar p-0'
      : 'app-content-scroll custom-scrollbar';


    const activeGnbId = this.getAttribute('active-gnb');
    const activeLnbId = this.getAttribute('active-lnb');

    // Override Active State if attributes are present
    if (activeGnbId) {
      gnb.forEach(item => item.active = (item.id === activeGnbId));
    }
    if (activeLnbId) {
      // Reset all LNB active first
      lnb.items.forEach(item => {
        // Simple equality check
        if (item.id === activeLnbId) {
          // Update item style reference by adding a flag we use in template
          item._forceActive = true;
        } else {
          item._forceActive = false;
        }
      });
    }

    // HTML Structure aligned completely with Design System 1.1ver
    this.innerHTML = `
      ${!hideGnb ? `
      <header class="app-header">
        <div class="flex items-center gap-12">
          <!-- Logo -->
          <div class="flex items-center gap-3 group cursor-pointer" onclick="window.location.href='/index.html'">
            <div class="w-10 h-10 relative flex items-center justify-center">
              <div class="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black">S</div>
            </div>
            <div class="flex flex-col">
              <span class="font-black text-xl tracking-tight text-[#00479d] leading-none">성원애드피아</span>
              <span class="font-bold text-xs tracking-widest text-gray-400 uppercase">Groupware</span>
            </div>
          </div>
          
          <!-- Top Nav -->
          <nav class="hidden xl:flex items-center gap-2">
            ${gnb.map(item => `
              <a href="${item.link}" class="px-5 py-2.5 text-sm ${item.active ? 'font-bold text-white bg-primary shadow-md shadow-blue-900/10' : 'font-medium text-gray-500 hover:text-primary hover:bg-blue-50'} rounded-full transition-colors">
                ${item.label}
              </a>
            `).join('')}
          </nav>
        </div>
        
        <!-- Right Icons -->
        <div class="flex items-center gap-4 relative">
             <!-- 1. Search (Expandable) -->
             <div id="gnb-search-container" class="relative flex items-center justify-end w-10 transition-all duration-300 ease-in-out">
                <input id="gnb-search-input" type="text" placeholder="검색어를 입력하세요..." class="absolute right-0 w-full h-full pl-4 pr-12 bg-blue-50/50 border border-transparent focus:border-primary rounded-full text-sm opacity-0 pointer-events-none transition-opacity duration-300 focus:outline-none">
                <button id="btn-gnb-search" class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-primary relative z-10 hover:bg-blue-100 transition-colors">
                    <i data-lucide="search" class="w-5 h-5"></i>
                </button>
             </div>

             <!-- 2. Notification -->
             <div class="relative">
                <button id="btn-gnb-noti" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50 text-gray-400 hover:text-primary transition-colors relative">
                    <i data-lucide="bell" class="w-5 h-5"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
                </button>
                <div id="gnb-noti-dropdown" class="absolute top-full right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hidden dropdown-enter z-50">
                    <div class="p-4 border-b border-gray-50 flex justify-between items-center"><span class="font-bold text-sm">알림</span><button class="text-xs text-primary font-medium">모두 읽음</button></div>
                    <div class="max-h-64 overflow-y-auto custom-scrollbar">
                        <div class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
                            <p class="text-xs text-gray-400 mb-1">전자결재 • 방금 전</p>
                            <p class="text-sm font-bold text-gray-800">휴가 신청서가 승인되었습니다.</p>
                        </div>
                    </div>
                </div>
             </div>
             
             <!-- 3. Profile -->
             <div class="relative">
                <div id="btn-gnb-profile" class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:border-primary transition-colors">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SungwonAdmin" alt="User" class="w-full h-full object-cover" />
                </div>
                <div id="gnb-profile-dropdown" class="absolute top-full right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hidden dropdown-enter z-50">
                    <div class="p-4 border-b border-gray-50 text-center"><div class="font-bold text-gray-900">김성원 (Admin)</div><div class="text-xs text-gray-500">경영지원본부 / 팀장</div></div>
                    <div class="p-2">
                        <button class="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-primary rounded-xl transition-colors flex items-center gap-2"><i data-lucide="user-cog" class="w-4 h-4"></i> 내 정보 수정</button>
                        <button class="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"><i data-lucide="log-out" class="w-4 h-4"></i> 로그아웃</button>
                    </div>
                </div>
             </div>
        </div>
      </header>
      ` : ''}

      <div class="${containerClasses}">
        <!-- Sidebar (LNB) -->
        ${!hideLnb ? `
        <aside class="app-sidebar group">
           <!-- Hover Indicator Line -->
           <div class="absolute right-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-transparent transition-colors flex flex-col justify-center items-center">
                <div class="w-0.5 h-8 bg-gray-200 rounded-full group-hover:opacity-0 transition-opacity"></div>
           </div>

           <!-- Expandable Content -->
           <div class="px-0 w-64 transition-all opacity-0 group-hover:opacity-100 group-hover:delay-75 flex flex-col h-full">
              <div class="px-6 mb-6">
                <h2 class="text-[11px] font-extrabold text-[#00479d] uppercase tracking-widest mb-4 opacity-50">${lnb.title}</h2>
                <nav class="space-y-1">
                  ${lnb.items.map(item => `
                    <a href="${item.link}" class="block px-4 py-3 rounded-xl ${(item._forceActive || item.id === 'dashboard' && !activeLnbId) ? 'bg-blue-50 text-primary font-bold shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-primary font-medium'} text-sm flex items-center gap-2 transition-colors">
                      <i data-lucide="${item.icon}" class="w-4 h-4"></i> ${item.label}
                    </a>
                  `).join('')}
                </nav>
              </div>
              
              <div class="px-6 mt-auto">
                <div class="p-5 bg-[#00479d] rounded-2xl text-white relative overflow-hidden">
                   <div class="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full"></div>
                   <h3 class="font-bold text-sm mb-1 relative z-10">${lnb.notice.title}</h3>
                   <p class="text-xs text-blue-100 mb-3 relative z-10 opacity-80">${lnb.notice.content}</p>
                   <button class="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-colors">확인하기</button>
                </div>
              </div>
           </div>
           
           <!-- Collapsed State (Visible when not hovered) -->
           <div class="absolute left-0 top-0 w-12 h-full flex flex-col items-center pt-8 group-hover:opacity-0 transition-opacity duration-200 pointer-events-none">
              <div class="writing-mode-vertical text-[10px] font-bold text-gray-300 tracking-widest rotate-180 uppercase">Menu</div>
              <div class="mt-4 flex flex-col gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              </div>
           </div>
        </aside>
        ` : ''}

        <main class="${mainClasses}">
          ${this.hasAttribute('show-header') ? `
          <div class="p-6 border-b border-gray-50 flex items-center justify-between bg-white z-10">
             <h1 class="text-2xl font-bold text-gray-900">${pageTitle}</h1>
             <div class="text-xs text-gray-400 font-bold">Path / To / Current</div>
          </div>
          ` : ''}
          <div class="${scrollClasses}">
             <!-- Slot for content -->
             ${this.innerHTML} 
          </div>
        </main>
      </div>
    `;
  }
}

customElements.define('app-shell', AppShell);
