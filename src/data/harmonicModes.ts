export type HarmonicModeId = 'major' | 'minor';

export type Progression = {
  title: string;
  lines: string[];
  note?: string;
};

export type Explanation = {
  icon: string;
  title: string;
  copy: string;
  example: string[];
  legend: string[];
  details: string[];
};

export type HarmonicMode = {
  id: HarmonicModeId;
  title: string;
  degrees: string[];
  triplet: string[];
  tripletDescription: string;
  progressions: Progression[];
  explanations: Explanation[];
};

export const harmonicModes: Record<HarmonicModeId, HarmonicMode> = {
  major: {
    id: 'major',
    title: 'Campo Harmônico (Maior)',
    degrees: ['1', '2m', '3m', '4', '5', '6m', '7°'],
    triplet: ['1', '4', '5'],
    tripletDescription: 'Graus que sustentam a maioria das progressões no campo harmonico maior.',
    progressions: [
      { title: 'Progressão 1: I - IV - V', lines: ['1 | 4 | 5', '1 | 4 | 2m | 5 - variação 1', '1 | 2m | 4 | 5 - variação 2'] },
      { title: 'Progressão 2: vi - IV - I - V', lines: ['6m | 4 | 1 | 5', '2m | 4 | 1 | 5 - variação'] },
      { title: 'Progressão 3: I - vi - IV - V', lines: ['1 | 6m | 4 | 5', '1 | 6m | 2m | 5 - variação'] },
      { title: 'Progressão 4: IV - V - I - vi', lines: ['4 | 5 | 1 | 6m'] },
      { title: 'Progressão 5: I - ii - V - I', lines: ['1 | 2m | 5 | 1'], note: 'Tônica → predominante → dominante → tônica' },
      { title: 'Progressão 6: I - IV - V - I - vi', lines: ['1 | 4 | 5 | 1 | 6m'], note: 'Outra combinação comum dos principais acordes da tonalidade.' },
    ],
    explanations: [
      {
        icon: '🔗',
        title: 'Acordes Relativos',
        copy: 'Podem substituir acordes ou aparecer dentro da progressão sem perder sua direção principal.',
        example: ['1 | 4 | 5 | 1', '6m | 2m | 5 | 1'],
        legend: ['6m = relativo menor de 1', '2m = relativo menor de 4'],
        details: ['Em C maior: 6m = Am • 2m = Dm'],
      },
      {
        icon: '𝄞',
        title: 'Aproximações e Empréstimos',
        copy: 'Acordes fora do campo harmônico podem adicionar tensão e movimento sem perder a direção da progressão.',
        example: ['1 | 2m | 5', '1 | b7 | 5 | 1'],
        legend: ['b7 (bVII) = empréstimo modal, comum por influência mixolídia.'],
        details: ['Dominantes secundários: 2⁷ = V/V • 6⁷ = V/ii • 3⁷ = V/vi • 7⁷ = V/iii'],
      },
      {
        icon: '〰',
        title: 'Acordes de Passagem',
        copy: 'Conectam acordes de forma mais fluida e enriquecem o movimento da progressão.',
        example: ['1 | 4 | 5', '1 | 3m | 4 | 5'],
        legend: ['3m (iii) pode funcionar como conexão diatônica entre 1 e 4.'],
        details: [],
      },
    ],
  },
  minor: {
    id: 'minor',
    title: 'Campo Harmônico (Menor)',
    degrees: ['1m', '2°', 'b3', '4m', '5m', 'b6', 'b7'],
    triplet: ['1m', '4m', '5m'],
    tripletDescription: 'Graus que sustentam a maioria das progressões no campo harmonico menor natural.',
    progressions: [
      { title: 'Progressão 1: i - iv - v', lines: ['1m | 4m | 5m', '1m | 4m | 2° | 5m - variação 1', '1m | b3 | 4m | 5m - variação 2'] },
      { title: 'Progressão 2: VI - III - VII - i', lines: ['b6 | b3 | b7 | 1m', '4m | b6 | b7 | 1m - variação'] },
      { title: 'Progressão 3: i - bVI - bIII - bVII', lines: ['1m | b6 | b3 | b7', '1m | 4m | b6 | b7 - variação'] },
      { title: 'Progressão 4: iv - v - i - bVI', lines: ['4m | 5m | 1m | b6'] },
      { title: 'Progressão 5: i - ii° - v - i', lines: ['1m | 2° | 5m | 1m'], note: 'Tônica menor → predominante → dominante → tônica menor' },
      { title: 'Progressão 6: i - iv - v - i - bVI', lines: ['1m | 4m | 5m | 1m | b6'], note: 'Combinação dos principais acordes do campo menor natural.' },
    ],
    explanations: [
      {
        icon: '🔗',
        title: 'Acordes Relativos',
        copy: 'A tonalidade menor também pode usar acordes relativos para criar contraste e movimento.',
        example: ['1m | b6 | b3 | b7', '4m | b6 | 5m | 1m'],
        legend: ['b3 = relativo maior de 1m', 'b6 = relativo maior de 4m'],
        details: ['Em A menor: b3 = C • b6 = F'],
      },
      {
        icon: '𝄞',
        title: 'Empréstimos no Campo Menor',
        copy: 'Acordes da menor harmônica e melódica adicionam tensão sem abandonar a sonoridade menor.',
        example: ['1m | 4m | 5m', '1m | b6 | 5 | 1m'],
        legend: ['5 maior pode funcionar como dominante da tônica menor.'],
        details: ['A sensível maior cria resolução mais forte para 1m.'],
      },
      {
        icon: '〰',
        title: 'Acordes de Passagem',
        copy: 'Acordes intermediários conectam os graus menores e deixam a progressão mais fluida.',
        example: ['1m | b3 | 4m', '1m | 2° | b3 | 4m'],
        legend: ['2° pode conectar 1m e b3 com tensão diatônica.'],
        details: [],
      },
    ],
  },
};
