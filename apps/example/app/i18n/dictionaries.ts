import { type Locale } from './config';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ToolCardCopy {
  id: string;
  title: string;
  description: string;
}

/** SEO + editorial content rendered below each tool widget (AdSense needs it). */
export interface ToolSeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  jsonLdName: string;
  heading: string;
  paragraphs: string[];
  useCasesTitle: string;
  useCases: string[];
  faqTitle: string;
  faqs: { q: string; a: string }[];
}

export interface UnitConverterCopy {
  title: string;
  category: string;
  categories: { length: string; mass: string; temperature: string };
  from: string;
  to: string;
  value: string;
  result: string;
  emptyHint: string;
  invalid: string;
}

export interface WordCounterCopy {
  title: string;
  placeholder: string;
  words: string;
  characters: string;
  charactersNoSpaces: string;
  sentences: string;
  readingTime: string;
  minutes: string;
  emptyHint: string;
}

export interface PercentageCopy {
  title: string;
  mode: string;
  modes: { ofX: string; isWhatPercent: string };
  percent: string;
  value: string;
  part: string;
  whole: string;
  result: string;
  emptyHint: string;
  invalid: string;
}

export interface PolicyPage {
  metaTitle: string;
  metaDescription: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export interface Dictionary {
  nav: { home: string; toggleTheme: string; menu: string; about: string; privacy: string; terms: string };
  home: {
    metaTitle: string;
    metaDescription: string;
    heroTitle: string;
    heroSubtitle: string;
    chooseTool: string;
    editorialTitle: string;
    editorialText: string;
    whyFreeTitle: string;
    whyFreeText: string;
    privacyBannerTitle: string;
    privacyBannerText: string;
    faqTitle: string;
    faqs: { q: string; a: string }[];
  };
  footer: { tagline: string; rights: string; madeWith: string };
  cards: ToolCardCopy[];
  unitConverter: UnitConverterCopy;
  wordCounter: WordCounterCopy;
  percentage: PercentageCopy;
  seo: Record<string, ToolSeo>;
  about: PolicyPage;
  privacy: PolicyPage;
  terms: PolicyPage;
}

// ---------------------------------------------------------------------------
// English
// ---------------------------------------------------------------------------

const en: Dictionary = {
  nav: { home: 'Home', toggleTheme: 'Toggle theme', menu: 'Menu', about: 'About', privacy: 'Privacy', terms: 'Terms' },
  home: {
    metaTitle: 'Example Toolkit — Free Online Tools',
    metaDescription:
      'A small, fast collection of free online tools: unit converter, word counter, and percentage calculator. No sign-up, runs in your browser.',
    heroTitle: 'Free online tools that just work',
    heroSubtitle: 'Convert units, count words, and crunch percentages — instantly, in your browser, with nothing to install.',
    chooseTool: 'Choose a tool',
    editorialTitle: 'Simple tools, done well',
    editorialText:
      'Example Toolkit is a demonstration of a static-site factory: a single codebase that ships fast, SEO-friendly tool pages in multiple languages. Every tool here runs entirely in your browser — no upload, no account, no waiting on a server.',
    whyFreeTitle: 'Why is it free?',
    whyFreeText:
      'These pages are supported by unobtrusive advertising, which is why the tools can stay free and require no sign-up. Because everything is static and runs client-side, hosting costs almost nothing — so there is no paywall to put in your way.',
    privacyBannerTitle: 'Your data never leaves your device',
    privacyBannerText:
      'Every calculation and conversion happens locally in your browser. We do not upload, store, or transmit anything you type.',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { q: 'Do I need to create an account?', a: 'No. Every tool works immediately with no sign-up or login.' },
      { q: 'Is my input sent to a server?', a: 'No. All processing happens client-side in your browser; nothing you enter is transmitted or stored.' },
      { q: 'Does it work on mobile?', a: 'Yes. The site is responsive and works on phones, tablets, and desktops.' },
      { q: 'Is it really free?', a: 'Yes. The site is supported by advertising, so all tools are free to use.' },
    ],
  },
  footer: {
    tagline: 'Free, fast, privacy-friendly online tools.',
    rights: 'All rights reserved.',
    madeWith: 'Built with the spec-driven static-site factory.',
  },
  cards: [
    { id: 'unit-converter', title: 'Unit Converter', description: 'Convert length, mass, and temperature instantly.' },
    { id: 'word-counter', title: 'Word Counter', description: 'Count words, characters, sentences, and reading time.' },
    { id: 'percentage', title: 'Percentage Calculator', description: 'Work out percentages two common ways.' },
  ],
  unitConverter: {
    title: 'Unit Converter',
    category: 'Category',
    categories: { length: 'Length', mass: 'Mass', temperature: 'Temperature' },
    from: 'From',
    to: 'To',
    value: 'Value',
    result: 'Result',
    emptyHint: 'Enter a value to convert.',
    invalid: 'Please enter a valid number.',
  },
  wordCounter: {
    title: 'Word Counter',
    placeholder: 'Start typing or paste your text here…',
    words: 'Words',
    characters: 'Characters',
    charactersNoSpaces: 'Characters (no spaces)',
    sentences: 'Sentences',
    readingTime: 'Reading time',
    minutes: 'min',
    emptyHint: 'Type some text to see live counts.',
  },
  percentage: {
    title: 'Percentage Calculator',
    mode: 'Calculation',
    modes: { ofX: 'What is X% of Y?', isWhatPercent: 'X is what % of Y?' },
    percent: 'Percentage (%)',
    value: 'Of value',
    part: 'Value',
    whole: 'Total',
    result: 'Result',
    emptyHint: 'Fill in both fields to see the result.',
    invalid: 'Please enter valid numbers.',
  },
  seo: {
    'unit-converter': {
      metaTitle: 'Unit Converter — Length, Mass & Temperature',
      metaDescription:
        'Free online unit converter for length, mass, and temperature. Convert meters, feet, kilograms, pounds, Celsius, and Fahrenheit instantly in your browser.',
      keywords: ['unit converter', 'length converter', 'weight converter', 'temperature converter', 'metric to imperial'],
      jsonLdName: 'Unit Converter',
      heading: 'About the unit converter',
      paragraphs: [
        'This unit converter handles the three most common everyday categories — length, mass, and temperature — and converts between metric and imperial units instantly as you type. There is nothing to install and nothing is uploaded: the math runs entirely in your browser.',
        'Length conversions use exact factors relative to the meter (for example, one inch is exactly 0.0254 meters). Mass conversions are relative to the kilogram. Temperature is handled separately because it is an affine conversion, not a simple ratio — converting Celsius to Fahrenheit multiplies by 9/5 and adds 32, so a dedicated formula is used rather than a single scale factor.',
      ],
      useCasesTitle: 'Common uses',
      useCases: [
        'Converting a recipe between metric and imperial measurements.',
        'Checking your height or weight in different unit systems.',
        'Reading a weather report in an unfamiliar temperature scale.',
        'Converting distances when travelling between countries.',
      ],
      faqTitle: 'Unit converter FAQ',
      faqs: [
        { q: 'How accurate are the conversions?', a: 'They use standard exact conversion factors, so results are accurate to the precision your inputs allow.' },
        { q: 'Why is temperature handled differently?', a: 'Temperature scales have different zero points, so converting requires an offset (and a scaling factor), not just multiplication.' },
        { q: 'Is anything uploaded?', a: 'No — every conversion runs locally in your browser.' },
      ],
    },
    'word-counter': {
      metaTitle: 'Word Counter — Words, Characters & Reading Time',
      metaDescription:
        'Free online word counter. Count words, characters with and without spaces, sentences, and estimated reading time as you type. Runs entirely in your browser.',
      keywords: ['word counter', 'character counter', 'count words', 'reading time calculator', 'text statistics'],
      jsonLdName: 'Word Counter',
      heading: 'About the word counter',
      paragraphs: [
        'This word counter updates live as you type or paste text, showing word count, character counts (with and without spaces), sentence count, and an estimated reading time. It is handy for essays with length limits, social posts with character caps, and content briefs that specify a word range.',
        'Words are counted by splitting on whitespace; sentences are estimated by counting terminal punctuation. Reading time assumes roughly 200 words per minute, a common average for silent reading of general-audience prose. None of your text is sent anywhere — the counts are computed in your browser.',
      ],
      useCasesTitle: 'Common uses',
      useCases: [
        'Staying within an essay or assignment word limit.',
        'Trimming a post to fit a platform character cap.',
        'Estimating how long an article will take readers.',
        'Checking that content meets a minimum length brief.',
      ],
      faqTitle: 'Word counter FAQ',
      faqs: [
        { q: 'How is reading time estimated?', a: 'It assumes about 200 words per minute, a typical silent-reading pace for general text.' },
        { q: 'Do you count characters with or without spaces?', a: 'Both are shown, because different platforms count limits differently.' },
        { q: 'Is my text stored?', a: 'No — it never leaves your browser.' },
      ],
    },
    percentage: {
      metaTitle: 'Percentage Calculator — Two Common Calculations',
      metaDescription:
        'Free percentage calculator. Find X% of a number, or work out what percentage one number is of another. Instant, accurate, and runs in your browser.',
      keywords: ['percentage calculator', 'percent of a number', 'what percent', 'calculate percentage', 'percent calculator'],
      jsonLdName: 'Percentage Calculator',
      heading: 'About the percentage calculator',
      paragraphs: [
        'Percentages trip people up because the same word covers several different questions. This calculator handles the two most common ones: "what is X% of Y?" (for example, 15% of 80) and "X is what percent of Y?" (for example, 12 is what percent of 80). Pick the mode, enter the numbers, and the answer updates instantly.',
        'The first mode multiplies: X% of Y equals (X ÷ 100) × Y. The second divides: X is (X ÷ Y) × 100 percent of Y. Both run in your browser with no rounding surprises beyond standard floating-point display.',
      ],
      useCasesTitle: 'Common uses',
      useCases: [
        'Calculating a tip or a discount on a price.',
        'Working out a grade or score as a percentage.',
        'Finding a tax or commission amount.',
        'Comparing two quantities as a proportion.',
      ],
      faqTitle: 'Percentage FAQ',
      faqs: [
        { q: 'How do I find X% of a number?', a: 'Divide the percentage by 100 and multiply by the number — the first mode does this for you.' },
        { q: 'How do I find what percent one number is of another?', a: 'Divide the part by the whole and multiply by 100 — the second mode does this for you.' },
        { q: 'Is it free?', a: 'Yes, and no sign-up is required.' },
      ],
    },
  },
  about: {
    metaTitle: 'About — Example Toolkit',
    metaDescription: 'About Example Toolkit: our mission, the tools we offer, and our privacy commitment.',
    title: 'About Example Toolkit',
    updated: 'Last updated: 2026',
    sections: [
      { heading: 'Our mission', body: 'Example Toolkit provides small, fast, genuinely useful online tools that anyone can use for free, without an account and without sending their data anywhere.' },
      { heading: 'What we offer', body: 'A growing set of everyday utilities — a unit converter, a word counter, and a percentage calculator — each designed to be fast, accurate, and easy to use on any device.' },
      { heading: 'Privacy', body: 'Every tool runs entirely in your browser. We do not collect, upload, or store the values you enter. See our Privacy Policy for details.' },
      { heading: 'Contact', body: 'Questions or feedback? Reach us at contact@example.com.' },
    ],
  },
  privacy: {
    metaTitle: 'Privacy Policy — Example Toolkit',
    metaDescription: 'How Example Toolkit handles your data: client-side processing, cookies, and third-party advertising.',
    title: 'Privacy Policy',
    updated: 'Last updated: 2026',
    sections: [
      { heading: 'Client-side processing', body: 'All calculations and conversions happen locally in your browser. The text and numbers you enter are never transmitted to or stored on our servers.' },
      { heading: 'Cookies and advertising', body: 'This site may display advertising from third parties such as Google AdSense. These partners may use cookies to serve relevant ads. You can manage ad personalization through your Google account settings.' },
      { heading: 'No personal data collection', body: 'We do not ask you to create an account and we do not collect personal information through the tools themselves.' },
      { heading: 'Security', body: 'The site is served over HTTPS. Because processing is client-side, there is no server-side store of your inputs to secure.' },
      { heading: 'Contact', body: 'For privacy questions, contact privacy@example.com.' },
    ],
  },
  terms: {
    metaTitle: 'Terms of Use — Example Toolkit',
    metaDescription: 'The terms governing your use of Example Toolkit, including disclaimers and the advertising model.',
    title: 'Terms of Use',
    updated: 'Last updated: 2026',
    sections: [
      { heading: 'Permitted use', body: 'You may use these tools for personal and commercial purposes free of charge. You may not attempt to disrupt the service or misrepresent it as your own.' },
      { heading: 'No warranty', body: 'The tools are provided "as is". While we aim for accuracy, you are responsible for verifying results before relying on them for important decisions.' },
      { heading: 'Advertising', body: 'The site is supported by advertising. By using it you acknowledge that third-party ads may be displayed.' },
      { heading: 'Changes', body: 'We may update these terms; continued use after changes constitutes acceptance.' },
      { heading: 'Contact', body: 'For questions about these terms, contact legal@example.com.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Portuguese (Brazil) — note the correct accents/diacritics throughout.
// ---------------------------------------------------------------------------

const ptbr: Dictionary = {
  nav: { home: 'Início', toggleTheme: 'Alternar tema', menu: 'Menu', about: 'Sobre', privacy: 'Privacidade', terms: 'Termos' },
  home: {
    metaTitle: 'Example Toolkit — Ferramentas Online Grátis',
    metaDescription:
      'Uma coleção pequena e rápida de ferramentas online grátis: conversor de unidades, contador de palavras e calculadora de porcentagem. Sem cadastro, roda no seu navegador.',
    heroTitle: 'Ferramentas online grátis que simplesmente funcionam',
    heroSubtitle: 'Converta unidades, conte palavras e calcule porcentagens — na hora, no seu navegador, sem instalar nada.',
    chooseTool: 'Escolha uma ferramenta',
    editorialTitle: 'Ferramentas simples, bem feitas',
    editorialText:
      'O Example Toolkit é uma demonstração de uma fábrica de sites estáticos: um único código que publica páginas de ferramentas rápidas e otimizadas para SEO em vários idiomas. Toda ferramenta aqui roda inteiramente no seu navegador — sem upload, sem conta, sem esperar por um servidor.',
    whyFreeTitle: 'Por que é grátis?',
    whyFreeText:
      'Estas páginas são mantidas por publicidade discreta, e é por isso que as ferramentas podem permanecer gratuitas e sem cadastro. Como tudo é estático e roda no cliente, a hospedagem custa quase nada — então não há nenhuma barreira de pagamento no seu caminho.',
    privacyBannerTitle: 'Seus dados nunca saem do seu dispositivo',
    privacyBannerText:
      'Todo cálculo e conversão acontece localmente no seu navegador. Não enviamos, armazenamos nem transmitimos nada do que você digita.',
    faqTitle: 'Perguntas frequentes',
    faqs: [
      { q: 'Preciso criar uma conta?', a: 'Não. Toda ferramenta funciona na hora, sem cadastro ou login.' },
      { q: 'Meus dados são enviados a um servidor?', a: 'Não. Todo o processamento acontece no seu navegador; nada do que você digita é transmitido ou armazenado.' },
      { q: 'Funciona no celular?', a: 'Sim. O site é responsivo e funciona em celulares, tablets e computadores.' },
      { q: 'É realmente grátis?', a: 'Sim. O site é mantido por publicidade, então todas as ferramentas são gratuitas.' },
    ],
  },
  footer: {
    tagline: 'Ferramentas online grátis, rápidas e que respeitam sua privacidade.',
    rights: 'Todos os direitos reservados.',
    madeWith: 'Feito com a fábrica de sites estáticos spec-driven.',
  },
  cards: [
    { id: 'unit-converter', title: 'Conversor de Unidades', description: 'Converta comprimento, massa e temperatura na hora.' },
    { id: 'word-counter', title: 'Contador de Palavras', description: 'Conte palavras, caracteres, frases e tempo de leitura.' },
    { id: 'percentage', title: 'Calculadora de Porcentagem', description: 'Calcule porcentagens de duas formas comuns.' },
  ],
  unitConverter: {
    title: 'Conversor de Unidades',
    category: 'Categoria',
    categories: { length: 'Comprimento', mass: 'Massa', temperature: 'Temperatura' },
    from: 'De',
    to: 'Para',
    value: 'Valor',
    result: 'Resultado',
    emptyHint: 'Digite um valor para converter.',
    invalid: 'Digite um número válido.',
  },
  wordCounter: {
    title: 'Contador de Palavras',
    placeholder: 'Comece a digitar ou cole seu texto aqui…',
    words: 'Palavras',
    characters: 'Caracteres',
    charactersNoSpaces: 'Caracteres (sem espaços)',
    sentences: 'Frases',
    readingTime: 'Tempo de leitura',
    minutes: 'min',
    emptyHint: 'Digite um texto para ver as contagens em tempo real.',
  },
  percentage: {
    title: 'Calculadora de Porcentagem',
    mode: 'Cálculo',
    modes: { ofX: 'Quanto é X% de Y?', isWhatPercent: 'X é quantos % de Y?' },
    percent: 'Porcentagem (%)',
    value: 'Do valor',
    part: 'Valor',
    whole: 'Total',
    result: 'Resultado',
    emptyHint: 'Preencha os dois campos para ver o resultado.',
    invalid: 'Digite números válidos.',
  },
  seo: {
    'unit-converter': {
      metaTitle: 'Conversor de Unidades — Comprimento, Massa e Temperatura',
      metaDescription:
        'Conversor de unidades online e grátis para comprimento, massa e temperatura. Converta metros, pés, quilos, libras, Celsius e Fahrenheit na hora, no seu navegador.',
      keywords: ['conversor de unidades', 'conversor de comprimento', 'conversor de peso', 'conversor de temperatura', 'métrico para imperial'],
      jsonLdName: 'Conversor de Unidades',
      heading: 'Sobre o conversor de unidades',
      paragraphs: [
        'Este conversor de unidades trata das três categorias mais comuns do dia a dia — comprimento, massa e temperatura — e converte entre os sistemas métrico e imperial na hora, enquanto você digita. Não há nada para instalar e nada é enviado: a conta acontece inteiramente no seu navegador.',
        'As conversões de comprimento usam fatores exatos em relação ao metro (por exemplo, uma polegada equivale a exatamente 0,0254 metros). As conversões de massa são relativas ao quilograma. A temperatura é tratada à parte porque é uma conversão afim, e não uma simples razão — converter Celsius para Fahrenheit multiplica por 9/5 e soma 32, então usamos uma fórmula dedicada em vez de um único fator de escala.',
      ],
      useCasesTitle: 'Usos comuns',
      useCases: [
        'Converter uma receita entre medidas métricas e imperiais.',
        'Verificar sua altura ou peso em diferentes sistemas de unidades.',
        'Ler uma previsão do tempo em uma escala de temperatura desconhecida.',
        'Converter distâncias ao viajar entre países.',
      ],
      faqTitle: 'Perguntas sobre o conversor',
      faqs: [
        { q: 'Quão precisas são as conversões?', a: 'Elas usam fatores de conversão exatos e padronizados, então os resultados são precisos conforme a precisão dos seus dados.' },
        { q: 'Por que a temperatura é tratada de forma diferente?', a: 'As escalas de temperatura têm pontos zero diferentes, então a conversão exige um deslocamento (e um fator de escala), e não apenas multiplicação.' },
        { q: 'Algo é enviado para fora?', a: 'Não — toda conversão roda localmente no seu navegador.' },
      ],
    },
    'word-counter': {
      metaTitle: 'Contador de Palavras — Palavras, Caracteres e Tempo de Leitura',
      metaDescription:
        'Contador de palavras online e grátis. Conte palavras, caracteres com e sem espaços, frases e o tempo estimado de leitura enquanto digita. Roda inteiramente no seu navegador.',
      keywords: ['contador de palavras', 'contador de caracteres', 'contar palavras', 'tempo de leitura', 'estatísticas de texto'],
      jsonLdName: 'Contador de Palavras',
      heading: 'Sobre o contador de palavras',
      paragraphs: [
        'Este contador de palavras se atualiza em tempo real enquanto você digita ou cola um texto, mostrando o número de palavras, a contagem de caracteres (com e sem espaços), o número de frases e uma estimativa do tempo de leitura. É útil para redações com limite de tamanho, posts com limite de caracteres e briefings de conteúdo que pedem uma faixa de palavras.',
        'As palavras são contadas separando o texto pelos espaços; as frases são estimadas contando a pontuação final. O tempo de leitura assume cerca de 200 palavras por minuto, uma média comum para a leitura silenciosa de textos gerais. Nada do seu texto é enviado a lugar nenhum — as contagens são calculadas no seu navegador.',
      ],
      useCasesTitle: 'Usos comuns',
      useCases: [
        'Ficar dentro do limite de palavras de uma redação ou trabalho.',
        'Reduzir um post para caber no limite de caracteres da plataforma.',
        'Estimar quanto tempo um artigo levará para ser lido.',
        'Verificar se o conteúdo atinge o tamanho mínimo pedido.',
      ],
      faqTitle: 'Perguntas sobre o contador',
      faqs: [
        { q: 'Como o tempo de leitura é estimado?', a: 'Ele assume cerca de 200 palavras por minuto, um ritmo típico de leitura silenciosa de textos gerais.' },
        { q: 'Vocês contam caracteres com ou sem espaços?', a: 'Os dois são mostrados, porque plataformas diferentes contam os limites de formas diferentes.' },
        { q: 'Meu texto é armazenado?', a: 'Não — ele nunca sai do seu navegador.' },
      ],
    },
    percentage: {
      metaTitle: 'Calculadora de Porcentagem — Dois Cálculos Comuns',
      metaDescription:
        'Calculadora de porcentagem grátis. Descubra quanto é X% de um número, ou que porcentagem um número representa de outro. Instantânea, precisa e roda no seu navegador.',
      keywords: ['calculadora de porcentagem', 'porcentagem de um número', 'quantos por cento', 'calcular porcentagem', 'calculadora de porcento'],
      jsonLdName: 'Calculadora de Porcentagem',
      heading: 'Sobre a calculadora de porcentagem',
      paragraphs: [
        'As porcentagens confundem porque a mesma palavra cobre perguntas diferentes. Esta calculadora trata das duas mais comuns: "quanto é X% de Y?" (por exemplo, 15% de 80) e "X é quantos por cento de Y?" (por exemplo, 12 é quantos por cento de 80). Escolha o modo, digite os números e a resposta aparece na hora.',
        'O primeiro modo multiplica: X% de Y é igual a (X ÷ 100) × Y. O segundo divide: X é (X ÷ Y) × 100 por cento de Y. Ambos rodam no seu navegador, sem surpresas além da exibição normal de ponto flutuante.',
      ],
      useCasesTitle: 'Usos comuns',
      useCases: [
        'Calcular uma gorjeta ou um desconto sobre um preço.',
        'Descobrir uma nota ou pontuação em porcentagem.',
        'Encontrar um valor de imposto ou comissão.',
        'Comparar duas quantidades como proporção.',
      ],
      faqTitle: 'Perguntas sobre porcentagem',
      faqs: [
        { q: 'Como encontro X% de um número?', a: 'Divida a porcentagem por 100 e multiplique pelo número — o primeiro modo faz isso por você.' },
        { q: 'Como descubro que porcentagem um número é de outro?', a: 'Divida a parte pelo total e multiplique por 100 — o segundo modo faz isso por você.' },
        { q: 'É grátis?', a: 'Sim, e não exige cadastro.' },
      ],
    },
  },
  about: {
    metaTitle: 'Sobre — Example Toolkit',
    metaDescription: 'Sobre o Example Toolkit: nossa missão, as ferramentas que oferecemos e nosso compromisso com a privacidade.',
    title: 'Sobre o Example Toolkit',
    updated: 'Última atualização: 2026',
    sections: [
      { heading: 'Nossa missão', body: 'O Example Toolkit oferece ferramentas online pequenas, rápidas e realmente úteis que qualquer pessoa pode usar de graça, sem conta e sem enviar seus dados para lugar nenhum.' },
      { heading: 'O que oferecemos', body: 'Um conjunto crescente de utilitários do dia a dia — um conversor de unidades, um contador de palavras e uma calculadora de porcentagem — cada um projetado para ser rápido, preciso e fácil de usar em qualquer dispositivo.' },
      { heading: 'Privacidade', body: 'Toda ferramenta roda inteiramente no seu navegador. Não coletamos, enviamos nem armazenamos os valores que você digita. Veja nossa Política de Privacidade para detalhes.' },
      { heading: 'Contato', body: 'Dúvidas ou sugestões? Fale conosco em contato@example.com.' },
    ],
  },
  privacy: {
    metaTitle: 'Política de Privacidade — Example Toolkit',
    metaDescription: 'Como o Example Toolkit trata seus dados: processamento no cliente, cookies e publicidade de terceiros.',
    title: 'Política de Privacidade',
    updated: 'Última atualização: 2026',
    sections: [
      { heading: 'Processamento no cliente', body: 'Todos os cálculos e conversões acontecem localmente no seu navegador. O texto e os números que você digita nunca são transmitidos nem armazenados em nossos servidores.' },
      { heading: 'Cookies e publicidade', body: 'Este site pode exibir anúncios de terceiros, como o Google AdSense. Esses parceiros podem usar cookies para exibir anúncios relevantes. Você pode gerenciar a personalização de anúncios nas configurações da sua conta Google.' },
      { heading: 'Sem coleta de dados pessoais', body: 'Não pedimos que você crie uma conta e não coletamos informações pessoais por meio das próprias ferramentas.' },
      { heading: 'Segurança', body: 'O site é servido por HTTPS. Como o processamento é no cliente, não há armazenamento dos seus dados no servidor para proteger.' },
      { heading: 'Contato', body: 'Para questões de privacidade, escreva para privacidade@example.com.' },
    ],
  },
  terms: {
    metaTitle: 'Termos de Uso — Example Toolkit',
    metaDescription: 'Os termos que regem o uso do Example Toolkit, incluindo isenções de responsabilidade e o modelo de publicidade.',
    title: 'Termos de Uso',
    updated: 'Última atualização: 2026',
    sections: [
      { heading: 'Uso permitido', body: 'Você pode usar estas ferramentas para fins pessoais e comerciais gratuitamente. Não é permitido tentar prejudicar o serviço nem apresentá-lo como se fosse seu.' },
      { heading: 'Sem garantia', body: 'As ferramentas são fornecidas "como estão". Embora busquemos a precisão, você é responsável por verificar os resultados antes de usá-los em decisões importantes.' },
      { heading: 'Publicidade', body: 'O site é mantido por publicidade. Ao usá-lo, você reconhece que anúncios de terceiros podem ser exibidos.' },
      { heading: 'Alterações', body: 'Podemos atualizar estes termos; o uso continuado após mudanças significa aceitação.' },
      { heading: 'Contato', body: 'Para dúvidas sobre estes termos, escreva para juridico@example.com.' },
    ],
  },
};

// ---------------------------------------------------------------------------

const dictionaries: Record<Locale, Dictionary> = { en, 'pt-br': ptbr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? en;
}
