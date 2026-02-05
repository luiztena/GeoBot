# Metodologia

Este documento descreve a metodologia adotada no projeto **GeoBot**, detalhando as etapas de obtenção, curadoria, validação e organização dos dados de georreferenciamento botânico utilizados no sistema.

---

## 1. Visão Geral da Metodologia

A metodologia do GeoBot foi construída com base em princípios de **rigor científico**, **rastreabilidade dos dados** e **simplicidade operacional**, buscando garantir a confiabilidade das informações geográficas associadas às exsicatas botânicas, sem introduzir complexidade excessiva no fluxo de trabalho.

O processo é dividido em fases sequenciais, nas quais os dados passam por múltiplos níveis de verificação antes de serem integrados ao sistema.

---

## 2. Origem dos Dados

Os dados utilizados no GeoBot têm origem no **acervo físico do herbário**, posteriormente refletido no herbário virtual. As informações iniciais incluem:

* Coordenadas geográficas associadas às amostras;
* Dados taxonômicos preliminares;
* Informações de coleta (localidade, data e coletores).

Esses dados são considerados **dados brutos** e não são utilizados diretamente no sistema sem curadoria prévia.

---

## 3. Fase 1 — Extração e Curadoria Inicial

Na primeira fase do projeto, as coordenadas geográficas são **extraídas manualmente** do acervo físico do herbário virtual.

Após a extração, é realizada uma **curadoria inicial**, que inclui:

* Padronização do formato das coordenadas geográficas (ex.: DMS ou decimal);
* Correção de inconsistências de escrita;
* Conversão de formatos quando necessário;
* Identificação preliminar de possíveis erros de localização.

Somente após essa curadoria inicial os dados são inseridos em uma **planilha de trabalho**, que atua como ambiente intermediário de validação.

---

## 4. Fase 2 — Filtragem e Remoção de Duplicatas

Com os dados organizados em planilha, é realizada uma **segunda etapa de filtragem**, com foco em:

* Identificação de coordenadas duplicadas;
* Verificação de registros pertencentes à mesma espécie e mesma localidade;
* Consolidação de entradas redundantes quando aplicável.

Duplicatas são mantidas apenas quando representam **amostras distintas**, caso contrário, os registros são unificados para evitar redundância espacial no sistema.

---

## 5. Coleta e Determinação das Amostras

As amostras botânicas seguem um fluxo acadêmico padronizado:

1. **Coleta**: realizada por alunos vinculados a atividades acadêmicas e projetos institucionais;
2. **Determinação taxonômica**: feita por professores e pesquisadores participantes do projeto, incluindo doutores especialistas;
3. **Validação científica**: garante a confiabilidade da identificação da espécie associada às coordenadas.

Esse processo assegura que cada ponto georreferenciado esteja vinculado a uma identificação botânica confiável.

---

## 6. Fase 3 — Verificação Espacial das Coordenadas

Após a validação taxonômica, as coordenadas passam por uma **verificação espacial**, realizada pela equipe do projeto.

Essa etapa consiste em:

* Conferência da localidade descrita na exsicata;
* Verificação da coerência entre coordenadas e local físico (ex.: campus, área verde, fragmentos florestais);
* Uso de ferramentas de mapeamento para confirmar que o ponto geográfico corresponde à localidade informada.

Coordenadas inconsistentes ou incongruentes são corrigidas ou descartadas, conforme o caso.

---

## 7. Estruturação e Exportação dos Dados

Após todas as etapas de curadoria e validação, os dados finais são:

* Organizados em uma estrutura padronizada de campos;
* Exportados para arquivos no formato **CSV**;
* Armazenados no repositório do projeto para versionamento e rastreabilidade.

Os arquivos CSV representam a **fonte de dados processados** utilizada pelo sistema GeoBot.

---

## 8. Controle de Qualidade e Atualizações

A metodologia do GeoBot é iterativa. Novas amostras e correções passam pelo mesmo fluxo descrito neste documento.

Alterações significativas na metodologia ou na estrutura dos dados são documentadas e versionadas, garantindo:

* Transparência científica;
* Reprodutibilidade;
* Histórico de mudanças ao longo do tempo.

---

## 9. Considerações Metodológicas

A abordagem adotada prioriza:

* Simplicidade e clareza no fluxo de dados;
* Evitar automações prematuras que possam introduzir erros;
* Manter forte alinhamento com práticas acadêmicas e herbariológicas.

Essa metodologia permite que o GeoBot evolua de forma sustentável, mantendo confiabilidade científica desde o MVP até versões futuras do sistema.
