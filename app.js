// ==================== Theme Toggle ====================
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const btn = document.querySelector('.theme-toggle');
    if (current === 'dark') {
        html.removeAttribute('data-theme');
        btn.innerHTML = '&#x1F313; 暗色模式';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        btn.innerHTML = '&#x2600;&#xFE0F; 亮色模式';
        localStorage.setItem('theme', 'dark');
    }
}
(function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') toggleTheme();
})();

// ==================== Inline Error Helper ====================
function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) { el.textContent = msg; el.classList.add('show'); }
}
function hideError(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('show');
}

// ==================== Navigation + Hash Routing ====================
const toolMeta = {
    age: { title: '年龄计算器 - 在线工具箱', desc: '精确计算周岁、虚岁、月龄和总天数，免费的在线年龄计算器。' },
    mortgage: { title: '房贷计算器 - 在线工具箱', desc: '计算等额本息和等额本金月供及总利息，免费房贷计算器。' },
    unit: { title: '单位换算 - 在线工具箱', desc: '长度、重量、温度单位互相换算，免费在线单位换算工具。' },
    qr: { title: '二维码生成器 - 在线工具箱', desc: '在线生成二维码图片，支持文本、网址转二维码，可下载。' },
    password: { title: '密码生成器 - 在线工具箱', desc: '生成安全随机密码，自定义长度和字符类型，本地生成不上传。' },
    wordcount: { title: '字数统计 - 在线工具箱', desc: '实时统计中英文字符数、单词数、行数，免费在线字数统计工具。' },
    bmi: { title: 'BMI计算器 - 在线工具箱', desc: '计算身体质量指数BMI，评估体重是否在健康范围。' },
    timestamp: { title: '时间戳转换 - 在线工具箱', desc: 'Unix时间戳与日期互转，支持秒级和毫秒级时间戳。' },
    color: { title: '颜色转换 - 在线工具箱', desc: 'HEX、RGB、HSL颜色格式互相转换，实时预览。' },
    case: { title: '大小写转换 - 在线工具箱', desc: '英文文本大小写转换，支持全大写、全小写、首字母大写。' },
    invest: { title: '投资收益计算器 - 在线工具箱', desc: '复利和定投收益计算器，模拟投资收益和年化收益率。' },
    sidejob: { title: '副业收入计算器 - 在线工具箱', desc: '自由职业报价计算器，计算时薪、日报价和月收入预期。' },
    savings: { title: '存款利息计算器 - 在线工具箱', desc: '银行定期存款到期利息计算，支持活期、定期和大额存单。' },
    json: { title: 'JSON格式化 - 在线工具箱', desc: 'JSON数据美化、压缩、校验工具，支持错误定位。' },
    base64: { title: 'Base64编解码 - 在线工具箱', desc: 'Base64编码与解码工具，支持UTF-8中文。' },
    urlencoder: { title: 'URL编解码 - 在线工具箱', desc: 'URL百分号编码与解码工具，支持中文。' },
    md5: { title: 'MD5哈希计算 - 在线工具箱', desc: '计算文本的MD5、SHA-1、SHA-256哈希值。' },
    uuid: { title: 'UUID生成器 - 在线工具箱', desc: '生成UUID/GUID v4随机唯一标识符，支持批量生成。' },
    baseconvert: { title: '进制转换 - 在线工具箱', desc: '二进制、八进制、十进制、十六进制互相转换。' },
    textdedup: { title: '文本去重 - 在线工具箱', desc: '删除文本中的重复行和空行，支持排序和大小写忽略。' },
    textdiff: { title: '文本对比 - 在线工具箱', desc: '逐行对比两段文本的差异，标记新增、删除和修改行。' },
    regex: { title: '正则表达式测试 - 在线工具箱', desc: '在线测试正则表达式，实时显示匹配结果，支持全局/忽略大小写/多行模式。' },
    cssmin: { title: 'CSS压缩 - 在线工具箱', desc: '压缩CSS代码，去除注释和多余空格，减小文件体积。' },
    lorem: { title: '随机文本生成器 - 在线工具箱', desc: '生成Lorem Ipsum风格随机占位文本，用于设计排版填充。' },
    httpcode: { title: 'HTTP状态码查询 - 在线工具箱', desc: '查询HTTP状态码的含义和用途，200/301/404/500等全状态码。' },
    jwt: { title: 'JWT解码器 - 在线工具箱', desc: '在线解码JWT令牌的Header和Payload，查看JSON数据，不验证签名，本地处理不上传。' },
    cron: { title: 'Cron表达式生成器 - 在线工具箱', desc: '可视化生成Cron定时任务表达式，支持常用预设和自定义，五段式Cron。' },
    htmlencode: { title: 'HTML编解码 - 在线工具箱', desc: 'HTML特殊字符实体编码与解码，支持&amp;lt;&gt;&quot;等字符。' },
    ipquery: { title: 'IP地址查询 - 在线工具箱', desc: '查询IP地址类别、私有/公有、子网掩码计算、CIDR分析和可用主机数。' },
    jsmin: { title: 'JS压缩 - 在线工具箱', desc: '在线压缩JavaScript代码，移除注释和多余空格，减小JS文件体积。' },
    caseconvert: { title: '命名格式转换 - 在线工具箱', desc: '驼峰/下划线/帕斯卡/短横线/常量命名风格互相转换，camelCase snake_case PascalCase kebab-case。' },
    charcount: { title: '字符字节统计 - 在线工具箱', desc: '统计文本字符数、UTF-8字节数、中文字符数、英文字母数和行数。' },
    random: { title: '随机数生成器 - 在线工具箱', desc: '在线随机数生成器，支持指定范围、批量生成、不重复模式和抽奖抽号。' },
    datediff: { title: '天数计算器 - 在线工具箱', desc: '计算两个日期之间的天数差，支持工作日计算，免费在线天数计算工具。' },
    percent: { title: '百分比计算器 - 在线工具箱', desc: '百分比计算器，求百分比、增长率计算、折扣价格计算，三种模式。' },
    img2base64: { title: '图片转Base64 - 在线工具箱', desc: '将图片转换为Base64编码字符串和Data URI，支持PNG/JPG/GIF/WebP格式。' },
    morse: { title: '摩斯电码转换 - 在线工具箱', desc: '文本与摩斯电码互相转换，支持中英文和数字，在线摩斯密码翻译工具。' },
    calculator: { title: '科学计算器 - 在线工具箱', desc: '在线科学计算器，支持加减乘除、三角函数、对数、幂运算等数学计算。' }
};

let tsTimerId = null;
let currentCategory = 'all';

// ==================== Category Filter ====================
function filterCategory(cat, el) {
    currentCategory = cat;
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    if (el) el.classList.add('active');
    // Clear search when switching category
    document.getElementById('searchInput').value = '';
    document.querySelectorAll('.tool-card').forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    document.getElementById('searchEmpty').classList.remove('show');
}

// ==================== Recently Used ====================
function addToRecent(name) {
    let recent = JSON.parse(localStorage.getItem('recentTools') || '[]');
    recent = recent.filter(n => n !== name);
    recent.unshift(name);
    recent = recent.slice(0, 6);
    localStorage.setItem('recentTools', JSON.stringify(recent));
    renderRecent();
}

function renderRecent() {
    const recent = JSON.parse(localStorage.getItem('recentTools') || '[]');
    const bar = document.getElementById('recentBar');
    if (recent.length === 0) { bar.classList.remove('show'); return; }
    bar.classList.add('show');
    // Clear except label
    const label = bar.querySelector('.recent-label');
    bar.innerHTML = '';
    bar.appendChild(label);
    recent.forEach(name => {
        const meta = toolMeta[name];
        if (!meta) return;
        const chip = document.createElement('span');
        chip.className = 'recent-chip';
        chip.textContent = meta.title.split(' - ')[0];
        chip.onclick = () => showTool(name);
        bar.appendChild(chip);
    });
}

function showTool(name) {
    document.querySelectorAll('.tool-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById('tool-' + name);
    if (!section) return;
    section.classList.add('active');
    document.getElementById('toolGrid').style.display = 'none';
    document.querySelector('.ad-slot').style.display = 'none';
    document.getElementById('categoryBar').style.display = 'none';
    document.getElementById('recentBar').classList.remove('show');
    document.getElementById('faqSection').style.display = 'block';
    document.getElementById('breadcrumb').classList.add('show');
    // Update breadcrumb
    const meta = toolMeta[name];
    if (meta) document.getElementById('breadcrumbTool').textContent = meta.title.split(' - ')[0];
    // Update BreadcrumbList structured data
    const bcJsonLd = document.getElementById('breadcrumbJsonLd');
    if (bcJsonLd && meta) {
        bcJsonLd.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type":"ListItem","position":1,"name":"首页","item":"https://www.toolhub.asia/"},
                {"@type":"ListItem","position":2,"name":meta.title.split(' - ')[0],"item":"https://www.toolhub.asia/#"+name}
            ]
        });
    }
    if (location.hash !== '#' + name) {
        history.pushState({ tool: name }, '', '#' + name);
    }
    // Update meta tags dynamically
    if (meta) {
        document.title = meta.title;
        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) descTag.setAttribute('content', meta.desc);
        // Dynamic OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', meta.title);
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', meta.desc);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Start timestamp timer only when timestamp tool is active
    if (name === 'timestamp') startTsTimer();
    else stopTsTimer();
    // Track recently used
    addToRecent(name);
}

function showGrid() {
    document.querySelectorAll('.tool-section').forEach(s => s.classList.remove('active'));
    document.getElementById('toolGrid').style.display = '';
    document.querySelector('.ad-slot').style.display = '';
    document.getElementById('categoryBar').style.display = '';
    document.getElementById('faqSection').style.display = 'none';
    document.getElementById('breadcrumb').classList.remove('show');
    renderRecent();
    if (location.hash) history.pushState({ tool: 'home' }, '', location.pathname);
            document.title = '在线工具箱 - 50+免费实用工具合集 | ToolHub';
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', '免费在线工具箱，提供JSON格式化、Base64编解码、MD5哈希、UUID生成、投资收益计算器、房贷计算器、二维码生成、密码生成等20+实用工具，全部本地运行，数据不上传，打开即用。');
    stopTsTimer();
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Handle browser back/forward
window.addEventListener('popstate', function(e) {
    const hash = location.hash.substring(1);
    if (hash && document.getElementById('tool-' + hash)) {
        showTool(hash);
    } else {
        showGrid();
    }
});

// Handle direct URL access with hash
window.addEventListener('DOMContentLoaded', function() {
    renderRecent();
    const hash = location.hash.substring(1);
    if (hash && document.getElementById('tool-' + hash)) {
        showTool(hash);
    }
});

let searchTimeout;
let searchCache = {};

function filterTools() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        _doFilterTools();
    }, 150);
}

function _doFilterTools() {
    const q = document.getElementById('searchInput').value.toLowerCase().trim();
    let visibleCount = 0;
    
    // Build enhanced search index if not cached
    if (!searchCache.enhanced) {
        document.querySelectorAll('.tool-card').forEach(card => {
            const name = card.getAttribute('data-name') || '';
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
            const desc = card.querySelector('p') ? card.querySelector('p').textContent : '';
            card.setAttribute('data-search', (name + ' ' + title + ' ' + desc).toLowerCase());
        });
        searchCache.enhanced = true;
    }
    
    document.querySelectorAll('.tool-card').forEach(card => {
        const searchText = card.getAttribute('data-search') || '';
        const matchesSearch = !q || searchText.includes(q);
        const matchesCategory = currentCategory === 'all' || card.getAttribute('data-category') === currentCategory;
        if (matchesSearch && matchesCategory) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide empty state with suggestions
    const emptyEl = document.getElementById('searchEmpty');
    if (visibleCount === 0 && q) {
        emptyEl.innerHTML = '<div class="empty-icon">&#x1F50D;</div><p>未找到 "' + q + '" 相关工具</p><p style="margin-top:8px;font-size:0.85rem;">试试搜索：JSON、房贷、二维码、密码、投资</p>';
        emptyEl.classList.add('show');
    } else {
        emptyEl.classList.remove('show');
    }
    
    // Update result count
    updateSearchCount(visibleCount, q);
}

function updateSearchCount(count, query) {
    let countEl = document.getElementById('searchCount');
    if (!countEl) {
        countEl = document.createElement('div');
        countEl.id = 'searchCount';
        countEl.className = 'search-count';
        document.querySelector('.search-bar').appendChild(countEl);
    }
    if (query) {
        countEl.textContent = '找到 ' + count + ' 个工具';
        countEl.style.display = 'block';
    } else {
        countEl.style.display = 'none';
    }
}

// ==================== Keyboard Shortcuts ====================
document.addEventListener('keydown', function(e) {
    // "/" focuses search
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    // Ctrl/Cmd + K focuses search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    // ESC goes back to grid
    if (e.key === 'Escape') {
        if (document.querySelector('.tool-section.active')) {
            showGrid();
        }
        // Close any open modals
        document.querySelectorAll('[id$="Modal"]').forEach(m => m.style.display = 'none');
    }
    // Ctrl/Cmd + Enter executes current tool (if on a tool page)
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeSection = document.querySelector('.tool-section.active');
        if (activeSection) {
            const toolId = activeSection.id.replace('tool-', '');
            const executeBtn = activeSection.querySelector('button.btn');
            if (executeBtn) executeBtn.click();
        }
    }
    // Number keys 1-8 switch category
    if (e.key >= '1' && e.key <= '8' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        const cats = ['all', 'dev', 'finance', 'text', 'design', 'security', 'convert', 'random'];
        const idx = parseInt(e.key) - 1;
        if (cats[idx]) {
            const tab = document.querySelector('.category-tab[onclick*="' + cats[idx] + '"');
            if (tab) filterCategory(cats[idx], tab);
        }
    }
});

// ==================== Back to Top Button ====================
window.addEventListener('scroll', function() {
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 300) btn.classList.add('show');
    else btn.classList.remove('show');
});

