/**
 * Personal Homepage Animation Controller
 * 个人主页动画控制器
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // 初始化所有动画
    initScrollAnimations();
    initTypewriter();
    initParticleEffect();
    initSmoothScrolling();
    initThemeToggle();
    
    // 页面加载完成后的额外效果
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        animateOnScroll();
    });
});

/**
 * 滚动触发动画
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('h2, .pub-row, .section-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // 为发布物添加延迟动画
                if (entry.target.classList.contains('pub-row')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

/**
 * 打字机效果
 */
function initTypewriter() {
    const bioText = document.querySelector('h2 + p');
    if (bioText && bioText.textContent.includes('Hi,')) {
        // 创建打字机效果容器
        const typewriterContainer = document.createElement('div');
        typewriterContainer.className = 'typewriter-container';
        
        const typewriterText = document.createElement('span');
        typewriterText.className = 'typewriter';
        typewriterText.textContent = "Hi, I'm Yiming Liu 👋";
        
        bioText.parentNode.insertBefore(typewriterContainer, bioText);
        typewriterContainer.appendChild(typewriterText);
        
        // 隐藏原始文本一小段时间
        bioText.style.opacity = '0';
        setTimeout(() => {
            bioText.style.opacity = '1';
            bioText.style.animation = 'fadeInUp 0.8s ease-out';
        }, 4000);
    }
}

/**
 * 添加微妙的粒子效果
 */
function initParticleEffect() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // 创建粒子
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 45, 114, 0.3);
            border-radius: 50%;
            pointer-events: none;
            animation: particle-animation 15s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        particlesContainer.appendChild(particle);
        
        // 粒子动画结束后移除
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }
    
    // 定期创建新粒子
    setInterval(createParticle, 3000);
}

/**
 * 平滑滚动
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 主题切换功能（可选）
 */
function initThemeToggle() {
    // 检测系统主题偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 可以添加主题切换按钮（如果需要的话）
    // 这里暂时只是准备了基础框架
}

/**
 * 页面滚动时的动画效果
 */
function animateOnScroll() {
    let ticking = false;
    
    function updateAnimations() {
        const scrollY = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (header) {
            // 添加视差效果
            const parallaxSpeed = 0.5;
            header.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

/**
 * 头像悬停效果（简化版）
 */
document.addEventListener('DOMContentLoaded', function() {
    const avatar = document.querySelector('.image.avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

/**
 * 复制邮件地址功能
 */
document.addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'email') {
        const email = e.target.textContent;
        
        // 尝试复制到剪贴板
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showTooltip(e.target, 'Email copied! 📧');
            }).catch(() => {
                showTooltip(e.target, 'Click to copy email');
            });
        } else {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showTooltip(e.target, 'Email copied! 📧');
            } catch (err) {
                showTooltip(e.target, 'Click to copy email');
            }
            document.body.removeChild(textArea);
        }
    }
});

/**
 * 显示工具提示
 */
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: #002D72;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        z-index: 1000;
        white-space: nowrap;
        transform: translateX(-50%);
        animation: fadeInUp 0.3s ease-out;
    `;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 + 'px';
    tooltip.style.top = rect.top - 40 + 'px';
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.animation = 'fadeIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    }, 2000);
}

/**
 * 响应式动画控制
 */
function handleResponsiveAnimations() {
    const mediaQuery = window.matchMedia('(max-width: 960px)');
    
    function handleTabletChange(e) {
        if (e.matches) {
            // 在小屏幕上减少动画效果
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
        } else {
            document.documentElement.style.setProperty('--animation-duration', '0.6s');
        }
    }
    
    mediaQuery.addListener(handleTabletChange);
    handleTabletChange(mediaQuery);
}

// 初始化响应式动画
handleResponsiveAnimations();

/**
 * 性能优化：减少不必要的重绘
 */
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // 重新计算动画
        handleResponsiveAnimations();
    }, 250);
});

/**
 * 为社交图标添加额外的悬停效果
 */
document.querySelectorAll('.social-icons a').forEach((icon, index) => {
    icon.addEventListener('mouseenter', function() {
        // 为图标添加轻微的震动效果
        this.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.animation = '';
    });
    
    // 添加随机延迟的入场动画
    icon.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
});

/**
 * 滚动进度指示器（可选）
 */
function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #002D72, #39c);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 可选：启用滚动进度指示器
// createScrollProgressIndicator(); 