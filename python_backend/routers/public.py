"""
GET  /api/public/jobs
GET  /api/public/slides
GET  /api/public/services
GET  /api/public/trainings
GET  /api/public/products
GET  /api/public/training-page
GET  /api/public/success-stories
POST /api/public/apply   (multipart - resume upload + email)
POST /api/public/contact
"""
import os
import shutil
from typing import Optional
from fastapi import APIRouter, Depends, File, Form, UploadFile
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders

from database import get_db

router = APIRouter()


def _doc(d: dict) -> dict:
    d["_id"] = str(d["_id"])
    return d


@router.get("/jobs")
async def get_jobs(db=Depends(get_db)):
    jobs = await db["jobs"].find().sort("createdAt", -1).to_list(None)
    return [_doc(j) for j in jobs]


@router.get("/slides")
async def get_slides(db=Depends(get_db)):
    slides = await db["slides"].find().to_list(None)
    return [_doc(s) for s in slides]


@router.get("/services")
async def get_services(db=Depends(get_db)):
    services = await db["services"].find().to_list(None)
    return [_doc(s) for s in services]


@router.get("/trainings")
async def get_trainings(db=Depends(get_db)):
    trainings = await db["trainings"].find().to_list(None)
    return [_doc(t) for t in trainings]


@router.get("/products")
async def get_products(db=Depends(get_db)):
    products = await db["products"].find().to_list(None)
    return [_doc(p) for p in products]


@router.get("/success-stories")
async def get_success_stories(db=Depends(get_db)):
    stories = await db["success_stories"].find().sort("createdAt", -1).to_list(None)
    return [_doc(s) for s in stories]


@router.get("/training-page")
async def get_training_page():
    return {
        "domains": [
            {
                "_id": 1,
                "title": "Full Stack Mafia",
                "iconName": "FaLayerGroup",
                "color": "text-blue-600",
                "desc": "Dominate the web. MERN Stack, Next.js, and System Design.",
                "skills": ["React", "Node.js", "MongoDB", "AWS"],
                "contactName": "Full Stack Lead",
                "whatsappNumber": "918667363896",
            },
            {
                "_id": 2,
                "title": "AI Architects",
                "iconName": "FaBrain",
                "color": "text-purple-600",
                "desc": "Build the brain. Python, TensorFlow, LLMs, and Neural Networks.",
                "skills": ["Python", "PyTorch", "OpenAI API", "HuggingFace"],
                "contactName": "AI Training Lead",
                "whatsappNumber": "918667363896",
            },
            {
                "_id": 3,
                "title": "Cloud Commanders",
                "iconName": "FaCloud",
                "color": "text-indigo-600",
                "desc": "Scale to infinity. Docker, Kubernetes, Terraform, and CI/CD.",
                "skills": ["AWS", "Docker", "K8s", "Linux"],
                "contactName": "Cloud Training Lead",
                "whatsappNumber": "918667363896",
            },
        ],
        "curriculum": {
            "web": [
                {"_id": 1, "week": "Week 1-2", "title": "The Foundation",        "desc": "Javascript V8 Engine internals, Async architecture, and DOM manipulation."},
                {"_id": 2, "week": "Week 3-5", "title": "Backend Engineering",   "desc": "Building scalable APIs with Node.js, Express, and Database Design patterns."},
                {"_id": 3, "week": "Week 6-8", "title": "Frontend & Deployment", "desc": "Advanced React hooks, Redux, Next.js SSR, and deploying to AWS EC2."},
            ],
            "ai": [
                {"_id": 1, "week": "Week 1-2", "title": "Python & Maths",         "desc": "Advanced Python structures, NumPy, Pandas, and Linear Algebra for ML."},
                {"_id": 2, "week": "Week 3-5", "title": "Machine Learning Ops",   "desc": "Supervised Learning, Scikit-learn, and model evaluation metrics."},
                {"_id": 3, "week": "Week 6-8", "title": "Deep Learning & LLMs",  "desc": "Neural Networks, Transformers, and building RAG applications."},
            ],
        },
        "projects": [
            {"_id": 1, "title": "AI-Powered SaaS",  "tag": "Full Stack", "desc": "Build a subscription-based SaaS platform integrated with OpenAI API."},
            {"_id": 2, "title": "Crypto Exchange",   "tag": "Web3",       "desc": "Real-time trading engine with WebSockets and high-frequency data handling."},
            {"_id": 3, "title": "Autonomous Agents", "tag": "AI/ML",      "desc": "Create AI agents that can browse the web and perform tasks automatically."},
        ],
        "faqs": [
            {"_id": 1, "question": "Is this beginner friendly?",        "answer": "Yes, but be ready to work hard. We start from zero but move fast."},
            {"_id": 2, "question": "Do you provide placement support?", "answer": "We have 50+ hiring partners. If you clear our assessments, we refer you directly."},
            {"_id": 3, "question": "What is the duration?",             "answer": "The internship cohort runs for 8 weeks intense training + 4 weeks live project."},
        ],
    }