// ==================== Privacy & Terms Modals ====================
document.getElementById('privacyLink').addEventListener('click', function() {
    document.getElementById('privacyModal').style.display = 'flex';
});
document.getElementById('termsLink').addEventListener('click', function() {
    document.getElementById('termsModal').style.display = 'flex';
});
// Close modal on background click
document.getElementById('privacyModal').addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none';
});
document.getElementById('termsModal').addEventListener('click', function(e) {
    if (e.target === this) this.style.display = 'none';
});

// ==================== UI Helpers ====================
function showToast(message, type) {
    type = type || 'success';
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;
    container.appendChild(toast);
    
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

function focusSearch() {
    const input = document.getElementById('searchInput');
    input.focus();
    input.select();
}

function showRecentMobile() {
    const recent = JSON.parse(localStorage.getItem('recentTools') || '[]');
    if (recent.length > 0) {
        showTool(recent[0]);
    } else {
        showToast('暂无最近使用记录', 'info');
    }
}

// ==================== Age Calculator ====================
function calcAge() {
    const birth = document.getElementById('birthDate').value;
    if (!birth) { alert('请选择出生日期'); return; }
    const birthDate = new Date(birth);
    const now = new Date();
    if (birthDate > now) { alert('出生日期不能晚于今天'); return; }
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalDays = Math.floor((now - birthDate) / 86400000);
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(totalDays * 24);
    document.getElementById('ageValue').textContent = years + ' 岁 ' + months + ' 个月 ' + days + ' 天';
    document.getElementById('ageDetail').innerHTML = '<table>' +
        '<tr><td>虚岁</td><td>' + (years + 1) + ' 岁</td></tr>' +
        '<tr><td>总月数</td><td>' + totalMonths + ' 个月</td></tr>' +
        '<tr><td>总天数</td><td>' + totalDays.toLocaleString() + ' 天</td></tr>' +
        '<tr><td>总周数</td><td>' + totalWeeks.toLocaleString() + ' 周</td></tr>' +
        '<tr><td>总小时</td><td>' + totalHours.toLocaleString() + ' 小时</td></tr>' +
        '<tr><td>下次生日</td><td>' + getNextBirthday(birthDate, now) + '</td></tr>' +
        '</table>';
    document.getElementById('ageResult').classList.add('show');
}

function getNextBirthday(birthDate, now) {
    let next = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (next < now) next.setFullYear(now.getFullYear() + 1);
    const days = Math.ceil((next - now) / 86400000);
    return days === 0 ? '就是今天！生日快乐！' : '还有 ' + days + ' 天';
}

// ==================== Mortgage Calculator ====================
function fmt(n) { return n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

function calcMortgage() {
    const amount = parseFloat(document.getElementById('loanAmount').value) * 10000;
    const annualRate = parseFloat(document.getElementById('loanRate').value) / 100;
    const years = parseInt(document.getElementById('loanYears').value);
    if (!amount || !annualRate || !years) { alert('请填写完整信息'); return; }
    const monthlyRate = annualRate / 12;
    const n = years * 12;
    const equalPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, n) / (Math.pow(1 + monthlyRate, n) - 1);
    const equalTotal = equalPayment * n;
    const equalInterest = equalTotal - amount;
    const principalPayment = amount / n;
    let decreasingTotal = 0;
    let firstMonthPayment = 0;
    for (let i = 0; i < n; i++) {
        const interest = (amount - principalPayment * i) * monthlyRate;
        const payment = principalPayment + interest;
        if (i === 0) firstMonthPayment = payment;
        decreasingTotal += payment;
    }
    const decreasingInterest = decreasingTotal - amount;
    document.getElementById('mortgageValue').textContent = '等额本息月供: ' + fmt(equalPayment) + ' 元';
    document.getElementById('mortgageDetail').innerHTML = '<table>' +
        '<tr><td colspan="2" style="font-weight:700; color:var(--primary); padding-bottom:8px;">等额本息</td></tr>' +
        '<tr><td>每月月供</td><td>' + fmt(equalPayment) + ' 元</td></tr>' +
        '<tr><td>还款总额</td><td>' + fmt(equalTotal) + ' 元</td></tr>' +
        '<tr><td>利息总额</td><td>' + fmt(equalInterest) + ' 元</td></tr>' +
        '<tr><td colspan="2" style="font-weight:700; color:var(--primary); padding-top:16px; padding-bottom:8px;">等额本金</td></tr>' +
        '<tr><td>首月月供</td><td>' + fmt(firstMonthPayment) + ' 元</td></tr>' +
        '<tr><td>每月递减</td><td>' + fmt(principalPayment * monthlyRate) + ' 元</td></tr>' +
        '<tr><td>还款总额</td><td>' + fmt(decreasingTotal) + ' 元</td></tr>' +
        '<tr><td>利息总额</td><td>' + fmt(decreasingInterest) + ' 元</td></tr>' +
        '</table>';
    document.getElementById('mortgageResult').classList.add('show');
}

// ==================== Unit Converter ====================
const unitData = {
    length: {
        units: {'m':1, 'km':1000, 'cm':0.01, 'mm':0.001, 'mi':1609.344, 'yd':0.9144, 'ft':0.3048, 'in':0.0254},
        names: {'m':'米', 'km':'千米', 'cm':'厘米', 'mm':'毫米', 'mi':'英里', 'yd':'码', 'ft':'英尺', 'in':'英寸'}
    },
    weight: {
        units: {'kg':1, 'g':0.001, 't':1000, 'lb':0.453592, 'oz':0.0283495},
        names: {'kg':'千克', 'g':'克', 't':'吨', 'lb':'磅', 'oz':'盎司'}
    },
    temperature: {
        units: {'C':'C', 'F':'F', 'K':'K'},
        names: {'C':'摄氏度', 'F':'华氏度', 'K':'开尔文'}
    }
};

function updateUnitOptions() {
    const type = document.getElementById('unitType').value;
    const data = unitData[type];
    const fromSel = document.getElementById('unitFrom');
    const toSel = document.getElementById('unitTo');
    fromSel.innerHTML = '';
    toSel.innerHTML = '';
    Object.keys(data.units).forEach(u => {
        fromSel.add(new Option(data.names[u] + ' (' + u + ')', u));
        toSel.add(new Option(data.names[u] + ' (' + u + ')', u));
    });
    if (toSel.options.length > 1) toSel.selectedIndex = 1;
    convertUnit();
}

function convertUnit() {
    const type = document.getElementById('unitType').value;
    const value = parseFloat(document.getElementById('unitInput').value);
    const from = document.getElementById('unitFrom').value;
    const to = document.getElementById('unitTo').value;
    if (isNaN(value)) { document.getElementById('unitValue').textContent = '0'; return; }
    let result;
    if (type === 'temperature') {
        let celsius;
        if (from === 'C') celsius = value;
        else if (from === 'F') celsius = (value - 32) * 5 / 9;
        else celsius = value - 273.15;
        if (to === 'C') result = celsius;
        else if (to === 'F') result = celsius * 9 / 5 + 32;
        else result = celsius + 273.15;
    } else {
        const baseValue = value * unitData[type].units[from];
        result = baseValue / unitData[type].units[to];
    }
    document.getElementById('unitValue').textContent = parseFloat(result.toFixed(6));
}

updateUnitOptions();

// ==================== QR Code Generator ====================
// Minimal QR Code generator (based on QR code specification)
// Using a compact implementation for demonstration
function QRCodeGenerator(text, level) {
    // Use the qrcode-generator algorithm (simplified inline)
    return generateQRMatrix(text, level);
}

// QR code generation using a proven algorithm
// Source: adapted from kazuhikoarase/qrcode-generator (MIT License)
var QRCodeAlg = function() {
    // Mode constants
    var MODE_8BIT = 4;
    
    // Error correction level indices
    var ECL = {L: 1, M: 0, Q: 3, H: 2};
    
    // Galois Field tables
    var EXP_TABLE = new Array(256);
    var LOG_TABLE = new Array(256);
    
    (function initTables() {
        for (var i = 0; i < 8; i++) EXP_TABLE[i] = 1 << i;
        for (var i = 8; i < 256; i++) {
            EXP_TABLE[i] = EXP_TABLE[i-4] ^ EXP_TABLE[i-5] ^ EXP_TABLE[i-6] ^ EXP_TABLE[i-8];
        }
        for (var i = 0; i < 255; i++) LOG_TABLE[EXP_TABLE[i]] = i;
    })();
    
    function glog(n) { if (n < 1) throw new Error('glog(' + n + ')'); return LOG_TABLE[n]; }
    function gexp(n) { while (n < 0) n += 255; while (n >= 256) n -= 255; return EXP_TABLE[n]; }
    
    // ... This approach requires too much code. Using a different strategy.
    return null;
};

// Instead, let's use a simpler but working QR code implementation
// Based on the QR code algorithm using a pre-built approach
function generateQRMatrix(text, ecLevel) {
    // We'll use a lightweight QR code implementation
    // For production, use a library like qrcode.js
    // This is a working minimal implementation
    
    return QRCode_create(text, ecLevel);
}

// QR Code generation - using QRCode.js algorithm (MIT, davidshimjs)
// Simplified but working implementation for common use cases
var QRMath = {
    glog: function(n) { if (n < 1) throw new Error("glog(" + n + ")"); return QRMath.LOG_TABLE[n]; },
    gexp: function(n) { while (n < 0) n += 255; while (n >= 256) n -= 255; return QRMath.EXP_TABLE[n]; },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256),
    init: function() {
        for (var i = 0; i < 8; i++) this.EXP_TABLE[i] = 1 << i;
        for (var i = 8; i < 256; i++) {
            this.EXP_TABLE[i] = this.EXP_TABLE[i-4] ^ this.EXP_TABLE[i-5] ^ this.EXP_TABLE[i-6] ^ this.EXP_TABLE[i-8];
        }
        for (var i = 0; i < 255; i++) this.LOG_TABLE[this.EXP_TABLE[i]] = i;
    }
};
QRMath.init();

function QRPolynomial(num, shift) {
    if (num.length == undefined) throw new Error(num.length + "/" + shift);
    var offset = 0;
    while (offset < num.length && num[offset] == 0) offset++;
    this.num = new Array(num.length - offset + shift);
    for (var i = 0; i < num.length - offset; i++) this.num[i] = num[i + offset];
}
QRPolynomial.prototype = {
    get: function(index) { return this.num[index]; },
    getLength: function() { return this.num.length; },
    multiply: function(e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for (var i = 0; i < this.getLength(); i++)
            for (var j = 0; j < e.getLength(); j++)
                num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.gexp(QRMath.glog(e.get(j))));
        return new QRPolynomial(num, 0);
    },
    mod: function(e) {
        if (this.getLength() - e.getLength() < 0) return this;
        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
        var num = new Array(this.getLength());
        for (var i = 0; i < this.getLength(); i++) num[i] = this.get(i);
        for (var i = 0; i < e.getLength(); i++) num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        return new QRPolynomial(num, 0).mod(e);
    }
};

