import json
from datetime import time, timedelta
from http3 import AsyncClient
from sanic import Sanic
from sanic_scheduler import SanicScheduler
from sanic_scheduler import task as cron
from ingang import *

app = Sanic()
scheduler = SanicScheduler(app)
requests = AsyncClient()

tasks = []
with open('./tasks.json') as task_file:
    tasks = json.load(task_file)

@cron(timedelta(), time(hour=6, minute=30))
async def update(_):
    for task in tasks:
        task['token'] = await get_token(requests, task['id'], task['password'])
        ingangs = await get_ingangs(requests, task['token'])
        task['ingang'] = ingangs[task['idx']]
    print(tasks)

@cron(timedelta(), time(hour=7))
async def request_ingang(_):
    for task in tasks:
        await apply_ingang(requests, task['token'], task['ingang'])

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
