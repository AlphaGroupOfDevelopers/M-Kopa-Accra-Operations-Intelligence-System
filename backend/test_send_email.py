"""Helper script to test SMTP email configuration."""

import sys
from app.utils.email import send_email

def main():
    if len(sys.argv) < 2:
        print("Usage: python test_send_email.py <recipient_email>")
        sys.exit(1)
        
    recipient = sys.argv[1]
    subject = "M-Kopa Management System - SMTP Connection Test"
    html_content = """
    <h2>SMTP Test Successful!</h2>
    <p>This is a test email sent from the M-Kopa Management System backend.</p>
    <p>If you received this, your SMTP configuration is correct and working.</p>
    """
    
    print(f"Attempting to send test email to {recipient}...")
    success = send_email(
        recipients=recipient,
        subject=subject,
        html_content=html_content
    )
    
    if success:
        print("✓ Test email sent successfully!")
    else:
        print("✗ Failed to send test email. Please check your SMTP settings in .env.")
        sys.exit(1)

if __name__ == "__main__":
    main()