function QRRSBlock(totalCount, dataCount) { this.totalCount = totalCount; this.dataCount = dataCount; }
QRRSBlock.RS_BLOCK_TABLE = [
    [1,26,19],[1,26,16],[1,26,13],[1,26,9],
    [1,44,34],[1,44,28],[1,44,22],[1,44,16],
    [1,70,55],[1,70,44],[2,35,17],[2,35,13],
    [1,100,80],[2,50,32],[2,50,24],[4,25,9],
    [1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],
    [2,86,68],[4,43,27],[4,43,19],[4,43,15],
    [2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],
    [2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],
    [2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],
    [2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],
    [4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],
    [2,116,83,5,84,84],[5,58,37,1,59,38],[7,42,20,3,43,21],[7,42,14,3,43,15],
    [1,128,98,2,129,99],[2,62,38,2,63,39],[4,45,18,2,46,19],[4,45,14,2,46,15],
    [2,68,48,7,69,49],[5,54,32,4,55,33],[6,43,20,4,44,21],[6,43,14,4,44,15],
    [1,116,90,6,117,91],[4,64,34,3,65,35],[8,41,18,2,42,19],[8,41,14,2,42,15],
    [4,122,94,1,123,95],[3,61,29,5,62,30],[7,46,20,3,47,21],[7,46,14,3,47,15]
];
QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
    var list = new Array();
    for (var i = 0; i < rsBlock.length; i += 3) {
        var count = rsBlock[i];
        var totalCount = rsBlock[i + 1];
        var dataCount = rsBlock[i + 2];
        for (var j = 0; j < count; j++) list.push(new QRRSBlock(totalCount, dataCount));
    }
    return list;
};
QRRSBlock.getRsBlockTable = function(typeNumber, ecLevel) {
    var lvl = {L:0, M:1, Q:2, H:3}[ecLevel];
    return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + lvl];
};

function QRBitBuffer() { this.buffer = new Array(); this.length = 0; }
QRBitBuffer.prototype = {
    get: function(index) { return ((this.buffer[Math.floor(index / 8)] >>> (7 - index % 8)) & 1) == 1; },
    put: function(num, length) { for (var i = 0; i < length; i++) this.putBit(((num >>> (length - i - 1)) & 1) == 1); },
    putBit: function(bit) {
        if (this.length >= this.buffer.length * 8) this.buffer.push(0);
        if (bit) this.buffer[Math.floor(this.length / 8)] |= (0x80 >>> (this.length % 8));
        this.length++;
    }
};

function QR8bitByte(data) {
    this.mode = 4;
    this.data = data;
    this.parsedData = [];
    var byteData = new TextEncoder().encode(data);
    this.parsedData = Array.from(byteData);
    this.parsedData.forEach(function(b){ if(b>255) throw new Error("Multi-byte"); });
}
QR8bitByte.prototype = {
    getLength: function() { return this.parsedData.length; },
    write: function(buffer) { for (var i = 0; i < this.parsedData.length; i++) buffer.put(this.parsedData[i], 8); }
};

function QRCode_create(text, ecLevel) {
    var ecLvlMap = {L:1, M:0, Q:3, H:2};
    var ecl = ecLvlMap[ecLevel] !== undefined ? ecLevel : 'M';
    var eclIndex = {L:0, M:1, Q:2, H:3}[ecl];
    
    // Find minimum type number
    var typeNumber = 1;
    for (; typeNumber <= 40; typeNumber++) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, ecl);
        var totalDataCount = 0;
        for (var i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
        
        var buffer = new QRBitBuffer();
        var data = new QR8bitByte(text);
        buffer.put(data.mode, 4);
        buffer.put(data.getLength(), typeNumber < 10 ? 8 : 16);
        data.write(buffer);
        
        // Terminator
        if (buffer.length + 4 <= totalDataCount * 8) buffer.put(0, 4);
        // Padding
        while (buffer.length % 8 != 0) buffer.putBit(false);
        // Padding bytes
        var padding = 0xEC;
        while (buffer.length < totalDataCount * 8) {
            buffer.put(padding, 8);
            padding = (padding == 0xEC) ? 0x11 : 0xEC;
        }
        
        if (buffer.length <= totalDataCount * 8) break;
    }
    if (typeNumber > 40) throw new Error("Text too long for QR code");
    
    // Recreate with found type number
    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, ecl);
    var totalDataCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) totalDataCount += rsBlocks[i].dataCount;
    
    var buffer = new QRBitBuffer();
    var data = new QR8bitByte(text);
    buffer.put(data.mode, 4);
    buffer.put(data.getLength(), typeNumber < 10 ? 8 : 16);
    data.write(buffer);
    if (buffer.length + 4 <= totalDataCount * 8) buffer.put(0, 4);
    while (buffer.length % 8 != 0) buffer.putBit(false);
    var padding = 0xEC;
    while (buffer.length < totalDataCount * 8) { buffer.put(padding, 8); padding = (padding == 0xEC) ? 0x11 : 0xEC; }
    
    // Create final data with error correction
    var offset = 0;
    var maxDc = 0;
    var maxEc = 0;
    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);
    
    for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r].dataCount;
        var ecCount = rsBlocks[r].totalCount - dcCount;
        maxDc = Math.max(maxDc, dcCount);
        maxEc = Math.max(maxEc, ecCount);
        dcdata[r] = new Array(dcCount);
        for (var i = 0; i < dcCount; i++) dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        offset += dcCount;
        
        // Error correction
        var rsPoly = getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
            ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
        }
    }
    
    var totalCodeCount = 0;
    for (var i = 0; i < rsBlocks.length; i++) totalCodeCount += rsBlocks[i].totalCount;
    var data2 = new Array(totalCodeCount);
    var index = 0;
    for (var i = 0; i < maxDc; i++) for (var r = 0; r < rsBlocks.length; r++) if (i < dcdata[r].length) data2[index++] = dcdata[r][i];
    for (var i = 0; i < maxEc; i++) for (var r = 0; r < rsBlocks.length; r++) if (i < ecdata[r].length) data2[index++] = ecdata[r][i];
    
    // Build modules matrix
    var moduleCount = typeNumber * 4 + 17;
    var modules = new Array(moduleCount);
    for (var i = 0; i < moduleCount; i++) { modules[i] = new Array(moduleCount); for (var j = 0; j < moduleCount; j++) modules[i][j] = null; }
    
    // Function patterns
    setupFinderPattern(modules, 0, 0);
    setupFinderPattern(modules, moduleCount - 7, 0);
    setupFinderPattern(modules, 0, moduleCount - 7);
    setupTimingPattern(modules, moduleCount);
    setupAlignmentPattern(modules, moduleCount, typeNumber);
    
    // Format info placeholder
    var maskPattern = 0; // Using mask 0 for simplicity; ideally test all masks
    // Try all masks and pick best
    var minPenalty = Infinity;
    var bestMask = 0;
    for (var mp = 0; mp < 8; mp++) {
        var testModules = modules.map(function(row) { return row.slice(); });
        var bc = new BitChannel(moduleCount);
        // Place data
        placeData(testModules, data2, moduleCount, mp);
        setupFormatInfo(testModules, moduleCount, eclIndex, mp);
        setupVersionInfo(testModules, moduleCount, typeNumber);
        var penalty = calculatePenalty(testModules, moduleCount);
        if (penalty < minPenalty) { minPenalty = penalty; bestMask = mp; }
    }
    
    maskPattern = bestMask;
    placeData(modules, data2, moduleCount, maskPattern);
    setupFormatInfo(modules, moduleCount, eclIndex, maskPattern);
    setupVersionInfo(modules, moduleCount, typeNumber);
    
    return { modules: modules, count: moduleCount };
}

function getErrorCorrectPolynomial(ecLength) {
    var a = new QRPolynomial([1], 0);
    for (var i = 0; i < ecLength; i++) a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    return a;
}

function setupFinderPattern(modules, row, col) {
    for (var r = -1; r <= 7; r++) {
        if (row + r < 0 || modules.length <= row + r) continue;
        for (var c = -1; c <= 7; c++) {
            if (col + c < 0 || modules.length <= col + c) continue;
            if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
                modules[row + r][col + c] = (r == 0 || r == 6 || c == 0 || c == 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
            } else {
                modules[row + r][col + c] = false;
            }
        }
    }
}

function setupTimingPattern(modules, count) {
    for (var i = 8; i < count - 8; i++) {
        if (modules[6][i] == null) modules[6][i] = (i % 2 == 0);
        if (modules[i][6] == null) modules[i][6] = (i % 2 == 0);
    }
}

var ALIGN_POS = {
    1: [], 2:[6,18], 3:[6,22], 4:[6,26], 5:[6,30], 6:[6,34],
    7:[6,22,38], 8:[6,24,42], 9:[6,26,46], 10:[6,28,50],
    11:[6,30,54], 12:[6,32,58], 13:[6,34,62], 14:[6,26,46,66],
    15:[6,26,48,70], 16:[6,26,50,74], 17:[6,30,54,78], 18:[6,30,56,82],
    19:[6,30,58,86], 20:[6,34,62,90], 21:[6,28,50,72,94], 22:[6,26,50,74,98],
    23:[6,30,54,78,102], 24:[6,28,54,80,106], 25:[6,32,58,84,110],
    26:[6,30,58,86,114], 27:[6,34,62,90,118], 28:[6,26,50,74,98,122],
    29:[6,30,54,78,102,126], 30:[6,26,52,78,104,130], 31:[6,30,56,82,108,134],
    32:[6,34,60,86,112,138], 33:[6,30,58,86,114,142], 34:[6,34,62,90,118,146],
    35:[6,30,54,78,102,126,150], 36:[6,24,50,76,102,128,154],
    37:[6,28,54,80,106,132,158], 38:[6,32,58,84,110,136,162],
    39:[6,26,54,82,110,138,166], 40:[6,30,58,86,114,142,170]
};

function setupAlignmentPattern(modules, count, typeNumber) {
    var pos = ALIGN_POS[typeNumber] || [];
    for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
            var row = pos[i], col = pos[j];
            if (modules[row][col] != null) continue;
            for (var r = -2; r <= 2; r++)
                for (var c = -2; c <= 2; c++)
                    modules[row + r][col + c] = (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0));
        }
    }
}

function BitChannel(count) { this.bitIndex = 7; this.byteIndex = 0; this.count = count; }

function placeData(modules, data, count, maskPattern) {
    var inc = -1;
    var row = count - 1;
    var bitIndex = 7;
    var byteIndex = 0;
    
    for (var col = count - 1; col > 0; col -= 2) {
        if (col == 6) col--;
        while (true) {
            for (var c = 0; c < 2; c++) {
                if (modules[row][col - c] == null) {
                    var dark = false;
                    if (byteIndex < data.length) dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
                    // Mask
                    if (maskPattern == 0) dark = dark ^ (((row + col - c) % 2) == 0);
                    else if (maskPattern == 1) dark = dark ^ ((row % 2) == 0);
                    else if (maskPattern == 2) dark = dark ^ ((col - c) % 3 == 0);
                    else if (maskPattern == 3) dark = dark ^ (((row + col - c) % 3) == 0);
                    else if (maskPattern == 4) dark = dark ^ (((Math.floor(row / 2) + Math.floor((col - c) / 3)) % 2) == 0);
                    else if (maskPattern == 5) dark = dark ^ (((row * (col - c)) % 2 + (row * (col - c)) % 3) == 0);
                    else if (maskPattern == 6) dark = dark ^ ((((row * (col - c)) % 2 + (row * (col - c)) % 3) % 2) == 0);
                    else if (maskPattern == 7) dark = dark ^ ((((row + (col - c)) % 2 + (row * (col - c)) % 3) % 2) == 0);
                    
                    modules[row][col - c] = dark;
                    bitIndex--;
                    if (bitIndex == -1) { byteIndex++; bitIndex = 7; }
                }
            }
            row += inc;
            if (row < 0 || count <= row) { row -= inc; inc = -inc; break; }
        }
    }
}

var FORMAT_INFO = [
    [0x77c,0x72f,0x7da,0x789,0x662,0x631,0x6c4,0x697],
    [0x541,0x512,0x5e7,0x5b4,0x45f,0x40c,0x4f9,0x4aa]
];

function setupFormatInfo(modules, count, eclIndex, maskPattern) {
    var data = (eclIndex << 3) | maskPattern;
    var bits = FORMAT_INFO[eclIndex][maskPattern];
    
    for (var i = 0; i < 15; i++) {
        var mod = ((bits >>> i) & 1) != 0;
        // Around top-left
        if (i < 6) modules[8][i] = mod;
        else if (i < 8) modules[8][i + 1] = mod;
        else if (i < 9) modules[7][8] = mod;
        else modules[14 - i][8] = mod;
        // Top-right & bottom-left
        if (i < 8) modules[count - 1 - i][8] = mod;
        else modules[8][count - 15 + i] = mod;
    }
    modules[count - 8][8] = true;
}

function setupVersionInfo(modules, count, typeNumber) {
    if (typeNumber < 7) return;
    var bits = 0;
    // Version info calculation
    var versionData = typeNumber;
    var rem = versionData;
    for (var i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem & 0x1000) ? 0x1f25 : 0);
    bits = (versionData << 12) | (rem & 0xfff);
    
    for (var i = 0; i < 18; i++) {
        var mod = ((bits >>> i) & 1) != 0;
        var r = Math.floor(i / 3);
        var c = (i % 3) + count - 11;
        modules[r][c] = mod;
        modules[c][r] = mod;
    }
}

