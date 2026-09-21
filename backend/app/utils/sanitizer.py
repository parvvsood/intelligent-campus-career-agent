import re
import html

def sanitize_user_input(text: str) -> str:
    """
    Sanitizes user input string by stripping potential HTML tags,
    escaping special characters, and stripping excessive whitespace.
    """
    if not text:
        return ""
    # Strip HTML tags
    clean = re.sub(r'<[^>]*>', '', text)
    # Escape HTML special chars
    clean = html.escape(clean)
    # Normalize whitespace
    clean = ' '.join(clean.split())
    return clean
