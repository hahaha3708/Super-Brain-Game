
import { GoogleGenAI } from "@google/genai";

// 1. Particle Background
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    const create = () => {
        particles = [];
        const count = Math.floor(window.innerWidth / 20);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2,
                sx: (Math.random() - 0.5) * 0.5,
                sy: (Math.random() - 0.5) * 0.5,
                o: Math.random() * 0.5
            });
        }
    };
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#22d3ee';
        particles.forEach(p => {
            ctx.globalAlpha = p.o;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.x += p.sx; p.y += p.sy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        });
        requestAnimationFrame(animate);
    };
    
    window.addEventListener('resize', resize);
    resize(); create(); animate();
}

// 2. Audio Management (Simple persistent preference via localStorage)
function initAudio() {
    const btn = document.getElementById('audio-toggle');
    if (!btn) return;
    
    let enabled = localStorage.getItem('mindgames_audio') === 'true';
    const updateBtn = () => {
        btn.innerHTML = `<span>Âm thanh: ${enabled ? 'Bật' : 'Tắt'}</span>`;
        btn.classList.toggle('border-cyan-500', enabled);
        btn.classList.toggle('text-cyan-400', enabled);
    };
    
    btn.addEventListener('click', () => {
        enabled = !enabled;
        localStorage.setItem('mindgames_audio', enabled);
        updateBtn();
        // In a real app, you'd trigger global music here
    });
    updateBtn();
}

// 3. Gemini Helpers
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getBriefing(gameName) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Viết 1 đoạn tóm tắt ngắn (2 câu) theo phong cách trí tuệ siêu việt, hơi đáng sợ về thử thách mang tên "${gameName}".`
        });
        return response.text;
    } catch (e) {
        return "Kết nối hệ thống gặp lỗi. Hãy chuẩn bị tinh thần.";
    }
}

export async function getAnalysis(gameName, score) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Người chơi đạt ${score} điểm trong trò chơi ${gameName}. Viết 1 câu nhận xét ngắn gọn, sắc bén, mang tính khoa học viễn tưởng.`
        });
        return response.text;
    } catch (e) {
        return "Dữ liệu đã được lưu trữ vào kho lưu trữ thần kinh.";
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initAudio();
});