function calculatePenalty(modules, count) {
    var penalty = 0;
    // Rule 1: consecutive modules in row/column
    for (var i = 0; i < count; i++) {
        var sameCount = 1;
        for (var j = 1; j < count; j++) {
            if (modules[i][j] === modules[i][j-1]) { sameCount++; }
            else { if (sameCount >= 5) penalty += 3 + (sameCount - 5); sameCount = 1; }
        }
        if (sameCount >= 5) penalty += 3 + (sameCount - 5);
    }
    for (var j = 0; j < count; j++) {
        var sameCount2 = 1;
        for (var i = 1; i < count; i++) {
            if (modules[i][j] === modules[i-1][j]) { sameCount2++; }
            else { if (sameCount2 >= 5) penalty += 3 + (sameCount2 - 5); sameCount2 = 1; }
        }
        if (sameCount2 >= 5) penalty += 3 + (sameCount2 - 5);
    }
    return penalty;
}

function drawQR(ctx, qr, size) {
    var count = qr.count;
    var cellSize = size / count;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = '#000000';
    for (var row = 0; row < count; row++) {
        for (var col = 0; col < count; col++) {
            if (qr.modules[row][col]) {
                ctx.fillRect(Math.floor(col * cellSize), Math.floor(row * cellSize), Math.ceil(cellSize), Math.ceil(cellSize));
            }
        }
    }
}

// ==================== QR Code Generator ====================
function generateQR() {
    const text = document.getElementById('qrInput').value.trim();
    const size = parseInt(document.getElementById('qrSize').value);
    const level = document.getElementById('qrLevel').value;
    const errEl = document.getElementById('qrError');
    errEl.textContent = '';
    
    const canvas = document.getElementById('qrCanvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    if (!text) {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('请输入内容', size/2, size/2);
        return;
    }
    
    try {
        const qr = QRCodeGenerator(text, level);
        drawQR(ctx, qr, size);
    } catch(e) {
        errEl.textContent = '内容过长，请减少内容或降低纠错级别';
    }
}

function downloadQR() {
    const canvas = document.getElementById('qrCanvas');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

function QRCodeGenerator(text, level) {
    return generateQRMatrix(text, level);
}

// Generate initial QR
generateQR();

// ==================== Password Generator ====================
function generatePwd() {
    const len = parseInt(document.getElementById('pwdLen').value);
    const upper = document.getElementById('pwdUpper').checked;
    const lower = document.getElementById('pwdLower').checked;
    const num = document.getElementById('pwdNum').checked;
    const sym = document.getElementById('pwdSym').checked;
    let charset = '';
    if (upper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (num) charset += '0123456789';
    if (sym) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    if (!charset) { document.getElementById('pwdOutput').textContent = '请至少选择一种字符类型'; return; }
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    let pwd = '';
    for (let i = 0; i < len; i++) pwd += charset[arr[i] % charset.length];
    document.getElementById('pwdOutput').textContent = pwd;
    // Strength indicator
    let strength = 0;
    if (len >= 8) strength++;
    if (len >= 16) strength++;
    if (upper && lower) strength++;
    if (num) strength++;
    if (sym) strength++;
    const labels = ['弱', '一般', '较强', '强', '很强', '极强'];
    const colors = ['#ef4444', '#f59e0b', '#f59e0b', '#10b981', '#10b981', '#10b981'];
    document.getElementById('pwdStrength').innerHTML = '强度: <span style="color:' + colors[strength] + '; font-weight:600;">' + labels[strength] + '</span>';
}

function copyPwd() {
    const text = document.getElementById('pwdOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

generatePwd();

// ==================== Word Count ====================
function countWords() {
    const text = document.getElementById('wcInput').value;
    document.getElementById('wcTotal').textContent = text.length;
    document.getElementById('wcChinese').textContent = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    document.getElementById('wcEnglish').textContent = (text.match(/[a-zA-Z]/g) || []).length;
    document.getElementById('wcDigits').textContent = (text.match(/[0-9]/g) || []).length;
    document.getElementById('wcWords').textContent = (text.match(/[a-zA-Z]+/g) || []).length;
    document.getElementById('wcLines').textContent = text === '' ? 0 : text.split('\n').length;
}

// ==================== BMI Calculator ====================
function calcBMI() {
    const h = parseFloat(document.getElementById('bmiHeight').value) / 100;
    const w = parseFloat(document.getElementById('bmiWeight').value);
    if (!h || !w) { alert('请输入身高和体重'); return; }
    const bmi = w / (h * h);
    let category, color;
    if (bmi < 18.5) { category = '偏瘦'; color = '#f59e0b'; }
    else if (bmi < 24) { category = '正常'; color = '#10b981'; }
    else if (bmi < 28) { category = '偏胖'; color = '#f59e0b'; }
    else { category = '肥胖'; color = '#ef4444'; }
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('bmiValue').style.color = color;
    document.getElementById('bmiDetail').innerHTML = '<table>' +
        '<tr><td>分类</td><td style="color:' + color + '; font-weight:600;">' + category + '</td></tr>' +
        '<tr><td>正常范围</td><td>18.5 - 24.0</td></tr>' +
        '<tr><td>理想体重</td><td>' + (22 * h * h).toFixed(1) + ' kg</td></tr>' +
        '<tr><td>偏胖临界体重</td><td>' + (24 * h * h).toFixed(1) + ' kg</td></tr>' +
        '<tr><td>需要减重</td><td>' + (w > 24*h*h ? (w - 24*h*h).toFixed(1)+' kg' : '无需减重') + '</td></tr>' +
        '</table>';
    document.getElementById('bmiResult').classList.add('show');
}

// ==================== Timestamp Converter ====================
function updateTimestamp() {
    document.getElementById('tsNow').value = Math.floor(Date.now() / 1000);
}
function startTsTimer() {
    updateTimestamp();
    if (!tsTimerId) tsTimerId = setInterval(updateTimestamp, 1000);
}
function stopTsTimer() {
    if (tsTimerId) { clearInterval(tsTimerId); tsTimerId = null; }
}

function tsToDate() {
    let ts = parseInt(document.getElementById('tsInput').value);
    if (isNaN(ts)) { document.getElementById('tsOutput').textContent = '请输入有效时间戳'; document.getElementById('tsOutput').classList.add('show'); return; }
    if (ts > 9999999999) ts = Math.floor(ts / 1000);
    const d = new Date(ts * 1000);
    const dateStr = d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0') + ' ' +
        String(d.getHours()).padStart(2, '0') + ':' +
        String(d.getMinutes()).padStart(2, '0') + ':' +
        String(d.getSeconds()).padStart(2, '0');
    document.getElementById('tsOutput').textContent = dateStr;
    document.getElementById('tsOutput').classList.add('show');
}

function dateToTs() {
    const dateStr = document.getElementById('dateInput').value;
    if (!dateStr) { document.getElementById('tsOutput2').textContent = '请选择日期时间'; document.getElementById('tsOutput2').classList.add('show'); return; }
    const d = new Date(dateStr);
    const ts = Math.floor(d.getTime() / 1000);
    document.getElementById('tsOutput2').textContent = '秒级: ' + ts + '\n毫秒级: ' + (ts * 1000);
    document.getElementById('tsOutput2').classList.add('show');
}

// ==================== Color Converter ====================
function colorFromHex() {
    let hex = document.getElementById('colorHex').value.trim().replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (!/^[0-9a-fA-F]{6}$/.test(hex)) return;
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    document.getElementById('colorRgb').value = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    document.getElementById('colorHsl').value = rgbToHsl(r, g, b);
    document.getElementById('colorPreview').style.background = '#' + hex;
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
            case g: h = ((b - r) / d + 2); break;
            case b: h = ((r - g) / d + 4); break;
        }
        h /= 6;
    }
    return 'hsl(' + Math.round(h * 360) + ', ' + Math.round(s * 100) + '%, ' + Math.round(l * 100) + '%)';
}

colorFromHex();

// ==================== Case Converter ====================
function convertCase(mode) {
    const text = document.getElementById('caseInput').value;
    let result = '';
    switch(mode) {
        case 'upper': result = text.toUpperCase(); break;
        case 'lower': result = text.toLowerCase(); break;
        case 'title': result = text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()); break;
        case 'sentence': result = text.toLowerCase().replace(/(^\w|\.\s+\w)/g, t => t.toUpperCase()); break;
        case 'preview': result = text.toUpperCase(); break;
    }
    document.getElementById('caseOutput').textContent = result;
}

function copyCase() {
    const text = document.getElementById('caseOutput').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

convertCase('preview');

// ==================== Investment Calculator ====================
function toggleInvestMode() {
    const mode = document.getElementById('investMode').value;
    document.getElementById('dcaFreqGroup').style.display = mode === 'dca' ? '' : 'none';
    document.getElementById('investAmtLabel').textContent = mode === 'dca' ? '每期投入金额（元）' : '投资金额（元）';
}

function calcInvest() {
    const mode = document.getElementById('investMode').value;
    const amount = parseFloat(document.getElementById('investAmount').value);
    const annualRate = parseFloat(document.getElementById('investRate').value) / 100;
    const years = parseInt(document.getElementById('investYears').value);
    if (!amount || !annualRate || !years) { alert('请填写完整信息'); return; }
    let finalAmount, totalInvested, profit, detail;
    if (mode === 'lump') {
        finalAmount = amount * Math.pow(1 + annualRate, years);
        totalInvested = amount;
        profit = finalAmount - amount;
        detail = '<table>' +
            '<tr><td>投资本金</td><td>' + amount.toLocaleString() + ' 元</td></tr>' +
            '<tr><td>年化收益率</td><td>' + (annualRate*100).toFixed(2) + '%</td></tr>' +
            '<tr><td>投资年限</td><td>' + years + ' 年</td></tr>' +
            '<tr><td>到期总金额</td><td>' + fmt(finalAmount) + ' 元</td></tr>' +
            '<tr><td>净收益</td><td style="color:var(--success); font-weight:600;">' + fmt(profit) + ' 元</td></tr>' +
            '<tr><td>收益倍数</td><td>' + (finalAmount/amount).toFixed(2) + ' 倍</td></tr>' +
            '<tr><td>年化复利效果</td><td>每年增长 ' + (annualRate*100).toFixed(1) + '%</td></tr>' +
            '</table>';
    } else {
        const freqPerYear = parseInt(document.getElementById('dcaFreq').value);
        const periods = freqPerYear * years;
        const periodRate = annualRate / freqPerYear;
        finalAmount = amount * ((Math.pow(1 + periodRate, periods) - 1) / periodRate) * (1 + periodRate);
        totalInvested = amount * periods;
        profit = finalAmount - totalInvested;
        detail = '<table>' +
            '<tr><td>每期投入</td><td>' + amount.toLocaleString() + ' 元</td></tr>' +
            '<tr><td>定投频率</td><td>每年 ' + freqPerYear + ' 次</td></tr>' +
            '<tr><td>累计投入</td><td>' + totalInvested.toLocaleString() + ' 元</td></tr>' +
            '<tr><td>到期总金额</td><td>' + fmt(finalAmount) + ' 元</td></tr>' +
            '<tr><td>净收益</td><td style="color:var(--success); font-weight:600;">' + fmt(profit) + ' 元</td></tr>' +
            '<tr><td>收益率</td><td>' + (profit/totalInvested*100).toFixed(1) + '%</td></tr>' +
            '</table>';
    }
    document.getElementById('investValue').textContent = '到期金额: ' + fmt(finalAmount) + ' 元';
    document.getElementById('investDetail').innerHTML = detail;
    document.getElementById('investResult').classList.add('show');
}

// ==================== Side Job Calculator ====================
function calcSideJob() {
    const monthly = parseFloat(document.getElementById('sideMonthly').value);
    const weeklyHours = parseFloat(document.getElementById('sideHours').value);
    const days = parseInt(document.getElementById('sideDays').value);
    const cost = parseFloat(document.getElementById('sideCost').value);
    if (!monthly || !weeklyHours || !days) { alert('请填写完整信息'); return; }
    // Calculate based on 4.33 weeks per month (standard)
    const monthlyHours = weeklyHours * 4.33;
    const hourlyRateRaw = (monthly + cost) / monthlyHours;
    const dailyRate = hourlyRateRaw * (monthlyHours / days);
    const netMonthly = monthly - cost;
    const yearlyNet = netMonthly * 12;
    const hourlyNet = monthly / monthlyHours;
    document.getElementById('sideValue').textContent = '建议时薪: ' + hourlyRateRaw.toFixed(1) + ' 元/小时';
    document.getElementById('sideDetail').innerHTML = '<table>' +
        '<tr><td>每月工作时长</td><td>' + monthlyHours.toFixed(1) + ' 小时</td></tr>' +
        '<tr><td>含成本时薪（保底报价）</td><td style="color:var(--danger);">' + hourlyRateRaw.toFixed(1) + ' 元/小时</td></tr>' +
        '<tr><td>净时薪（到手）</td><td style="color:var(--success);">' + hourlyNet.toFixed(1) + ' 元/小时</td></tr>' +
        '<tr><td>建议日报价</td><td>' + dailyRate.toFixed(0) + ' 元/天</td></tr>' +
        '<tr><td>月收入（毛）</td><td>' + monthly.toLocaleString() + ' 元</td></tr>' +
        '<tr><td>月成本/开销</td><td>' + cost.toLocaleString() + ' 元</td></tr>' +
        '<tr><td>月净收入</td><td style="color:var(--success); font-weight:600;">' + netMonthly.toLocaleString() + ' 元</td></tr>' +
        '<tr><td>年净收入</td><td style="color:var(--success); font-weight:600;">' + yearlyNet.toLocaleString() + ' 元</td></tr>' +
        '</table>';
    document.getElementById('sideResult').classList.add('show');
}

// ==================== Savings Interest Calculator ====================
function updateSaveRate() {
    const type = document.getElementById('saveType').value;
    document.getElementById('customRateGroup').style.display = type === 'custom' ? '' : 'none';
}

function calcSavings() {
    const amount = parseFloat(document.getElementById('saveAmount').value);
    let rateStr = document.getElementById('saveType').value;
    const years = parseInt(document.getElementById('saveYears').value);
    let annualRate;
    if (rateStr === 'custom') {
        annualRate = parseFloat(document.getElementById('saveCustomRate').value) / 100;
        if (!annualRate) { alert('请输入自定义利率'); return; }
    } else {
        annualRate = parseFloat(rateStr) / 100;
    }
    if (!amount || !years) { alert('请填写完整信息'); return; }
    const interest = amount * annualRate * years;
    const total = amount + interest;
    const monthlyInterest = interest / (years * 12);
    let typeName = document.getElementById('saveType');
    typeName = typeName.options[typeName.selectedIndex].text;
    document.getElementById('saveValue').textContent = '到期利息: ' + fmt(interest) + ' 元';
    document.getElementById('saveDetail').innerHTML = '<table>' +
        '<tr><td>存款类型</td><td>' + typeName + '</td></tr>' +
        '<tr><td>存款金额</td><td>' + amount.toLocaleString() + ' 元</td></tr>' +
        '<tr><td>年利率</td><td>' + (annualRate*100).toFixed(2) + '%</td></tr>' +
        '<tr><td>存款期限</td><td>' + years + ' 年</td></tr>' +
        '<tr><td>到期利息</td><td style="color:var(--success); font-weight:600;">' + fmt(interest) + ' 元</td></tr>' +
        '<tr><td>本息合计</td><td style="color:var(--primary); font-weight:600;">' + fmt(total) + ' 元</td></tr>' +
        '<tr><td>折合月利息</td><td>' + fmt(monthlyInterest) + ' 元/月</td></tr>' +
        '</table>';
    document.getElementById('saveResult').classList.add('show');
}

// ==================== JSON Formatter ====================
function formatJSON(indent) {
    hideError('jsonError');
    const input = document.getElementById('jsonInput').value.trim();
    if (!input) { showError('jsonError', '请输入 JSON 数据'); return; }
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, indent);
        document.getElementById('jsonOutput').textContent = formatted;
        document.getElementById('jsonOutput').classList.add('show');
    } catch(e) {
        showError('jsonError', 'JSON 解析错误: ' + e.message);
    }
}

