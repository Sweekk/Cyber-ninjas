from dotenv import load_dotenv 
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
load_dotenv()
api_key=os.getenv("api_key")
from google import genai
import google.generativeai as genai

from google.genai import types

app = Flask(__name__)
CORS(app)  # allows frontend to talk to backend

# Gemini setup
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

local_data = """
📅 Upcoming Events & Workshops
Tech & AI

AI & Machine Learning Workshop
Jan 8–9 | MIT Mangalore
Focus: Python AI basics, real-world projects, beginner friendly.

Full Stack Web Development Bootcamp
Jan 15–18 | Adka Innovation Hub, Mangalore
Topics: HTML/CSS, JS, React, Node.

Cybersecurity Essentials Workshop
Jan 20 | St Joseph Engineering College
Certifications, hands-on labs, capture-the-flag.

IoT & Robotics Mini-Hackathon
Feb 5–6 | Manipal Institute of Technology
Build smart devices and robots.

Android App Development Workshop
Feb 12–13 | SDM College of Engineering
Build real apps + publish tutorials.

🎓 Workshops & Learning Programs
Design & Creativity

Figma UI/UX Crash Course
Weekly – Every Saturday | Freelance Studio, Mangalore

Adobe Photoshop & Illustrator Bootcamp
Feb 1–3 | Creators’ Studio, Mangalore

💼 Job & Internship Postings (Mangalore + Nearby)
Internships

Python Development Intern | TechNext Mangalore
Work with Python APIs and automation tools.

Frontend Intern (React) | Deva Innovations
Build dashboard UIs, assist with Next.js project.

Cybersecurity Analyst Intern | SecuriTech Labs
Hands-on network security.

Full-Time Roles

Junior Python Developer | Startup XYZ, Mangalore
0–2 yrs exp, Django/Flask preferred.

Frontend Developer (React) | BlueWave Tech, Moodabidri
Modern UI skills required.

Cloud Support Engineer | CloudSolutions Inc, Mangalore
AWS/GCP exposure preferred.

Embedded Systems Engineer | RoboTech, Udupi
IoT & microcontroller experience.
"""

system_prompt = f"""
You are an AI assistant for a local Mangalore community website.

Use the following local information when relevant:
{local_data}
"""

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json["message"]

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=user_message,
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=0.7
        )
    )

    return jsonify({"reply": response.text})

if __name__ == "__main__":
    app.run(debug=True)