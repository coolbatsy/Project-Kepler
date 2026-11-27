import os
import json
import re
import requests
from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

# --- CORS Helper ---
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, x-gemini-api-key'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response

@app.route('/', defaults={'path': ''}, methods=['OPTIONS'])
@app.route('/<path:path>', methods=['OPTIONS'])
def handle_options(path):
    res = make_response('', 200)
    return res

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        "status": "healthy",
        "service": "KEPLER AI Engine",
        "runtime": "Python & Flask on Vercel Serverless",
        "gemini_env_configured": bool(os.environ.get("GEMINI_API_KEY"))
    })

def call_gemini(topic, api_key):
    """Calls Google Gemini API (gemini-2.0-flash or gemini-1.5-flash) on free tier"""
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    
    system_prompt = (
        "You are KEPLER's AI Skill-to-Gig Engine. Your mission is to directly map human potential "
        "and learning to localized economic gig opportunities under the UN Sustainable Development Goals framework.\n"
        "Generate a NotebookLM-style structured output for the searched skill or topic.\n"
        "Return ONLY a valid JSON object with no markdown formatting, no code blocks, and no extra text. "
        "The JSON MUST follow this exact schema:\n"
        "{\n"
        '  "topic": "Title of topic",\n'
        '  "tagline": "Short inspiring punchline",\n'
        '  "sdg": ["SDG 4", "SDG 8"],\n'
        '  "summary": "Crisp 2-sentence summary of the capability.",\n'
        '  "insights": [\n'
        '    {"title": "Core Concept", "icon": "fa-solid fa-brain", "badge": "Foundation", "text": "Short breakdown"},\n'
        '    {"title": "Essential Tooling", "icon": "fa-solid fa-toolbox", "badge": "High-Value Tools", "text": "Tools & frameworks"},\n'
        '    {"title": "Monetization Angle", "icon": "fa-solid fa-coins", "badge": "Gig Demand", "text": "How local gig economy uses this"}\n'
        '  ],\n'
        '  "roadmap": [\n'
        '    {"step": 1, "phase": "Micro-bite Learn", "title": "Phase title", "timeframe": "Days 1-3", "action": "Specific task", "deliverable": "Proof of concept"},\n'
        '    {"step": 2, "phase": "Proof-of-Work Project", "title": "Phase title", "timeframe": "Days 4-7", "action": "Specific build task", "deliverable": "Portfolio artifact"},\n'
        '    {"step": 3, "phase": "Local Gig Monetization", "title": "Phase title", "timeframe": "Week 2+", "action": "Outreach & pitching", "deliverable": "First paid local or remote gig"}\n'
        '  ],\n'
        '  "flashcards": [\n'
        '    {"question": "Core question 1?", "answer": "Clear punchy answer", "proTip": "Actionable practical tip"},\n'
        '    {"question": "Practical application 2?", "answer": "Clear punchy answer", "proTip": "Actionable practical tip"},\n'
        '    {"question": "How to monetize 3?", "answer": "Clear punchy answer", "proTip": "Actionable practical tip"},\n'
        '    {"question": "Common pitfall to avoid 4?", "answer": "Clear punchy answer", "proTip": "Actionable practical tip"}\n'
        '  ]\n'
        "}"
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": f"Topic to map: '{topic}'. Generate the complete KEPLER Skill-to-Gig mapping, visual concept cards, 3-step flowchart roadmap, and NotebookLM-style interactive flashcards."}
                ]
            }
        ],
        "systemInstruction": {
            "parts": [{"text": system_prompt}]
        },
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.4
        }
    }

    headers = {"Content-Type": "application/json"}
    
    # Try 2.0-flash first, fallback to 1.5-flash
    response = requests.post(url, headers=headers, json=payload, timeout=12)
    if response.status_code != 200:
        url_fallback = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
        response = requests.post(url_fallback, headers=headers, json=payload, timeout=12)

    if response.status_code == 200:
        res_data = response.json()
        raw_text = res_data["candidates"][0]["content"]["parts"][0]["text"].strip()
        # Clean markdown code blocks if present
        raw_text = re.sub(r"^```(?:json)?\s*", "", raw_text)
        raw_text = re.sub(r"\s*```$", "", raw_text)
        return json.loads(raw_text)
    else:
        raise Exception(f"Gemini API error ({response.status_code}): {response.text}")


