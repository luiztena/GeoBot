#!/usr/bin/env python3
"""
GEOBOT CONVERTER PRO - Conversor bidirecional DMS ⇄ Decimal
Versão 1.0 - Conversões DMS ⇄ Decimal
Autor: Geobot UFRA Belém
"""

import re

# ============================================
# FUNÇÕES DE CONVERSÃO DMS → DECIMAL
# ============================================

def limpar_coordenada_dms(entrada):
    """Limpa coordenadas DMS para processamento"""
    entrada = entrada.strip()
    
    # Remove aspas externas
    if entrada.startswith('"') and entrada.endswith('"'):
        entrada = entrada[1:-1]
    if entrada.startswith("'") and entrada.endswith("'"):
        entrada = entrada[1:-1]
    
    # Remove escapes
    entrada = entrada.replace('\\"', '"')
    entrada = entrada.replace("\\'", "'")
    
    return entrada

def dms_para_decimal(coord_string):
    """Converte string DMS para decimal"""
    # Limpa a entrada
    coord_string = limpar_coordenada_dms(coord_string)
    coord_string = coord_string.upper()
    
    # Extrai números e direções
    numeros = re.findall(r'[\d.]+', coord_string)
    direcoes = re.findall(r'[NSOWE]', coord_string)
    
    if len(numeros) < 4:
        raise ValueError(f"Números insuficientes: {numeros}")
    
    # Processa baseado na quantidade de números
    if len(numeros) >= 6:
        # Formato completo com segundos
        lat_g, lat_m, lat_s, lon_g, lon_m, lon_s = map(float, numeros[:6])
    elif len(numeros) >= 4:
        # Apenas graus e minutos
        lat_g, lat_m, lon_g, lon_m = map(float, numeros[:4])
        lat_s = lon_s = 0
    
    # Determina direções
    lat_dir = direcoes[0] if direcoes else 'S'
    lon_dir = direcoes[1] if len(direcoes) > 1 else 'W'
    
    # Calcula
    latitude = lat_g + lat_m/60 + lat_s/3600
    if lat_dir == 'S':
        latitude = -latitude
    
    longitude = lon_g + lon_m/60 + lon_s/3600
    if lon_dir in ['W', 'O']:
        longitude = -longitude
    
    # Arredonda
    latitude = round(latitude, 6)
    longitude = round(longitude, 6)
    
    return latitude, longitude

def formatar_saida_decimal(latitude, longitude):
    """Formata saída no formato Geobot"""
    return f'\"latitude\" = \"{latitude}\"\n\"longitude\" = \"{longitude}\"'

# ============================================
# FUNÇÕES DE CONVERSÃO DECIMAL → DMS
# ============================================

def decimal_para_dms(latitude, longitude):
    """Converte coordenadas decimais para DMS"""
    # Converte latitude
    lat_abs = abs(latitude)
    lat_g = int(lat_abs)
    lat_m_dec = (lat_abs - lat_g) * 60
    lat_m = int(lat_m_dec)
    lat_s = round((lat_m_dec - lat_m) * 60, 2)
    lat_dir = 'S' if latitude < 0 else 'N'
    
    # Ajusta arredondamento latitude
    if lat_s >= 60:
        lat_s = 0
        lat_m += 1
    if lat_m >= 60:
        lat_m = 0
        lat_g += 1
    
    # Converte longitude
    lon_abs = abs(longitude)
    lon_g = int(lon_abs)
    lon_m_dec = (lon_abs - lon_g) * 60
    lon_m = int(lon_m_dec)
    lon_s = round((lon_m_dec - lon_m) * 60, 2)
    lon_dir = 'W' if longitude < 0 else 'E'
    
    # Ajusta arredondamento longitude
    if lon_s >= 60:
        lon_s = 0
        lon_m += 1
    if lon_m >= 60:
        lon_m = 0
        lon_g += 1
    
    # Formata resultado
    resultado = f"{lat_g}° {lat_m:02d}' {lat_s:05.2f}\\\" {lat_dir} {lon_g}° {lon_m:02d}' {lon_s:05.2f}\\\" {lon_dir}"
    
    return resultado

# ============================================
# INTERFACE PRINCIPAL
# ============================================

