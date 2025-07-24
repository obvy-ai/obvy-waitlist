export default {
    async fetch(request, env) {
        const allowedOrigins = [
            'http://localhost:5173', 
            'https://www.obvy.ai',
            'https://obvy-waitlist.pages.dev', // Cloudflare Pages
            // Add more domains as needed
        ];

        // Get the origin from the request
        const origin = request.headers.get('Origin');
        
        // Check for exact match or wildcard match for thiswillmakeyoulessdumb.com
        const isAllowedOrigin = allowedOrigins.includes(origin) || 
            (origin && origin.includes('thiswillmakeyoulessdumb.com')) ||
            origin === 'https://thiswillmakeyoulessdumb.com';

        // CORS headers for all responses
        const corsHeaders = {
            'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0],
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle preflight OPTIONS request
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        if (request.method !== 'POST') {
            return new Response('Method not allowed', { 
                status: 405,
                headers: corsHeaders
            });
        }

        const contentType = request.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            return new Response('Content-Type must be application/json', { 
                status: 400,
                headers: corsHeaders
            });
        }

        try {
            const { email } = await request.json();

            if (!email || typeof email !== 'string' || !email.includes('@')) {
                return new Response(JSON.stringify({ error: 'Valid email is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }

            const res = await fetch("https://api.beehiiv.com/v2/publications/pub_42ef69dd-3f8e-4360-81d5-adb5865a8bdf/subscriptions", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${env.BEEHIIV_API_KEY}`,
                },
                body: JSON.stringify({ email }),
            });

            const responseData = await res.text();
            
            if (res.ok) {
                return new Response(JSON.stringify({ 
                success: true, 
                message: 'Successfully subscribed to newsletter' 
                }), {
                status: 200,
                headers: { 
                    'Content-Type': 'application/json',
                    ...corsHeaders
                }
                });
            } else {
                console.error('Beehiiv API error:', responseData);
                return new Response(JSON.stringify({ 
                error: 'Failed to subscribe to newsletter' 
                }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
        } catch (error) {
            console.error('Worker error:', error);
            return new Response(JSON.stringify({ 
                error: 'Internal server error' 
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', ...corsHeaders }
            });
        }
    },
};
