# Arquitetura do Sistema — GeoBot

## Visão Geral

O GeoBot é um sistema de georreferenciamento botânico que integra a
infraestrutura científica do Herbário da UFRA, atuando como um módulo
especializado na representação espacial das amostras botânicas.

O projeto adota uma arquitetura desacoplada, orientada a dados e
interoperável, respeitando os princípios de curadoria científica
do herbário físico e virtual.

---

## Princípios Arquiteturais

- **Fonte única da verdade**  
  Dados taxonômicos e descritivos pertencem ao Herbário Virtual.
  O GeoBot não replica nem redefine essas informações.

- **Desacoplamento entre sistemas**  
  O GeoBot consome dados por identificadores científicos estáveis,
  evitando dependência direta de interfaces ou páginas HTML.

- **Interoperabilidade**  
  A integração entre sistemas ocorre por meio de contratos de dados
  baseados em formatos abertos (JSON/CSV).

- **Curadoria científica preservada**  
  Todas as amostras seguem os mesmos critérios de validação do herbário
  físico e virtual.

---

## Componentes

- **Herbário Físico**  
  Fonte primária das amostras e dados brutos.

- **Herbário Virtual**  
  Sistema central de organização taxonômica, filtragem e difusão científica.

- **GeoBot**  
  Módulo de visualização espacial, responsável por:
  - Georreferenciamento
  - Visualização interativa
  - Apoio ao ensino, pesquisa e extensão

---

## Limites do Sistema

O GeoBot **não**:
- mantém taxonomia própria
- realiza determinações botânicas
- substitui o Herbário Virtual

Seu papel é complementar e especializado.