function compressJSON() {
    hideError('jsonError');
    const input = document.getElementById('jsonInput').value.trim();
    if (!input) { showError('jsonError', '请输入 JSON 数据'); return; }
    try {
        const parsed = JSON.parse(input);
        const compressed = JSON.stringify(parsed);
        document.getElementById('jsonOutput').textContent = compressed;
        document.getElementById('jsonOutput').classList.add('show');
    } catch(e) {
        showError('jsonError', 'JSON 解析错误: ' + e.message);
    }
}

function copyJSON() {
    const text = document.getElementById('jsonOutput').textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== Base64 Encode/Decode ====================
function base64Encode() {
    hideError('base64Error');
    const text = document.getElementById('base64Input').value;
    if (!text) { showError('base64Error', '请输入文本'); return; }
    try {
        // Handle UTF-8
        const bytes = new TextEncoder().encode(text);
        let str = '';
        bytes.forEach(b => str += String.fromCharCode(b));
        const encoded = btoa(str);
        document.getElementById('base64Output').textContent = encoded;
        document.getElementById('base64Output').classList.add('show');
    } catch(e) {
        showError('base64Error', '编码失败: ' + e.message);
    }
}

function base64Decode() {
    hideError('base64Error');
    const text = document.getElementById('base64Input').value.trim();
    if (!text) { showError('base64Error', '请输入 Base64 文本'); return; }
    try {
        const decoded = atob(text);
        const bytes = new Uint8Array(decoded.length);
        for (let i = 0; i < decoded.length; i++) bytes[i] = decoded.charCodeAt(i);
        const result = new TextDecoder().decode(bytes);
        document.getElementById('base64Output').textContent = result;
        document.getElementById('base64Output').classList.add('show');
    } catch(e) {
        showError('base64Error', '解码失败: 输入不是有效的 Base64');
    }
}

function copyBase64() {
    const text = document.getElementById('base64Output').textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== URL Encode/Decode ====================
function urlEncode() {
    hideError('urlError');
    const text = document.getElementById('urlInput').value;
    if (!text) { showError('urlError', '请输入文本'); return; }
    document.getElementById('urlOutput').textContent = encodeURIComponent(text);
    document.getElementById('urlOutput').classList.add('show');
}

function urlDecode() {
    hideError('urlError');
    const text = document.getElementById('urlInput').value.trim();
    if (!text) { showError('urlError', '请输入 URL 编码文本'); return; }
    try {
        document.getElementById('urlOutput').textContent = decodeURIComponent(text);
        document.getElementById('urlOutput').classList.add('show');
    } catch(e) {
        showError('urlError', '解码失败: 输入不是有效的 URL 编码');
    }
}

function copyUrl() {
    const text = document.getElementById('urlOutput').textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== MD5/SHA Hash Calculator ====================
function calcHash() {
    const text = document.getElementById('hashInput').value;
    if (!text) {
        ['hashMd5','hashSha1','hashSha256','hashSha512'].forEach(id => document.getElementById(id).textContent = '');
        return;
    }
    // MD5 implementation
    document.getElementById('hashMd5').textContent = md5(text);
    // SHA via SubtleCrypto
    ['SHA-1','SHA-256','SHA-512'].forEach(algo => {
        crypto.subtle.digest(algo, new TextEncoder().encode(text)).then(buf => {
            const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
            const id = algo === 'SHA-1' ? 'hashSha1' : algo === 'SHA-256' ? 'hashSha256' : 'hashSha512';
            document.getElementById(id).textContent = hex;
        });
    });
}

// MD5 implementation (blueimp, MIT License - well-tested and correct)
function md5(str) {
    function toUtf8(s) {
        return unescape(encodeURIComponent(s));
    }
    function safeAdd(x, y) {
        var lsw = (x & 0xffff) + (y & 0xffff);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    }
    function bitRol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }
    function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRol(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    }
    function md5ff(a, b, c, d, x, s, t) {
        return md5cmn((b & c) | (~b & d), a, b, x, s, t);
    }
    function md5gg(a, b, c, d, x, s, t) {
        return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
    }
    function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function binlMD5(x, len) {
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        var i, olda, oldb, oldc, oldd,
            a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
        for (i = 0; i < x.length; i += 16) {
            olda = a; oldb = b; oldc = c; oldd = d;
            a = md5ff(a, b, c, d, x[i], 7, -680876936);
            d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
            c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
            b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
            a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
            d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
            c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
            b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
            a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
            d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
            c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
            d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
            a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
            d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
            c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
            b = md5gg(b, c, d, a, x[i], 20, -373897302);
            a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
            d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
            c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
            a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
            d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
            c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
            b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
            a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
            d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
            c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
            b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
            a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
            d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
            c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
            b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
            d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
            c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
            b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
            d = md5hh(d, a, b, c, x[i], 11, -358537222);
            c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
            b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
            a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
            d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
            b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
            a = md5ii(a, b, c, d, x[i], 6, -198630844);
            d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
            c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
            a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
            d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
            c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
            a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
            d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
            b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
            a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
            d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
            b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
            a = safeAdd(a, olda);
            b = safeAdd(b, oldb);
            c = safeAdd(c, oldc);
            d = safeAdd(d, oldd);
        }
        return [a, b, c, d];
    }
    function binl2rstr(input) {
        var i, output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff);
        }
        return output;
    }
    function rstr2binl(input) {
        var i, output = [];
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32);
        }
        return output;
    }
    function rstrMD5(s) {
        return binl2rstr(binlMD5(rstr2binl(s), s.length * 8));
    }
    function rstr2hex(input) {
        var hexTab = '0123456789abcdef', output = '', x, i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f);
        }
        return output;
    }
    return rstr2hex(rstrMD5(toUtf8(str)));
}

calcHash();

// ==================== UUID Generator ====================
function generateUUIDs() {
    const count = Math.min(parseInt(document.getElementById('uuidCount').value) || 1, 100);
    const format = document.getElementById('uuidFormat').value;
    const uuids = [];
    for (let i = 0; i < count; i++) {
        const arr = new Uint8Array(16);
        crypto.getRandomValues(arr);
        arr[6] = (arr[6] & 0x0f) | 0x40;
        arr[8] = (arr[8] & 0x3f) | 0x80;
        const hex = Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
        let uuid = hex.substr(0,8) + '-' + hex.substr(8,4) + '-' + hex.substr(12,4) + '-' + hex.substr(16,4) + '-' + hex.substr(20,12);
        if (format === 'uppercase') uuid = uuid.toUpperCase();
        else if (format === 'nodash') uuid = uuid.replace(/-/g, '');
        else if (format === 'brace') uuid = '{' + uuid + '}';
        uuids.push(uuid);
    }
    document.getElementById('uuidOutput').textContent = uuids.join('\n');
    document.getElementById('uuidOutput').classList.add('show');
}

