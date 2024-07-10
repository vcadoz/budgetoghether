import requests
import json

url = 'https://api.bridgeapi.io/v2/transactions/updated?since=2019-06-21T18:44:09.523Z&limit=12'
headers = {
    'Bridge-Version': '2021-06-01',
    'Client-Id': '58e26ae0f7834572817681b12c1ee037',
    'Client-Secret': 'grImjzLlwZ5ifmTBy4DHFiOYmWGgnwICfHtbXVidheU39ZJ7gbF3l6hk3ClVpFtu',
    "Authorization" : "Bearer 18ee7bd53d102260202f6a63c1662d3ea1c09f2f-3910f79b-37b1-4cf1-88e4-0752fe1cbf62"
}

response = requests.get(url, headers=headers)

print(f"Status Code: {response.status_code}")
print(f"Response Body: {response.text}")