@router.post("/apply")
async def apply_job(
    firstName: str = Form(...),
    lastName:  str = Form(...),
    email:     str = Form(...),
    phone:     str = Form(...),
    jobTitle:  str = Form(...),
    portfolio: Optional[str] = Form(None),
    resume:    Optional[UploadFile] = File(None),
    db=Depends(get_db),
):
    resume_path: Optional[str] = None

    if resume and resume.filename:
        os.makedirs("uploads", exist_ok=True)
        safe_name = f"{os.urandom(4).hex()}_{resume.filename}"
        save_path = os.path.join("uploads", safe_name)
        with open(save_path, "wb") as f:
            shutil.copyfileobj(resume.file, f)
        resume_path = f"uploads/{safe_name}"

    from datetime import datetime
    await db["applications"].insert_one({
        "firstName":  firstName,
        "lastName":   lastName,
        "email":      email,
        "phone":      phone,
        "portfolio":  portfolio,
        "jobTitle":   jobTitle,
        "resumePath": resume_path,
        "status":     "Pending",
        "appliedAt":  datetime.utcnow(),
    })

    _send_application_email(firstName, lastName, email, phone, portfolio, jobTitle, resume_path)

    return {"success": True, "message": "Application Submitted Successfully!"}


SMTP_HOST = os.getenv("SMTP_HOST", "smtp-relay.brevo.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
COMPANY_EMAIL = os.getenv("COMPANY_EMAIL", "info@dveininnovations.com")


def _get_smtp_connection():
    """Return an authenticated SMTP connection using env credentials."""
    EMAIL_USER = os.getenv("EMAIL_USER")
    EMAIL_PASS = os.getenv("EMAIL_PASS")
    if not EMAIL_USER or not EMAIL_PASS:
        return None
    try:
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASS)
        return server
    except Exception as e:
        print(f"SMTP connection failed: {e}")
        return None