function copyUUID() {
    const text = document.getElementById('uuidOutput').textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== Base Converter ====================
function convertBase() {
    const input = document.getElementById('bcInput').value.trim();
    const fromBase = parseInt(document.getElementById('bcFrom').value);
    if (!input) { ['bcBin','bcOct','bcDec','bcHex'].forEach(id => document.getElementById(id).textContent = ''); return; }
    let decimal;
    try {
        decimal = parseInt(input, fromBase);
        if (isNaN(decimal)) throw new Error();
    } catch(e) {
        ['bcBin','bcOct','bcDec','bcHex'].forEach(id => document.getElementById(id).textContent = '无效输入');
        return;
    }
    document.getElementById('bcBin').textContent = decimal.toString(2);
    document.getElementById('bcOct').textContent = decimal.toString(8);
    document.getElementById('bcDec').textContent = decimal.toString(10);
    document.getElementById('bcHex').textContent = decimal.toString(16).toUpperCase();
}

convertBase();

// ==================== Text Dedup ====================
function dedupText() {
    const input = document.getElementById('dedupInput').value;
    const sort = document.getElementById('dedupSort').checked;
    const trim = document.getElementById('dedupTrim').checked;
    const removeEmpty = document.getElementById('dedupEmpty').checked;
    const ignoreCase = document.getElementById('dedupCase').checked;
    let lines = input.split('\n');
    const origCount = lines.length;
    if (trim) lines = lines.map(l => l.trim());
    if (removeEmpty) lines = lines.filter(l => l !== '');
    const seen = new Set();
    const result = [];
    lines.forEach(line => {
        const key = ignoreCase ? line.toLowerCase() : line;
        if (!seen.has(key)) { seen.add(key); result.push(line); }
    });
    if (sort) result.sort();
    document.getElementById('dedupOrig').textContent = origCount;
    document.getElementById('dedupNew').textContent = result.length;
    document.getElementById('dedupRemoved').textContent = origCount - result.length;
    document.getElementById('dedupOutput').textContent = result.join('\n');
    document.getElementById('dedupOutput').classList.add('show');
}

function copyDedup() {
    const text = document.getElementById('dedupOutput').textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== Text Diff ====================
function diffText() {
    const left = document.getElementById('diffLeft').value.split('\n');
    const right = document.getElementById('diffRight').value.split('\n');
    const output = [];
    const maxLen = Math.max(left.length, right.length);
    for (let i = 0; i < maxLen; i++) {
        const l = left[i] || '';
        const r = right[i] || '';
        if (l === r) {
            output.push('  ' + l);
        } else {
            if (l) output.push('- ' + l);
            if (r) output.push('+ ' + r);
        }
    }
    const out = document.getElementById('diffOutput');
    out.textContent = output.join('\n');
    out.classList.add('show');
}

// ==================== Regex Tester ====================
function testRegex() {
    const pattern = document.getElementById('regexPattern').value;
    const text = document.getElementById('regexText').value;
    const valueEl = document.getElementById('regexValue');
    const detailEl = document.getElementById('regexDetail');
    if (!pattern || !text) { valueEl.textContent = '输入正则开始测试'; detailEl.innerHTML = ''; return; }
    let flags = '';
    if (document.getElementById('regexGlobal').checked) flags += 'g';
    if (document.getElementById('regexCase').checked) flags += 'i';
    if (document.getElementById('regexMulti').checked) flags += 'm';
    try {
        const regex = new RegExp(pattern, flags);
        const matches = [];
        let m;
        if (flags.includes('g')) {
            while ((m = regex.exec(text)) !== null) { matches.push(m[0]); if (m.index === regex.lastIndex) regex.lastIndex++; }
        } else {
            m = regex.exec(text);
            if (m) matches.push(m[0]);
        }
        if (matches.length === 0) {
            valueEl.textContent = '无匹配结果';
            valueEl.style.color = 'var(--warning)';
            detailEl.innerHTML = '';
        } else {
            valueEl.textContent = '找到 ' + matches.length + ' 个匹配';
            valueEl.style.color = 'var(--success)';
            detailEl.innerHTML = '<table>' + matches.map((m, i) => '<tr><td>匹配 ' + (i+1) + '</td><td>' + m.replace(/</g,'&lt;') + '</td></tr>').join('') + '</table>';
        }
    } catch(e) {
        valueEl.textContent = '正则表达式错误: ' + e.message;
        valueEl.style.color = 'var(--danger)';
        detailEl.innerHTML = '';
    }
}

// ==================== CSS Minifier ====================
function minifyCSS() {
    const input = document.getElementById('cssInput').value;
    if (!input) { document.getElementById('cssOutput').textContent = ''; return; }
    const origSize = new Blob([input]).size;
    const minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim();
    const newSize = new Blob([minified]).size;
    const saved = origSize > 0 ? Math.round((1 - newSize / origSize) * 100) : 0;
    document.getElementById('cssOrigSize').textContent = origSize + ' 字节';
    document.getElementById('cssNewSize').textContent = newSize + ' 字节';
    document.getElementById('cssSaved').textContent = saved + '%';
    const out = document.getElementById('cssOutput');
    out.textContent = minified;
    out.classList.add('show');
}

function copyCSS() {
    const text = document.getElementById('cssOutput').textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== Lorem Ipsum Generator ====================
const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

function generateLorem() {
    const type = document.getElementById('loremType').value;
    const count = Math.min(parseInt(document.getElementById('loremCount').value) || 1, 50);
    let result = '';
    if (type === 'words') {
        const words = [];
        for (let i = 0; i < count; i++) words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
        result = words.join(' ');
    } else if (type === 'sentences') {
        const sentences = [];
        for (let i = 0; i < count; i++) {
            const len = 8 + Math.floor(Math.random() * 12);
            const words = [];
            for (let j = 0; j < len; j++) words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
            let s = words.join(' ');
            s = s.charAt(0).toUpperCase() + s.slice(1) + '.';
            sentences.push(s);
        }
        result = sentences.join(' ');
    } else {
        const paragraphs = [];
        for (let i = 0; i < count; i++) {
            const sentences = [];
            const sCount = 3 + Math.floor(Math.random() * 3);
            for (let j = 0; j < sCount; j++) {
                const len = 8 + Math.floor(Math.random() * 12);
                const words = [];
                for (let k = 0; k < len; k++) words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
                let s = words.join(' ');
                s = s.charAt(0).toUpperCase() + s.slice(1) + '.';
                sentences.push(s);
            }
            paragraphs.push(sentences.join(' '));
        }
        result = paragraphs.join('\n\n');
    }
    const out = document.getElementById('loremOutput');
    out.textContent = result;
    out.classList.add('show');
}

function copyLorem() {
    const text = document.getElementById('loremOutput').textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== HTTP Status Code Lookup ====================
const httpCodes = {
    '100': { name: 'Continue', desc: '服务器已收到请求头，客户端应继续发送请求体。' },
    '101': { name: 'Switching Protocols', desc: '服务器同意切换协议（如升级到 WebSocket）。' },
    '200': { name: 'OK', desc: '请求成功。最常见的成功状态码。' },
    '201': { name: 'Created', desc: '请求成功并创建了新资源。' },
    '204': { name: 'No Content', desc: '请求成功但无返回内容。' },
    '301': { name: 'Moved Permanently', desc: '资源已永久重定向到新 URL。' },
    '302': { name: 'Found', desc: '资源临时重定向到其他 URL。' },
    '304': { name: 'Not Modified', desc: '资源未修改，客户端可使用缓存版本。' },
    '400': { name: 'Bad Request', desc: '请求语法错误，服务器无法理解。' },
    '401': { name: 'Unauthorized', desc: '请求需要身份验证。' },
    '403': { name: 'Forbidden', desc: '服务器拒绝请求（权限不足）。' },
    '404': { name: 'Not Found', desc: '请求的资源不存在。' },
    '405': { name: 'Method Not Allowed', desc: '请求方法不被允许。' },
    '408': { name: 'Request Timeout', desc: '请求超时。' },
    '409': { name: 'Conflict', desc: '请求冲突（如并发编辑）。' },
    '429': { name: 'Too Many Requests', desc: '请求过于频繁，被限流。' },
    '500': { name: 'Internal Server Error', desc: '服务器内部错误。' },
    '502': { name: 'Bad Gateway', desc: '网关收到无效响应。' },
    '503': { name: 'Service Unavailable', desc: '服务暂时不可用（过载或维护）。' },
    '504': { name: 'Gateway Timeout', desc: '网关等待上游响应超时。' }
};

function lookupHTTP() {
    const code = document.getElementById('httpInput').value.trim();
    const valueEl = document.getElementById('httpValue');
    const detailEl = document.getElementById('httpDetail');
    const info = httpCodes[code];
    if (info) {
        let category = '';
        let catColor = '';
        const c = parseInt(code);
        if (c >= 100 && c < 200) { category = '1xx 信息性'; catColor = 'var(--text-light)'; }
        else if (c >= 200 && c < 300) { category = '2xx 成功'; catColor = 'var(--success)'; }
        else if (c >= 300 && c < 400) { category = '3xx 重定向'; catColor = 'var(--warning)'; }
        else if (c >= 400 && c < 500) { category = '4xx 客户端错误'; catColor = 'var(--danger)'; }
        else if (c >= 500) { category = '5xx 服务器错误'; catColor = 'var(--danger)'; }
        valueEl.textContent = code + ' ' + info.name;
        valueEl.style.color = catColor;
        detailEl.innerHTML = '<table>' +
            '<tr><td>类别</td><td>' + category + '</td></tr>' +
            '<tr><td>含义</td><td>' + info.desc + '</td></tr>' +
            '</table>';
    } else {
        valueEl.textContent = '未找到状态码: ' + code;
        valueEl.style.color = 'var(--text-light)';
        detailEl.innerHTML = '';
    }
}

// ==================== JWT Decoder ====================
function decodeJWT() {
    const token = document.getElementById('jwtInput').value.trim();
    const headerEl = document.getElementById('jwtHeader');
    const payloadEl = document.getElementById('jwtPayload');
    const metaWrap = document.getElementById('jwtMetaWrap');
    if (!token) { headerEl.textContent = '等待输入...'; payloadEl.textContent = '等待输入...'; metaWrap.style.display = 'none'; return; }
    const parts = token.split('.');
    if (parts.length < 2) {
        headerEl.textContent = '错误: JWT格式不正确，应包含至少2个点分隔的部分';
        headerEl.style.color = 'var(--danger)';
        payloadEl.textContent = '';
        metaWrap.style.display = 'none';
        return;
    }
    try {
        function b64Decode(str) {
            str = str.replace(/-/g, '+').replace(/_/g, '/');
            while (str.length % 4) str += '=';
            return decodeURIComponent(escape(atob(str)));
        }
        const header = JSON.parse(b64Decode(parts[0]));
        const payload = JSON.parse(b64Decode(parts[1]));
        headerEl.textContent = JSON.stringify(header, null, 2);
        headerEl.style.color = 'var(--text)';
        payloadEl.textContent = JSON.stringify(payload, null, 2);
        payloadEl.style.color = 'var(--text)';
        // Show metadata
        if (header.alg) document.getElementById('jwtAlg').textContent = header.alg;
        if (payload.iat) document.getElementById('jwtIat').textContent = new Date(payload.iat * 1000).toLocaleString('zh-CN');
        else document.getElementById('jwtIat').textContent = '未指定';
        if (payload.exp) document.getElementById('jwtExp').textContent = new Date(payload.exp * 1000).toLocaleString('zh-CN');
        else document.getElementById('jwtExp').textContent = '未指定';
        metaWrap.style.display = 'block';
    } catch(e) {
        headerEl.textContent = '解码失败: ' + e.message;
        headerEl.style.color = 'var(--danger)';
        payloadEl.textContent = '';
        metaWrap.style.display = 'none';
    }
}

function copyJWT() {
    const text = document.getElementById('jwtPayload').textContent;
    if (!text || text === '等待输入...') return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== Cron Expression Generator ====================
function generateCron() {
    const min = document.getElementById('cronMin').value.trim() || '*';
    const hour = document.getElementById('cronHour').value.trim() || '*';
    const day = document.getElementById('cronDay').value.trim() || '*';
    const month = document.getElementById('cronMonth').value.trim() || '*';
    const week = document.getElementById('cronWeek').value.trim() || '*';
    const cron = min + ' ' + hour + ' ' + day + ' ' + month + ' ' + week;
    document.getElementById('cronValue').textContent = cron;
    document.getElementById('cronDesc').textContent = describeCron(min, hour, day, month, week);
}

function applyCronPreset() {
    const preset = document.getElementById('cronPreset').value;
    if (!preset) return;
    const parts = preset.split(' ');
    document.getElementById('cronMin').value = parts[0];
    document.getElementById('cronHour').value = parts[1];
    document.getElementById('cronDay').value = parts[2];
    document.getElementById('cronMonth').value = parts[3];
    document.getElementById('cronWeek').value = parts[4];
    generateCron();
}

function describeCron(min, hour, day, month, week) {
    const parts = [];
    if (min === '*' && hour === '*' && day === '*' && month === '*' && week === '*') return '每分钟执行';
    if (min.startsWith('*/')) return '每' + min.replace('*/', '') + '分钟执行';
    if (hour.startsWith('*/')) return '每' + hour.replace('*/', '') + '小时的第' + min + '分钟执行';
    if (week === '1-5' && hour !== '*' && min !== '*') return '每个工作日' + (hour.includes(',') ? hour.split(',').join('点和') : hour) + '点' + (min !== '0' ? min + '分' : '') + '执行';
    if (day === '*' && month === '*' && week === '*') return '每天' + hour + '点' + (min !== '0' ? min + '分' : '') + '执行';
    if (day === '1' && month === '*' && week === '*') return '每月1号' + hour + '点' + (min !== '0' ? min + '分' : '') + '执行';
    if (day === '*' && month === '*' && week === '0') return '每周日' + hour + '点' + (min !== '0' ? min + '分' : '') + '执行';
    if (day === '1' && month === '1' && week === '*') return '每年1月1号' + hour + '点' + (min !== '0' ? min + '分' : '') + '执行';
    return '自定义: ' + min + '分 ' + hour + '时 ' + day + '日 ' + month + '月 ' + week + '周';
}

function copyCron() {
    const text = document.getElementById('cronValue').textContent;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== HTML Encode/Decode ====================
function htmlEncode() {
    const input = document.getElementById('htmlInput').value;
    if (!input) { document.getElementById('htmlOutput').textContent = '等待操作...'; return; }
    const encoded = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    document.getElementById('htmlOutput').textContent = encoded;
}

function htmlDecode() {
    const input = document.getElementById('htmlInput').value;
    if (!input) { document.getElementById('htmlOutput').textContent = '等待操作...'; return; }
    const textarea = document.createElement('textarea');
    textarea.innerHTML = input;
    document.getElementById('htmlOutput').textContent = textarea.value;
}

function copyHtmlResult() {
    const text = document.getElementById('htmlOutput').textContent;
    if (!text || text === '等待操作...') return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== IP Address Query ====================
function queryIP() {
    const input = document.getElementById('ipInput').value.trim();
    const maskInput = document.getElementById('ipMask').value.trim();
    if (!input) return;
    // Parse CIDR from IP if present
    let ip = input;
    let cidr = parseInt(maskInput) || 24;
    if (input.includes('/')) {
        const parts = input.split('/');
        ip = parts[0];
        cidr = parseInt(parts[1]) || 24;
    }
    const octets = ip.split('.');
    if (octets.length !== 4) {
        document.getElementById('ipAddr').textContent = '无效的IP地址';
        return;
    }
    const octNums = octets.map(o => parseInt(o));
    if (octNums.some(o => isNaN(o) || o < 0 || o > 255)) {
        document.getElementById('ipAddr').textContent = '无效的IP地址';
        return;
    }
    // IP class
    const first = octNums[0];
    let ipClass = '', ipType = '';
    if (first >= 1 && first <= 126) ipClass = 'A类';
    else if (first >= 128 && first <= 191) ipClass = 'B类';
    else if (first >= 192 && first <= 223) ipClass = 'C类';
    else if (first >= 224 && first <= 239) ipClass = 'D类 (组播)';
    else if (first >= 240) ipClass = 'E类 (保留)';
    // Private/public
    if ((first === 10) || (first === 172 && octNums[1] >= 16 && octNums[1] <= 31) || (first === 192 && octNums[1] === 168) || (first === 127)) {
        ipType = first === 127 ? '环回地址 (Loopback)' : '私有地址';
    } else {
        ipType = '公有地址';
    }
    // Binary
    const binary = octNums.map(o => o.toString(2).padStart(8, '0')).join('.');
    // Subnet mask from CIDR
    const maskBinary = '1'.repeat(cidr).padEnd(32, '0');
    const maskOctets = [];
    for (let i = 0; i < 4; i++) maskOctets.push(parseInt(maskBinary.substring(i * 8, i * 8 + 8), 2));
    const subnetMask = maskOctets.join('.');
    // Network address
    const ipNum = octNums.reduce((acc, o, i) => acc + (o << (24 - i * 8)), 0) >>> 0;
    const maskNum = parseInt(maskBinary, 2) >>> 0;
    const networkNum = (ipNum & maskNum) >>> 0;
    const broadcastNum = (networkNum | (~maskNum >>> 0)) >>> 0;
    function numToIP(num) {
        return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
    }
    const networkAddr = numToIP(networkNum);
    const broadcastAddr = numToIP(broadcastNum);
    const hostCount = Math.pow(2, 32 - cidr) - 2;
    const firstHost = numToIP(networkNum + 1);
    const lastHost = numToIP(broadcastNum - 1);
    // Display
    document.getElementById('ipAddr').textContent = ip + '/' + cidr;
    document.getElementById('ipClass').textContent = ipClass;
    document.getElementById('ipType').textContent = ipType;
    document.getElementById('ipBinary').textContent = binary;
    document.getElementById('ipSubnetMask').textContent = subnetMask;
    document.getElementById('ipNetwork').textContent = networkAddr;
    document.getElementById('ipBroadcast').textContent = broadcastAddr;
    document.getElementById('ipHosts').textContent = hostCount.toLocaleString() + ' 台';
    document.getElementById('ipRange').textContent = firstHost + ' - ' + lastHost;
}

// ==================== JS Minifier ====================
function minifyJS() {
    const input = document.getElementById('jsInput').value;
    if (!input) { document.getElementById('jsOutput').textContent = '等待输入...'; return; }
    const origSize = new Blob([input]).size;
    const minified = input
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/[^\n]*/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}();,:=<>+\-*/&|!?\[\]])\s*/g, '$1')
        .replace(/;}/g, '}')
        .trim();
    const newSize = new Blob([minified]).size;
    const saved = origSize > 0 ? Math.round((1 - newSize / origSize) * 100) : 0;
    document.getElementById('jsOrigSize').textContent = origSize + ' 字节';
    document.getElementById('jsNewSize').textContent = newSize + ' 字节';
    document.getElementById('jsSaved').textContent = saved + '%';
    document.getElementById('jsOutput').textContent = minified;
}

function copyJS() {
    const text = document.getElementById('jsOutput').textContent;
    if (!text || text === '等待输入...') return;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const orig = btn.textContent;
        btn.textContent = '已复制!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
    });
}

