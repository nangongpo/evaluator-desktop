'''
模拟六合一发送请求
'''

import requests


url = 'http://192.168.199.113:8013/queue/gateway/'
# url = 'http://0.0.0.0:8000/queue/gateway/'


def call():
    '''
    叫号
    :return:
    '''
    data = {
        'opType':'TMRI_CALLOUT',
        'ywckjsjip':'127.0.0.1',
        'glbm':'00000000'
    }
    result = requests.post(url,data=data)
    print(result.text)
    print(result.json())

def recall():
    '''
    重叫
    :return:
    '''
    data = {
        'opType': 'TMRI_RECALL',
        'qhxxxlh': '2009101000000101000142',
    }
    result = requests.post(url, data=data)
    print(result.json())

def skip():
    '''
    过号
    :return:
    '''
    data = {
        'opType': 'TMRI_SKIP',
        'qhxxxlh': '2009101000000101000142',
    }
    result = requests.post(url, data=data)
    print(result.json())

def start_evaluation():
    '''
    提请评价
    :return:
    '''
    # todo 没有登录用户
    data = {
        'opType': 'TMRI_EVALUATION',
        'qhxxxlh': '2009072A003',
    }
    result = requests.post(url, json=data)
    print(result.json())


def suspend():
    '''
    暂停服务
    :return:
    '''
    data = {
        'opType': 'TMRI_SUSPEND',
        'ywckjsjip': '192.168.199.125',
    }
    result = requests.post(url, data=data)
    print(result.json())

def recover():
    '''
    回复叫号
    :return:
    '''
    data = {
        'opType': 'TMRI_RECOVER',
        'ywckjsjip': '192.168.199.125',
    }
    result = requests.post(url, data=data)
    print(result.json())

def receive():
    # todo 自定义语音播放 排号机语音有问有
    '''
    待领取牌证信息写入,  六合一发出请求，控制排号机破防语音
    先判断制证计算机在不在用户表中
    在根据领证窗口编号去呼叫语音
    :return:
    '''
    data = {
        'opType': 'TMRI_RECEIVE',
        'lsh': '156',
        'xm':'张三',
        'pzlx':'02',
        'zzjsjip':'192.168.1.172',   # 制证计算机IP
        'lzckbh':'192.168.1.172'   # 领证窗口编号，发起语音应该是领证窗口
    }
    result = requests.post(url, json=data)
    print(result.json())

def complete():
    '''
    完成
    :return:
    '''
    data = {
        'opType': 'TMRI_EVALUATION',
        'qhxxxlh': '2009073A001',
    }
    result = requests.post(url, jsonresponse=data)
    print(result.json())

def start():
    '''
    完成
    :return:
    '''
    data = {
        'opType': 'TMRI_EVALUATION',
        'qhxxxlh': '2009101000000102000001',
    }
    result = requests.post(url, data=data)
    print(result.text)
    print(result.json())

def evaluate():
    url = 'http://127.0.0.1:8013/queue/evaluate/'
    data = {
        'number_info': '2009101000000102000001',
        'type': '1',
        'level': '1',
    }
    result = requests.post(url, data=data)
    print(result.text)
    print(result.json())


if __name__ == '__main__':
    # queue()
    # call()   # 叫号
    # recall()  # 重复叫号
    # skip()    # 过号
    # suspend()     # 暂停服务
    # recover()    # 恢复叫号
    start()     # 发起评价