def generate_curated_pathway(topic):
    """High-quality semantic fallback generator when no API key is set or on rate limit"""
    t_clean = topic.strip()
    t_lower = t_clean.lower()

    if any(k in t_lower for k in ["python", "script", "code", "dev", "program"]):
        category = "Automated Scripting & Tooling"
        sdg = ["SDG 4: Quality Education", "SDG 8: Decent Work & Economic Growth", "SDG 9: Industry & Innovation"]
        tool = "Python 3, pandas, openpyxl, GitHub"
        step1_act = "Master syntax essentials: loops, file I/O, and manipulating CSVs/spreadsheets."
        step1_del = "Automated data cleaner script."
        step2_act = "Build a localized automation tool that transforms raw messy shop bills into structured analytical reports."
        step2_del = "Executable desktop / command-line script."
        step3_act = "Pitch local retail shops, tax accountants, or clinics to automate their daily reconciliation paperwork."
        step3_del = "First paid retainer: $50 - $150 per client."
    elif any(k in t_lower for k in ["excel", "sheet", "data entry", "data", "spread"]):
        category = "Data Structuring & Financial Ledgers"
        sdg = ["SDG 8: Decent Work", "SDG 9: Infrastructure", "SDG 10: Reduced Inequalities"]
        tool = "Google Sheets, Excel formulas (XLOOKUP, Pivot Tables), AppSheet"
        step1_act = "Learn relational data hygiene, normalization, and conditional aggregation."
        step1_del = "Multi-tab dynamic inventory template."
        step2_act = "Digitize a local merchant's paper ledger into an automated cloud spreadsheet with sales tracking."
        step2_del = "Real-time dashboard for local business."
        step3_act = "Offer digitization services to micro-enterprises, mom-and-pop stores, and community pharmacies."
        step3_del = "Weekly bookkeeping gig: $30 - $100."
    elif any(k in t_lower for k in ["design", "ui", "ux", "figma", "canva", "poster", "graphics"]):
        category = "Visual Communication & UI/UX"
        sdg = ["SDG 4: Education", "SDG 9: Innovation", "SDG 11: Sustainable Communities"]
        tool = "Figma, Canva, Inkscape, WCAG Contrast Checker"
        step1_act = "Learn visual hierarchy, accessible typography, color contrast, and component-based layouts."
        step1_del = "Accessibility-compliant 3-screen mobile wireframe."
        step2_act = "Redesign an outdated local NGO or neighborhood clinic's announcement flyer and website banner."
        step2_del = "High-fidelity digital asset pack."
        step3_act = "Sell branding packages to local startups, community clinics, and independent creators."
        step3_del = "Brand kit gig: $75 - $250."
    elif any(k in t_lower for k in ["writing", "story", "content", "copy", "social", "media"]):
        category = "Digital Storytelling & Social Outreach"
        sdg = ["SDG 3: Good Health", "SDG 4: Quality Education", "SDG 10: Reduced Inequalities"]
        tool = "Notion, Substack, StoryCenter principles, CapCut"
        step1_act = "Practice narrative framing, audience empathy hooks, and distilling complex information into bite-sized carousels."
        step1_del = "5-part educational micro-post series."
        step2_act = "Partner with a local community initiative or school to write an impact case study with photos."
        step2_del = "Published community article & social media campaign."
        step3_act = "Manage digital communications and newsletter updates for neighborhood organizations."
        step3_del = "Monthly retainer: $100 - $300."
    else:
        category = f"Applied {t_clean.capitalize()}"
        sdg = ["SDG 4: Quality Education", "SDG 8: Decent Work", "SDG 9: Innovation"]
        tool = "Open-source tools, Git, localized community playbooks"
        step1_act = f"Focus strictly on high-impact fundamentals of {t_clean} through practical micro-tutorials."
        step1_del = "Foundational proof of concept."
        step2_act = f"Apply {t_clean} to solve a tangible operational bottleneck for a local small enterprise."
        step2_del = "End-to-end portfolio case study."
        step3_act = f"Pitch localized services directly to local businesses, micro-freelance marketplaces, and community organizations."
        step3_del = "First paid milestone: $50 - $150."

    return {
        "topic": t_clean.title(),
        "tagline": f"From micro-bite learning to monetizable community impact.",
        "sdg": sdg,
        "summary": f"{t_clean.title()} represents a high-demand micro-capability that bridges technical knowledge directly into localized gig opportunities without institutional gatekeeping.",
        "insights": [
            {
                "title": "Core Capability",
                "icon": "fa-solid fa-brain",
                "badge": "Concept",
                "text": f"Bypasses theoretical 50-hour lectures. Focuses purely on active, high-utility execution in {t_clean}."
            },
            {
                "title": "High-Value Tooling",
                "icon": "fa-solid fa-toolbox",
                "badge": "Toolkit",
                "text": f"Leverages accessible open tooling ({tool}) so anyone with basic hardware can build immediately."
            },
            {
                "title": "Localized Demand",
                "icon": "fa-solid fa-coins",
                "badge": "Gig Monetization",
                "text": "Solves urgent pain points for local businesses, clinics, and non-profits that lack modern digital infrastructure."
            }
        ],
        "roadmap": [
            {
                "step": 1,
                "phase": "Micro-bite Learning",
                "title": "Foundational Mastery",
                "timeframe": "Days 1-3",
                "action": step1_act,
                "deliverable": step1_del
            },
            {
                "step": 2,
                "phase": "Proof-of-Work Project",
                "title": "Local Reality Build",
                "timeframe": "Days 4-7",
                "action": step2_act,
                "deliverable": step2_del
            },
            {
                "step": 3,
                "phase": "Local Gig Monetization",
                "title": "Direct Community Pitch",
                "timeframe": "Week 2+",
                "action": step3_act,
                "deliverable": step3_del
            }
        ],
        "flashcards": [
            {
                "question": f"What is the single most monetizable aspect of {t_clean}?",
                "answer": "Solving immediate, manual operational inefficiencies for non-technical local businesses.",
                "proTip": "Never sell 'code' or 'skills'—always sell saved hours and eliminated errors."
            },
            {
                "question": "How do you gain credibility without an expensive degree or certificate?",
                "answer": "A publicly verifiable proof-of-work project hosted on GitHub or cloud storage solving a real local problem.",
                "proTip": "One working case study beats 10 generic online course certificates."
            },
            {
                "question": "How does this connect to the UN SDG framework?",
                "answer": "It transforms SDG 4 (Quality Education) into a direct catalyst for SDG 8 (Decent Work & Economic Resurgence).",
                "proTip": "Inclusive economic growth begins when skill acquisition is immediately monetizable."
            },
            {
                "question": "What is the fastest way to get your first paying client?",
                "answer": "Offer a zero-risk trial project for a local business to digitize or automate one frustrating manual task.",
                "proTip": "Document before-and-after results to turn that trial into an ongoing paid retainer."
            }
        ]
    }


