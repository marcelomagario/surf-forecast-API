const axios = require('axios');
const cheerio = require('cheerio');

const scrapeWebsite1 = async () => {
  const url = 'https://www.waves.com.br/surf/ondas/picos/sp/santos/quebra-mar/';

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Aqui você pode utilizar seletores CSS para extrair informações específicas
    const localizacao = $('.pico_header_pico_off h1').text().trim();
    const h2Text = $('.pico_header_pico_off h2').text();
    // Extrai a data da string "Previsão atualizada Wednesday, 24/01/2024"
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
    throw new Error('Erro ao fazer a varredura no site:', error);
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
    console.error('Erro no scraper do site 2:', error);
    throw new Error('Erro ao fazer a varredura no site 2:', error);
  }
};

const combineData = async () => {
  try {
    const dataFromSite1 = await scrapeWebsite1();
    const dataFromSite2 = await scrapeWebsite2();

    // Combine os dados de ambos os sites
    const combinedData = { ...dataFromSite1, ...dataFromSite2 };

    console.log('Dados combinados:', combinedData);

    return combinedData;
  } catch (error) {
    console.error('Erro ao combinar dados:', error);
    throw new Error('Erro ao combinar dados:', error);
  }
};

module.exports = combineData;
