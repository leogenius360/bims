
import requests

resp = requests.get("http://localhost:3000/home")
print(resp.text)