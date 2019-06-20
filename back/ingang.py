import json

async def get_token(requests, id, password):
  req = await requests.post('http://dev-api.dimigo.in/auth', json={
    'id': id,
    'password': password
  })
  return json.loads(req.text)['token']

async def get_ingangs(requests, token):
  req = await requests.get('http://dev-api.dimigo.in/ingang', headers={
    'Authorization': 'Bearer {}'.format(token)
  })
  return json.loads(req.text)['ingangs']

async def _request_ingang(requests, token, ingang): 
  req = await requests.post('http://dev-api.dimigo.in/ingang/{}'.format(ingang['idx']), headers={
    'Authorization': 'Bearer {}'.format(token)
  })
  return req.status_code

async def apply_ingang(requests, token, ingang):
  for i in range(100):
    while 1:
      try:
        req_code = await _request_ingang(requests, token, ingang)
        break
      except ConnectionError:
        print('[!] ConnectionError occurred')
    print(req_code)
    if req_code == 200: 
      print('[+] {}번 인강 신청 성공'.format(ingang.idx))
      return 200
    elif req_code == 403:
      print('[!] 모든 티켓을 사용했습니다.')
      return 403
    sleep(1)
