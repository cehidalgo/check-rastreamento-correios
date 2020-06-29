const puppeteer = require('puppeteer');

let page = null,
  browser = null,
  argumento = null;

async function getNecessidades() {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  argumento = process.argv[process.argv.length - 1];

  return [browser, page, argumento, puppeteer];
}

async function visitarLinkCorreios(argumento) {
  await page.goto(`https://www.linkcorreios.com.br/?id2=${argumento}`, { timeout: 10000 });
  await page.waitForSelector('[class="linha_status"]', { timeout: 200 });
}

async function fecharBrowser() {
  await browser.close();
}

async function getAtualizacao() {
  return await page.evaluate(() => {
    const teste = document.querySelectorAll('[class="linha_status"]'),
      resposta = [];

    for (let i = 0; i < teste.length; i++) {
      let correString = teste[i].innerText.trim().split('\n') || [];

      if (correString.length <= 1) continue;
      if (typeof correString[3] === 'undefined') {
        resposta[i] = {
          status: correString[0].split(': ')[1],
          data: correString[1].split(': ')[1].split('|')[0].trim() + ' ' + correString[1].split(': ')[2],
          origem: correString[2].split(': ')[1],
        };
      } else {
        resposta[i] = {
          status: correString[0].split(': ')[1],
          data: correString[1].split(': ')[1].split('|')[0].trim() + ' ' + correString[1].split(': ')[2],
          destino: correString[3].split(': ')[1],
          origem: correString[2].split(': ')[1],
        };
      }
    }

    return resposta;
  });
}

module.exports = {
  getNecessidades,
  getAtualizacao,
  visitarLinkCorreios,
  fecharBrowser,
};
