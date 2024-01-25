const axios = require('axios');
const cheerio = require('cheerio');

const scrapeWebsite1 = async () => {
  const url = 'https://www.waves.com.br/surf/ondas/picos/sp/santos/quebra-mar/';

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const localizacao = $('.pico_header_pico_off h1').text().trim();
    const h2Text = $('.pico_header_pico_off h2').text();
    const data = h2Text.split(',')[1].trim();
    const tamanho = $('#forecast_wave_size span').text().trim();
    const direcao = $('#forecast_wave_direction').text().trim();
    const vento = $('#forecast_wind_speed').text().trim().replace(/\s+/g, '');
    // const mareBaixa = $('tbody td.ce:contains("Seca") + td div div img[src*="mare_seca.png"] + div[style="line-height: 14px;"]').text().trim();
    // const mareAlta = $('.mare-alta-selector').text();

    // const regexHora = /\b\d{2}h\d{2}\b/g;
    // const horariosMareBaixa = mareBaixa.match(regexHora);

    return { localizacao, data, tamanho, direcao, vento};
    // return { localizacao, data, tamanho, direcao, vento, mareBaixa: horariosMareBaixa};
    
    
  } catch (error) {
    console.error('error: ', error);
    throw new Error('Error while scraping the website 1:', error);
  }
};

const scrapeWebsite2 = async () => {
  const url2 = 'https://surfguru.com.br/previsao/brasil/sao-paulo/santos/oceanica?tipo=tabela';

  try {
    const response = await axios.get(url2);
    const $ = cheerio.load(response.data);

    const periodo = $('#label_organize').text();

    return { periodo };
  } catch (error) {
    console.error('Err:', error);
    throw new Error('Error while scraping the website 1:', error);
  }
};

const combineData = async () => {
  try {
    const dataFromSite1 = await scrapeWebsite1();
    const dataFromSite2 = await scrapeWebsite2();

    const combinedData = { ...dataFromSite1, ...dataFromSite2 };

    console.log('Combined data:', combinedData);

    return combinedData;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error while trying to combine data:', error);
  }
};

module.exports = combineData;