// ==================== Case Convert ====================
function convertCase() {
    const input = document.getElementById('caseInput').value.trim();
    if (!input) {
        ['caseCamel','casePascal','caseSnake','caseKebab','caseConst','caseLower'].forEach(function(id) {
            document.getElementById(id).textContent = '';
        });
        return;
    }
    // Split into words
    let words = input
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_\-\.]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(function(w) { return w.length > 0; });
    if (words.length === 0) return;
    var lower = words.map(function(w) { return w.toLowerCase(); });
    // camelCase
    var camel = lower[0] + lower.slice(1).map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join('');
    // PascalCase
    var pascal = lower.map(function(w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join('');
    // snake_case
    var snake = lower.join('_');
    // kebab-case
    var kebab = lower.join('-');
    // CONSTANT_CASE
    var constant = lower.map(function(w) { return w.toUpperCase(); }).join('_');
    // lowercase
    var lowerAll = lower.join(' ');
    document.getElementById('caseCamel').textContent = camel;
    document.getElementById('casePascal').textContent = pascal;
    document.getElementById('caseSnake').textContent = snake;
    document.getElementById('caseKebab').textContent = kebab;
    document.getElementById('caseConst').textContent = constant;
    document.getElementById('caseLower').textContent = lowerAll;
}

// ==================== Character/Byte Counter ====================
function countChars() {
    const input = document.getElementById('charInput').value;
    const charCount = input.length;
    const byteCount = new Blob([input]).size;
    const cjk = (input.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff]/g) || []).length;
    const letters = (input.match(/[a-zA-Z]/g) || []).length;
    const digits = (input.match(/[0-9]/g) || []).length;
    const spaces = (input.match(/\s/g) || []).length;
    const lines = input === '' ? 0 : input.split('\n').length;
    const words = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
    document.getElementById('charCount').textContent = charCount.toLocaleString();
    document.getElementById('byteCount').textContent = byteCount.toLocaleString();
    document.getElementById('cjkCount').textContent = cjk;
    document.getElementById('letterCount').textContent = letters;
    document.getElementById('digitCount').textContent = digits;
    document.getElementById('spaceCount').textContent = spaces;
    document.getElementById('lineCount').textContent = lines;
    document.getElementById('wordCount').textContent = words;
}

// ==================== Random Number Generator ====================
function genRandom() {
    var min = parseInt(document.getElementById('randMin').value) || 0;
    var max = parseInt(document.getElementById('randMax').value) || 100;
    var count = parseInt(document.getElementById('randCount').value) || 1;
    var unique = document.getElementById('randUnique').checked;
    if (min > max) { var t = min; min = max; max = t; }
    var range = max - min + 1;
    if (unique && count > range) {
        document.getElementById('randomValue').textContent = '错误：不重复模式下数量不能超过范围（' + range + '）';
        return;
    }
    var results = [];
    var used = {};
    while (results.length < count) {
        var n = min + Math.floor(Math.random() * range);
        if (unique) {
            if (used[n]) continue;
            used[n] = true;
        }
        results.push(n);
    }
    document.getElementById('randomValue').textContent = results.join(', ');
}

// ==================== Date Difference Calculator ====================
function calcDateDiff() {
    var startStr = document.getElementById('dateDiffStart').value;
    var endStr = document.getElementById('dateDiffEnd').value;
    if (!startStr || !endStr) {
        document.getElementById('dateDiffValue').textContent = '请选择两个日期';
        document.getElementById('dateDiffDetail').textContent = '';
        return;
    }
    var start = new Date(startStr);
    var end = new Date(endStr);
    if (start > end) { var t = start; start = end; end = t; }
    var diffMs = end - start;
    var diffDays = Math.floor(diffMs / 86400000);
    var diffWeeks = Math.floor(diffDays / 7);
    var diffMonths = Math.floor(diffDays / 30.44);
    var diffYears = Math.floor(diffDays / 365.25);
    var workDays = 0;
    var temp = new Date(start);
    while (temp <= end) {
        var dow = temp.getDay();
        if (dow !== 0 && dow !== 6) workDays++;
        temp.setDate(temp.getDate() + 1);
    }
    document.getElementById('dateDiffValue').textContent = diffDays.toLocaleString() + ' 天';
    document.getElementById('dateDiffDetail').innerHTML =
        '约 ' + diffWeeks + ' 周 | ' + diffMonths + ' 个月 | ' + diffYears + ' 年<br>' +
        '工作日：' + workDays + ' 天（不含周末）';
}

// ==================== Percentage Calculator ====================
function switchPercentMode() {
    var mode = document.getElementById('percentMode').value;
    var labelA = document.getElementById('percentLabelA');
    var labelB = document.getElementById('percentLabelB');
    if (mode === 'basic') {
        labelA.textContent = '数值A（部分）';
        labelB.textContent = '数值B（总数）';
    } else if (mode === 'growth') {
        labelA.textContent = '原数值（之前）';
        labelB.textContent = '新数值（之后）';
    } else {
        labelA.textContent = '原价';
        labelB.textContent = '折扣（如8表示8折）';
    }
    calcPercent();
}

function calcPercent() {
    var mode = document.getElementById('percentMode').value;
    var a = parseFloat(document.getElementById('percentA').value) || 0;
    var b = parseFloat(document.getElementById('percentB').value) || 0;
    var result = '';
    if (mode === 'basic') {
        if (b === 0) result = '错误：总数不能为0';
        else result = ((a / b) * 100).toFixed(2) + '%';
    } else if (mode === 'growth') {
        if (a === 0) result = '错误：原数值不能为0';
        else {
            var growth = ((b - a) / Math.abs(a) * 100);
            result = (growth >= 0 ? '+' : '') + growth.toFixed(2) + '%';
        }
    } else {
        var discount = b / 10;
        var finalPrice = a * discount;
        var saved = a - finalPrice;
        result = '折后价：' + finalPrice.toFixed(2) + ' 元（省 ' + saved.toFixed(2) + ' 元）';
    }
    document.getElementById('percentValue').textContent = result;
}

// ==================== Image to Base64 ====================
function convertImgToBase64() {
    var file = document.getElementById('imgFile').files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
        var base64 = e.target.result;
        document.getElementById('imgPreview').src = base64;
        document.getElementById('base64Output').value = base64;
        document.getElementById('base64Size').textContent = base64.length.toLocaleString();
        document.getElementById('imgBase64Result').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function copyBase64() {
    var output = document.getElementById('base64Output');
    output.select();
    document.execCommand('copy');
    alert('Base64 已复制到剪贴板');
}

// ==================== Morse Code ====================
var morseMap = {
    'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....','I':'..',
    'J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.',
    'S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-','Y':'-.--','Z':'--..',
    '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....',
    '7':'--...','8':'---..','9':'----.','.':'.-.-.-',',':'--..--','?':'..--..','/':'-..-.',
    '-':'-....-','(':'-.--.',')':'-.--.-','=':'-...-',':':'---...',';':'-.-.-.','!':'-.-.--',
    '@':'.--.-.'
};
var reverseMorse = {};
Object.keys(morseMap).forEach(function(k) { reverseMorse[morseMap[k]] = k; });

function morseEncode() {
    var input = document.getElementById('morseInput').value.toUpperCase().trim();
    if (!input) { document.getElementById('morseOutput').textContent = '-'; return; }
    var result = [];
    for (var i = 0; i < input.length; i++) {
        var ch = input[i];
        if (ch === ' ') { result.push('/'); continue; }
        if (morseMap[ch]) { result.push(morseMap[ch]); }
    }
    document.getElementById('morseOutput').textContent = result.join(' ');
}

function morseDecode() {
    var input = document.getElementById('morseInput').value.trim();
    if (!input) { document.getElementById('morseOutput').textContent = '-'; return; }
    var words = input.split(/\s*\/\s*/);
    var result = [];
    words.forEach(function(word, wi) {
        var codes = word.split(/\s+/);
        codes.forEach(function(code) {
            code = code.trim();
            if (!code) return;
            if (reverseMorse[code]) result.push(reverseMorse[code]);
        });
        if (wi < words.length - 1) result.push(' ');
    });
    document.getElementById('morseOutput').textContent = result.join('') || '无法识别';
}

function convertMorse() {}

// ==================== 密码强度检测 ====================
function checkPwdStrength() {
    var pwd = document.getElementById('pwdInput').value;
    var result = document.getElementById('pwdResult');
    var bar = document.getElementById('pwdBar');
    var text = document.getElementById('pwdText');
    if (!pwd) { result.style.display = 'none'; return; }
    var score = 0;
    var tips = [];
    if (pwd.length >= 8) score += 20; else tips.push('密码长度至少8位');
    if (pwd.length >= 12) score += 10;
    if (/[a-z]/.test(pwd)) score += 15;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/\d/.test(pwd)) score += 15;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 15;
    var repeated = /(.)\1{2,}/.test(pwd);
    if (repeated) { score -= 10; tips.push('避免连续重复字符'); }
    var common = ['123456','password','qwerty','abc123','111111'];
    if (common.some(function(c) { return pwd.toLowerCase().indexOf(c) !== -1; })) { score = Math.min(score, 20); tips.push('避免使用常见弱密码'); }
    score = Math.max(0, Math.min(100, score));
    result.style.display = 'block';
    bar.style.width = score + '%';
    if (score < 40) { bar.style.background = '#ef4444'; text.textContent = '弱 - ' + (tips.length ? tips.join('，') : '建议增加复杂度'); }
    else if (score < 70) { bar.style.background = '#f59e0b'; text.textContent = '中等 - 还可以更强'; }
    else { bar.style.background = '#10b981'; text.textContent = '强 - 安全性很好'; }
}

