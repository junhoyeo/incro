import json
import pprint
import requests
from time import sleep

secret = json.load(open('secret.json'))
baseURL = 'http://dev-api.dimigo.in'

req = requests.post(f'{baseURL}/auth', json={
  'id': 'hanaro0704',
  'password': secret['password']
})

token = json.loads(req.text)['token']
print('[*]', token)

req = requests.get(f'{baseURL}/ingang', headers={
  'Authorization': f'Bearer {token}'
})

ingangs = json.loads(req.text)['ingangs']
pprint.pprint(ingangs)

while(1):
  for ingang in reversed(ingangs):
    req = requests.post(f"{baseURL}/ingang/{ingang['idx']}", headers={
      'Authorization': f'Bearer {token}'
    })
    req_code = req.status_code
    print(req_code)
    if req_code == 200: 
      exit(0)
  sleep(1)
