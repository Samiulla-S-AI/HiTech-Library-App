import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

def send_test_email():
    # Load environment variables from .env file
    load_dotenv()
    
    sender_email = os.getenv('GMAIL_USER')
    sender_password = os.getenv('GMAIL_APP_PASSWORD')
    recipient_email = "samiullas831@gmail.com"
    
    if not sender_email or not sender_password:
        print("Error: GMAIL_USER or GMAIL_APP_PASSWORD not found in .env file.")
        return

    # Create the email message
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient_email
    message["Subject"] = "Test Email from Librarian Mailer"
    
    body = "This is a test email sent from your Python script to verify the email configuration."
    message.attach(MIMEText(body, "plain"))
    
    try:
        # Use Gmail's SMTP server
        print(f"Connecting to SMTP server as {sender_email}...")
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        
        print(f"Sending email to {recipient_email}...")
        server.send_message(message)
        server.quit()
        print("✅ Success: Test email sent successfully!")
        
    except Exception as e:
        print(f"❌ Error: Failed to send email. {str(e)}")

if __name__ == "__main__":
    send_test_email()
