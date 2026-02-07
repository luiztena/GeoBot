#!/usr/bin/env python3
"""
CONVERSOR SIMPLES DE COORDENADAS DMS → DECIMAL
Para uso com Geobot - UFRA Belém
"""

import re

def limpar_coordenada(entrada):
    """Remove aspas e escapes da entrada"""
    # Remove espaços extras
    entrada = entrada.strip()
    
    # Remove aspas duplas externas
    if entrada.startswith('"') and entrada.endswith('"'):
        entrada = entrada[1:-1]
    
    # Remove aspas simples externas
    if entrada.startswith("'") and entrada.endswith("'"):
        entrada = entrada[1:-1]
    
    # Substitui escapes de aspas
    entrada = entrada.replace('\\"', '"')
    entrada = entrada.replace("\\'", "'")
    
    return entrada

def extrair_componentes(entrada):
    """Extrai números e direções da string de coordenadas"""
    # Converte para maiúsculas para facilitar
    entrada = entrada.upper()
    
    # Extrai todos os números (inteiros e decimais)
    numeros = re.findall(r'[\d.]+', entrada)
    
    # Extrai todas as direções (N, S, E, W, O)
    direcoes = re.findall(r'[NSOWE]', entrada)
    
    # Verifica se temos números suficientes
    if len(numeros) < 4:
        raise ValueError(f"Números insuficientes encontrados: {numeros}")
    
    # Determina formato baseado na quantidade de números
    if len(numeros) >= 6:
        # Formato completo: graus, minutos, segundos para ambos
        lat_graus = float(numeros[0])
        lat_minutos = float(numeros[1])
        lat_segundos = float(numeros[2])
        lon_graus = float(numeros[3])
        lon_minutos = float(numeros[4])
        lon_segundos = float(numeros[5])
    elif len(numeros) >= 4:
        # Formato sem segundos explícitos: apenas graus e minutos
        lat_graus = float(numeros[0])
        lat_minutos = float(numeros[1])
        lat_segundos = 0
        lon_graus = float(numeros[2])
        lon_minutos = float(numeros[3])
        lon_segundos = 0
    else:
        raise ValueError("Formato não reconhecido")
    
    # Determina direções (usa defaults para Brasil se não encontradas)
    if direcoes:
        direcao_lat = direcoes[0]
    else:
        direcao_lat = 'S'  # Default para Brasil
    
    if len(direcoes) > 1:
        direcao_lon = direcoes[1]
    else:
        direcao_lon = 'W'  # Default para Brasil
    
    return {
        'lat_graus': lat_graus,
        'lat_minutos': lat_minutos,
        'lat_segundos': lat_segundos,
        'direcao_lat': direcao_lat,
        'lon_graus': lon_graus,
        'lon_minutos': lon_minutos,
        'lon_segundos': lon_segundos,
        'direcao_lon': direcao_lon
    }

def converter_para_decimal(componentes):
    """Converte componentes DMS para graus decimais"""
    # Calcula latitude
    lat_decimal = (componentes['lat_graus'] + 
                   componentes['lat_minutos']/60 + 
                   componentes['lat_segundos']/3600)
    
    # Aplica sinal conforme direção
    if componentes['direcao_lat'] == 'S':
        lat_decimal = -lat_decimal
    
    # Calcula longitude
    lon_decimal = (componentes['lon_graus'] + 
                   componentes['lon_minutos']/60 + 
                   componentes['lon_segundos']/3600)
    
    # Aplica sinal conforme direção
    if componentes['direcao_lon'] in ['W', 'O']:
        lon_decimal = -lon_decimal
    
    # Arredonda para 6 casas decimais
    lat_decimal = round(lat_decimal, 6)
    lon_decimal = round(lon_decimal, 6)
    
    return lat_decimal, lon_decimal

def formatar_saida(latitude, longitude):
    """Formata a saída no formato desejado"""
    return f'\"latitude\" = \"{latitude}\"\n\"longitude\" = \"{longitude}\"'

def conversor_simples():
    """Função principal do conversor"""
    print("=" * 60)
    print("CONVERSOR SIMPLES DE COORDENADAS")
    print("=" * 60)
    print("\n📋 COLE AS COORDENADAS AQUI (Ctrl+V):")
    print("   Exemplos de formatos aceitos:")
    print('   • "1° 27\' 22.5\\" S 48° 26\' 30.3\\" W"')
    print("   • 1°27'22.5\"S 48°26'30.3\"W")
    print("   • 1 27 22.5 S 48 26 30.3 W")
    print("\n🚫 Digite 'sair' para encerrar")
    print("-" * 60)
    
    while True:
        try:
            # Solicita entrada
            entrada = input("\n📍 COLE AS COORDENADAS: ").strip()
            
            # Verifica se deve sair
            if entrada.lower() in ['sair', 'exit', 'quit', 'q', '']:
                print("\n👋 Até logo!")
                break
            
            # Limpa a entrada
            entrada_limpa = limpar_coordenada(entrada)
            print(f"🔍 Processando: {entrada_limpa}")
            
            # Extrai componentes
            componentes = extrair_componentes(entrada_limpa)
            
            # Converte para decimal
            latitude, longitude = converter_para_decimal(componentes)
            
            # Exibe resultado
            print("\n" + "=" * 50)
            print("✅ CONVERSÃO CONCLUÍDA!")
            print("=" * 50)
            print("\n📋 COPIE ABAIXO PARA O GEOBOT:")
            print("-" * 40)
            print(formatar_saida(latitude, longitude))
            print("-" * 40)
            
            # Informações adicionais
            print(f"\n📊 Detalhes:")
            print(f"   Latitude:  {latitude}")
            print(f"   Longitude: {longitude}")
            
        except ValueError as e:
            print(f"\n❌ ERRO: {e}")
            print("\n💡 Dica: Certifique-se de que a coordenada tem:")
            print("   • Graus, minutos e (opcionalmente) segundos")
            print("   • Direções (N/S para latitude, E/W para longitude)")
            print("   • Exemplo correto: 1°27'22.5\"S 48°26'30.3\"W")
            
        except KeyboardInterrupt:
            print("\n\n👋 Programa encerrado pelo usuário")
            break
            
        except Exception as e:
            print(f"\n⚠️  Erro inesperado: {e}")

# Modo linha de comando
if __name__ == "__main__":
    import sys
    
    # Se recebeu argumentos, converte diretamente
    if len(sys.argv) > 1:
        entrada = " ".join(sys.argv[1:])
        try:
            entrada_limpa = limpar_coordenada(entrada)
            componentes = extrair_componentes(entrada_limpa)
            latitude, longitude = converter_para_decimal(componentes)
            print(formatar_saida(latitude, longitude))
        except Exception as e:
            print(f"Erro: {e}")
            sys.exit(1)
    else:
        # Modo interativo
        conversor_simples()