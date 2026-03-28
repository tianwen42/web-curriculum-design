// 模式切换脚本
(function() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    $(document).ready(function() {
        const toggleBtn = $('<button class="theme-toggle" id="theme-toggle-btn" title="切换白天/夜晚模式"></button>');
        toggleBtn.text(currentTheme === 'dark' ? '🌙' : '☀️');
        $('body').append(toggleBtn);

        $('#theme-toggle-btn').on('click', function() {
            let theme = document.documentElement.getAttribute('data-theme');
            let nextTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            
            $(this).text(nextTheme === 'dark' ? '🌙' : '☀️');
        });
    });
})();