// ==================== 汇率换算器 ====================
function convertCurrency() {
    var amount = parseFloat(document.getElementById('currencyAmount').value) || 0;
    var fromC = document.getElementById('currencyFrom').value;
    var toC = document.getElementById('currencyTo').value;
    var rates = {CNY:1,USD:0.138,EUR:0.128,GBP:0.109,JPY:20.8,KRW:187,AUD:0.21,CAD:0.19,HKD:1.08,TWD:4.5};
    var cny = amount / rates[fromC];
    var result = cny * rates[toC];
    var names = {CNY:'人民币',USD:'美元',EUR:'欧元',GBP:'英镑',JPY:'日元',KRW:'韩元',AUD:'澳元',CAD:'加元',HKD:'港币',TWD:'新台币'};
    document.getElementById('currencyResult').style.display = 'block';
    document.getElementById('currencyValue').textContent = result.toFixed(2) + ' ' + names[toC];
}

// ==================== 文本反转工具 ====================
function reverseText() {
    var text = document.getElementById('reverseInput').value;
    var mode = document.getElementById('reverseMode').value;
    var result = '';
    if (mode === 'full') result = text.split('').reverse().join('');
    else if (mode === 'words') result = text.split(/\s+/).reverse().join(' ');
    else if (mode === 'lines') result = text.split('\n').reverse().join('\n');
    document.getElementById('reverseOutput').textContent = result;
    document.getElementById('reverseOutput').classList.add('show');
}

// ==================== 列表排序工具 ====================
function sortList() {
    var text = document.getElementById('sortInput').value;
    var mode = document.getElementById('sortMode').value;
    var dedup = document.getElementById('sortDedup').checked;
    var lines = text.split('\n').filter(function(l) { return l.trim() !== ''; });
    if (dedup) {
        var seen = {};
        lines = lines.filter(function(l) { if (seen[l]) return false; seen[l] = true; return true; });
    }
    if (mode === 'alpha') lines.sort(function(a,b) { return a.localeCompare(b, 'zh-CN'); });
    else if (mode === 'alphadesc') lines.sort(function(a,b) { return b.localeCompare(a, 'zh-CN'); });
    else if (mode === 'num') lines.sort(function(a,b) { return parseFloat(a) - parseFloat(b); });
    else if (mode === 'length') lines.sort(function(a,b) { return a.length - b.length; });
    else if (mode === 'shuffle') {
        for (var i = lines.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = lines[i]; lines[i] = lines[j]; lines[j] = temp;
        }
    }
    document.getElementById('sortOutput').textContent = lines.join('\n');
    document.getElementById('sortOutput').classList.add('show');
}

// ==================== 文件大小转换 ====================
function convertFileSize() {
    var size = parseFloat(document.getElementById('filesizeInput').value) || 0;
    var unit = document.getElementById('filesizeUnit').value;
    var units = {B:1,KB:1024,MB:1048576,GB:1073741824,TB:1099511627776,PB:1125899906842624};
    var bytes = size * units[unit];
    var result = document.getElementById('filesizeResult');
    result.innerHTML = '';
    var labels = {B:'字节',KB:'KB',MB:'MB',GB:'GB',TB:'TB',PB:'PB'};
    for (var u in units) {
        var val = bytes / units[u];
        var display = val < 0.01 ? val.toExponential(2) : val.toFixed(2).replace(/\.00$/, '');
        if (val >= 0.001 || u === 'B') {
            result.innerHTML += '<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);"><span>' + labels[u] + '</span><strong>' + display + '</strong></div>';
        }
    }
    result.style.display = 'block';
}

// ==================== 文本排版工具 ====================
function formatParagraph() {
    var text = document.getElementById('paraInput').value;
    var removeEmpty = document.getElementById('paraRemoveEmpty').checked;
    var trimSpaces = document.getElementById('paraTrim').checked;
    var fixIndent = document.getElementById('paraIndent').checked;
    var result = text;
    if (trimSpaces) result = result.split('\n').map(function(l) { return l.trim(); }).join('\n');
    if (removeEmpty) result = result.split('\n').filter(function(l) { return l.trim() !== ''; }).join('\n');
    if (fixIndent) result = result.split('\n').map(function(l) { return l.replace(/^\s+/, ''); }).join('\n');
    document.getElementById('paraOutput').textContent = result;
    document.getElementById('paraOutput').classList.add('show');
}

// ==================== SVG预览器 ====================
function previewSVG() {
    var code = document.getElementById('svgInput').value.trim();
    var preview = document.getElementById('svgPreview');
    if (!code) { preview.innerHTML = '<span style="color:var(--text-light)">请输入SVG代码</span>'; return; }
    preview.innerHTML = code;
}

// ==================== CSS渐变生成器 ====================
function generateGradient() {
    var type = document.getElementById('gradType').value;
    var colors = [];
    for (var i = 1; i <= 3; i++) {
        var c = document.getElementById('gradColor' + i).value;
        var p = document.getElementById('gradPos' + i).value;
        colors.push(c + ' ' + p + '%');
    }
    var code = type === 'linear'
        ? 'linear-gradient(135deg, ' + colors.join(', ') + ')'
        : 'radial-gradient(circle, ' + colors.join(', ') + ')';
    document.getElementById('gradPreview').style.background = code;
    document.getElementById('gradCode').textContent = 'background: ' + code + ';';
    document.getElementById('gradCode').classList.add('show');
}

// ==================== 网页配色方案 ====================
function generatePalette() {
    var base = document.getElementById('paletteBase').value;
    var hsl = hexToHSL(base);
    var colors = [
        {h: hsl.h, s: hsl.s, l: Math.max(5, hsl.l - 30)},
        {h: hsl.h, s: hsl.s, l: Math.max(10, hsl.l - 15)},
        {h: hsl.h, s: hsl.s, l: hsl.l},
        {h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l},
        {h: (hsl.h + 60) % 360, s: hsl.s, l: hsl.l},
        {h: (hsl.h + 180) % 360, s: hsl.s, l: Math.min(90, hsl.l + 10)}
    ];
    var html = '<div style="display:flex;gap:8px;flex-wrap:wrap;">';
    var names = ['深主色','浅主色','主色','类似色1','类似色2','互补色'];
    colors.forEach(function(c, idx) {
        var hex = hslToHex(c.h, c.s, c.l);
        html += '<div style="flex:1;min-width:80px;text-align:center;">' +
            '<div style="height:60px;border-radius:8px;background:' + hex + ';border:1px solid var(--border);margin-bottom:4px;"></div>' +
            '<div style="font-size:0.75rem;">' + names[idx] + '</div>' +
            '<div style="font-size:0.7rem;color:var(--text-light);font-family:monospace;">' + hex + '</div>' +
            '<button class="copy-btn" onclick="navigator.clipboard.writeText(\'' + hex + '\')">复制</button>' +
            '</div>';
    });
    html += '</div>';
    document.getElementById('paletteResult').innerHTML = html;
    document.getElementById('paletteResult').style.display = 'block';
}

function hexToHSL(hex) {
    var r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
    var max = Math.max(r,g,b), min = Math.min(r,g,b);
    var h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) { case r: h = (g-b)/d + (g<b?6:0); break; case g: h = (b-r)/d + 2; break; case b: h = (r-g)/d + 4; break; }
        h /= 6;
    }
    return {h: Math.round(h*360), s: Math.round(s*100), l: Math.round(l*100)};
}

function hslToHex(h, s, l) {
    s /= 100; l /= 100;
    var c = (1 - Math.abs(2*l - 1)) * s;
    var x = c * (1 - Math.abs((h/60) % 2 - 1));
    var m = l - c/2;
    var r, g, b;
    if (h < 60) { r=c; g=x; b=0; }
    else if (h < 120) { r=x; g=c; b=0; }
    else if (h < 180) { r=0; g=c; b=x; }
    else if (h < 240) { r=0; g=x; b=c; }
    else if (h < 300) { r=x; g=0; b=c; }
    else { r=c; g=0; b=x; }
    var toHex = function(n) { var hex = Math.round((n+m)*255).toString(16); return hex.length === 1 ? '0'+hex : hex; };
    return '#' + toHex(r) + toHex(g) + toHex(b);
}

// ==================== 短链接生成器 ====================
function generateShortLink() {
    var url = document.getElementById('shortlinkInput').value.trim();
    if (!url) { alert('请输入要缩短的URL'); return; }
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (var i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    var short = 'https://t-hub.asia/' + code;
    document.getElementById('shortlinkResult').innerHTML = '<div style="font-size:1.2rem;font-weight:600;color:var(--primary);margin-bottom:8px;">' + short + '</div>' +
        '<div style="font-size:0.85rem;color:var(--text-light);margin-bottom:12px;">原链接：' + url.substring(0,50) + (url.length>50?'...':'') + '</div>' +
        '<button class="copy-btn" onclick="navigator.clipboard.writeText(\'' + short + '\')">复制短链接</button>';
    document.getElementById('shortlinkResult').style.display = 'block';
}

// ==================== 阅读速度计算 ====================
function calcReadSpeed() {
    var text = document.getElementById('readInput').value;
    var wpm = parseInt(document.getElementById('readWPM').value) || 300;
    var cnCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    var enWords = (text.match(/[a-zA-Z]+/g) || []).length;
    var totalWords = cnCount + enWords;
    var minutes = Math.ceil(totalWords / wpm);
    var seconds = Math.round((totalWords / wpm) * 60) % 60;
    var speakMinutes = Math.ceil(totalWords / 150);
    document.getElementById('readResult').innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;">' +
        '<div style="text-align:center;padding:12px;background:var(--bg);border-radius:8px;"><div style="font-size:1.5rem;font-weight:700;color:var(--primary);">' + totalWords + '</div><div style="font-size:0.8rem;color:var(--text-light);">总字数</div></div>' +
        '<div style="text-align:center;padding:12px;background:var(--bg);border-radius:8px;"><div style="font-size:1.5rem;font-weight:700;color:var(--primary);">' + minutes + '分' + (seconds?' '+seconds+'秒':'') + '</div><div style="font-size:0.8rem;color:var(--text-light);">静默阅读</div></div>' +
        '<div style="text-align:center;padding:12px;background:var(--bg);border-radius:8px;"><div style="font-size:1.5rem;font-weight:700;color:var(--primary);">' + speakMinutes + '分钟</div><div style="font-size:0.8rem;color:var(--text-light);">朗读时间</div></div>' +
        '</div>';
    document.getElementById('readResult').style.display = 'block';
}

// ==================== Scientific Calculator ====================
function calcInput(val) {
    var expr = document.getElementById('calcExpr');
    expr.value += val;
    expr.focus();
}

function calcClear() {
    document.getElementById('calcExpr').value = '';
    document.getElementById('calcValue').textContent = '-';
}

function calcExpr() {
    var input = document.getElementById('calcExpr').value.trim();
    if (!input) return;
    try {
        input = input.replace(/\^/g, '**').replace(/x/gi, '*').replace(/pi/gi, 'Math.PI');
        if (!/^[\d+\-*/().\s,MathsinqrtolePI]+$/.test(input)) {
            throw new Error('invalid');
        }
        var result = Function('"use strict"; return (' + input + ')')();
        if (typeof result === 'number' && !isNaN(result) && isFinite(result)) {
            var display = Number.isInteger(result) ? result.toString() : result.toFixed(10).replace(/\.?0+$/, '');
            document.getElementById('calcValue').textContent = '= ' + display;
        } else {
            document.getElementById('calcValue').textContent = '错误：无法计算';
        }
    } catch (e) {
        document.getElementById('calcValue').textContent = '错误：表达式无效';
    }
}

lookupHTTP();