def _send_application_email(first, last, email, phone, portfolio, job_title, resume_path):
    EMAIL_USER = os.getenv("EMAIL_USER")
    if not EMAIL_USER:
        return

    server = _get_smtp_connection()
    if not server:
        return

    try:
        # ── 1. Notify company ──────────────────────────────────────────────
        company_msg = MIMEMultipart()
        company_msg["From"]    = f"DVein Careers <{EMAIL_USER}>"
        company_msg["To"]      = COMPANY_EMAIL
        company_msg["Subject"] = f"🚀 New Application: {job_title} — {first} {last}"

        company_body = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:#6d28d9;padding:24px 32px;">
            <h2 style="color:#fff;margin:0;">New Application Received</h2>
            <p style="color:#c4b5fd;margin:4px 0 0;">DVein Internship / Course Enrollment</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#555;width:140px;"><strong>Name</strong></td>
                  <td style="padding:8px 0;color:#111;">{first} {last}</td></tr>
              <tr><td style="padding:8px 0;color:#555;"><strong>Email</strong></td>
                  <td style="padding:8px 0;color:#111;">{email}</td></tr>
              <tr><td style="padding:8px 0;color:#555;"><strong>Phone</strong></td>
                  <td style="padding:8px 0;color:#111;">{phone}</td></tr>
              <tr><td style="padding:8px 0;color:#555;"><strong>Applied For</strong></td>
                  <td style="padding:8px 0;color:#6d28d9;font-weight:bold;">{job_title}</td></tr>
              <tr><td style="padding:8px 0;color:#555;"><strong>Portfolio</strong></td>
                  <td style="padding:8px 0;color:#111;">{portfolio or 'Not Provided'}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;"/>
            <p style="color:#888;font-size:12px;">This application is stored in the DVein admin dashboard.</p>
          </div>
        </div>
        """
        company_msg.attach(MIMEText(company_body, "html"))

        if resume_path and os.path.exists(resume_path):
            with open(resume_path, "rb") as f:
                part = MIMEBase("application", "octet-stream")
                part.set_payload(f.read())
            encoders.encode_base64(part)
            part.add_header("Content-Disposition", f'attachment; filename="{os.path.basename(resume_path)}"')
            company_msg.attach(part)

        server.sendmail(EMAIL_USER, COMPANY_EMAIL, company_msg.as_string())

        # ── 2. Confirmation to applicant ───────────────────────────────────
        user_msg = MIMEMultipart()
        user_msg["From"]    = f"DVein Innovations <{EMAIL_USER}>"
        user_msg["To"]      = email
        user_msg["Subject"] = f"✅ Application Received — {job_title} | DVein"

        user_body = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:#6d28d9;padding:24px 32px;">
            <h2 style="color:#fff;margin:0;">Hi {first}, we got your application! 🎉</h2>
            <p style="color:#c4b5fd;margin:4px 0 0;">DVein Innovations — {job_title}</p>
          </div>
          <div style="padding:32px;">
            <p style="font-size:15px;color:#333;line-height:1.7;">
              Thank you for applying for <strong>{job_title}</strong> at DVein Innovations.
              Our team will review your profile and get back to you within <strong>48 hours</strong>
              via WhatsApp and email.
            </p>
            <div style="background:#f5f3ff;border-left:4px solid #6d28d9;padding:16px 20px;border-radius:8px;margin:24px 0;">
              <p style="margin:0;font-size:13px;color:#555;"><strong>What happens next?</strong></p>
              <ul style="margin:8px 0 0;padding-left:20px;font-size:13px;color:#555;line-height:2;">
                <li>Our team reviews your application</li>
                <li>We reach out on WhatsApp / Email to schedule an intro call</li>
                <li>If selected, you receive your onboarding kit</li>
              </ul>
            </div>
            <p style="font-size:13px;color:#888;">
              Questions? Reach us at
              <a href="mailto:{COMPANY_EMAIL}" style="color:#6d28d9;">{COMPANY_EMAIL}</a>
              or WhatsApp <a href="https://wa.me/919500181230" style="color:#6d28d9;">+91 95001 81230</a>.
            </p>
          </div>
          <div style="background:#f9fafb;padding:16px 32px;text-align:center;">
            <p style="font-size:11px;color:#aaa;margin:0;">© 2026 DVein Innovations · Alpha City IT Park, OMR, Chennai</p>
          </div>
        </div>
        """
        user_msg.attach(MIMEText(user_body, "html"))
        server.sendmail(EMAIL_USER, email, user_msg.as_string())

    except Exception as e:
        print(f"Email send failed: {e}")
    finally:
        try:
            server.quit()
        except Exception:
            pass


# ── Contact form endpoint ──────────────────────────────────────────────────────

