const axios = require('axios');
const cheerio = require('cheerio');

const scrapeWebsite = async () => {
  const url = 'https://www.waves.com.br/surf/ondas/picos/sp/guaruja/monduba/';

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Aqui você pode utilizar seletores CSS para extrair informações específicas
    const localizacao = $('.pico_header_pico_off h1').text().trim();
    const h2Text = $('.pico_header_pico_off h2').text().trim();
    // Extrai a data da string "Previsão atualizada Wednesday, 24/01/2024"
    const data = h2Text.split(', ')[1];
    const swell = $('#forecast_wave_size span').text().trim();
    const direcao = $('#forecast_wave_direction').text().trim();
    // const vento = $('.vento-selector').text();
    // const mareAlta = $('.mare-alta-selector').text();
    // const mareBaixa = $('.mare-baixa-selector').text();

    return { localizacao, data, swell, direcao};
    // return { data, swell, direcao, vento, mareAlta, mareBaixa };
  } catch (error) {
    throw new Error('Erro ao fazer a varredura no site:', error);
  }
};

module.exports = scrapeWebsite;