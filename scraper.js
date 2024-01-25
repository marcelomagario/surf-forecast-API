const axios = require('axios');
const cheerio = require('cheerio');

const scrapeWebsite = async () => {
  const url = 'https://www.waves.com.br/surf/ondas/picos/sp/guaruja/monduba/';

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Aqui você pode utilizar seletores CSS para extrair informações específicas
    // const data = $('.data-selector').text();
    const swell = $('#forecast_wave_size span').text();
    const direcao = $('#forecast_wave_direction').text();
    // const vento = $('.vento-selector').text();
    // const mareAlta = $('.mare-alta-selector').text();
    // const mareBaixa = $('.mare-baixa-selector').text();

    return { swell, direcao};
    // return { data, swell, direcao, vento, mareAlta, mareBaixa };
  } catch (error) {
    throw new Error('Erro ao fazer a varredura no site:', error);
  }
};

module.exports = scrapeWebsite;