@app.route('/api/generate', methods=['POST', 'GET'])
def generate():
    """Main Skill-to-Gig mapping endpoint"""
    if request.method == 'GET':
        topic = request.args.get('topic', 'Data Structuring & Python')
        api_key = request.args.get('apiKey', '').strip() or request.headers.get('x-gemini-api-key', '').strip() or os.environ.get('GEMINI_API_KEY', '').strip()
    else:
        data = request.get_json(silent=True) or {}
        topic = data.get('topic', '').strip()
        api_key = data.get('apiKey', '').strip() or request.headers.get('x-gemini-api-key', '').strip() or os.environ.get('GEMINI_API_KEY', '').strip()

    if not topic:
        return jsonify({"success": False, "error": "Please provide a skill or topic to map."}), 400

    # 1. If API key is available, attempt Gemini generation
    if api_key:
        try:
            gemini_data = call_gemini(topic, api_key)
            return jsonify({
                "success": True,
                "source": "Google Gemini AI (Live)",
                "data": gemini_data
            })
        except Exception as e:
            # Fallback gracefully to curated knowledge engine if Gemini is rate limited or key is invalid
            curated_data = generate_curated_pathway(topic)
            return jsonify({
                "success": True,
                "source": f"KEPLER Knowledge Engine (Fallback: {str(e)[:120]})",
                "data": curated_data
            })

    # 2. If no key, return rich curated pathway
    curated_data = generate_curated_pathway(topic)
    return jsonify({
        "success": True,
        "source": "KEPLER Knowledge Engine",
        "data": curated_data
    })


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
