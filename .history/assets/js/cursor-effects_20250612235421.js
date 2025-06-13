/**
 * Advanced Cursor Effects Controller
 * 高级光标效果控制器
 */

(function() {
    'use strict';
    
    let cursor = null;
    let particles = [];
    let isMouseMoving = false;
    let mouseX = 0;
    let mouseY = 0;
    
    // 检测是否为移动设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        return; // 在移动设备上不启用光标效果
    }
    
    /**
     * 初始化自定义光标
     */
    function initCustomCursor() {
        cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
        
        // 隐藏默认光标
        document.body.style.cursor = 'none';
        
        // 监听鼠标移动
        document.addEventListener('mousemove', updateCursorPosition);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        
        // 监听鼠标进入和离开可交互元素
        const interactiveElements = 'a, button, .clickable, .image.avatar, email, input, textarea, select';
        
        document.addEventListener('mouseover', function(e) {
            if (e.target.matches(interactiveElements)) {
                cursor.classList.add('hover');
            }
        });
        
        document.addEventListener('mouseout', function(e) {
            if (e.target.matches(interactiveElements)) {
                cursor.classList.remove('hover');
            }
        });
        
        // 监听鼠标离开页面
        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '1';
        });
    }
    
    /**
     * 更新光标位置
     */
    function updateCursorPosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
        
                 // 创建跟随粒子 (降低频率)
         if (Math.random() > 0.95) { // 5% 概率生成粒子
             createMouseParticle(mouseX, mouseY);
         }
        
        isMouseMoving = true;
        clearTimeout(isMouseMoving);
        setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    }
    
    /**
     * 鼠标按下效果
     */
    function onMouseDown() {
        if (cursor) {
            cursor.classList.add('click');
        }
        
        // 创建点击波纹效果
        createClickRipple(mouseX, mouseY);
    }
    
    /**
     * 鼠标释放效果
     */
    function onMouseUp() {
        if (cursor) {
            cursor.classList.remove('click');
        }
    }
    
    /**
     * 创建鼠标跟随粒子
     */
    function createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'mouse-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // 随机颜色
        const colors = ['#002D72', '#39c', '#0099cc'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机偏移
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        particle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        // 动画结束后移除粒子
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
            const index = particles.indexOf(particle);
            if (index > -1) {
                particles.splice(index, 1);
            }
        }, 1000);
    }
    
    /**
     * 创建点击波纹效果
     */
    function createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 2px solid #002D72;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 9997;
            animation: click-ripple 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
         /**
      * 轻量级磁性效果
      */
     function initMagneticEffect() {
         const magneticElements = document.querySelectorAll('.social-icons a');
         
         magneticElements.forEach(element => {
             element.addEventListener('mouseenter', function() {
                 if (cursor) {
                     cursor.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                 }
             });
             
             element.addEventListener('mouseleave', function() {
                 if (cursor) {
                     cursor.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                 }
             });
         });
     }
    
    /**
     * 文本悬停效果
     */
    function initTextHoverEffect() {
        const textElements = document.querySelectorAll('h1, h2, h3, p, a:not(.social-icons a)');
        
        textElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                if (cursor) {
                    cursor.style.width = '8px';
                    cursor.style.height = '8px';
                    cursor.style.background = '#002D72';
                    cursor.style.border = 'none';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                if (cursor) {
                    cursor.style.width = '20px';
                    cursor.style.height = '20px';
                    cursor.style.background = 'rgba(0, 45, 114, 0.1)';
                    cursor.style.border = '2px solid #002D72';
                }
            });
        });
    }
    
    /**
     * 添加CSS动画
     */
    function addCSSAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes click-ripple {
                0% {
                    width: 20px;
                    height: 20px;
                    opacity: 1;
                }
                100% {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
            
            .cursor {
                mix-blend-mode: difference;
            }
            
            .cursor.hover {
                mix-blend-mode: normal;
                backdrop-filter: blur(2px);
            }
        `;
        document.head.appendChild(style);
    }
    
    /**
     * 初始化所有效果
     */
    function init() {
        if (window.innerWidth < 768) {
            return; // 小屏幕设备不启用
        }
        
        addCSSAnimations();
        initCustomCursor();
        
        // 延迟初始化其他效果，确保DOM已加载完成
        setTimeout(() => {
            initMagneticEffect();
            initTextHoverEffect();
        }, 500);
    }
    
    /**
     * 清理函数
     */
    function cleanup() {
        if (cursor && cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
        }
        
        particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        
        particles = [];
        document.body.style.cursor = 'auto';
    }
    
    /**
     * 响应式处理
     */
    function handleResize() {
        if (window.innerWidth < 768) {
            cleanup();
        } else if (!cursor) {
            init();
        }
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