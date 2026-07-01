"""Email utility for sending alerts, reports, and notifications via SMTP."""

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import List, Union, Optional
from loguru import logger

from app.core import settings


def send_email(
    recipients: Union[str, List[str]],
    subject: str,
    html_content: str,
    text_content: Optional[str] = None,
) -> bool:
    """
    Send an email using the SMTP configurations in settings.

    Args:
        recipients: A single email address or a list of email addresses.
        subject: The subject of the email.
        html_content: HTML version of the email body.
        text_content: Optional plain text version of the email body.

    Returns:
        True if the email was sent successfully, False otherwise.
    """
    # Check if SMTP is configured
    if not settings.SMTP_HOST:
        logger.warning("SMTP host is not configured. Email was not sent.")
        return False

    # Normalize recipients to list
    recipient_list = [recipients] if isinstance(recipients, str) else recipients

    # Default text content if not provided
    if not text_content:
        # Simple HTML-to-text approximation
        text_content = html_content.replace("<br>", "\n").replace("<p>", "").replace("</p>", "\n")

    # Create message container
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    
    # Set From email and name
    from_email = settings.EMAILS_FROM_EMAIL or "noreply@m-kopa-aois.com"
    from_name = settings.EMAILS_FROM_NAME or "M-Kopa Management System"
    msg["From"] = f"{from_name} <{from_email}>"
    msg["To"] = ", ".join(recipient_list)

    # Attach parts
    msg.attach(MIMEText(text_content, "plain"))
    msg.attach(MIMEText(html_content, "html"))

    try:
        host = settings.SMTP_HOST
        port = settings.SMTP_PORT or 587
        user = settings.SMTP_USER
        password = settings.SMTP_PASSWORD

        logger.info(f"Connecting to SMTP server {host}:{port}...")
        
        # Connect to SMTP server
        # For port 465, use SMTP_SSL. For 587 or 25, use standard SMTP + STARTTLS
        if port == 465:
            server = smtplib.SMTP_SSL(host, port, timeout=10)
        else:
            server = smtplib.SMTP(host, port, timeout=10)
            if port == 587:
                server.starttls()

        # Login if user/password is provided
        if user and password:
            logger.debug(f"Logging in to SMTP as {user}...")
            server.login(user, password)

        # Send email
        logger.info(f"Sending email to: {recipient_list}")
        server.sendmail(from_email, recipient_list, msg.as_string())
        server.quit()
        
        logger.info("✓ Email sent successfully!")
        return True

    except Exception as e:
        logger.error(f"✗ Failed to send email via SMTP: {e}")
        return False
