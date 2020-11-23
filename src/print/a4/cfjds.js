export function printContent(model = {}) {
  const splitText = (text, num, seperator = '-') => {
    if (!text || !num) return ''
    return text.slice(0, num) + seperator + text.slice(num)
  }
  return `<div class="single-content">
    <p class="title">郑州市公安局交通警察支队</p>
    <p class="subtitle">公安交通管理简易程序处罚决定书</p>
    <div class="each-line">
      <img src="${model.barcode}" style="height: 50px">
      <p class="bh">编号：<span>${splitText(model.jdsbh, 5)}</span></p>
    </div>
    <div class="each-line">
      <p style="min-width: 102px">被处罚人：<u>马志刚</u></p>
      <p>驾驶证档案编号：<u>410122197507150094</u></p>
    </div>
    <div class="each-line">
      <p>机动车驾驶证号：<u>410133197507150094</u></p>
    </div>
    <div class="each-line">
      <p style="min-width: 90px">准驾车型：<u>C1</u></p>
      <p>
        <span>联系方式：</span>
        <u>河南省平舆县南省平舆县南省平舆县南省平舆南省平舆县14号</u>
      </p>
    </div>
    <div class="each-line">
      <p>车辆牌号：<u>豫A207PV</u></p>
      <p>车辆类型：<u>小型普通客车</u></p>
    </div>
    <div class="each-line">
      <p>发证机关：<u>河南省郑州市公安交通警察支队</u></p>
    </div>
    <div class="each-line">
      <p class="text-indent">被处罚人于
        <u>2019年03月18日07时33分</u>,在<u>江山路（江山路与银河路交叉口南口）</u>实施<u>机动车违反禁止标线指示</u>的违法行为（代码<u>1345</u>）违反了<u>《中华人民共和国道路交通安全法》第三十八条</u>依据<u>《中华人民共和国道路交通安全法》第一百一十四条、第九十条、《河南省道路交通安全条列》第五十三条第二项、第六十二条、</u>
      </p>
    </div>
    <div class="each-line">
      <p>决定予以<u>100元</u>罚款，记<u> 3 </u>分。</p>
    </div>
    <div class="each-line">
      <p class="text-indent">持本决定书在15日内到邮政储蓄银行缴纳罚款，逾期不缴纳的，每日按罚款数额的3%加处罚款。</p>
    </div>
    <div class="each-line">
      <p class="text-indent">如不服本决定，可以在收到本决定书之日起60日内向<u>郑州市公安局交警支队</u>申请行政复议；或者在3个月内向<u>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
      &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</u>人民法院提起行政诉讼。
      </p>
    </div>
    <div class="each-line ">
      <p>处罚地点：</p>
    </div>
    <div class="each-line">
      <p>交通警察（盖章或签名）：</p>
      <div class="text-center">
        <p>（公安机关交通管理部门盖章）</p>
        <p>2019年08月28日</p>
      </div>
    </div>
    <div class="each-line">
      <p class="signature text-underline">
        被处罚人签名：
        <img style="display: ${model.signature ? 'block' : 'none'}" src="${model.signature}">
        <span style="display: ${model.signature ? 'none' : 'block'}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        &nbsp;&nbsp;
      </p>
      <p class="text-interval text-center"><span>年</span><span>月</span><span>日</span></p>
    </div>
    <div class="each-line">
      <p style="min-width: 36px; padding-right: 0">备注：</p>
      <div class="text-underline text-center" style="width: 100%"></div>
    </div>
    <div class="single-bottom">
      <p>根据《机动车驾驶证申领和使用规定》记<u> 3 </u>分</p>
    </div>
  </div>`
}
