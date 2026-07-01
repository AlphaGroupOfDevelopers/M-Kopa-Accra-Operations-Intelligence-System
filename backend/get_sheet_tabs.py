import sys
from google.oauth2 import service_account
from googleapiclient.discovery import build

def get_sheet_tabs():
    credentials_path = "credentials/google-credentials.json"
    sheet_id = "167G1R4aD2Hlqm52hBHviGQkZf1h_9GQDpRXqUspRSpc"
    
    try:
        scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly']
        credentials = service_account.Credentials.from_service_account_file(
            credentials_path,
            scopes=scopes
        )
        service = build('sheets', 'v4', credentials=credentials)
        
        print("Fetching spreadsheet metadata...")
        spreadsheet = service.spreadsheets().get(spreadsheetId=sheet_id).execute()
        
        print("\nAvailable tabs/worksheets in this Google Sheet:")
        for sheet in spreadsheet.get('sheets', []):
            title = sheet.get('properties', {}).get('title')
            print(f" - '{title}'")
            
    except Exception as e:
        print(f"Failed to fetch metadata: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    get_sheet_tabs()
