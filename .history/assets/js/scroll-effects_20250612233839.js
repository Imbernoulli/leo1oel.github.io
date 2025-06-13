/**
 * Advanced Scroll Effects Controller
 * 高级滚动效果控制器
 */

(function() {
    'use strict';
    
    let progressBar = null;
    let scrollIndicator = null;
    let parallaxBg = null;
    let ticking = false;
    
    /**
     * 初始化滚动进度条
     */
    function initScrollProgress() {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    /**
     * 初始化滚动指示器
     */
    function initScrollIndicator() {
        const sections = document.querySelectorAll('h2, .section-animate');
        if (sections.length === 0) return;
        
        scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.className = 'scroll-dot';
            dot.setAttribute('data-section', index);
            dot.addEventListener('click', () => scrollToSection(section));
            scrollIndicator.appendChild(dot);
        });
        
        document.body.appendChild(scrollIndicator);
    }
    
    /**
     * 初始化视差背景
     */
    function initParallaxBackground() {
        parallaxBg = document.createElement('div');
        parallaxBg.className = 'parallax-bg';
        document.body.appendChild(parallaxBg);
    }
    
    /**
     * 更新滚动进度
     */
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    }
    
    /**
     * 更新导航栏状态
     */
    function updateNavbar() {
        const topnav = document.querySelector('.topnav');
        const scrollTop = window.pageYOffset;
        
        if (topnav) {
            if (scrollTop > 50) {
                topnav.classList.add('scrolled');
            } else {
                topnav.classList.remove('scrolled');
            }
        }
    }
    
    /**
     * 更新滚动指示器
     */
    function updateScrollIndicator() {
        if (!scrollIndicator) return;
        
        const sections = document.querySelectorAll('h2, .section-animate');
        const dots = scrollIndicator.querySelectorAll('.scroll-dot');
        const scrollTop = window.pageYOffset + window.innerHeight / 2;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const dot = dots[index];
            
            if (dot) {
                if (scrollTop >= sectionTop && scrollTop <= sectionBottom) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            }
        });
    }
    
    /**
     * 更新视差效果
     */
    function updateParallax() {
        if (!parallaxBg) return;
        
        const scrollTop = window.pageYOffset;
        const speed = 0.3;
        parallaxBg.style.transform = `translateY(${scrollTop * speed}px)`;
    }
    
    /**
     * 滚动触发动画
     */
    function updateScrollReveal() {
        const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .section-animate');
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const triggerPoint = scrollTop + windowHeight - elementHeight / 4;
            
            if (triggerPoint > elementTop) {
                element.classList.add('active');
            }
        });
    }
    
    /**
     * 更新section高亮
     */
    function updateSectionHighlight() {
        const sections = document.querySelectorAll('section');
        const scrollTop = window.pageYOffset + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop <= sectionBottom) {
                section.classList.add('in-view');
            } else {
                section.classList.remove('in-view');
            }
        });
    }
    
    /**
     * 滚动到指定section
     */
    function scrollToSection(target) {
        const targetPosition = target.offsetTop - 100; // 考虑固定导航栏高度
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    /**
     * 处理滚动事件
     */
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateNavbar();
                updateScrollIndicator();
                updateParallax();
                updateScrollReveal();
                updateSectionHighlight();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    /**
     * 数字计数动画
     */
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target')) || 0;
            const duration = 2000; // 2秒
            const start = 0;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentValue = Math.floor(start + (target - start) * easeOutQuart(progress));
                
                counter.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            // 使用Intersection Observer触发动画
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !counter.classList.contains('animate')) {
                        counter.classList.add('animate');
                        requestAnimationFrame(updateCounter);
                        observer.unobserve(counter);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }
    
    /**
     * 缓动函数
     */
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    /**
     * 键盘导航
     */
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const sections = document.querySelectorAll('h2, .section-animate');
            const currentSection = document.querySelector('.scroll-dot.active');
            
            if (!currentSection) return;
            
            let currentIndex = Array.from(scrollIndicator.children).indexOf(currentSection);
            
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        scrollToSection(sections[currentIndex - 1]);
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < sections.length - 1) {
                        scrollToSection(sections[currentIndex + 1]);
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'End':
                    e.preventDefault();
                    window.scrollTo({ 
                        top: document.documentElement.scrollHeight, 
                        behavior: 'smooth' 
                    });
                    break;
            }
        });
    }
    
    /**
     * 浮动效果
     */
    function initFloatingElements() {
        const floatingElements = document.querySelectorAll('.float-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('floating');
                } else {
                    entry.target.classList.remove('floating');
                }
            });
        }, { threshold: 0.5 });
        
        floatingElements.forEach(el => observer.observe(el));
    }
    
    /**
     * 滚动阴影效果
     */
    function initScrollShadows() {
        const shadowElements = document.querySelectorAll('.content-shadow');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('shadow-visible');
                } else {
                    entry.target.classList.remove('shadow-visible');
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        shadowElements.forEach(el => observer.observe(el));
    }
    
    /**
     * 鼠标滚轮优化
     */
    function initSmoothWheelScroll() {
        let isScrolling = false;
        
        window.addEventListener('wheel', (e) => {
            if (isScrolling) return;
            
            // 检测是否是触控板的自然滚动
            if (Math.abs(e.deltaY) < 50) return;
            
            isScrolling = true;
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }, { passive: true });
    }
    
    /**
     * 初始化所有滚动效果
     */
    function init() {
        // 检查浏览器支持
        if (!window.requestAnimationFrame || !window.IntersectionObserver) {
            console.warn('Scroll effects require modern browser features');
            return;
        }
        
        initScrollProgress();
        initScrollIndicator();
        initParallaxBackground();
        animateCounters();
        initKeyboardNavigation();
        initFloatingElements();
        initScrollShadows();
        initSmoothWheelScroll();
        
        // 监听滚动事件
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // 初始执行一次
        handleScroll();
    }
    
    /**
     * 响应式处理
     */
    function handleResize() {
        // 重新计算位置
        handleScroll();
    }
    
    /**
     * 清理函数
     */
    function cleanup() {
        if (progressBar && progressBar.parentNode) {
            progressBar.parentNode.removeChild(progressBar);
        }
        if (scrollIndicator && scrollIndicator.parentNode) {
            scrollIndicator.parentNode.removeChild(scrollIndicator);
        }
        if (parallaxBg && parallaxBg.parentNode) {
            parallaxBg.parentNode.removeChild(parallaxBg);
        }
        
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 页面卸载时清理
    window.addEventListener('beforeunload', cleanup);
    
})(); 