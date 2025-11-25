// server.js - الخادم الوسيط الآمن لـ DeepSeek API

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;


// *******************************************************************
// 🛑 رمز API السري: يتم تخزينه بأمان هنا (ولن يراه المستخدمون)
// *******************************************************************
const DEEPSEEK_API_KEY = 'Sk-aab9ec97dda44411b37d34830a986a41'; 
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

// تفعيل CORS للسماح بالاتصال من أي موقع (بما في ذلك GitHub Pages)
app.use(cors());
// تفعيل Express لقراءة بيانات JSON في الطلبات
app.use(express.json());

// نقطة النهاية (Endpoint) التي يتصل بها موقعك الأمامي
app.post('/api/chat', async (req, res) => {
    // 1. استقبال رسالة المستخدم من الواجهة الأمامية
    const userPrompt = req.body.prompt; 

    if (!userPrompt) {
        return res.status(400).json({ error: 'الرجاء تقديم محتوى للرسالة (prompt).' });
    }

    try {
        // 2. إرسال طلب آمن إلى DeepSeek API
        const deepseekResponse = await axios.post(DEEPSEEK_URL, {
            // بيانات DeepSeek API
            model: "deepseek-chat", // أو deepseek-coder
            messages: [{
                role: "user",
                content: userPrompt
            }],
            stream: false,
        }, {
            // التوثيق: إرسال الرمز السري في رأس الطلب
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            }
        });

        // 3. استخراج الرد وإرساله إلى الواجهة الأمامية
        const aiResponse = deepseekResponse.data.choices[0].message.content;
        res.json({ response: aiResponse });

    } catch (error) {
        console.error("DeepSeek API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'حدث خطأ أثناء الاتصال بنموذج DeepSeek AI.' });
    }
});

// بدء تشغيل الخادم
app.listen(PORT, () => {
    console.log(`✅ الخادم الوسيط يعمل على http://localhost:${PORT}`);
    console.log(`⚠️ يجب استضافة هذا الخادم على الإنترنت لكي يعمل مع موقع GitHub Pages.`);
});

