from time import sleep
import json
import pprint
import datetime
import requests
import schedule
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-t', '--token', type=str, help='사용할 token')
parser.add_argument('-i', '--idx', type=int, help='단일 신청; 신청할 인강실의 index')
parser.add_argument('-p', '--perfer', type=int, help='모두 신청; 우선적으로 신청할 인강실의 index')
args = parser.parse_args()

# if args.idx:

# try:
#   request_time = int(sys.argv[1])
# except:
#   request_time = 2

if args.idx != None:
  # print(f'[*] running to get ingang #{request_time}')
  print(f'[*] {args.idx}번 인강실을 신청합니다.')
elif args.perfer != None:
  print(f'[*] {args.perfer}번 인강실을 우선적으로 신청합니다.')
else:
  parser.print_help()
  exit(0)

if not args.token:
  secret = json.load(open('secret.json'))
  baseURL = 'http://dev-api.dimigo.in'

  req = requests.post(f'{baseURL}/auth', json={
    'id': 'hanaro0704',
    'password': secret['password']
  })

  token = json.loads(req.text)['token']
  print('[*]', token)
else: 
  token = args.token

def _request_ingang(token, ingang): 
  req = requests.post(f"{baseURL}/ingang/{ingang['idx']}", headers={
    'Authorization': f'Bearer {token}'
  })
  return req.status_code

def apply_ingang():
  req = requests.get(f'{baseURL}/ingang', headers={
    'Authorization': f'Bearer {token}'
  })

  ingangs = json.loads(req.text)['ingangs']
  pprint.pprint(ingangs)

  if args.idx != None:
    ingang = ingangs[args.idx]
  else:
    ingang = ingangs[args.perfer]
  print('[*] 신청할 인강:', ingang)
  
  while 1:
    req_code = _request_ingang(token, ingang)
    print(req_code)
    if req_code == 200: 
      if args.idx != None:
        print(f'[+] {args.idx}번 인강 신청 성공!')
      else: # perfer mode -> apply for unperfered option
        print(f'[+] {args.perfer}번 인강 신청 성공!')
        ingang = ingangs[int(not args.perfer)] # unperfered option
        print('[*] 신청할 인강:', ingang)
        while 1:
          req_code = _request_ingang(token, ingang)
          print(req_code)
          if req_code == 200: 
            print(f'[+] {int(not args.perfer)}번 인강 신청 성공!')
            exit(0)
    elif req_code == 403:
      print('[*] 모든 티켓을 사용했습니다.')
      exit(0)
    sleep(1)

if __name__ == '__main__':
  if (datetime.datetime.now() < datetime.datetime.now().replace(hour=8, minute=30, second=0, microsecond=0)):
    schedule.every().day.at('08:30').do(apply_ingang)
    print('[!] 인강실 신청이 시작되는 08:30까지 대기합니다.')
    while 1:
      schedule.run_pending()
  else:
    print('[!] 이미 인강실 신청이 시작되었어요. 지금부터 드랍을 기다리며 계속 신청을 시도합니다.')
    apply_ingang()