@router.post("/contact")
async def contact_form(
    name:    str = Form(...),
    email:   str = Form(...),
    service: str = Form(...),
    message: str = Form(...),
):
    """Handle the Contact page form — sends to company + auto-reply to sender."""
    EMAIL_USER = os.getenv("EMAIL_USER")
    if not EMAIL_USER:
        # Still return success so the UI doesn't break if email isn't configured
        return {"success": True, "message": "Message received! We will get back to you soon."}

    server = _get_smtp_connection()
    if not server:
        return {"success": True, "message": "Message received! We will get back to you soon."}

    try:
        # ── Notify company ────────────────────────────────────────────────
        company_msg = MIMEMultipart()
        company_msg["From"]    = f"DVein Website <{EMAIL_USER}>"
        company_msg["To"]      = COMPANY_EMAIL
        company_msg["Subject"] = f"📩 New Contact Message: {service} — {name}"

        company_body = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:#0f172a;padding:24px 32px;">
            <h2 style="color:#fff;margin:0;">New Contact Form Submission</h2>
            <p style="color:#94a3b8;margin:4px 0 0;">DVein Website — Contact Page</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#555;width:140px;"><strong>Name</strong></td>
                  <td style="padding:8px 0;color:#111;">{name}</td></tr>
              <tr><td style="padding:8px 0;color:#555;"><strong>Email</strong></td>
                  <td style="padding:8px 0;color:#111;">{email}</td></tr>
              <tr><td style="padding:8px 0;color:#555;"><strong>Service</strong></td>
                  <td style="padding:8px 0;color:#111;">{service}</td></tr>
            </table>
            <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-top:16px;">
              <p style="margin:0;color:#333;font-size:14px;line-height:1.7;">{message}</p>
            </div>
          </div>
        </div>
        """
        company_msg.attach(MIMEText(company_body, "html"))
        server.sendmail(EMAIL_USER, COMPANY_EMAIL, company_msg.as_string())

        # ── Auto-reply to sender ──────────────────────────────────────────
        user_msg = MIMEMultipart()
        user_msg["From"]    = f"DVein Innovations <{EMAIL_USER}>"
        user_msg["To"]      = email
        user_msg["Subject"] = "✅ We received your message — DVein Innovations"

        user_body = f"""
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
          <div style="background:#0f172a;padding:24px 32px;">
            <h2 style="color:#fff;margin:0;">Hi {name}, thanks for reaching out!</h2>
            <p style="color:#94a3b8;margin:4px 0 0;">DVein Innovations</p>
          </div>
          <div style="padding:32px;">
            <p style="font-size:15px;color:#333;line-height:1.7;">
              We received your message about <strong>{service}</strong> and our team will
              respond within <strong>2 hours</strong> during business hours.
            </p>
            <div style="background:#f0fdf4;border-left:4px solid #22c55e;padding:16px 20px;border-radius:8px;margin:24px 0;">
              <p style="margin:0;font-size:13px;color:#166534;">
                <strong>Your message:</strong><br/>{message}
              </p>
            </div>
            <p style="font-size:13px;color:#888;">
              Need urgent help? WhatsApp us at
              <a href="https://wa.me/919500181230" style="color:#22c55e;">+91 95001 81230</a>
            </p>
          </div>
          <div style="background:#f9fafb;padding:16px 32px;text-align:center;">
            <p style="font-size:11px;color:#aaa;margin:0;">© 2026 DVein Innovations · Alpha City IT Park, OMR, Chennai</p>
          </div>
        </div>
        """
        user_msg.attach(MIMEText(user_body, "html"))
        server.sendmail(EMAIL_USER, email, user_msg.as_string())

    except Exception as e:
        print(f"Contact email failed: {e}")
    finally:
        try:
            server.quit()
        except Exception:
            pass

    return {"success": True, "message": "Message sent! We will get back to you within 2 hours."}
