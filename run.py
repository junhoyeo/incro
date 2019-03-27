import json
import pprint
import requests

secret = json.load(open('secret.json'))
baseURL = 'http://dev-api.dimigo.in'

req = requests.post(f'{baseURL}/auth', json={
  'id': secret['id'],
  'password': secret['password']
})

token = json.loads(req.text)['token']
print('[*]', token)

req = requests.get(f'{baseURL}/ingang', headers={
  'Authorization': f'Bearer {token}'
})

ingangs = json.loads(req.text)['ingangs']
pprint.pprint(ingangs)

for ingang in reversed(ingangs):
  req = requests.post(f"{baseURL}/ingang/{ingang['idx']}", headers={
    'Authorization': f'Bearer {token}'
  })
  pprint.pprint(json.loads(req.text))
