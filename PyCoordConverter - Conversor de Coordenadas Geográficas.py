#!/usr/bin/env python3
"""
GEOBOT CONVERTER - Versão Corrigida
Conversor DMS → Decimal com valores NUMÉRICOS (sem aspas)
Formato de saída correto: 
    "latitude": -1.456250,
    "longitude": -48.441750
"""

import re

def limpar_coordenada(entrada):
    """Limpa a string de entrada"""
    entrada = entrada.strip()
    
    # Remove aspas externas
    if (entrada.startswith('"') and entrada.endswith('"')) or \
       (entrada.startswith("'") and entrada.endswith("'")):
        entrada = entrada[1:-1]
    
    # Remove escapes
    entrada = entrada.replace('\\"', '"')
    entrada = entrada.replace("\\'", "'")
    
    return entrada

def converter_dms_para_decimal():
    """Conversor principal - loop contínuo"""
    print("=" * 70)
    print("🔄 GEOBOT CONVERTER - DMS → DECIMAL")
    print("=" * 70)
    print("\n📋 COLE AS COORDENADAS DMS:")
    print('   Exemplo: "1° 27\' 22.5\\" S 48° 26\' 30.3\\" W"')
    print("   Pressione Ctrl+C para sair")
    print("-" * 70)
    
    while True:
        try:
            # Solicita entrada
            entrada = input("\n📍 COLE AQUI: ").strip()
            
            if entrada.lower() in ['sair', 'exit', 'quit']:
                print("\n👋 Até logo!")
                break
            
            # Pula entrada vazia
            if not entrada:
                continue
            
            # Processa a entrada
            entrada_limpa = limpar_coordenada(entrada)
            entrada_limpa = entrada_limpa.upper()
            
            # Extrai números
            numeros = re.findall(r'[\d.]+', entrada_limpa)
            
            if len(numeros) < 4:
                print("❌ Coordenada incompleta!")
                continue
            
            # Extrai direções
            direcoes = re.findall(r'[NSOWE]', entrada_limpa)
            
            # Determina formato
            if len(numeros) >= 6:
                lat_g, lat_m, lat_s = map(float, numeros[:3])
                lon_g, lon_m, lon_s = map(float, numeros[3:6])
            else:
                lat_g, lat_m = map(float, numeros[:2])
                lat_s = 0
                lon_g, lon_m = map(float, numeros[2:4])
                lon_s = 0
            
            # Direções
            lat_dir = direcoes[0] if direcoes else 'S'
            lon_dir = direcoes[1] if len(direcoes) > 1 else 'W'
            
            # Converte
            latitude = lat_g + lat_m/60 + lat_s/3600
            if lat_dir == 'S':
                latitude = -latitude
            
            longitude = lon_g + lon_m/60 + lon_s/3600
            if lon_dir in ['W', 'O']:
                longitude = -longitude
            
            # Arredonda
            latitude = round(latitude, 6)
            longitude = round(longitude, 6)
            
            # Exibe resultado CORRETO (valores sem aspas)
            print("\n" + "=" * 70)
            print("✅ RESULTADO (copie abaixo):")
            print("=" * 70)
            print(f'\n  "latitude": {latitude},')
            print(f'  "longitude": {longitude}')
            print("\n" + "=" * 70)
            
            # Volta automaticamente para próxima entrada
            print("\n📋 PRÓXIMA COORDENADA:")
            print("-" * 70)
            
        except KeyboardInterrupt:
            print("\n\n👋 Programa encerrado")
            break
        except ValueError:
            print("❌ Erro: Formato inválido!")
        except Exception as e:
            print(f"❌ Erro: {e}")

def main():
    """Função principal"""
    print("=" * 70)
    print("🌿 GEOBOT CONVERTER - UFRA Belém")
    print("=" * 70)
    print("Conversor DMS → Decimal para mapeamento de angiospermas")
    print("-" * 70)
    
    converter_dms_para_decimal()

if __name__ == "__main__":
    main()