def mostrar_menu():
    """Exibe o menu principal"""
    print("=" * 70)
    print("🌍 GEOBOT CONVERTER PRO - UFRA Belém")
    print("=" * 70)
    print("\n📊 CONVERSÕES DISPONÍVEIS:")
    print("  1. DMS → DECIMAL  (Google Earth → Geobot)")
    print("  2. DECIMAL → DMS  (Geobot → Google Earth)")
    print("  3. Sair")
    print("\n" + "-" * 70)

def modo_dms_para_decimal():
    """Modo: DMS para Decimal"""
    print("\n" + "=" * 70)
    print("🔄 MODO: DMS → DECIMAL")
    print("=" * 70)
    print("\n📝 COLE AS COORDENADAS DO GOOGLE EARTH:")
    print('   Exemplo: "1° 27\' 29.08\\" S 48° 26\' 9.59\\" W"')
    print("   Ou:       1°27'29.08\"S 48°26'9.59\"W")
    print("\n✳️  Digite 'voltar' para retornar ao menu")
    print("-" * 70)
    
    while True:
        try:
            entrada = input("\n📍 COLE AS COORDENADAS DMS: ").strip()
            
            if entrada.lower() in ['voltar', 'menu', 'back']:
                return
            
            if not entrada:
                continue
            
            # Converte
            latitude, longitude = dms_para_decimal(entrada)
            
            # Exibe resultado
            print("\n" + "=" * 70)
            print("✅ CONVERSÃO CONCLUÍDA!")
            print("=" * 70)
            print("\n📋 COPIE PARA O GEOBOT:")
            print("-" * 50)
            print(formatar_saida_decimal(latitude, longitude))
            print("-" * 50)
            
            print(f"\n📊 Valores:")
            print(f"  Latitude:  {latitude}")
            print(f"  Longitude: {longitude}")
            
            # Pergunta se quer outra conversão
            print("\n" + "-" * 50)
            opcao = input("\n🔄 Converter outra? (s/n): ").lower().strip()
            if opcao not in ['s', 'sim', 'y', 'yes']:
                break
                
        except ValueError as e:
            print(f"\n❌ ERRO: {e}")
            print("💡 Tente colar no formato correto.")
            
        except Exception as e:
            print(f"\n⚠️  Erro inesperado: {e}")

def modo_decimal_para_dms():
    """Modo: Decimal para DMS"""
    print("\n" + "=" * 70)
    print("🔄 MODO: DECIMAL → DMS")
    print("=" * 70)
    print("\n📝 DIGITE AS COORDENADAS DECIMAIS:")
    print("   Exemplo: Latitude:  -1.458077")
    print("            Longitude: -48.435998")
    print("\n✳️  Digite 'voltar' para retornar ao menu")
    print("-" * 70)
    
    while True:
        try:
            # Latitude
            lat_str = input("\n📍 Latitude decimal: ").strip()
            
            if lat_str.lower() in ['voltar', 'menu', 'back']:
                return
            
            # Valida latitude
            try:
                latitude = float(lat_str)
                if not -90 <= latitude <= 90:
                    print("❌ Latitude deve estar entre -90 e 90 graus")
                    continue
            except:
                print("❌ Digite um número válido para latitude")
                continue
            
            # Longitude
            lon_str = input("📍 Longitude decimal: ").strip()
            
            if lon_str.lower() in ['voltar', 'menu', 'back']:
                return
            
            # Valida longitude
            try:
                longitude = float(lon_str)
                if not -180 <= longitude <= 180:
                    print("❌ Longitude deve estar entre -180 e 180 graus")
                    continue
            except:
                print("❌ Digite um número válido para longitude")
                continue
            
            # Converte
            resultado = decimal_para_dms(latitude, longitude)
            
            # Exibe resultado
            print("\n" + "=" * 70)
            print("✅ CONVERSÃO CONCLUÍDA!")
            print("=" * 70)
            print("\n📋 COPIE PARA O GOOGLE EARTH:")
            print("-" * 50)
            print(resultado)
            print("-" * 50)
            
            print(f"\n📊 Resumo:")
            lat_g = int(abs(latitude))
            lat_m = int((abs(latitude) - lat_g) * 60)
            lat_s = round(((abs(latitude) - lat_g) * 60 - lat_m) * 60, 2)
            lat_dir = 'S' if latitude < 0 else 'N'
            
            lon_g = int(abs(longitude))
            lon_m = int((abs(longitude) - lon_g) * 60)
            lon_s = round(((abs(longitude) - lon_g) * 60 - lon_m) * 60, 2)
            lon_dir = 'W' if longitude < 0 else 'E'
            
            print(f"  Latitude:  {lat_g}° {lat_m:02d}' {lat_s:05.2f}\" {lat_dir}")
            print(f"  Longitude: {lon_g}° {lon_m:02d}' {lon_s:05.2f}\" {lon_dir}")
            
            # Pergunta se quer outra conversão
            print("\n" + "-" * 50)
            opcao = input("\n🔄 Converter outra? (s/n): ").lower().strip()
            if opcao not in ['s', 'sim', 'y', 'yes']:
                break
                
        except Exception as e:
            print(f"\n⚠️  Erro: {e}")

