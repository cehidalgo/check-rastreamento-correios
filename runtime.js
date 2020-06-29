const { getNecessidades, fecharBrowser, getAtualizacao, visitarLinkCorreios } = require('./getNecessidades');

(async () => {
  let atualizacao = {};
  const necessidades = await getNecessidades(),
    argumento = necessidades[2];

  try {
    await visitarLinkCorreios(argumento);

    atualizacao = await getAtualizacao();
  } catch (error) {
    console.log('***********************************');
    console.log('ERRO RESPOSTA:');
    console.log(error);
    console.log('***********************************');
    fecharBrowser(necessidades[0]);
    return;
  }

  fecharBrowser(necessidades[0]);
  console.log('***********************************');
  console.log('RESPOSTA CORREIOS:');
  console.log(atualizacao);
  console.log('***********************************');
})();
