# GeoBot

GeoBot é um sistema de **georreferenciamento botânico** voltado para o mapeamento das **angiospermas** presentes no **Campus de Belém da UFRA**.

O projeto integra dados de campo, coordenadas geográficas e informações botânicas em uma estrutura organizada, versionável e reproduzível, com foco em **rigor científico**, **simplicidade** e **uso acadêmico**.

---

## Objetivos

* Mapear e organizar a distribuição espacial de angiospermas no campus da UFRA – Belém;
* Padronizar dados de coleta botânica e coordenadas geográficas;
* Facilitar análises futuras (espaciais, ecológicas e taxonômicas);
* Servir como base para visualizações, relatórios científicos e aplicações educacionais.

---

## Escopo do projeto

O GeoBot contempla:

* Dados de campo (espécies, local de coleta, coletores, data);
* Coordenadas geográficas padronizadas (DMS e/ou decimal);
* Arquivos estruturados para processamento e análise;
* Documentação metodológica clara e transparente.

> **Nota:** Este repositório não tem como objetivo substituir herbários físicos, mas sim **complementar** o registro científico por meio do georreferenciamento.

---

## Estrutura inicial do repositório

```
GeoBot/
├── data/
│   ├── raw/            # Dados brutos (sem tratamento)
│   ├── processed/      # Dados tratados e padronizados
│   └── external/       # Dados de fontes externas (se houver)
│
├── docs/
│   ├── metodologia.md  # Metodologia de coleta e processamento
│   └── referencias.md  # Referências teóricas e técnicas
│
├── scripts/            # Scripts de processamento e análise
├── README.md           # Apresentação geral do projeto
└── LICENSE             # Licença do projeto
```

---

## Dados

Os dados são armazenados preferencialmente em formatos abertos, como:

* `.csv` — para planilhas e tabelas versionáveis;
* `.geojson` ou `.json` — para dados espaciais (futuro);
* `.md` — para documentação.

Os arquivos em `data/raw` **não devem ser alterados**. Todo tratamento ocorre a partir deles, gerando versões em `data/processed`.

---

## Padronização de coordenadas

As coordenadas geográficas seguem um padrão único ao longo do projeto, evitando ambiguidades e facilitando o uso em SIGs, scripts e mapas.

Exemplo:

```
1°27'27.3"S 48°26'08.5"W
```

---

## Privacidade e ética

* Nomes de coletores são tratados como **dados pessoais**, não sensíveis;
* O uso dos dados segue princípios éticos e acadêmicos;
* Informações podem ser anonimizadas, se necessário, em versões públicas.

---

## Status do projeto

🚧 **Em desenvolvimento**

Os dados ainda estão em fase de coleta, padronização e estruturação inicial.

---

## Contribuição

Contribuições são bem-vindas, especialmente em:

* Organização de dados;
* Scripts de conversão e validação;
* Visualizações cartográficas;
* Revisão metodológica.

Antes de contribuir, consulte a documentação em `docs/`.

---


## Autor
LUIZ TENÃ MEDEIROS NOGUEIRA

Projeto desenvolvido para fins acadêmicos e científicos no contexto da **UFRA – Campus Belém**.
