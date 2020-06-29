const { getNecessidades, fecharBrowser, getAtualizacao, visitarLinkCorreios } = require('./getNecessidades');

(async () => {
  let atualizacao = {};
  const necessidades = await getNecessidades(),
    argumento = necessidades[2];

  await visitarLinkCorreios(argumento);

  try {
    atualizacao = await getAtualizacao();
  } catch (error) {
    console.log('***********************************');
    console.log('ERRO RESPOSTA:');
    console.log(error);
    console.log('***********************************');
  } finally {
    fecharBrowser(necessidades[0]);
    console.log('***********************************');
    console.log('RESPOSTA CORREIOS:');
    console.log(atualizacao);
    console.log('***********************************');
  }
})();