def main():
    """Função principal do programa"""
    print("=" * 70)
    print("🌿 GEOBOT CONVERTER PRO - Mapeamento de Angiospermas")
    print("=" * 70)
    print("Universidade Federal Rural da Amazônia - Campus Belém")
    print("-" * 70)
    
    while True:
        mostrar_menu()
        
        try:
            escolha = input("\n🎯 Escolha uma opção (1-3): ").strip()
            
            if escolha == '1':
                modo_dms_para_decimal()
            elif escolha == '2':
                modo_decimal_para_dms()
            elif escolha in ['3', 'sair', 'exit', 'quit']:
                print("\n👋 Obrigado por usar o GeoConverter Pro!")
                print("Boa sorte com o mapeamento das angiospermas! 🌿")
                break
            else:
                print("\n❌ Opção inválida! Escolha 1, 2 ou 3.")
                
        except KeyboardInterrupt:
            print("\n\n👋 Programa encerrado pelo usuário")
            break
        except Exception as e:
            print(f"\n⚠️  Erro inesperado: {e}")

# ============================================
# MODO LINHA DE COMANDO
# ============================================

def modo_comando():
    """Modo linha de comando para uso rápido"""
    import sys
    
    if len(sys.argv) < 2:
        print("Uso: python geoconverter.py [modo] [coordenadas]")
        print("\nModos:")
        print("  --dms2dec \"1° 27' 29.08\\\" S 48° 26' 9.59\\\" W\"")
        print("  --dec2dms -1.458077 -48.435998")
        print("\nExemplos:")
        print("  python geoconverter.py --dms2dec \"1°27'29.08\\\"S 48°26'9.59\\\"W\"")
        print("  python geoconverter.py --dec2dms -1.458077 -48.435998")
        return
    
    modo = sys.argv[1]
    
    if modo == '--dms2dec' and len(sys.argv) > 2:
        # DMS para Decimal
        entrada = " ".join(sys.argv[2:])
        try:
            lat, lon = dms_para_decimal(entrada)
            print(formatar_saida_decimal(lat, lon))
        except Exception as e:
            print(f"Erro: {e}")
            
    elif modo == '--dec2dms' and len(sys.argv) > 3:
        # Decimal para DMS
        try:
            lat = float(sys.argv[2])
            lon = float(sys.argv[3])
            resultado = decimal_para_dms(lat, lon)
            print(resultado)
        except Exception as e:
            print(f"Erro: {e}")
            
    elif modo == '--help' or modo == '-h':
        print("GeoConverter Pro - Conversor bidirecional")
        print("\nModo interativo: python geoconverter.py")
        print("\nModo linha de comando:")
        print("  --dms2dec \"coordenadas_dms\"")
        print("  --dec2dms latitude longitude")
    else:
        print("Modo inválido. Use --help para ajuda.")

# ============================================
# EXECUÇÃO
# ============================================

if __name__ == "__main__":
    import sys
    
    # Se tiver argumentos, usa modo linha de comando
    if len(sys.argv) > 1:
        modo_comando()
    else:
        # Modo interativo (padrão)
        main()