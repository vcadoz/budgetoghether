import requests
import json

url = 'https://api.bridgeapi.io/v2/users'
headers = {
    'Bridge-Version': '2021-06-01',
    'Content-Type': 'application/json',
    'Client-Id': '58e26ae0f7834572817681b12c1ee037',
    'Client-Secret': 'grImjzLlwZ5ifmTBy4DHFiOYmWGgnwICfHtbXVidheU39ZJ7gbF3l6hk3ClVpFtu',
}

response = requests.post(url, headers=headers)

print(f"Status Code: {response.status_code}")
print(f"Response Body: {response.text}")